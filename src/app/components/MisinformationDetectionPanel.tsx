import { motion } from "motion/react";
import { AlertTriangle, CheckCircle } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

interface DetectedIssue {
  text: string;
  position: { start: number; end: number };
  confidence: number;
  suggestion: string;
}

interface MisinformationDetectionPanelProps {
  originalText: string;
  detectedIssues: DetectedIssue[];
  overallConfidence: number;
}

export default function MisinformationDetectionPanel({
  originalText,
  detectedIssues,
  overallConfidence,
}: MisinformationDetectionPanelProps) {
  const isIssue = (index: number) => {
    return detectedIssues.some(
      (issue) => index >= issue.position.start && index <= issue.position.end
    );
  };

  const getIssueAtIndex = (index: number) => {
    return detectedIssues.find(
      (issue) => index >= issue.position.start && index <= issue.position.end
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: smoothEase }}
      className="rounded-3xl border p-8 relative overflow-hidden"
      style={{
        backgroundColor: "#395C6B",
        borderColor: "rgba(91, 192, 235, 0.2)",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Inner highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(91, 192, 235, 0.4), transparent)",
        }}
      />

      <div className="relative z-10">
        <h3 className="text-2xl mb-2" style={{ color: "#DFD9E2", letterSpacing: "-0.01em" }}>
          Content Integrity Analysis
        </h3>
        <p className="text-sm mb-6" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
          AI-powered fact verification and accuracy assessment
        </p>

        {/* Confidence Meter */}
        <div
          className="mb-8 p-4 rounded-2xl"
          style={{
            backgroundColor: "#2F4F5C",
            border: "1px solid rgba(91, 192, 235, 0.15)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
              Overall Reliability
            </span>
            <span className="text-lg font-semibold" style={{ color: "#5BC0EB" }}>
              {overallConfidence}%
            </span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(91, 192, 235, 0.1)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundColor: overallConfidence > 70 ? "#5BC0EB" : "#DD6E42",
                width: `${overallConfidence}%`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${overallConfidence}%` }}
              transition={{ duration: 1, ease: smoothEase }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Detected Issues */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5" style={{ color: "#DD6E42" }} />
              <h4 className="text-lg" style={{ color: "#DFD9E2" }}>
                Detected Issues
              </h4>
            </div>

            <div
              className="p-4 rounded-2xl mb-4 relative"
              style={{
                backgroundColor: "#2F4F5C",
                border: "1px solid rgba(91, 192, 235, 0.15)",
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {originalText.split("").map((char, i) => {
                const issue = getIssueAtIndex(i);
                const isHighlighted = isIssue(i);
                return (
                  <span
                    key={i}
                    className="relative group"
                    style={{
                      color: "#DFD9E2",
                      textDecoration: isHighlighted ? "underline" : "none",
                      textDecorationColor: isHighlighted ? "#DD6E42" : "transparent",
                      textDecorationThickness: "2px",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    {char}
                    {issue && i === issue.position.start && (
                      <span
                        className="absolute -top-8 left-0 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"
                        style={{
                          backgroundColor: "#DD6E42",
                          color: "#210B2C",
                        }}
                      >
                        Potentially Incorrect
                      </span>
                    )}
                  </span>
                );
              })}

              {/* Shimmer sweep effect */}
              <motion.div
                className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(221, 110, 66, 0.2), transparent)",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </div>

            {detectedIssues.length === 0 && (
              <div className="text-center py-8" style={{ color: "rgba(223, 217, 226, 0.5)" }}>
                No issues detected
              </div>
            )}
          </div>

          {/* Suggested Corrections */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5" style={{ color: "#5BC0EB" }} />
              <h4 className="text-lg" style={{ color: "#DFD9E2" }}>
                Suggested Corrections
              </h4>
            </div>

            <div className="space-y-3">
              {detectedIssues.map((issue, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1, ease: smoothEase }}
                  className="p-4 rounded-2xl"
                  style={{
                    backgroundColor: "#2F4F5C",
                    border: "1px solid rgba(91, 192, 235, 0.15)",
                  }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(91, 192, 235, 0.15)",
                        color: "#5BC0EB",
                        border: "1px solid rgba(91, 192, 235, 0.3)",
                      }}
                    >
                      {issue.confidence}% confidence
                    </span>
                  </div>
                  <div className="mb-2">
                    <div
                      className="text-xs mb-1"
                      style={{ color: "rgba(223, 217, 226, 0.6)" }}
                    >
                      Original:
                    </div>
                    <div
                      className="text-sm line-through"
                      style={{ color: "rgba(221, 110, 66, 0.9)" }}
                    >
                      {issue.text}
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-xs mb-1 flex items-center gap-1"
                      style={{ color: "rgba(223, 217, 226, 0.6)" }}
                    >
                      <span>Verified Alternative</span>
                    </div>
                    <div
                      className="text-sm"
                      style={{
                        color: "#5BC0EB",
                        textDecoration: "underline",
                        textDecorationColor: "rgba(91, 192, 235, 0.4)",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      {issue.suggestion}
                    </div>
                  </div>
                </motion.div>
              ))}

              {detectedIssues.length === 0 && (
                <div
                  className="text-center py-8"
                  style={{ color: "rgba(223, 217, 226, 0.5)" }}
                >
                  No corrections needed
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
