import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  FileText,
  Image,
  Link2,
  BarChart3,
  User,
  LogOut,
  Settings,
  Shield,
  Menu,
  X,
} from "lucide-react";
import FloatingAIChat from "./FloatingAIChat";
import AtmosphericBackground from "./AtmosphericBackground";

const navItems = [
  { path: "/app", label: "Dashboard", icon: LayoutDashboard },
  { path: "/app/text-scan", label: "Text Scan", icon: FileText },
  { path: "/app/image-scan", label: "Image Scan", icon: Image },
  { path: "/app/link-check", label: "Link Check", icon: Link2 },
  { path: "/app/reports", label: "Reports", icon: BarChart3 },
  { path: "/app/settings", label: "Settings", icon: Settings },
];

const smoothEase = [0.16, 1, 0.3, 1];

export default function AppLayout() {
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: "#210B2C",
      }}
    >
      {/* Atmospheric Background */}
      <AtmosphericBackground />

      {/* Clean Top Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl"
        style={{
          backgroundColor: "rgba(26, 7, 36, 0.95)",
          borderColor: "rgba(91, 192, 235, 0.2)",
        }}
      >
        <div className="h-16 px-4 sm:px-8 flex items-center justify-between">
          {/* Mobile Menu Toggle - Left Side on Mobile */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center transition-all"
            style={{
              backgroundColor: "rgba(0, 217, 255, 0.15)",
              border: "1px solid rgba(0, 217, 255, 0.3)",
            }}
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" style={{ color: "#00D9FF" }} />
            ) : (
              <Menu className="w-4 h-4" style={{ color: "#00D9FF" }} />
            )}
          </motion.button>

          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <Shield className="w-6 h-6" style={{ color: "#00D9FF" }} />
            </motion.div>
            <span
              className="text-base sm:text-lg font-semibold"
              style={{ color: "#FFFFFF", letterSpacing: "0.08em" }}
            >
              EXPOZIA
            </span>
          </Link>

          {/* User Profile */}
          <div className="relative">
            <motion.button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{
                backgroundColor: "rgba(0, 217, 255, 0.15)",
                border: "1px solid rgba(0, 217, 255, 0.3)",
              }}
            >
              <User className="w-4 h-4" style={{ color: "#00D9FF" }} />
            </motion.button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: smoothEase }}
                  className="absolute right-0 top-full mt-2 rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: "#151B23",
                    border: "1px solid rgba(0, 217, 255, 0.18)",
                    minWidth: "200px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  <Link
                    to="/app/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="px-4 py-3 flex items-center gap-3 transition-colors"
                    style={{ color: "#FFFFFF" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <button
                    className="w-full px-4 py-3 flex items-center gap-3 transition-colors"
                    style={{ color: "#FFFFFF" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <div
                    className="h-px"
                    style={{ backgroundColor: "rgba(0, 217, 255, 0.18)" }}
                  />
                  <Link
                    to="/"
                    className="px-4 py-3 flex items-center gap-3 transition-colors"
                    style={{ color: "#FFFFFF" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: smoothEase }}
              className="fixed left-0 top-16 bottom-0 w-64 z-50 lg:hidden overflow-y-auto"
              style={{
                backgroundColor: "#0C1015",
                borderRight: "1px solid rgba(0, 217, 255, 0.18)",
              }}
            >
              <div className="py-6 px-4 space-y-2">
                {navItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                      style={{
                        color: active ? "#00D9FF" : "rgba(255, 255, 255, 0.7)",
                        backgroundColor: active ? "rgba(0, 217, 255, 0.15)" : "transparent",
                      }}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Ultra Minimal Refined Sidebar - 64px - Hidden on mobile */}
      <aside
        className="hidden lg:block fixed left-0 top-16 bottom-0 z-40"
        style={{
          width: "64px",
          backgroundColor: "#0C1015",
          borderRight: "1px solid rgba(0, 217, 255, 0.18)",
        }}
      >
        {/* Subtle vertical gradient strip */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{
            background: "linear-gradient(180deg, rgba(0, 217, 255, 0.15) 0%, transparent 100%)",
          }}
        />

        <div className="py-6 space-y-4">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex items-center justify-center h-12 transition-all group"
                style={{
                  color: active ? "#00D9FF" : "rgba(255, 255, 255, 0.5)",
                }}
              >
                {/* Active indicator */}
                {active && (
                  <motion.div
                    layoutId="sidebarIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                    style={{
                      backgroundColor: "#00D9FF",
                      boxShadow: "0 0 16px rgba(0, 217, 255, 0.6)",
                    }}
                    transition={{ type: "spring", duration: 0.6, ease: smoothEase }}
                  />
                )}

                {/* Icon container with animations */}
                <motion.div
                  className="relative z-10 w-10 h-10 flex items-center justify-center rounded-xl"
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: smoothEase }}
                  style={{
                    backgroundColor: active ? "rgba(0, 217, 255, 0.15)" : "transparent",
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  
                  {/* Active glow ring */}
                  {active && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        border: "1px solid rgba(0, 217, 255, 0.4)",
                        boxShadow: "0 0 20px rgba(0, 217, 255, 0.3)",
                      }}
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(0, 217, 255, 0.3)",
                          "0 0 28px rgba(0, 217, 255, 0.5)",
                          "0 0 20px rgba(0, 217, 255, 0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  {/* Hover circular glow */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      backgroundColor: "rgba(0, 217, 255, 0.08)",
                    }}
                  />
                </motion.div>

                {/* Tooltip on hover */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute left-full ml-4 px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    backgroundColor: "#151B23",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    border: "1px solid rgba(0, 217, 255, 0.18)",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {item.label}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pl-16 min-h-screen relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="p-4 sm:p-6 lg:p-8"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating AI Chat */}
      <FloatingAIChat />
    </div>
  );
}