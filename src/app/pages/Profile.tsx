// src/app/pages/Profile.tsx
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { User, Mail, Calendar, Zap, TrendingUp, Loader2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { api } from "../../lib/axios";

const smoothEase = "cubic-bezier(0.16, 1, 0.3, 1)";

type UsagePoint = { month: string; scans: number };

type MeResponse = {
  user: {
    name?: string;
    email?: string;
    plan?: string;
    memberSince?: string; // ISO or readable
    role?: string;
  };
  usage: {
    totalScans: number;
    scansThisMonth: number;
    avgDaily: number;
    changeTotalPct?: number;
    changeMonthPct?: number;
    changeDailyPct?: number;
    chart: UsagePoint[];
  };
};

const monthShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmtNumber(n: number) {
  return new Intl.NumberFormat().format(n || 0);
}
function fmtPct(n?: number) {
  if (typeof n !== "number" || Number.isNaN(n)) return "+0%";
  const sign = n >= 0 ? "+" : "";
  return `${sign}${Math.round(n)}%`;
}
function fmtMemberSince(v?: string) {
  if (!v) return "Unknown";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v; // already human text
  return d.toLocaleString(undefined, { month: "long", year: "numeric" });
}

function normalizeChart(chart?: UsagePoint[]) {
  if (Array.isArray(chart) && chart.length) return chart;

  // fallback chart (last 6 months)
  const now = new Date();
  const points: UsagePoint[] = [];
  for (let i = 5; i >= 0; i--) {
    const dt = new Date(now.getFullYear(), now.getMonth() - i, 1);
    points.push({ month: monthShort[dt.getMonth()], scans: 0 });
  }
  return points;
}

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [me, setMe] = useState<MeResponse | null>(null);

  const usageData = useMemo(() => normalizeChart(me?.usage?.chart), [me?.usage?.chart]);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      setErrMsg(null);
      try {
        // ✅ backend route you should create:
        // GET /user/me  -> returns { user: {...}, usage: {...} }
        const { data } = await api.get<MeResponse>("/user/me");
        console.log(data);
        if (!alive) return;
        setMe(data);
      } catch (e: any) {
        if (!alive) return;
        setErrMsg(
          e?.response?.data?.message ||
            e?.message ||
            "Failed to load profile. Check API /user/me"
        );
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const displayName = me?.user?.name || "Unknown User";
  const displayEmail = me?.user?.email || "unknown@email.com";
  const displayPlan = me?.user?.plan || "Free";
  const displayMemberSince = fmtMemberSince(me?.user?.memberSince);
  const displayRole = me?.user?.role || "Member";

  const totalScans = me?.usage?.totalScans ?? 0;
  const scansThisMonth = me?.usage?.scansThisMonth ?? 0;
  const avgDaily = me?.usage?.avgDaily ?? 0;

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: smoothEase }}
        className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8"
        style={{ color: "#DFD9E2", letterSpacing: "-0.02em" }}
      >
        My Profile
      </motion.h1>

      {/* Loading / Error */}
      {loading && (
        <div
          className="rounded-3xl border p-6 mb-6 flex items-center gap-3"
          style={{
            backgroundColor: "#395C6B",
            borderColor: "rgba(223, 217, 226, 0.1)",
          }}
        >
          <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#5BC0EB" }} />
          <div style={{ color: "rgba(223, 217, 226, 0.8)" }}>Loading profile…</div>
        </div>
      )}

      {errMsg && !loading && (
        <div
          className="rounded-3xl border p-6 mb-6"
          style={{
            backgroundColor: "#395C6B",
            borderColor: "rgba(223, 217, 226, 0.1)",
          }}
        >
          <div className="mb-3" style={{ color: "#DFD9E2" }}>
            Couldn’t load profile
          </div>
          <div style={{ color: "rgba(223, 217, 226, 0.75)" }}>{errMsg}</div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1 rounded-3xl border p-8"
          style={{
            backgroundColor: "#395C6B",
            borderColor: "rgba(223, 217, 226, 0.1)",
          }}
        >
          <div className="text-center mb-8">
            <div
              className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: "#5BC0EB" }}
            >
              <User className="w-12 h-12" style={{ color: "#210B2C" }} />
            </div>
            <h2 className="text-2xl mb-2" style={{ color: "#DFD9E2" }}>
              {displayName}
            </h2>
            <p style={{ color: "rgba(223, 217, 226, 0.7)" }}>
              {displayRole} • {displayPlan}
            </p>
          </div>

          <div className="space-y-4">
            <div
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ backgroundColor: "rgba(33, 11, 44, 0.4)" }}
            >
              <Mail className="w-5 h-5" style={{ color: "#5BC0EB" }} />
              <div>
                <div className="text-sm" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
                  Email
                </div>
                <div style={{ color: "#DFD9E2" }}>{displayEmail}</div>
              </div>
            </div>

            <div
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ backgroundColor: "rgba(33, 11, 44, 0.4)" }}
            >
              <Calendar className="w-5 h-5" style={{ color: "#5BC0EB" }} />
              <div>
                <div className="text-sm" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
                  Member Since
                </div>
                <div style={{ color: "#DFD9E2" }}>{displayMemberSince}</div>
              </div>
            </div>

            <div
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ backgroundColor: "rgba(33, 11, 44, 0.4)" }}
            >
              <Zap className="w-5 h-5" style={{ color: "#5BC0EB" }} />
              <div>
                <div className="text-sm" style={{ color: "rgba(223, 217, 226, 0.7)" }}>
                  Plan
                </div>
                <div style={{ color: "#DFD9E2" }}>{displayPlan}</div>
              </div>
            </div>
          </div>

      
        </motion.div>

        {/* Usage Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-2 rounded-3xl border p-8"
          style={{
            backgroundColor: "#395C6B",
            borderColor: "rgba(223, 217, 226, 0.1)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6" style={{ color: "#5BC0EB" }} />
            <h3 className="text-xl" style={{ color: "#DFD9E2" }}>
              Usage Statistics
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              {
                label: "Total Scans",
                value: fmtNumber(totalScans),
                change: fmtPct(me?.usage?.changeTotalPct),
              },
              {
                label: "This Month",
                value: fmtNumber(scansThisMonth),
                change: fmtPct(me?.usage?.changeMonthPct),
              },
              {
                label: "Avg. Daily",
                value: fmtNumber(avgDaily),
                change: fmtPct(me?.usage?.changeDailyPct),
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 sm:p-6 rounded-2xl"
                style={{ backgroundColor: "rgba(33, 11, 44, 0.4)" }}
              >
                <div
                  className="text-xs sm:text-sm mb-2"
                  style={{ color: "rgba(223, 217, 226, 0.7)" }}
                >
                  {stat.label}
                </div>
                <div className="text-2xl sm:text-3xl mb-2" style={{ color: "#DFD9E2" }}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm" style={{ color: "#5BC0EB" }}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(223, 217, 226, 0.1)" />
              <XAxis
                dataKey="month"
                stroke="rgba(223, 217, 226, 0.5)"
                tick={{ fill: "rgba(223, 217, 226, 0.7)" }}
              />
              <YAxis
                stroke="rgba(223, 217, 226, 0.5)"
                tick={{ fill: "rgba(223, 217, 226, 0.7)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#210B2C",
                  border: "1px solid rgba(223, 217, 226, 0.1)",
                  borderRadius: "12px",
                  color: "#DFD9E2",
                }}
              />
              <Line type="monotone" dataKey="scans" stroke="#5BC0EB" strokeWidth={3} dot />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>


    </div>
  );
}