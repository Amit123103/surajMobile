// Global in-memory store for OTPs
// This bypasses Firestore completely to avoid "Missing Permissions" errors.

type OtpEntry = {
  otp: string;
  expiresAt: number;
};

// Use a global variable to preserve the map across API hot-reloads in development
const globalForOtpStore = global as unknown as { otpStore: Map<string, OtpEntry> };

export const otpStore = globalForOtpStore.otpStore || new Map<string, OtpEntry>();

if (process.env.NODE_ENV !== "production") {
  globalForOtpStore.otpStore = otpStore;
}
