"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AdminLogin() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("doctorsurajmobile@gmail.com");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "doctorsurajmobile@gmail.com" }), // Hardcoded to ensure no tampering
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }
      
      setSuccessMsg("OTP sent to your email!");
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "doctorsurajmobile@gmail.com", otp }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Invalid OTP");
      }
      
      // OTP valid. Sign in using the backdoor token from the API
      await signInWithEmailAndPassword(auth, "doctorsurajmobile@gmail.com", data.token);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-zinc-200 relative z-10">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-zinc-900">Admin Portal</h1>
          <p className="text-zinc-500 text-sm mt-2">
            {step === 1 ? "Sign in to manage your application" : "Enter the 6-digit code sent to your email"}
          </p>
        </div>

        <form onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium text-center">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="p-3 rounded-xl bg-green-50 text-green-700 text-sm font-medium text-center">
              {successMsg}
            </div>
          )}
          
          {step === 1 ? (
            <div>
              <label className="block text-sm font-medium mb-1.5 text-zinc-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                readOnly
                disabled
                className="w-full px-4 py-3 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-600 focus:outline-none transition-all cursor-not-allowed"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1.5 text-zinc-700">
                6-Digit OTP
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-center tracking-widest text-lg font-bold"
                placeholder="000000"
                required
              />
              <button 
                type="button" 
                onClick={() => {
                  setStep(1);
                  setOtp("");
                }} 
                className="text-sm text-primary-600 mt-2 hover:underline w-full text-center"
              >
                Go Back
              </button>
            </div>
          )}

          <Button type="submit" className="w-full py-6 mt-4" disabled={loading}>
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : step === 1 ? (
              "Send OTP"
            ) : (
              "Verify & Sign In"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
