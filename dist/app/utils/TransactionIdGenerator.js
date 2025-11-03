"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionId = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Generates a unique transaction ID after successful payment.
 *
 * Format Example:
 *   TXN-20251026-AB12CD34EF
 */
const getTransactionId = () => {
    const date = new Date();
    // Format date as YYYYMMDD
    const datePart = date.toISOString().slice(0, 10).replace(/-/g, "");
    // Generate 10 random hex characters
    const randomPart = crypto_1.default.randomBytes(5).toString("hex").toUpperCase();
    // Combine with a prefix for clarity
    const transactionId = `TXN-${datePart}-${randomPart}`;
    return transactionId;
};
exports.getTransactionId = getTransactionId;
/**
 *   Examples
 *
 *   TXN-20251026-AB12CD34EF
     TXN-20251026-77F9A1C3D2
     TXN-20251027-5B8F6E1C99
 */ 
