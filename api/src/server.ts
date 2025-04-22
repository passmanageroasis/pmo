import express, { CookieOptions, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

if (!accessTokenSecret) {
    throw new Error(
        'ACCESS_TOKEN_SECRET is not defined in the environment variables.',
    );
}

app.use(express.json());
app.use(cookieParser());

const users: { id: string; email: string; master_password: string }[] = [];

const verify: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res
            .status(401)
            .json({ error: 'Access token is missing.' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res
            .status(401)
            .json({ error: 'Authorization token format is invalid.' });
    }

    const accessToken = parts[1];

    jwt.verify(accessToken, accessTokenSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Access token is invalid' });
        }

        req.user = user;
        next();
    });
};

app.get('/test', verify, (req, res) => {
    res.status(200).json({
        message: 'Here is your data',
        data: { fruits: ['banana', 'apple', 'orange'] },
    });
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
