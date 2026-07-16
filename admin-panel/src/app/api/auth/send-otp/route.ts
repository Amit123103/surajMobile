import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { otpStore } from "@/lib/otp-store";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL || "admin@surajphonecare.in";
    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      return NextResponse.json({ error: "Unauthorized email address" }, { status: 403 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    // Save to in-memory store (bypasses Firestore rules)
    otpStore.set(email.toLowerCase(), { otp, expiresAt });
    
    // Always log the OTP to the console so the admin can log in even if email fails
    console.log(`\n=========================================`);
    console.log(`🔑 ADMIN OTP GENERATED: ${otp}`);
    console.log(`=========================================\n`);

    // Send email via Nodemailer
    if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD && process.env.SMTP_EMAIL !== "your_email@gmail.com") {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD.replace(/\s+/g, ''), // Remove spaces just in case
          },
        });

        await transporter.sendMail({
          from: `"Admin Portal" <${process.env.SMTP_EMAIL}>`,
          to: email,
          subject: "Your Admin Login Code",
          html: `
            <div style="font-family: Arial, sans-serif; max-w-md; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
              <h2 style="color: #2563eb; text-align: center;">Admin Portal Login</h2>
              <p>You requested to log into the Suraj Phone Care Admin Portal.</p>
              <p>Your one-time login code is:</p>
              <h1 style="text-align: center; letter-spacing: 5px; color: #1e3a8a; background: #eff6ff; padding: 10px; border-radius: 8px;">${otp}</h1>
              <p style="color: #888; font-size: 12px; text-align: center;">This code expires in 5 minutes. If you didn't request this, ignore this email.</p>
            </div>
          `,
        });
        
        console.log("Email sent successfully!");
      } catch (emailError) {
        console.error("\n❌ ERROR SENDING EMAIL (SMTP Error):", (emailError as Error).message);
        console.log("Check your Google App Password. (OTP is printed above for immediate use)");
      }
    } else {
      console.log("SMTP credentials not configured. Email not sent. Use the OTP printed above.");
    }

    return NextResponse.json({ success: true, message: "OTP process completed" });
  } catch (error) {
    console.error("Error generating OTP:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
