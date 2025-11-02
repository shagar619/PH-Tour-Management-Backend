import crypto from 'crypto';

/**
 * Generate a secure numeric OTP
 * @param length number of digits (default: 6)
 * @returns string OTP
 */
export const generateSecureOTP = (length = 6): string => {
     const max = 10 ** length;
     const min = 10 ** (length - 1);
     const otp = crypto.randomInt(min, max).toString();
     
     return otp;
};
