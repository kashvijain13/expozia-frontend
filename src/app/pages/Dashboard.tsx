// src/app/pages/Dashboard.tsx
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { FileText, AlertTriangle, Shield, TrendingUp } from "lucide-react";
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
import { api } from "../../lib/axios";

const smoothEase = "cubic-bezier(0.16, 1, 0.3, 1)";

type SummaryResponse = {
  stats: {
    totalScans: number;
    aiContentPct: number;
    linkRiskPct: number;
    alerts: number;
  };
  charts: {
    weeklyData: { day: string; scans: number }[];
    trustTrendData: { month: string; score: number }[];
    authenticityMixData: { name: "Authentic" | "AI-Generated"; value: number }[];
  };
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const { data } = await api.get("/dashboard/summary");
        if (!mounted) return;

        setSummary(data);
      } catch (e: any) {
        if (!mounted) return;
        setErr(e?.response?.data?.message || e?.message || "Failed to load dashboard.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const s = summary?.stats;
    return [
      {
        label: "Total Scans",
        value: s ? String(s.totalScans.toLocaleString()) : "—",
        icon: FileText,
        trend: "",
      },
      {
        label: "AI Content %",
        value: s ? `${s.aiContentPct.toFixed(1)}%` : "—",
        icon: Shield,
        trend: "",
      },
      {
        label: "Link Risk %",
        value: s ? `${s.linkRiskPct.toFixed(1)}%` : "—",
        icon: AlertTriangle,
        trend: "",
        isAlert: true,
      },
      {
        label: "Alerts",
        value: s ? String(s.alerts.toLocaleString()) : "—",
        icon: TrendingUp,
        trend: "",
      },
    ];
  }, [summary]);

  const weeklyData = summary?.charts?.weeklyData || [];
  const trustTrendData = summary?.charts?.trustTrendData || [];
  const authenticityMixDataRaw = summary?.charts?.authenticityMixData || [];

  // weekly colors (same logic, but dynamic)
  const weeklyDataWithColors = useMemo(() => {
    if (!weeklyData.length) return [];
    const maxScans = Math.max(...weeklyData.map((d) => d.scans), 1);

    return weeklyData.map((item) => {
      const percentage = item.scans / maxScans;
      let fill = "#F87171";
      if (percentage > 0.7) fill = "#10B981";
      else if (percentage > 0.4) fill = "#FBBF24";
      return { ...item, fill };
    });
  }, [weeklyData]);

  const authenticityMixData = useMemo(() => {
    const map: any = {};
    for (const x of authenticityMixDataRaw) map[x.name] = x.value;

    return [
      { name: "Authentic", value: map["Authentic"] ?? 0, color: "#10B981" },
      { name: "AI-Generated", value: map["AI-Generated"] ?? 0, color: "#F87171" },
    ];
  }, [authenticityMixDataRaw]);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl mb-2" style={{ color: "#DFD9E2", letterSpacing: "-0.02em" }}>
        Dashboard
      </h1>
      <p className="text-base sm:text-lg mb-4" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
        Monitor content authenticity at a glance
      </p>

      {err && (
        <div
          className="mb-6 p-4 rounded-2xl border"
          style={{
            backgroundColor: "rgba(248,113,113,0.08)",
            borderColor: "rgba(248,113,113,0.25)",
            color: "#fff",
          }}
        >
          {err}
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: smoothEase }}
            whileHover={{ y: -6 }}
            className="p-6 rounded-3xl border relative overflow-hidden"
            style={{
              backgroundColor: "#151B23",
              borderColor: "rgba(0, 217, 255, 0.18)",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
              opacity: loading ? 0.75 : 1,
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.3), transparent)",
              }}
            />
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  backgroundColor: stat.isAlert
                    ? "rgba(248, 113, 113, 0.15)"
                    : "rgba(0, 217, 255, 0.15)",
                  border: `1px solid ${stat.isAlert ? "rgba(248, 113, 113, 0.3)" : "rgba(0, 217, 255, 0.3)"
                    }`,
                }}
              >
                <stat.icon
                  className="w-6 h-6"
                  style={{ color: stat.isAlert ? "#F87171" : "#00D9FF" }}
                />
              </div>

              {/* Keep trend pill if you want later; right now empty */}
              {stat.trend ? (
                <span
                  className="text-sm px-2 py-1 rounded-full"
                  style={{
                    color: stat.trend.startsWith("+") ? "#00D9FF" : "#FFFFFF",
                    backgroundColor: "rgba(0, 217, 255, 0.1)",
                    border: "1px solid rgba(0, 217, 255, 0.2)",
                  }}
                >
                  {stat.trend}
                </span>
              ) : (
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {loading ? "Loading…" : "Live"}
                </span>
              )}
            </div>

            <div className="text-3xl mb-1 relative z-10" style={{ color: "#FFFFFF" }}>
              {stat.value}
            </div>
            <div className="text-sm relative z-10" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {/* Donut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32, ease: smoothEase }}
          whileHover={{ y: -6 }}
          className="p-6 rounded-3xl border relative overflow-hidden"
          style={{
            backgroundColor: "#151B23",
            borderColor: "rgba(0, 217, 255, 0.18)",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
            opacity: loading ? 0.75 : 1,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.3), transparent)",
            }}
          />
          <h3 className="text-base sm:text-lg mb-4 relative z-10" style={{ color: "#FFFFFF" }}>
            Authenticity Mix
          </h3>

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={authenticityMixData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {authenticityMixData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0D1117",
                  border: "1px solid rgba(0, 217, 255, 0.18)",
                  borderRadius: "12px",
                  color: "white", // This sometimes fails for nested spans
                }}
                itemStyle={{ color: "#fff" }}   /* Colors the data rows (name: value) */
                labelStyle={{ color: "#fff" }}  /* Colors the title/index at the top */
                cursor={{ fill: "transparent" }} /* Optional: hides the grey hover box */
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            {authenticityMixData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    {item.name}
                  </span>
                </div>
                <span className="text-sm" style={{ color: "#FFFFFF" }}>
                  {Number(item.value || 0).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: smoothEase }}
          whileHover={{ y: -6 }}
          className="p-6 rounded-3xl border relative overflow-hidden"
          style={{
            backgroundColor: "#151B23",
            borderColor: "rgba(0, 217, 255, 0.18)",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
            opacity: loading ? 0.75 : 1,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.3), transparent)",
            }}
          />
          <h3 className="text-lg mb-4 relative z-10" style={{ color: "#FFFFFF" }}>
            Weekly Scans
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyDataWithColors}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
              <XAxis
                dataKey="day"
                stroke="rgba(0, 217, 255, 0.5)"
                tick={{ fill: "rgba(255, 255, 255, 0.7)" }}
              />
              <YAxis
                stroke="rgba(0, 217, 255, 0.5)"
                tick={{ fill: "rgba(255, 255, 255, 0.7)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0D1117",
                  border: "1px solid rgba(0, 217, 255, 0.18)",
                  borderRadius: "12px",
                  color: "#FFFFFF",
                }}
                itemStyle={{ color: "#FFFFFF" }}  // Fixes the "Name: Value" text
                labelStyle={{ color: "#FFFFFF" }} // Fixes the Title/Date text
              />
              <Bar dataKey="scans" radius={[8, 8, 0, 0]}>
                {weeklyDataWithColors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={(entry as any).fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.48, ease: smoothEase }}
          whileHover={{ y: -6 }}
          className="p-6 rounded-3xl border relative overflow-hidden"
          style={{
            backgroundColor: "#151B23",
            borderColor: "rgba(0, 217, 255, 0.18)",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
            opacity: loading ? 0.75 : 1,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.3), transparent)",
            }}
          />
          <h3 className="text-lg mb-4 relative z-10" style={{ color: "#FFFFFF" }}>
            Trust Trend
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trustTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
              <XAxis
                dataKey="month"
                stroke="rgba(0, 217, 255, 0.5)"
                tick={{ fill: "rgba(255, 255, 255, 0.7)" }}
              />
              <YAxis
                stroke="rgba(0, 217, 255, 0.5)"
                tick={{ fill: "rgba(255, 255, 255, 0.7)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0D1117",
                  border: "1px solid rgba(0, 217, 255, 0.18)",
                  borderRadius: "12px",
                  color: "#FFFFFF",
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: "#10B981", r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}