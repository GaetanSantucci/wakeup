import { randomBytes } from 'crypto';
export const generateOtp = () => {
    return randomBytes(20).toString('hex');
};
