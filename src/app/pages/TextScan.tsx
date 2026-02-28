import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, AlertCircle } from "lucide-react";
import MisinformationDetectionPanel from "../components/MisinformationDetectionPanel";
import {api} from "../../lib/axios";

const smoothEase = "cubic-bezier(0.16, 1, 0.3, 1)";

type DetectedSection = { start: number; end: number; confidence: number };

type DetectedIssue = {
  text: string;
  position: { start: number; end: number };
  confidence: number;
  suggestion: string;
};

type TextScanResult = {
  score: number;
  aiGenerated: number;
  detectedSections: DetectedSection[];
  misinformation?: {
    overallConfidence: number;
    detectedIssues: DetectedIssue[];
  };
};

export default function TextScan() {
  const [text, setText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<TextScanResult | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim() || analyzing) return;
    setAnalyzing(true);
    setErrorMsg(null);

    try {
      // BACKEND: POST /api/scan/text
      // body: { text }
      // expects: { score, aiGenerated, detectedSections, misinformation }
      const { data } = await api.post("/scan/text", { text });

      // normalize just in case backend returns different naming
      const normalized: TextScanResult = {
        score: Number(data?.score ?? 0),
        aiGenerated: Number(data?.aiGenerated ?? 0),
        detectedSections: Array.isArray(data?.detectedSections) ? data.detectedSections : [],
        misinformation: data?.misinformation
          ? {
              overallConfidence: Number(data.misinformation?.overallConfidence ?? 0),
              detectedIssues: Array.isArray(data.misinformation?.detectedIssues)
                ? data.misinformation.detectedIssues
                : [],
            }
          : undefined,
      };

      setResults(normalized);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to analyze text. Check backend is running and endpoint exists.";
      setErrorMsg(msg);
      setResults(null);
    } finally {
      setAnalyzing(false);
    }
  };

  const isAIGenerated = (index: number) => {
    if (!results) return false;
    return results.detectedSections.some((section) => index >= section.start && index <= section.end);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: smoothEase }}
        className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8"
        style={{ color: "#DFD9E2", letterSpacing: "-0.02em" }}
      >
        Text Authenticity Scan
      </motion.h1>

      {errorMsg && (
        <div
          className="mb-5 rounded-2xl border p-4"
          style={{
            backgroundColor: "rgba(221, 110, 66, 0.12)",
            borderColor: "rgba(221, 110, 66, 0.35)",
            color: "#DFD9E2",
          }}
        >
          <div className="text-sm" style={{ color: "rgba(223, 217, 226, 0.9)" }}>
            {errorMsg}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.08, ease: smoothEase }}
          whileHover={{ y: -5 }}
          className="rounded-3xl border p-4 sm:p-6 flex flex-col relative overflow-hidden"
          style={{
            backgroundColor: "#395C6B",
            borderColor: "rgba(91, 192, 235, 0.2)",
            height: "500px",
            minHeight: "400px",
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

          <h3
            className="text-base sm:text-lg mb-3 sm:mb-4 relative z-10"
            style={{ color: "#DFD9E2" }}
          >
            Input Text
          </h3>

          <motion.textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Paste your text here for analysis..."
            className="flex-1 p-3 sm:p-4 rounded-2xl resize-none outline-none mb-3 sm:mb-4 transition-all relative z-10 text-sm sm:text-base"
            style={{
              backgroundColor: "#1A0724",
              color: "#DFD9E2",
              border: isFocused
                ? "1px solid rgba(91, 192, 235, 0.5)"
                : "1px solid rgba(91, 192, 235, 0.2)",
              boxShadow: isFocused
                ? "0 0 24px rgba(91, 192, 235, 0.2), inset 0 2px 8px rgba(0, 0, 0, 0.4)"
                : "inset 0 2px 8px rgba(0, 0, 0, 0.4)",
            }}
            animate={
              isFocused
                ? {
                    boxShadow: [
                      "0 0 24px rgba(91, 192, 235, 0.2), inset 0 2px 8px rgba(0, 0, 0, 0.4)",
                      "0 0 32px rgba(91, 192, 235, 0.3), inset 0 2px 8px rgba(0, 0, 0, 0.4)",
                      "0 0 24px rgba(91, 192, 235, 0.2), inset 0 2px 8px rgba(0, 0, 0, 0.4)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity, ease: smoothEase }}
          />

          <motion.button
            onClick={handleAnalyze}
            disabled={!text.trim() || analyzing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="w-full py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-2 transition-all disabled:opacity-50 relative z-10 overflow-hidden text-sm sm:text-base"
            style={{
              backgroundColor: "#5BC0EB",
              color: "#210B2C",
              boxShadow: "0 0 20px rgba(91, 192, 235, 0.4)",
            }}
            animate={
              !analyzing && text.trim()
                ? {
                    boxShadow: [
                      "0 0 20px rgba(91, 192, 235, 0.4)",
                      "0 0 32px rgba(91, 192, 235, 0.6)",
                      "0 0 20px rgba(91, 192, 235, 0.4)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity, ease: smoothEase }}
          >
            {analyzing && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6, ease: smoothEase }}
              />
            )}
            {analyzing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                Analyze Text
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Preview Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.16, ease: smoothEase }}
          whileHover={{ y: -5 }}
          className="rounded-3xl border p-4 sm:p-6 flex flex-col relative overflow-hidden"
          style={{
            backgroundColor: "#395C6B",
            borderColor: "rgba(91, 192, 235, 0.2)",
            height: "500px",
            minHeight: "400px",
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

          <h3
            className="text-base sm:text-lg mb-3 sm:mb-4 relative z-10"
            style={{ color: "#DFD9E2" }}
          >
            Analysis Preview
          </h3>

          {!results ? (
            <div className="flex-1 flex items-center justify-center relative">
              <motion.div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(91, 192, 235, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(91, 192, 235, 0.5) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
                animate={{ backgroundPosition: ["0px 0px", "20px 20px"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              <div className="text-center relative z-10 px-4">
                <motion.div className="relative mx-auto mb-4" style={{ width: "48px", height: "48px" }}>
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: "2px solid rgba(91, 192, 235, 0.3)" }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: smoothEase }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full flex items-center justify-center"
                    style={{ border: "2px solid rgba(91, 192, 235, 0.5)" }}
                  >
                    <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: "#5BC0EB" }} />
                  </motion.div>
                </motion.div>
                <p className="text-sm sm:text-base" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
                  Enter text and click analyze to see results
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: smoothEase }}
                className="p-4 sm:p-6 rounded-2xl mb-3 sm:mb-4 text-center relative overflow-hidden"
                style={{
                  backgroundColor: "rgba(91, 192, 235, 0.15)",
                  border: "1px solid rgba(91, 192, 235, 0.3)",
                }}
              >
                <div className="text-xs sm:text-sm mb-2" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
                  Authenticity Score
                </div>
                <motion.div
                  className="text-3xl sm:text-4xl lg:text-5xl mb-2"
                  style={{ color: "#5BC0EB" }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
                >
                  {results.score}%
                </motion.div>
                <div className="text-xs sm:text-sm" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
                  {results.aiGenerated}% AI-Generated Content Detected
                </div>
              </motion.div>

              <AnimatePresence>
                {analyzing && (
                  <motion.div
                    className="absolute left-0 right-0 h-0.5 z-20"
                    style={{
                      background: "linear-gradient(90deg, transparent, #5BC0EB, transparent)",
                    }}
                    initial={{ top: "25%" }}
                    animate={{ top: ["25%", "75%", "25%"] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </AnimatePresence>

              <div
                className="flex-1 p-3 sm:p-4 rounded-2xl overflow-y-auto relative text-sm sm:text-base"
                style={{
                  backgroundColor: "#2F4F5C",
                  border: "1px solid rgba(91, 192, 235, 0.2)",
                  boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.4)",
                }}
              >
                {text.split("").map((char, i) => {
                  const isAI = isAIGenerated(i);
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.001, duration: 0.1, ease: smoothEase }}
                      className="relative group"
                      style={{
                        color: "#DFD9E2",
                        textDecoration: isAI ? "underline" : "none",
                        textDecorationColor: isAI ? "#5BC0EB" : "transparent",
                        textDecorationThickness: "2px",
                        textUnderlineOffset: "4px",
                      }}
                    >
                      {char}
                      {isAI && i % 50 === 0 && (
                        <span
                          className="absolute -top-8 left-0 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                          style={{ backgroundColor: "#5BC0EB", color: "#210B2C" }}
                        >
                          AI-Generated
                        </span>
                      )}
                    </motion.span>
                  );
                })}

                {results && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(91, 192, 235, 0.15), transparent)",
                    }}
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: smoothEase }}
                  />
                )}
              </div>

              <div className="mt-3 sm:mt-4 space-y-2">
                {results.detectedSections.map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, ease: smoothEase }}
                    className="flex items-center justify-between p-2 sm:p-3 rounded-xl"
                    style={{
                      backgroundColor: "rgba(91, 192, 235, 0.1)",
                      border: "1px solid rgba(91, 192, 235, 0.2)",
                    }}
                  >
                    <span className="text-xs sm:text-sm" style={{ color: "#DFD9E2" }}>
                      Section {i + 1}
                    </span>
                    <span className="text-xs sm:text-sm" style={{ color: "#5BC0EB" }}>
                      {section.confidence}% confidence
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {results && results.misinformation && (
        <MisinformationDetectionPanel
          originalText={text}
          detectedIssues={results.misinformation.detectedIssues}
          overallConfidence={results.misinformation.overallConfidence}
        />
      )}
    </div>
  );
}