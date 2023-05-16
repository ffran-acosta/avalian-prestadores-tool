import crypto from 'crypto';

export const generateJwtSecret = (): string => {
    const secret = crypto.randomBytes(32).toString('hex');
    process.env.JWT_SECRET = secret
    return secret;
};