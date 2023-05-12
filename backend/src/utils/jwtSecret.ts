import crypto from 'crypto';

export const generateJwtSecret = (): string => {
    const secret = crypto.randomBytes(32).toString('hex');
    return secret;
};