import express, { CookieOptions, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const accessTokenValidityDuration = 1000 * 60;
const refreshTokenValidityDuration = 1000 * 60 * 60 * 24;

const refreshTokenCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: refreshTokenValidityDuration,
};

if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error(
        'ACCESS_TOKEN_SECRET or REFRESH_TOKEN_SECRET is not defined in the environment variables.',
    );
}

app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:4173'],
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

const users: { id: string; email: string; master_password: string }[] = [];
let refreshTokens: { id: string; user_id: string; token: string }[] = [];

const generateAccessToken = (user) => {
    const tokenId = randomUUID();

    return jwt.sign({ sub: user.id, jti: tokenId }, accessTokenSecret, {
        expiresIn: accessTokenValidityDuration / 1000,
    });
};

const generateRefreshToken = (user) => {
    const tokenId = randomUUID();

    const refreshToken = jwt.sign(
        { sub: user.id, jti: tokenId },
        refreshTokenSecret,
        {
            expiresIn: refreshTokenValidityDuration / 1000,
        },
    );

    refreshTokens.push({ id: tokenId, user_id: user.id, token: refreshToken });

    return refreshToken;
};

const verify: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Access token is missing.' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({
            error: { message: 'Authorization token format is invalid.' },
        });
    }

    const accessToken = parts[1];

    jwt.verify(accessToken, accessTokenSecret, (err, user) => {
        if (err) {
            return res
                .status(403)
                .json({ error: { message: 'Access token is invalid' } });
        }

        req.user = user;
        next();
    });
};

app.post('/register', (req, res) => {
    const { email, master_password: masterPassword } = req.body;

    if (!email || !masterPassword) {
        return res.status(400).json({
            error: { message: 'Email and master_password are required.' },
        });
    }

    if (users.find((user) => user.email === email)) {
        return res.status(409).json({
            error: { message: 'Email already registered.' },
        });
    }

    const userId = randomUUID();

    users.push({ id: userId, email, master_password: masterPassword });

    return res.status(201).json({
        message: 'User registered successfully.',
        data: { id: userId, email },
    });
});

app.post('/login', (req, res) => {
    const { email, master_password: masterPassword } = req.body;

    if (!email || !masterPassword) {
        return res.status(400).json({
            error: { message: 'Email and master_password are required.' },
        });
    }

    const user = users.find((user) => user.email === email);

    if (!user || user.master_password !== masterPassword) {
        return res.status(401).json({
            error: { message: 'Invalid email or password.' },
        });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('token', refreshToken, refreshTokenCookieOptions);

    res.status(200).json({
        message: 'User logged in successfully.',
        data: {
            user: {
                id: user.id,
                email: user.email,
            },
            token: accessToken,
        },
    });
});

app.post('/logout', (req, res) => {
    const refreshToken = req.cookies.token;

    if (!refreshToken) {
        return res.status(401).json({ error: { message: 'Unauthorized' } });
    }

    refreshTokens = refreshTokens.filter((item) => item.token !== refreshToken);

    res.clearCookie('token', refreshTokenCookieOptions);

    return res.status(200).json({ message: 'Logged out successfully' });
});

app.post('/refresh-token', (req, res) => {
    const refreshToken = req.cookies.token;

    console.log(req);

    if (!refreshToken) {
        return res.status(401).json({ error: { message: 'Unauthorized' } });
    }

    if (!refreshTokens.some((item) => item.token === refreshToken)) {
        return res
            .status(401)
            .json({ error: { message: 'Invalid refresh token.' } });
    }

    jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
        if (err) {
            return res
                .status(401)
                .json({ error: { message: 'Invalid refresh token.' } });
        }

        refreshTokens = refreshTokens.filter(
            (item) => item.token !== refreshToken,
        );

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        res.cookie('token', newRefreshToken, refreshTokenCookieOptions);

        res.status(200).json({
            message: 'Refreshed token.',
            data: { token: newAccessToken },
        });
    });
});

app.get('/me', verify, (req, res) => {
    res.status(200).json({
        message: 'User info retrieved successfully',
        data: {
            user: req.user,
        },
    });
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
