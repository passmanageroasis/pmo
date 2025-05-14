import {
    generateHashedToken,
    generateSessionToken,
} from '@/features/auth/auth.utils.js';
import { Request } from 'express';
import db from '@/config/database.js';

export const createSession = async ({
    req,
    userId,
}: {
    req: Request;
    userId: string;
}) => {
    const sessionToken = generateSessionToken();
    const sessionId = crypto.randomUUID();
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip;

    const client = await db.connect();
    try {
        await client.query('BEGIN');

        // Insert session
        await client.query(
            `INSERT INTO sessions (id, user_id, user_agent, ip_address)
             VALUES ($1, $2, $3, $4)`,
            [sessionId, userId, userAgent, ipAddress],
        );

        // Insert auth token
        await client.query(
            `INSERT INTO session_tokens (id, token_hash, user_id, session_id, issued_at, expires_at)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
                sessionToken.id,
                sessionToken.tokenHash,
                userId,
                sessionId,
                sessionToken.issuedAt,
                sessionToken.expiresAt,
            ],
        );

        await client.query('COMMIT');

        return { sessionToken, sessionId };
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

export const refreshSessionToken = async (sessionToken: string) => {
    const session = await validateSession(sessionToken);

    const newSessionToken = generateSessionToken();

    const client = await db.connect();
    try {
        await client.query('BEGIN');

        // Delete previous session token
        await client.query(
            `DELETE
             FROM session_tokens
             WHERE id = $1`,
            [session.token.id],
        );

        // Insert new session token
        await client.query(
            `INSERT INTO session_tokens (id, token_hash, user_id, session_id, issued_at, expires_at)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
                newSessionToken.id,
                newSessionToken.tokenHash,
                session.userId,
                session.id,
                newSessionToken.issuedAt,
                newSessionToken.expiresAt,
            ],
        );

        await client.query('COMMIT');

        return newSessionToken;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

export const validateSession = async (sessionToken: string) => {
    const hashedRequestToken = generateHashedToken(sessionToken);

    const client = await db.connect();
    try {
        await client.query('BEGIN');

        const { rows } = await client.query(
            `SELECT user_id, session_id, expires_at, issued_at, id
             FROM session_tokens st
             WHERE st.token_hash = $1
               AND st.expires_at > NOW()`,
            [hashedRequestToken],
        );

        const sessionT = rows[0];

        // change last activity in sessions

        await client.query('COMMIT');

        return {
            valid: true,
            id: sessionT.session_id,
            userId: sessionT.user_id,
            token: {
                id: sessionT.id,
                issuedAt: sessionT.issued_at,
                expiresAt: sessionT.expires_at,
            },
        };
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};
