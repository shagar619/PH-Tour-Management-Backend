"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSecureOTP = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Generate a secure numeric OTP
 * @param length number of digits (default: 6)
 * @returns string OTP
 */
const generateSecureOTP = (length = 6) => {
    const max = 10 ** length;
    const min = 10 ** (length - 1);
    const otp = crypto_1.default.randomInt(min, max).toString();
    return otp;
};
exports.generateSecureOTP = generateSecureOTP;
