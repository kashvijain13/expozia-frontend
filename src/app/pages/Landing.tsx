import { motion } from "motion/react";
import { Link } from "react-router";
import {
  Shield,
  Eye,
  Link2,
  BarChart3,
  Bot,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Lock,
  Cpu,
  Database,
  TrendingUp,
  Users,
  Globe,
  AlertTriangle,
  Target,
} from "lucide-react";
import AtmosphericBackground from "../components/AtmosphericBackground";

const smoothEase = [0.16, 1, 0.3, 1];

export default function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#0A0E14" }}>
      {/* Atmospheric Background */}
      <AtmosphericBackground />

      {/* Premium Header with Glass Effect */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: smoothEase }}
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl"
        style={{
          borderColor: "rgba(0, 217, 255, 0.1)",
          backgroundColor: "rgba(10, 14, 20, 0.8)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Shield className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: "#00D9FF" }} />
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(0, 217, 255, 0)",
                    "0 0 20px rgba(0, 217, 255, 0.6)",
                    "0 0 0px rgba(0, 217, 255, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <span
              className="text-lg sm:text-2xl tracking-widest font-semibold"
              style={{ color: "#FFFFFF", letterSpacing: "0.12em" }}
            >
              EXPOZIA
            </span>
          </Link>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            {["Features", "How It Works", "Pricing"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, ease: smoothEase }}
                whileHover={{ y: -2 }}
                className="text-base transition-colors"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00D9FF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)")}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex gap-2 sm:gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="hidden sm:block px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl transition-all border text-sm sm:text-base"
                style={{
                  color: "#FFFFFF",
                  borderColor: "rgba(0, 217, 255, 0.3)",
                  backgroundColor: "transparent",
                }}
              >
                Sign In
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl transition-all inline-flex items-center gap-2 text-sm sm:text-base"
                style={{
                  backgroundColor: "#00D9FF",
                  color: "#0A0E14",
                  fontWeight: 600,
                  boxShadow: "0 0 30px rgba(0, 217, 255, 0.4)",
                }}
              >
                <span className="hidden sm:inline">Start Free Trial</span>
                <span className="sm:hidden">Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section - EPIC */}
      <section className="relative pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            {/* Left: Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: smoothEase }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, ease: smoothEase }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8"
                style={{
                  backgroundColor: "rgba(0, 217, 255, 0.1)",
                  border: "1px solid rgba(0, 217, 255, 0.3)",
                }}
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: "#00D9FF" }} />
                <span className="text-xs sm:text-sm" style={{ color: "#00D9FF", fontWeight: 600 }}>
                  AI-Powered Content Intelligence
                </span>
              </motion.div>

              {/* Main Headline */}
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 sm:mb-6"
                style={{
                  color: "#FFFFFF",
                  letterSpacing: "-0.03em",
                  fontWeight: 700,
                }}
              >
                Know What's Real.
                <br />
                <span style={{ color: "#00D9FF" }}>In an age of noise.</span>
              </h1>

              {/* Subheadline */}
              <p
                className="text-base sm:text-lg md:text-xl mb-6 sm:mb-10 leading-relaxed"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                Enterprise-grade AI platform for detecting deepfakes, AI-generated content,
                and verifying source credibility in real-time.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-10">
                {[
                  { value: "99.4%", label: "Accuracy" },
                  { value: "<2s", label: "Scan Time" },
                  { value: "50M+", label: "Scans/Month" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, ease: smoothEase }}
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl mb-1" style={{ color: "#00D9FF", fontWeight: 700 }}>
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 217, 255, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    to="/register"
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all inline-flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg"
                    style={{
                      backgroundColor: "#00D9FF",
                      color: "#0A0E14",
                      fontWeight: 700,
                      boxShadow: "0 0 30px rgba(0, 217, 255, 0.5)",
                    }}
                  >
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                    Start Scanning Now
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <button
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl border transition-all text-base sm:text-lg"
                    style={{
                      borderColor: "rgba(0, 217, 255, 0.3)",
                      color: "#FFFFFF",
                      backgroundColor: "rgba(0, 217, 255, 0.05)",
                    }}
                  >
                    Watch Demo
                  </button>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Animated Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.3, ease: smoothEase }}
              className="relative mt-8 lg:mt-0"
            >
              <motion.div
                whileHover={{ y: -12, rotateY: 5 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl p-8 relative overflow-hidden"
                style={{
                  backgroundColor: "#151B23",
                  border: "1px solid rgba(0, 217, 255, 0.2)",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), 0 0 100px rgba(0, 217, 255, 0.1)",
                }}
              >
                {/* Top gradient bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: "linear-gradient(90deg, transparent, #00D9FF, transparent)",
                  }}
                />

                {/* Radial glow */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(0, 217, 255, 0.15) 0%, transparent 70%)",
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <div className="text-sm mb-1" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                        Real-Time Analysis
                      </div>
                      <div className="text-2xl" style={{ color: "#FFFFFF", fontWeight: 700 }}>
                        Authenticity Score
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-6 h-6" style={{ color: "#00D9FF" }} />
                    </motion.div>
                  </div>

                  {/* Big Score */}
                  <motion.div
                    className="text-8xl mb-8 text-center"
                    style={{ color: "#00D9FF", fontWeight: 900 }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8, ease: smoothEase }}
                  >
                    94.2%
                  </motion.div>

                  {/* Status Indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-center gap-2 mb-8 px-4 py-2 rounded-full mx-auto"
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.15)",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      width: "fit-content",
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4" style={{ color: "#10B981" }} />
                    <span className="text-sm" style={{ color: "#10B981", fontWeight: 600 }}>
                      Verified Authentic
                    </span>
                  </motion.div>

                  {/* Mini Cards Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { icon: Eye, label: "Visual", score: 96, color: "#00D9FF" },
                      { icon: Cpu, label: "Text", score: 92, color: "#10B981" },
                      { icon: Link2, label: "Source", score: 95, color: "#FBBF24" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + i * 0.1, ease: smoothEase }}
                        whileHover={{ scale: 1.05 }}
                        className="p-4 rounded-2xl text-center"
                        style={{
                          backgroundColor: "rgba(13, 17, 23, 0.8)",
                          border: "1px solid rgba(0, 217, 255, 0.2)",
                        }}
                      >
                        <item.icon className="w-6 h-6 mx-auto mb-2" style={{ color: item.color }} />
                        <div className="text-2xl mb-1" style={{ color: "#FFFFFF", fontWeight: 700 }}>
                          {item.score}%
                        </div>
                        <div className="text-xs" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                          {item.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Scanning line animation */}
                <motion.div
                  className="absolute left-0 right-0 h-1"
                  style={{
                    background: "linear-gradient(90deg, transparent, #00D9FF, transparent)",
                    top: "50%",
                  }}
                  animate={{
                    y: [-200, 200],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: smoothEase }}
        className="border-y py-4 sm:py-6 backdrop-blur-sm"
        style={{
          borderColor: "rgba(0, 217, 255, 0.1)",
          backgroundColor: "rgba(21, 27, 35, 0.4)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
              TRUSTED BY LEADING ORGANIZATIONS
            </div>
            <div className="flex items-center gap-6 sm:gap-12">
              {[Shield, Lock, Database, Globe, Users].map((Icon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.2, y: -4 }}
                >
                  <Icon className="w-5 h-5 sm:w-8 sm:h-8" style={{ color: "rgba(0, 217, 255, 0.4)" }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Problem Statement Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
              style={{
                backgroundColor: "rgba(248, 113, 113, 0.1)",
                border: "1px solid rgba(248, 113, 113, 0.3)",
              }}
            >
              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: "#F87171" }} />
              <span className="text-xs sm:text-sm" style={{ color: "#F87171", fontWeight: 600 }}>
                THE CHALLENGE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6" style={{ color: "#FFFFFF", fontWeight: 700 }}>
              Content Authenticity is Under Attack
            </h2>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
              With AI-generated content flooding the internet, deepfakes becoming indistinguishable,
              and misinformation spreading faster than ever, trust is broken.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                stat: "67%",
                label: "of users can't identify AI content",
                icon: Bot,
              },
              {
                stat: "4.2B",
                label: "fake images created annually",
                icon: Eye,
              },
              {
                stat: "$78B",
                label: "lost to misinformation yearly",
                icon: TrendingUp,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: smoothEase }}
                whileHover={{ y: -8 }}
                className="p-6 sm:p-8 rounded-3xl border relative overflow-hidden text-center"
                style={{
                  backgroundColor: "#151B23",
                  borderColor: "rgba(248, 113, 113, 0.2)",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(248, 113, 113, 0.5), transparent)",
                  }}
                />
                <item.icon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 sm:mb-6" style={{ color: "#F87171" }} />
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4" style={{ color: "#F87171", fontWeight: 900 }}>
                  {item.stat}
                </div>
                <p className="text-base sm:text-lg" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
              style={{
                backgroundColor: "rgba(0, 217, 255, 0.1)",
                border: "1px solid rgba(0, 217, 255, 0.3)",
              }}
            >
              <Target className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: "#00D9FF" }} />
              <span className="text-xs sm:text-sm" style={{ color: "#00D9FF", fontWeight: 600 }}>
                COMPREHENSIVE SOLUTION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6" style={{ color: "#FFFFFF", fontWeight: 700 }}>
              Enterprise Content Intelligence
            </h2>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Advanced AI models trained on billions of data points to detect manipulation,
              verify authenticity, and protect your brand.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Shield,
                title: "AI Content Detection",
                description: "Identify GPT, Claude, and other AI-generated text with 99%+ accuracy",
                color: "#00D9FF",
              },
              {
                icon: Eye,
                title: "Deepfake Analysis",
                description: "Detect manipulated images, videos, and audio in real-time",
                color: "#10B981",
              },
              {
                icon: Link2,
                title: "Source Verification",
                description: "Check domain reputation, SSL, and credibility signals instantly",
                color: "#FBBF24",
              },
              {
                icon: BarChart3,
                title: "Intelligence Dashboard",
                description: "Track trends, patterns, and insights across all your scans",
                color: "#A78BFA",
              },
              {
                icon: Bot,
                title: "AI Assistant",
                description: "Get instant explanations and recommendations from our AI",
                color: "#F472B6",
              },
              {
                icon: Database,
                title: "API Access",
                description: "Integrate verification into your existing workflows seamlessly",
                color: "#FB923C",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, ease: smoothEase }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="p-8 rounded-3xl border relative overflow-hidden group"
                style={{
                  backgroundColor: "#151B23",
                  borderColor: "rgba(0, 217, 255, 0.2)",
                }}
              >
                {/* Top gradient line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
                  }}
                />

                {/* Radial glow on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${feature.color}15 0%, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Icon with glow */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: `${feature.color}20`,
                      border: `1px solid ${feature.color}40`,
                    }}
                  >
                    <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                  </motion.div>

                  <h3 className="text-2xl mb-3" style={{ color: "#FFFFFF", fontWeight: 700 }}>
                    {feature.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl mb-6" style={{ color: "#FFFFFF", fontWeight: 700 }}>
              Three Steps to Truth
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Our AI-powered pipeline analyzes content at multiple levels in seconds
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Content",
                description: "Paste text, upload images, or enter URLs for instant analysis",
                icon: Database,
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Multi-model AI system evaluates authenticity across 100+ signals",
                icon: Cpu,
              },
              {
                step: "03",
                title: "Get Results",
                description: "Receive detailed authenticity scores, reports, and recommendations",
                icon: CheckCircle2,
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, ease: smoothEase }}
                className="relative"
              >
                {/* Connecting Line */}
                {i < 2 && (
                  <div
                    className="absolute top-16 left-full w-full h-0.5 -translate-x-1/2 z-0"
                    style={{
                      background: "linear-gradient(90deg, rgba(0, 217, 255, 0.5), rgba(0, 217, 255, 0.1))",
                    }}
                  />
                )}

                <motion.div
                  whileHover={{ y: -12 }}
                  className="p-8 rounded-3xl border relative overflow-hidden z-10"
                  style={{
                    backgroundColor: "#151B23",
                    borderColor: "rgba(0, 217, 255, 0.2)",
                  }}
                >
                  {/* Step number badge */}
                  <div
                    className="text-8xl absolute top-4 right-4 opacity-10"
                    style={{ color: "#00D9FF", fontWeight: 900 }}
                  >
                    {step.step}
                  </div>

                  <step.icon className="w-12 h-12 mb-6" style={{ color: "#00D9FF" }} />
                  <h3 className="text-2xl mb-4" style={{ color: "#FFFFFF", fontWeight: 700 }}>
                    {step.title}
                  </h3>
                  <p className="text-base" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - MEGA */}
      <section className="py-32 px-8 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            whileHover={{ y: -12 }}
            className="rounded-3xl p-20 text-center relative overflow-hidden"
            style={{
              backgroundColor: "#151B23",
              border: "2px solid rgba(0, 217, 255, 0.3)",
              boxShadow: "0 20px 80px rgba(0, 0, 0, 0.4), 0 0 100px rgba(0, 217, 255, 0.2)",
            }}
          >
            {/* Animated gradient border */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: "linear-gradient(90deg, transparent, #00D9FF, transparent)",
                opacity: 0.5,
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Radial glow */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.15) 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Shield className="w-20 h-20 mx-auto mb-8" style={{ color: "#00D9FF" }} />
              </motion.div>

              <h2 className="text-6xl mb-6" style={{ color: "#FFFFFF", fontWeight: 900 }}>
                Ready to Verify at Scale?
              </h2>
              <p className="text-2xl mb-12 max-w-2xl mx-auto" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                Join thousands of organizations protecting their brand with EXPOZIA
              </p>

              <div className="flex gap-6 justify-center">
                <motion.div
                  whileHover={{ scale: 1.1, boxShadow: "0 0 60px rgba(0, 217, 255, 0.8)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/register"
                    className="px-12 py-5 rounded-xl text-xl inline-flex items-center gap-3"
                    style={{
                      backgroundColor: "#00D9FF",
                      color: "#0A0E14",
                      fontWeight: 900,
                      boxShadow: "0 0 40px rgba(0, 217, 255, 0.6)",
                    }}
                  >
                    <Zap className="w-6 h-6" />
                    Start Free Trial
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    className="px-12 py-5 rounded-xl border text-xl"
                    style={{
                      borderColor: "rgba(0, 217, 255, 0.5)",
                      color: "#FFFFFF",
                      backgroundColor: "rgba(0, 217, 255, 0.1)",
                      fontWeight: 600,
                    }}
                  >
                    Contact Sales
                  </button>
                </motion.div>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-8 mt-12">
                {[
                  { icon: Lock, text: "Enterprise Security" },
                  { icon: CheckCircle2, text: "99.4% Accuracy" },
                  { icon: Zap, text: "Real-Time Results" },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <badge.icon className="w-5 h-5" style={{ color: "#00D9FF" }} />
                    <span className="text-sm" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12" style={{ borderColor: "rgba(0, 217, 255, 0.1)" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6" style={{ color: "#00D9FF" }} />
              <span className="text-xl tracking-widest" style={{ color: "#FFFFFF", fontWeight: 600 }}>
                EXPOZIA
              </span>
            </div>
            <p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
              © 2026 EXPOZIA. Enterprise Content Intelligence Platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}