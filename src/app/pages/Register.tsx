// src/pages/Register.tsx
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Shield, Mail, Lock, User, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";

// ✅ use your axios instance
import { api } from "@/lib/axios";

const smoothEase = [0.16, 1, 0.3, 1];

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (serverError) setServerError(null);
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // ✅ validations
  const fullNameError = useMemo(() => {
    if (!formData.fullName) return null;
    return formData.fullName.trim().length >= 2 ? null : "Full name is too short";
  }, [formData.fullName]);

  const emailError = useMemo(() => {
    if (!formData.email) return null;
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    return ok ? null : "Enter a valid email address";
  }, [formData.email]);

  const passwordError = useMemo(() => {
    if (!formData.password) return null;
    return formData.password.length >= 6 ? null : "Password must be at least 6 characters";
  }, [formData.password]);

  const confirmPasswordError = useMemo(() => {
    if (!formData.confirmPassword) return null;
    return formData.confirmPassword === formData.password ? null : "Passwords do not match";
  }, [formData.confirmPassword, formData.password]);

  const canSubmit =
    !loading &&
    !!formData.fullName &&
    !!formData.email &&
    !!formData.password &&
    !!formData.confirmPassword &&
    !fullNameError &&
    !emailError &&
    !passwordError &&
    !confirmPasswordError &&
    formData.agreeTerms;

  const saveAuth = (data: { token: string; _id?: string; email?: string; fullName?: string }) => {
    localStorage.setItem("auth_token", data.token);
    if (data._id) localStorage.setItem("auth_user_id", data._id);
    if (data.email) localStorage.setItem("auth_email", data.email);
    if (data.fullName) localStorage.setItem("auth_fullName", data.fullName);
  };

  const getApiErrorMessage = (err: any) =>
    err?.response?.data?.message || err?.response?.data?.error || err?.message || "Something went wrong";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!canSubmit) {
      if (!formData.agreeTerms) setServerError("You must accept terms");
      return;
    }

    try {
      setLoading(true);

      // ✅ backend expects termsAccepted
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        termsAccepted: formData.agreeTerms,
      };

      // ✅ your axios baseURL is `${API_BASE}/api`
      // so this hits POST /api/auth/register
      const res = await api.post("/auth/register", payload);

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

      {/* LEFT SIDE - Branding Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30, filter: "blur(12px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: smoothEase }}
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-center px-8 xl:px-16"
      >
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(91, 192, 235, 0.15) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-12">
            <Shield className="w-10 h-10" style={{ color: "#5BC0EB" }} />
            <span className="text-xl tracking-widest font-semibold" style={{ color: "#DFD9E2", letterSpacing: "0.08em" }}>
              EXPOZIA
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
          >
            <h1 className="text-6xl mb-4 leading-tight" style={{ color: "#DFD9E2", letterSpacing: "-0.02em" }}>
              Join Expozia.
            </h1>

            <motion.div
              className="h-1 rounded-full mb-6"
              style={{ backgroundColor: "#5BC0EB", width: "120px" }}
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ duration: 0.8, delay: 0.5, ease: smoothEase }}
            />

            <p className="text-xl" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
              Enterprise-grade content intelligence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: smoothEase }}
            className="mt-12 space-y-4"
          >
            {["AI-powered fact verification", "Real-time deepfake detection", "Source credibility analysis"].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1, ease: smoothEase }}
                className="flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5" style={{ color: "#5BC0EB" }} />
                <span style={{ color: "rgba(223, 217, 226, 0.9)" }}>{feature}</span>
              </motion.div>
            ))}
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
              Create Your Account
            </h2>
            <p className="mb-6" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
              Start verifying content with AI intelligence
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
                    Registration failed
                  </div>
                  <div className="text-sm" style={{ color: "rgba(223, 217, 226, 0.75)" }}>
                    {serverError}
                  </div>
                </div>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4, ease: smoothEase }}>
                <label className="block text-sm mb-2" style={{ color: "rgba(223, 217, 226, 0.9)" }}>
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "rgba(223, 217, 226, 0.5)" }} />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="John Doe"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all"
                    style={{
                      backgroundColor: "#1A0724",
                      color: "#DFD9E2",
                      border: fullNameError
                        ? "1px solid rgba(255, 120, 120, 0.8)"
                        : focusedField === "fullName"
                        ? "1px solid #5BC0EB"
                        : "1px solid rgba(91, 192, 235, 0.22)",
                      boxShadow: focusedField === "fullName" ? "0 0 0 3px rgba(91, 192, 235, 0.1)" : "none",
                    }}
                  />
                </div>
                {fullNameError ? (
                  <div className="mt-2 text-sm" style={{ color: "rgba(255, 160, 160, 0.95)" }}>
                    {fullNameError}
                  </div>
                ) : null}
              </motion.div>

              {/* Email */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5, ease: smoothEase }}>
                <label className="block text-sm mb-2" style={{ color: "rgba(223, 217, 226, 0.9)" }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "rgba(223, 217, 226, 0.5)" }} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="your@email.com"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all"
                    style={{
                      backgroundColor: "#1A0724",
                      color: "#DFD9E2",
                      border: emailError
                        ? "1px solid rgba(255, 120, 120, 0.8)"
                        : focusedField === "email"
                        ? "1px solid #5BC0EB"
                        : "1px solid rgba(91, 192, 235, 0.22)",
                      boxShadow: focusedField === "email" ? "0 0 0 3px rgba(91, 192, 235, 0.1)" : "none",
                    }}
                  />
                </div>
                {emailError ? (
                  <div className="mt-2 text-sm" style={{ color: "rgba(255, 160, 160, 0.95)" }}>
                    {emailError}
                  </div>
                ) : null}
              </motion.div>

              {/* Password */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6, ease: smoothEase }}>
                <label className="block text-sm mb-2" style={{ color: "rgba(223, 217, 226, 0.9)" }}>
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "rgba(223, 217, 226, 0.5)" }} />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Create a strong password"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all"
                    style={{
                      backgroundColor: "#1A0724",
                      color: "#DFD9E2",
                      border: passwordError
                        ? "1px solid rgba(255, 120, 120, 0.8)"
                        : focusedField === "password"
                        ? "1px solid #5BC0EB"
                        : "1px solid rgba(91, 192, 235, 0.22)",
                      boxShadow: focusedField === "password" ? "0 0 0 3px rgba(91, 192, 235, 0.1)" : "none",
                    }}
                  />
                </div>

                {passwordError ? (
                  <div className="mt-2 text-sm" style={{ color: "rgba(255, 160, 160, 0.95)" }}>
                    {passwordError}
                  </div>
                ) : null}

                {/* Strength */}
                {formData.password && !passwordError ? (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2">
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(91, 192, 235, 0.15)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor:
                            passwordStrength < 40
                              ? "#DD6E42"
                              : passwordStrength < 70
                              ? "rgba(91, 192, 235, 0.6)"
                              : "#5BC0EB",
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p
                      className="text-xs mt-1"
                      style={{
                        color:
                          passwordStrength < 40
                            ? "#DD6E42"
                            : passwordStrength < 70
                            ? "rgba(91, 192, 235, 0.8)"
                            : "#5BC0EB",
                      }}
                    >
                      {passwordStrength < 40 ? "Weak password" : passwordStrength < 70 ? "Medium strength" : "Strong password"}
                    </p>
                  </motion.div>
                ) : null}
              </motion.div>

              {/* Confirm Password */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.7, ease: smoothEase }}>
                <label className="block text-sm mb-2" style={{ color: "rgba(223, 217, 226, 0.9)" }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "rgba(223, 217, 226, 0.5)" }} />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Re-enter your password"
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all"
                    style={{
                      backgroundColor: "#1A0724",
                      color: "#DFD9E2",
                      border: confirmPasswordError
                        ? "1px solid rgba(255, 120, 120, 0.8)"
                        : focusedField === "confirmPassword"
                        ? "1px solid #5BC0EB"
                        : "1px solid rgba(91, 192, 235, 0.22)",
                      boxShadow: focusedField === "confirmPassword" ? "0 0 0 3px rgba(91, 192, 235, 0.1)" : "none",
                    }}
                  />
                </div>
                {confirmPasswordError ? (
                  <div className="mt-2 text-sm" style={{ color: "rgba(255, 160, 160, 0.95)" }}>
                    {confirmPasswordError}
                  </div>
                ) : null}
              </motion.div>

              {/* Terms */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.8, ease: smoothEase }} className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeTerms}
                  onChange={(e) => handleChange("agreeTerms", e.target.checked)}
                  className="mt-1 w-4 h-4 rounded"
                  style={{ accentColor: "#5BC0EB" }}
                />
                <label htmlFor="terms" className="text-sm" style={{ color: "rgba(223, 217, 226, 0.9)" }}>
                  I agree to the{" "}
                  <Link to="#" className="hover:underline" style={{ color: "#5BC0EB" }}>
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="#" className="hover:underline" style={{ color: "#5BC0EB" }}>
                    Privacy Policy
                  </Link>
                </label>
              </motion.div>
              {!formData.agreeTerms ? (
                <div className="-mt-3 text-xs" style={{ color: "rgba(255, 160, 160, 0.95)" }}>
                  {/* only show if user tried and failed? keep simple: */}
                </div>
              ) : null}

              {/* Submit */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9, ease: smoothEase }}
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
                    Creating...
                  </>
                ) : (
                  <>
                    Create Account <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1, ease: smoothEase }}
              className="mt-6 text-center"
              style={{ color: "rgba(223, 217, 226, 0.7)" }}
            >
              Already have an account?{" "}
              <Link to="/login" className="hover:underline" style={{ color: "#5BC0EB" }}>
                Sign In
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}