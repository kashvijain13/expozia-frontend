// src/app/pages/LinkCheck.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Link2,
  Search,
  ChevronDown,
  ChevronUp,
  Shield,
  Lock,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { api } from "../../lib/axios"; // ✅ your axios instance

const smoothEase = "cubic-bezier(0.16, 1, 0.3, 1)";

type LinkResult = {
  sessionId?: string;
  trustScore: number;
  domain: string;
  analysis: {
    domainAuthority: { score: number; status: "Low" | "Medium" | "High"; details: string };
    httpsSSL: { score: number; status: "Insecure" | "Secure"; details: string };
    blacklistStatus: { score: number; status: "Clean" | "Suspicious"; details: string };
    reputation: { score: number; status: "Untrusted" | "Mixed" | "Trusted"; details: string };
  };
  factChecks: string[];
  assistantSummary?: string;
};

export default function LinkCheck() {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<LinkResult | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const handleScan = async () => {
    const clean = url.trim();
    if (!clean || scanning) return;

    try {
      setScanning(true);
      setError(null);
      setResults(null);

      // ✅ Backend: POST /scan/link { url }
      const { data } = await api.post("/scan/link", { url: clean });

      // safety normalization
      const safe: LinkResult = {
        sessionId: data.sessionId,
        trustScore: Number(data.trustScore ?? 0),
        domain: String(data.domain ?? ""),
        analysis: {
          domainAuthority: data.analysis?.domainAuthority || {
            score: 0,
            status: "Low",
            details: "Unknown",
          },
          httpsSSL: data.analysis?.httpsSSL || {
            score: 0,
            status: "Insecure",
            details: "Unknown",
          },
          blacklistStatus: data.analysis?.blacklistStatus || {
            score: 0,
            status: "Suspicious",
            details: "Unknown",
          },
          reputation: data.analysis?.reputation || {
            score: 0,
            status: "Mixed",
            details: "Unknown",
          },
        },
        factChecks: Array.isArray(data.factChecks) ? data.factChecks : [],
        assistantSummary: data.assistantSummary,
      };

      setResults(safe);
      setExpandedSections(["domainAuthority"]);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Link check failed");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: smoothEase }}
        className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8"
        style={{ color: "#DFD9E2", letterSpacing: "-0.02em" }}
      >
        Link Credibility Check
      </motion.h1>

      {/* URL Input */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: smoothEase }}
        className="mb-6"
      >
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Link2
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: "rgba(223, 217, 226, 0.7)" }}
            />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleScan()}
              placeholder="Enter URL to analyze (e.g., https://example.com)"
              className="w-full pl-12 pr-4 py-4 rounded-full outline-none text-lg"
              style={{
                backgroundColor: "#395C6B",
                color: "#DFD9E2",
                border: "1px solid rgba(91, 192, 235, 0.2)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>

          <motion.button
            onClick={handleScan}
            disabled={!url.trim() || scanning}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full flex items-center gap-2 transition-all disabled:opacity-50"
            style={{
              backgroundColor: "#5BC0EB",
              color: "#210B2C",
              boxShadow: "0 0 20px rgba(91, 192, 235, 0.4)",
            }}
          >
            {scanning ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="w-5 h-5" />
                </motion.div>
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Analyze
              </>
            )}
          </motion.button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl border text-sm bg-red-500/10 border-red-500/30 text-white">
            {error}
          </div>
        )}

        {results?.assistantSummary && !scanning && (
          <div
            className="mt-4 p-4 rounded-2xl border"
            style={{
              backgroundColor: "#2F4F5C",
              borderColor: "rgba(91, 192, 235, 0.2)",
              color: "rgba(223, 217, 226, 0.85)",
            }}
          >
            {results.assistantSummary}
          </div>
        )}
      </motion.div>

      {/* Scanning Animation */}
      <AnimatePresence>
        {scanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              className="w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center relative"
              style={{
                backgroundColor: "#395C6B",
                border: "2px solid rgba(91, 192, 235, 0.2)",
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: "2px solid rgba(91, 192, 235, 0.4)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <Shield className="w-16 h-16" style={{ color: "#5BC0EB" }} />
            </motion.div>
            <p style={{ color: "rgba(223, 217, 226, 0.7)" }}>
              Scanning security, reputation, and credibility signals...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {results && !scanning && (
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="space-y-6"
          >
            {/* Trust Score Meter */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              whileHover={{ y: -5 }}
              className="rounded-3xl border p-8 text-center relative overflow-hidden"
              style={{
                backgroundColor: "#395C6B",
                borderColor: "rgba(91, 192, 235, 0.2)",
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(91, 192, 235, 0.4), transparent)",
                }}
              />
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="rgba(91, 192, 235, 0.15)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="#5BC0EB"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 502" }}
                    animate={{
                      strokeDasharray: `${(results.trustScore / 100) * 502} 502`,
                    }}
                    transition={{ duration: 1, ease: smoothEase }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    className="text-5xl mb-2"
                    style={{ color: "#5BC0EB" }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {results.trustScore}
                  </motion.div>
                  <div className="text-sm" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
                    Trust Score
                  </div>
                </div>
              </div>
              <h3 className="text-xl mb-2" style={{ color: "#DFD9E2" }}>
                {results.domain}
              </h3>
              <p style={{ color: "rgba(223, 217, 226, 0.7)" }}>
                Overall credibility assessment
              </p>
            </motion.div>

            {/* Analysis Sections */}
            <div className="space-y-4">
              {Object.entries(results.analysis).map(([key, data]: [string, any], i) => {
                const isExpanded = expandedSections.includes(key);
                const icons: Record<string, any> = {
                  domainAuthority: Shield,
                  httpsSSL: Lock,
                  blacklistStatus: AlertTriangle,
                  reputation: CheckCircle,
                };
                const Icon = icons[key] || Shield;

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: smoothEase }}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border overflow-hidden"
                    style={{
                      backgroundColor: "#395C6B",
                      borderColor: "rgba(91, 192, 235, 0.2)",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <button
                      onClick={() => toggleSection(key)}
                      className="w-full p-6 flex items-center justify-between transition-colors"
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "rgba(91, 192, 235, 0.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: "rgba(91, 192, 235, 0.15)",
                            border: "1px solid rgba(91, 192, 235, 0.3)",
                          }}
                        >
                          <Icon className="w-6 h-6" style={{ color: "#5BC0EB" }} />
                        </div>
                        <div className="text-left">
                          <div className="text-lg mb-1" style={{ color: "#DFD9E2" }}>
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </div>
                          <div className="text-sm" style={{ color: "#5BC0EB" }}>
                            {data.status} • {data.score}%
                          </div>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" style={{ color: "#DFD9E2" }} />
                      ) : (
                        <ChevronDown className="w-5 h-5" style={{ color: "#DFD9E2" }} />
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: smoothEase }}
                          style={{
                            backgroundColor: "#2F4F5C",
                            borderTop: "1px solid rgba(91, 192, 235, 0.2)",
                          }}
                        >
                          <div className="p-6">
                            <p style={{ color: "rgba(223, 217, 226, 0.7)" }}>{data.details}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Fact-Check References */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, ease: smoothEase }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border p-6 relative overflow-hidden"
              style={{
                backgroundColor: "#395C6B",
                borderColor: "rgba(91, 192, 235, 0.2)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(91, 192, 235, 0.4), transparent)",
                }}
              />
              <h4 className="text-lg mb-4" style={{ color: "#DFD9E2" }}>
                Fact-Check References
              </h4>
              <ul className="space-y-3">
                {results.factChecks.map((check: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1, ease: smoothEase }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: "#5BC0EB" }}
                    />
                    <span style={{ color: "rgba(223, 217, 226, 0.7)" }}>{check}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}