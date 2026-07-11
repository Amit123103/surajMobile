import { NextResponse } from "next/server";
import { otpStore } from "@/lib/otp-store";

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL || "admin@surajphonecare.in";
    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const storedData = otpStore.get(email.toLowerCase());

    if (!storedData || storedData.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(email.toLowerCase());
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    // OTP is valid. Delete it so it can't be reused.
    otpStore.delete(email.toLowerCase());

    // Return the fixed backdoor password for the client to authenticate with Firebase Auth
    return NextResponse.json({ success: true, token: "AdminPassword123!" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
