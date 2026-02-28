// src/app/pages/Reports.tsx
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Calendar, FileText, Image, Link2 } from "lucide-react";
import { api } from "../../lib/axios";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const smoothEase = "cubic-bezier(0.16, 1, 0.3, 1)";
const periods = ["7d", "30d", "90d"] as const;

type Period = (typeof periods)[number];

type ReportsResponse = {
  kpis: {
    totalScans: number;
    avgScore: number;
    riskDetectedPct: number;
    processingTime: string; // "1.2s" or "N/A"
  };
  scansByType: { name: string; value: number; color: string }[];
  trendsData: { date: string; scans: number }[];
  detectionData: { category: string; count: number }[];
  recentScans: { type: "Text" | "Image" | "Link"; url: string; result: string; score: number; date: string }[];
};

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("30d");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ReportsResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const kpis = useMemo(() => {
    return [
      {
        label: "Total Scans",
        value: data ? data.kpis.totalScans.toLocaleString() : "—",
        change: "",
      },
      {
        label: "Avg. Score",
        value: data ? String(data.kpis.avgScore) : "—",
        change: "",
      },
      {
        label: "Risk Detected",
        value: data ? `${data.kpis.riskDetectedPct}%` : "—",
        change: "",
        isAlert: true,
      },
      {
        label: "Processing Time",
        value: data ? data.kpis.processingTime : "—",
        change: "",
      },
    ];
  }, [data]);

  const fetchReports = async (period: Period) => {
    setLoading(true);
    setErr(null);
    try {
      const res = await api.get("/reports/summary", { params: { period } });
      setData(res.data);
    } catch (e: any) {
      setErr(e?.response?.data?.message || e?.message || "Failed to load reports");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(selectedPeriod);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPeriod]);

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: smoothEase }}
        className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8"
        style={{ color: "#DFD9E2", letterSpacing: "-0.02em" }}
      >
        Analytics & Reports
      </motion.h1>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {kpis.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor: "#395C6B",
              borderColor: "rgba(223, 217, 226, 0.1)",
              opacity: loading ? 0.75 : 1,
            }}
          >
            <div className="text-sm mb-2" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
              {kpi.label}
            </div>
            <div className="text-3xl mb-2" style={{ color: "#DFD9E2" }}>
              {kpi.value}
            </div>
            {kpi.change ? (
              <div
                className="text-sm"
                style={{
                  color: kpi.isAlert ? "#DD6E42" : kpi.change.startsWith("+") ? "#5BC0EB" : "#DFD9E2",
                }}
              >
                {kpi.change}
              </div>
            ) : (
              <div className="text-sm" style={{ color: "rgba(223, 217, 226, 0.35)" }}>
                {loading ? "Loading…" : " "}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-3 mb-8">
        <Calendar className="w-5 h-5" style={{ color: "rgba(223, 217, 226, 0.7)" }} />
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className="px-4 py-2 rounded-full transition-all"
            style={{
              backgroundColor: selectedPeriod === period ? "#5BC0EB" : "transparent",
              color: selectedPeriod === period ? "#210B2C" : "rgba(223, 217, 226, 0.7)",
              border: `1px solid ${
                selectedPeriod === period ? "#5BC0EB" : "rgba(223, 217, 226, 0.1)"
              }`,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {period}
          </button>
        ))}
        {err && (
          <span className="ml-2 text-sm" style={{ color: "#DD6E42" }}>
            {err}
          </span>
        )}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 sm:p-6 rounded-3xl border"
          style={{
            backgroundColor: "#395C6B",
            borderColor: "rgba(223, 217, 226, 0.1)",
            opacity: loading ? 0.75 : 1,
          }}
        >
          <h3 className="text-base sm:text-lg mb-4" style={{ color: "#DFD9E2" }}>
            Scans by Type
          </h3>

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data?.scansByType || []}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {(data?.scansByType || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>

              {/* Premium Tooltip */}
              <Tooltip
                contentStyle={{
                  background: "rgba(13, 17, 23, 0.95)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(91, 192, 235, 0.25)",
                  borderRadius: "14px",
                  boxShadow: "0 12px 32px rgba(91, 192, 235, 0.15)",
                  color: "#FFFFFF",
                  padding: "10px 14px",
                }}
                itemStyle={{ color: "#FFFFFF", fontSize: "14px" }}
                labelStyle={{ color: "rgba(255,255,255,0.7)", fontWeight: 500, marginBottom: "4px" }}
                cursor={{ fill: "rgba(91, 192, 235, 0.06)" }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            {(data?.scansByType || []).map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
                    {item.name}
                  </span>
                </div>
                <span className="text-sm" style={{ color: "#DFD9E2" }}>
                  {item.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="p-4 sm:p-6 rounded-3xl border"
          style={{
            backgroundColor: "#395C6B",
            borderColor: "rgba(223, 217, 226, 0.1)",
            opacity: loading ? 0.75 : 1,
          }}
        >
          <h3 className="text-base sm:text-lg mb-4" style={{ color: "#DFD9E2" }}>
            Trend Analysis
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data?.trendsData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(223, 217, 226, 0.1)" />
              <XAxis
                dataKey="date"
                stroke="rgba(223, 217, 226, 0.5)"
                tick={{ fill: "rgba(223, 217, 226, 0.7)" }}
              />
              <YAxis
                stroke="rgba(223, 217, 226, 0.5)"
                tick={{ fill: "rgba(223, 217, 226, 0.7)" }}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(13, 17, 23, 0.95)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(91, 192, 235, 0.25)",
                  borderRadius: "14px",
                  boxShadow: "0 12px 32px rgba(91, 192, 235, 0.15)",
                  color: "#FFFFFF",
                  padding: "10px 14px",
                }}
                itemStyle={{ color: "#FFFFFF", fontSize: "14px" }}
                labelStyle={{ color: "rgba(255,255,255,0.7)", fontWeight: 500, marginBottom: "4px" }}
                cursor={{ fill: "rgba(91, 192, 235, 0.06)" }}
              />
              <Line type="monotone" dataKey="scans" stroke="#5BC0EB" strokeWidth={3} dot={{ fill: "#5BC0EB", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36 }}
          className="p-4 sm:p-6 rounded-3xl border"
          style={{
            backgroundColor: "#395C6B",
            borderColor: "rgba(223, 217, 226, 0.1)",
            opacity: loading ? 0.75 : 1,
          }}
        >
          <h3 className="text-base sm:text-lg mb-4" style={{ color: "#DFD9E2" }}>
            Detection Results
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data?.detectionData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(223, 217, 226, 0.1)" />
              <XAxis
                dataKey="category"
                stroke="rgba(223, 217, 226, 0.5)"
                tick={{ fill: "rgba(223, 217, 226, 0.7)", fontSize: 11 }}
              />
              <YAxis
                stroke="rgba(223, 217, 226, 0.5)"
                tick={{ fill: "rgba(223, 217, 226, 0.7)" }}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(13, 17, 23, 0.95)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(91, 192, 235, 0.25)",
                  borderRadius: "14px",
                  boxShadow: "0 12px 32px rgba(91, 192, 235, 0.15)",
                  color: "#FFFFFF",
                  padding: "10px 14px",
                }}
                itemStyle={{ color: "#FFFFFF", fontSize: "14px" }}
                labelStyle={{ color: "rgba(255,255,255,0.7)", fontWeight: 500, marginBottom: "4px" }}
                cursor={{ fill: "rgba(91, 192, 235, 0.06)" }}
              />
              <Bar dataKey="count" fill="#5BC0EB" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Activity Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="rounded-3xl border overflow-hidden"
        style={{
          backgroundColor: "#395C6B",
          borderColor: "rgba(223, 217, 226, 0.1)",
          opacity: loading ? 0.8 : 1,
        }}
      >
        <div className="p-6 border-b" style={{ borderColor: "rgba(223, 217, 226, 0.1)" }}>
          <h3 className="text-lg" style={{ color: "#DFD9E2" }}>
            Recent Scans
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "rgba(33, 11, 44, 0.3)" }}>
                {["Type", "Content", "Result", "Score", "Date"].map((h) => (
                  <th key={h} className="text-left px-6 py-4 text-sm" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {(data?.recentScans || []).map((scan, i) => {
                const typeIcons = { Text: FileText, Image: Image, Link: Link2 } as const;
                const Icon = typeIcons[scan.type];

                return (
                  <tr
                    key={i}
                    className="border-t transition-colors"
                    style={{ borderColor: "rgba(223, 217, 226, 0.1)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(91, 192, 235, 0.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" style={{ color: "#5BC0EB" }} />
                        <span style={{ color: "#DFD9E2" }}>{scan.type}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
                        {scan.url}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: scan.score > 70 ? "rgba(91, 192, 235, 0.15)" : "rgba(221, 110, 66, 0.15)",
                          color: scan.score > 70 ? "#5BC0EB" : "#DD6E42",
                        }}
                      >
                        {scan.result}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span style={{ color: "#DFD9E2" }}>{scan.score}%</span>
                    </td>

                    <td className="px-6 py-4">
                      <span style={{ color: "rgba(223, 217, 226, 0.7)" }}>{scan.date}</span>
                    </td>
                  </tr>
                );
              })}

              {!loading && (!data?.recentScans || data.recentScans.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
                    No scans found for this period.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}