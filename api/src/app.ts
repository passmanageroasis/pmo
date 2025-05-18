import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authRouter } from '@/features/auth/index.js';

const app = express();

app.use(
    cors({
        origin: [String(process.env.ORIGIN)],
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

app.use(`${process.env.API_PREFIX}/auth`, authRouter);

app.all(/(.*)/, (req: Request, res: Response) => {
    res.status(404).json({
        error: { message: 'Endpoint does not exist.' },
        meta: { url: req.originalUrl },
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        error: { message: 'Internal server error.', stack: err.stack },
        meta: { url: req.originalUrl },
    });
});

export default app;
