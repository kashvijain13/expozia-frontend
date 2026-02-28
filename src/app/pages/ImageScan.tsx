// src/app/pages/ImageScan.tsx
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { Upload, Image as ImageIcon, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import ExtractedTextVerification from "../components/ExtractedTextVerification";
import { api } from "../../lib/axios"; // ✅ YOUR AXIOS INSTANCE

const smoothEase = "cubic-bezier(0.16, 1, 0.3, 1)";

type ImageScanResult = {
  sessionId?: string;
  score: number;
  isDeepfake: boolean;
  metadata: {
    resolution: string;
    format: string;
    created: string;
    camera: string;
  };
  signals: { type: string; status: "Pass" | "Warn" | "Fail"; confidence: number }[];
  extractedText?: {
    raw: string;
    corrections: {
      original: string;
      corrected: string;
      position: { start: number; end: number };
      confidence: number;
    }[];
  };
  assistantSummary?: string;
};

export default function ImageScan() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<ImageScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetAll = () => {
    setImage(null);
    setFile(null);
    setResults(null);
    setError(null);
    setAnalyzing(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const analyzeImage = async (f: File) => {
    try {
      setAnalyzing(true);
      setError(null);
      setResults(null);

      const formData = new FormData();
      formData.append("image", f); // ✅ must match multer field

      const { data } = await api.post("/scan/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Safety normalization
      const safe: ImageScanResult = {
        sessionId: data.sessionId,
        score: Number(data.score ?? 0),
        isDeepfake: !!data.isDeepfake,
        metadata: data.metadata || {
          resolution: "Unknown",
          format: "Unknown",
          created: "Unknown",
          camera: "Unknown",
        },
        signals: Array.isArray(data.signals) ? data.signals : [],
        extractedText: data.extractedText
          ? {
              raw: String(data.extractedText.raw ?? ""),
              corrections: Array.isArray(data.extractedText.corrections)
                ? data.extractedText.corrections
                : [],
            }
          : undefined,
        assistantSummary: data.assistantSummary,
      };

      setResults(safe);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Image scan failed");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);
    setResults(null);
    setError(null);

    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target?.result as string);
      analyzeImage(f); // ✅ auto trigger API
    };
    reader.readAsDataURL(f);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: smoothEase }}
        className="text-3xl mb-8"
        style={{ color: "#DFD9E2" }}
      >
        Image Deepfake Detection
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Upload */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="rounded-3xl border p-6"
          style={{
            backgroundColor: "#395C6B",
            borderColor: "rgba(91, 192, 235, 0.2)",
          }}
        >
          <h3 className="text-lg mb-4" style={{ color: "#DFD9E2" }}>
            Upload Image
          </h3>

          {!image ? (
            <label
              className="flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer"
              style={{ height: "400px", borderColor: "rgba(91,192,235,0.3)" }}
            >
              <Upload className="w-16 h-16 mb-4" style={{ color: "#5BC0EB" }} />
              <p style={{ color: "#DFD9E2" }}>Click to upload image</p>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative">
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-[400px] object-cover rounded-2xl"
              />

              {analyzing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
                  <RefreshCw className="w-10 h-10 animate-spin text-blue-400" />
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 rounded-xl border text-sm bg-red-500/10 border-red-500/30 text-white">
              {error}
            </div>
          )}

          {image && (
            <button
              onClick={resetAll}
              className="w-full mt-4 py-3 rounded-full border"
              style={{
                borderColor: "rgba(91, 192, 235, 0.3)",
                color: "#DFD9E2",
              }}
            >
              Upload Different Image
            </button>
          )}
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="rounded-3xl border p-6"
          style={{
            backgroundColor: "#395C6B",
            borderColor: "rgba(91, 192, 235, 0.2)",
          }}
        >
          <h3 className="text-lg mb-4" style={{ color: "#DFD9E2" }}>
            Analysis Results
          </h3>

          {!results ? (
            <div className="flex items-center justify-center h-[400px] text-white/60">
              Upload an image to see analysis results
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center p-6 rounded-2xl bg-blue-500/10 border border-blue-500/30">
                {results.isDeepfake ? (
                  <AlertTriangle className="w-10 h-10 mx-auto mb-2 text-orange-400" />
                ) : (
                  <CheckCircle className="w-10 h-10 mx-auto mb-2 text-blue-400" />
                )}
                <div className="text-4xl text-white">{results.score}%</div>
                <div className="text-white">
                  {results.isDeepfake ? "Deepfake Detected" : "Authentic"}
                </div>
              </div>

              {/* Signals */}
              {results.signals.map((signal, i) => (
                <div
                  key={i}
                  className="flex justify-between p-3 rounded-xl bg-[#2F4F5C]"
                >
                  <span className="text-white">{signal.type}</span>
                  <span className="text-blue-400">{signal.confidence}%</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Extracted Text */}
      {results?.extractedText && (
        <ExtractedTextVerification
          extractedText={results.extractedText.raw}
          corrections={results.extractedText.corrections}
        />
      )}
    </div>
  );
}