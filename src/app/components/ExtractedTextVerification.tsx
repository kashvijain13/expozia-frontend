import { useState } from "react";
import { motion } from "motion/react";
import { FileText, Eye, EyeOff } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

interface TextCorrection {
  original: string;
  corrected: string;
  position: { start: number; end: number };
  confidence: number;
}

interface ExtractedTextVerificationProps {
  extractedText: string;
  corrections: TextCorrection[];
}

export default function ExtractedTextVerification({
  extractedText,
  corrections,
}: ExtractedTextVerificationProps) {
  const [showDifferences, setShowDifferences] = useState(true);

  const isIncorrect = (index: number) => {
    return corrections.some(
      (correction) => index >= correction.position.start && index <= correction.position.end
    );
  };

  const getCorrectionAtIndex = (index: number) => {
    return corrections.find(
      (correction) => index >= correction.position.start && index <= correction.position.end
    );
  };

  // Generate corrected text
  const getCorrectedText = () => {
    let result = extractedText;
    // Sort corrections by position in reverse to avoid index shifting
    const sortedCorrections = [...corrections].sort(
      (a, b) => b.position.start - a.position.start
    );

    sortedCorrections.forEach((correction) => {
      result =
        result.slice(0, correction.position.start) +
        correction.corrected +
        result.slice(correction.position.end + 1);
    });

    return result;
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl mb-2" style={{ color: "#DFD9E2", letterSpacing: "-0.01em" }}>
              Extracted Text Verification
            </h3>
            <p className="text-sm" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
              AI document review with intelligent corrections
            </p>
          </div>

          <motion.button
            onClick={() => setShowDifferences(!showDifferences)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full flex items-center gap-2"
            style={{
              backgroundColor: showDifferences ? "#5BC0EB" : "transparent",
              color: showDifferences ? "#210B2C" : "#DFD9E2",
              border: showDifferences ? "none" : "1px solid rgba(91, 192, 235, 0.3)",
            }}
          >
            {showDifferences ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {showDifferences ? "Hide" : "Show"} Differences
          </motion.button>
        </div>

        {/* Stats Bar */}
        <div
          className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-2xl"
          style={{
            backgroundColor: "#2F4F5C",
            border: "1px solid rgba(91, 192, 235, 0.15)",
          }}
        >
          <div>
            <div className="text-sm mb-1" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
              Total Corrections
            </div>
            <div className="text-2xl" style={{ color: "#5BC0EB" }}>
              {corrections.length}
            </div>
          </div>
          <div>
            <div className="text-sm mb-1" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
              Accuracy Rate
            </div>
            <div className="text-2xl" style={{ color: "#5BC0EB" }}>
              {Math.round(
                (corrections.reduce((acc, c) => acc + c.confidence, 0) / corrections.length) || 100
              )}%
            </div>
          </div>
          <div>
            <div className="text-sm mb-1" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
              Status
            </div>
            <div className="text-2xl" style={{ color: corrections.length > 0 ? "#DD6E42" : "#5BC0EB" }}>
              {corrections.length > 0 ? "Review" : "Clean"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Extracted Raw Text */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5" style={{ color: "rgba(223, 217, 226, 0.7)" }} />
              <h4 className="text-lg" style={{ color: "#DFD9E2" }}>
                Extracted Raw Text
              </h4>
            </div>

            <div
              className="p-4 rounded-2xl relative"
              style={{
                backgroundColor: "#2F4F5C",
                border: "1px solid rgba(91, 192, 235, 0.15)",
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              {extractedText.split("").map((char, i) => {
                const correction = getCorrectionAtIndex(i);
                const isHighlighted = showDifferences && isIncorrect(i);
                return (
                  <span
                    key={i}
                    className="relative group"
                    style={{
                      color: "#DFD9E2",
                      textDecoration: isHighlighted ? "line-through" : "none",
                      textDecorationColor: isHighlighted ? "#DD6E42" : "transparent",
                      textDecorationThickness: "2px",
                      backgroundColor: isHighlighted ? "rgba(221, 110, 66, 0.1)" : "transparent",
                    }}
                  >
                    {char}
                    {correction && i === correction.position.start && showDifferences && (
                      <span
                        className="absolute -top-10 left-0 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"
                        style={{
                          backgroundColor: "#DD6E42",
                          color: "#210B2C",
                        }}
                      >
                        Incorrect: {correction.confidence}%
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Verified Version */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5" style={{ color: "#5BC0EB" }} />
              <h4 className="text-lg" style={{ color: "#DFD9E2" }}>
                Verified Version
              </h4>
            </div>

            <div
              className="p-4 rounded-2xl relative"
              style={{
                backgroundColor: "#2F4F5C",
                border: "1px solid rgba(91, 192, 235, 0.15)",
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              {!showDifferences ? (
                <span style={{ color: "#DFD9E2" }}>{getCorrectedText()}</span>
              ) : (
                getCorrectedText().split("").map((char, i) => {
                  // Check if this character is part of a corrected phrase
                  let isCorrected = false;
                  for (const correction of corrections) {
                    const originalText = extractedText.slice(
                      correction.position.start,
                      correction.position.end + 1
                    );
                    const correctedText = correction.corrected;
                    const correctedStart = getCorrectedText().indexOf(correctedText);
                    if (
                      correctedStart !== -1 &&
                      i >= correctedStart &&
                      i < correctedStart + correctedText.length
                    ) {
                      isCorrected = true;
                      break;
                    }
                  }

                  return (
                    <span
                      key={i}
                      style={{
                        color: "#DFD9E2",
                        textDecoration: isCorrected ? "underline" : "none",
                        textDecorationColor: isCorrected ? "#5BC0EB" : "transparent",
                        textDecorationThickness: "2px",
                        textUnderlineOffset: "3px",
                        backgroundColor: isCorrected ? "rgba(91, 192, 235, 0.1)" : "transparent",
                      }}
                    >
                      {char}
                    </span>
                  );
                })
              )}

              {/* Shimmer sweep effect on corrected sections */}
              {showDifferences && (
                <motion.div
                  className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(91, 192, 235, 0.2), transparent)",
                  }}
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Corrections List */}
        {corrections.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg mb-4" style={{ color: "#DFD9E2" }}>
              Detailed Corrections
            </h4>
            <div className="space-y-3">
              {corrections.map((correction, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.1, ease: smoothEase }}
                  className="p-4 rounded-2xl grid grid-cols-2 gap-4"
                  style={{
                    backgroundColor: "#2F4F5C",
                    border: "1px solid rgba(91, 192, 235, 0.15)",
                  }}
                >
                  <div>
                    <div className="text-xs mb-1" style={{ color: "rgba(223, 217, 226, 0.6)" }}>
                      Incorrect:
                    </div>
                    <div
                      className="text-sm"
                      style={{
                        color: "#DD6E42",
                        textDecoration: "line-through",
                      }}
                    >
                      {correction.original}
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-xs mb-1 flex items-center justify-between"
                      style={{ color: "rgba(223, 217, 226, 0.6)" }}
                    >
                      <span>Corrected:</span>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{
                          backgroundColor: "rgba(91, 192, 235, 0.15)",
                          color: "#5BC0EB",
                        }}
                      >
                        {correction.confidence}%
                      </span>
                    </div>
                    <div
                      className="text-sm"
                      style={{
                        color: "#5BC0EB",
                      }}
                    >
                      {correction.corrected}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
