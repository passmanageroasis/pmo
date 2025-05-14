import crypto from 'crypto';

export const generateHashedToken = (token: string) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};

export const generateToken = (lifetimeMs: number) => {
    const token = crypto.randomBytes(32).toString('base64url');
    const id = crypto.randomUUID();
    const hashedToken = generateHashedToken(token);
    const issuedAt = new Date();
    const expiresAt = new Date(issuedAt.getTime() + lifetimeMs);
    return {
        token,
        tokenHash: hashedToken,
        id,
        issuedAt,
        expiresAt,
        expiresInMs: lifetimeMs,
    };
};

export const generateSessionToken = () => {
    const lifetimeMs = 1000 * 60 * 60 * 24; // 24 hrs
    return generateToken(lifetimeMs);
};
