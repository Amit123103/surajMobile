import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL || "admin@surajphonecare.in";
    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const cookieStore = cookies();
    const otpData = cookieStore.get("admin_otp")?.value;
    
    if (!otpData) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    const [hash, expiresAtStr] = otpData.split(".");
    const expiresAt = parseInt(expiresAtStr, 10);

    if (Date.now() > expiresAt) {
      cookies().delete("admin_otp");
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    const secret = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "fallback_secret";
    const expectedHash = crypto.createHmac("sha256", secret).update(otp).digest("hex");

    if (hash !== expectedHash) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // OTP is valid. Delete it so it can't be reused.
    cookies().delete("admin_otp");

    // Return the fixed backdoor password for the client to authenticate with Firebase Auth
    return NextResponse.json({ success: true, token: "AdminPassword123!" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
