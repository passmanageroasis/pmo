import { RequestHandler } from 'express';
import db from '@/config/database.js';
import argon2 from 'argon2';
import crypto from 'crypto';
import {
    createSession,
    refreshSessionToken,
    validateSession,
} from '@/features/auth/auth.service.js';

export const registerUser: RequestHandler = async (req, res) => {
    const { email, master_password } = req.body;

    if (!email || !master_password) {
        res.status(400).json({
            status: 400,
            error: {
                code: 'VALIDATION_ERROR',
                message:
                    'Request body is missing required fields: email, master_password.',
            },
        });
        return;
    }

    const user_id = crypto.randomUUID();
    const master_password_hash = await argon2.hash(master_password);
    const encryption_key_salt = crypto.randomBytes(32).toString('base64');

    try {
        await db.query(
            `
                INSERT INTO users (id, email, master_password_hash, encryption_key_salt)
                VALUES ($1, $2, $3, $4)
            `,
            [user_id, email, master_password_hash, encryption_key_salt],
        );

        res.status(201).json({
            message: 'User registered successfully!',
            data: { user_id, email },
        });
    } catch (err) {
        // Fix later
        // @ts-expect-error // Code does not exist on type error
        if (err.code === '23505' && err.constraint === 'users_email_key') {
            res.status(409).json({
                status: 409,
                error: {
                    code: 'EMAIL_IN_USE',
                    message: 'Email is already in use.',
                },
            });
        } else {
            throw err;
        }
    }
};

export const loginUser: RequestHandler = async (req, res) => {
    const { email, master_password } = req.body;

    if (!email || !master_password) {
        res.status(400).json({
            status: 400,
            error: {
                code: 'VALIDATION_ERROR',
                message:
                    'Request body is missing required fields: email, master_password.',
            },
        });
        return;
    }

    const { rows } = await db.query(
        'SELECT id, master_password_hash FROM users WHERE email = $1',
        [email],
    );

    if (!rows.length) {
        res.status(401).json({
            status: 401,
            error: {
                code: 'INVALID_CREDENTIALS',
                message: 'This email does not exist.',
            },
        });
        return;
    }

    const user = rows[0];

    const master_password_hash = user.master_password_hash;
    if (!(await argon2.verify(master_password_hash, master_password))) {
        res.status(401).json({
            status: 401,
            error: {
                code: 'INVALID_CREDENTIALS',
                message: 'Master password is incorrect.',
            },
        });
        return;
    }

    const { sessionToken } = await createSession({ req, userId: user.id });

    res.cookie('user_session', sessionToken.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: sessionToken.expiresInMs,
    });

    res.status(200).json({
        message: 'Logged in successfully!',
    });
};

export const validateUserSession: RequestHandler = async (req, res) => {
    const sessionToken = req.cookies['user_session'];

    if (!sessionToken) {
        res.status(400).json({
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Session token is required.',
            },
        });
        return;
    }

    const session = await validateSession(sessionToken);

    if (!session.valid) {
        res.status(401).json({
            error: { message: 'Session is invalid or expired.' },
        });
        return;
    }

    res.status(200).json({
        message: 'Session is valid.',
        data: {
            is_valid: session.valid,
            id: session.id,
            user_id: session.userId,
            token: {
                issued_at: session.token.issuedAt,
                expires_at: session.token.expiresAt,
            },
        },
    });
};

export const refreshUserSession: RequestHandler = async (req, res) => {
    const sessionToken = req.cookies['user_session'];

    if (!sessionToken) {
        res.status(400).json({
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Session token is required.',
            },
        });
        return;
    }

    const session = await validateSession(sessionToken);

    if (!session.valid) {
        res.status(401).json({
            error: { message: 'Session is invalid or expired.' },
        });
        return;
    }

    const newSessionToken = await refreshSessionToken(sessionToken);

    res.cookie('user_session', newSessionToken.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: newSessionToken.expiresInMs,
    });

    res.status(200).json({
        message: 'Session refreshed successfully.',
    });
};
