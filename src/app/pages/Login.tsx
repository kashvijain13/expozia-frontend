// src/pages/Login.tsx
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Shield, Mail, Lock, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";
import axios from "axios";

const smoothEase = [0.16, 1, 0.3, 1];

export default function Login() {
  const navigate = useNavigate();

  // ✅ point this to your backend (or set VITE_API_URL in .env)
  const API_BASE =
    (import.meta as any)?.env?.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:5000";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // ✅ client-side validations (matches your controller expectations)
  const emailError = useMemo(() => {
    if (!email) return null;
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    return ok ? null : "Enter a valid email address";
  }, [email]);

  const passwordError = useMemo(() => {
    if (!password) return null;
    return password.length >= 6 ? null : "Password must be at least 6 characters";
  }, [password]);

  const canSubmit = !loading && !!email && !!password && !emailError && !passwordError;

  const saveAuth = (data: { token: string; _id?: string; email?: string; fullName?: string }) => {
    // ✅ store token (you can swap to cookies later)
    localStorage.setItem("auth_token", data.token);
    if (data._id) localStorage.setItem("auth_user_id", data._id);
    if (data.email) localStorage.setItem("auth_email", data.email);
    if (data.fullName) localStorage.setItem("auth_fullName", data.fullName);
  };

  const getApiErrorMessage = (err: any) => {
    // axios error shape
    return (
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Something went wrong"
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // hard stop if invalid
    if (!canSubmit) return;

    try {
      setLoading(true);

      // ✅ connect to your Express route: POST /api/auth/login (adjust if different)
      const res = await axios.post(
        `${API_BASE}/api/auth/login`,
        { email: email.trim().toLowerCase(), password },
        { headers: { "Content-Type": "application/json" } }
      );

      // backend returns: _id, fullName, email, token
      saveAuth(res.data);

      navigate("/app");
    } catch (err: any) {
      setServerError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ backgroundColor: "#210B2C" }}>
      {/* Subtle background drift animation */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 30% 50%, rgba(91, 192, 235, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 50%, rgba(91, 192, 235, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 50%, rgba(91, 192, 235, 0.05) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* LEFT SIDE - Branding Panel - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, x: -30, filter: "blur(12px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: smoothEase }}
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-center px-8 xl:px-16"
      >
        {/* Animated radial glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(91, 192, 235, 0.15) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Logo + Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
          className="relative z-10 mb-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-10 h-10" style={{ color: "#5BC0EB" }} />
            <span
              className="text-xl tracking-widest font-semibold"
              style={{ color: "#DFD9E2", letterSpacing: "0.08em" }}
            >
              EXPOZIA
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
          >
            <h1
              className="text-6xl mb-4 leading-tight"
              style={{ color: "#DFD9E2", letterSpacing: "-0.02em" }}
            >
              Welcome Back.
            </h1>

            <motion.div
              className="h-1 rounded-full mb-6"
              style={{ backgroundColor: "#5BC0EB", width: "120px" }}
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ duration: 0.8, delay: 0.5, ease: smoothEase }}
            />

            <p className="text-xl" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
              Verify reality with intelligence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: smoothEase }}
            className="mt-16 inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              backgroundColor: "rgba(91, 192, 235, 0.1)",
              border: "1px solid rgba(91, 192, 235, 0.3)",
            }}
          >
            <CheckCircle className="w-5 h-5" style={{ color: "#5BC0EB" }} />
            <span style={{ color: "#DFD9E2" }}>Integrity Verified</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* RIGHT SIDE - Form Card */}
      <motion.div
        initial={{ opacity: 0, x: 30, filter: "blur(12px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10"
      >
        {/* Radial glow behind form */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(91, 192, 235, 0.06) 0%, transparent 60%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
          className="w-full max-w-md rounded-3xl p-8 relative"
          style={{
            backgroundColor: "#395C6B",
            border: "1px solid rgba(223, 217, 226, 0.12)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(91, 192, 235, 0.3), transparent)",
            }}
          />

          <div className="relative z-10">
            <h2 className="text-3xl mb-2" style={{ color: "#DFD9E2", letterSpacing: "-0.01em" }}>
              Sign In to Expozia
            </h2>
            <p className="mb-6" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
              Access your content intelligence platform
            </p>

            {/* ✅ server error banner */}
            {serverError ? (
              <div
                className="mb-6 rounded-2xl px-4 py-3 flex gap-3 items-start"
                style={{
                  backgroundColor: "rgba(255, 80, 80, 0.10)",
                  border: "1px solid rgba(255, 80, 80, 0.25)",
                }}
              >
                <AlertTriangle className="w-5 h-5 mt-0.5" style={{ color: "rgba(255, 120, 120, 0.9)" }} />
                <div>
                  <div className="text-sm font-semibold" style={{ color: "#DFD9E2" }}>
                    Login failed
                  </div>
                  <div className="text-sm" style={{ color: "rgba(223, 217, 226, 0.75)" }}>
                    {serverError}
                  </div>
                </div>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4, ease: smoothEase }}
              >
                <label className="block text-sm mb-2" style={{ color: "rgba(223, 217, 226, 0.9)" }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: "rgba(223, 217, 226, 0.5)" }}
                  />
                  <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (serverError) setServerError(null);
                    }}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    placeholder="your@email.com"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all"
                    style={{
                      backgroundColor: "#1A0724",
                      color: "#DFD9E2",
                      border: emailError
                        ? "1px solid rgba(255, 120, 120, 0.8)"
                        : emailFocused
                        ? "1px solid #5BC0EB"
                        : "1px solid rgba(91, 192, 235, 0.22)",
                      boxShadow: emailFocused ? "0 0 0 3px rgba(91, 192, 235, 0.1)" : "none",
                    }}
                    animate={
                      emailFocused
                        ? {
                            boxShadow: [
                              "0 0 0 3px rgba(91, 192, 235, 0.1)",
                              "0 0 0 3px rgba(91, 192, 235, 0.15)",
                              "0 0 0 3px rgba(91, 192, 235, 0.1)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                {emailError ? (
                  <div className="mt-2 text-sm" style={{ color: "rgba(255, 160, 160, 0.95)" }}>
                    {emailError}
                  </div>
                ) : null}
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5, ease: smoothEase }}
              >
                <label className="block text-sm mb-2" style={{ color: "rgba(223, 217, 226, 0.9)" }}>
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: "rgba(223, 217, 226, 0.5)" }}
                  />
                  <motion.input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (serverError) setServerError(null);
                    }}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all"
                    style={{
                      backgroundColor: "#1A0724",
                      color: "#DFD9E2",
                      border: passwordError
                        ? "1px solid rgba(255, 120, 120, 0.8)"
                        : passwordFocused
                        ? "1px solid #5BC0EB"
                        : "1px solid rgba(91, 192, 235, 0.22)",
                      boxShadow: passwordFocused ? "0 0 0 3px rgba(91, 192, 235, 0.1)" : "none",
                    }}
                    animate={
                      passwordFocused
                        ? {
                            boxShadow: [
                              "0 0 0 3px rgba(91, 192, 235, 0.1)",
                              "0 0 0 3px rgba(91, 192, 235, 0.15)",
                              "0 0 0 3px rgba(91, 192, 235, 0.1)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                {passwordError ? (
                  <div className="mt-2 text-sm" style={{ color: "rgba(255, 160, 160, 0.95)" }}>
                    {passwordError}
                  </div>
                ) : null}
              </motion.div>

              {/* Forgot Password */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6, ease: smoothEase }}
                className="text-right"
              >
                <Link to="#" className="text-sm hover:underline" style={{ color: "#5BC0EB" }}>
                  Forgot password?
                </Link>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7, ease: smoothEase }}
                whileHover={loading ? undefined : { y: -2 }}
                whileTap={loading ? undefined : { scale: 0.98 }}
                type="submit"
                disabled={!canSubmit}
                className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "#5BC0EB",
                  color: "#210B2C",
                  boxShadow: "0 4px 16px rgba(91, 192, 235, 0.3)",
                }}
              >
                {loading ? (
                  <>
                    <span className="inline-block w-5 h-5 rounded-full border-2 border-black/40 border-t-black animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Register Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8, ease: smoothEase }}
              className="mt-8 text-center"
              style={{ color: "rgba(223, 217, 226, 0.7)" }}
            >
              Don't have an account?{" "}
              <Link to="/register" className="hover:underline" style={{ color: "#5BC0EB" }}>
                Register
              </Link>
            </motion.div>

            {/* tiny helper */}
            <div className="mt-4 text-center text-xs" style={{ color: "rgba(223, 217, 226, 0.55)" }}>
              API: <span style={{ color: "rgba(223, 217, 226, 0.75)" }}>{API_BASE}/api/auth/login</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}