import crypto from "crypto";


/**
 * Generates a unique transaction ID after successful payment.
 * 
 * Format Example:
 *   TXN-20251026-AB12CD34EF
 */


export const getTransactionId = (): string => {

     const date = new Date();

     // Format date as YYYYMMDD
     const datePart = date.toISOString().slice(0, 10).replace(/-/g, "");

     // Generate 10 random hex characters
     const randomPart = crypto.randomBytes(5).toString("hex").toUpperCase();

     // Combine with a prefix for clarity
     const transactionId = `TXN-${datePart}-${randomPart}`;

     return transactionId;
};



/**
 *   Examples
 * 
 *   TXN-20251026-AB12CD34EF
     TXN-20251026-77F9A1C3D2
     TXN-20251027-5B8F6E1C99
 */