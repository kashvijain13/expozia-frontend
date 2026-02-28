import { useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Bell,
  Shield,
  Key,
  Palette,
  Globe,
  Zap,
  Database,
  Download,
  Trash2,
  Check,
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const settingsSections = [
  {
    id: "profile",
    icon: User,
    title: "Profile Settings",
    description: "Manage your personal information",
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Notifications",
    description: "Configure alert preferences",
  },
  {
    id: "security",
    icon: Shield,
    title: "Security & Privacy",
    description: "Manage security settings",
  },
  {
    id: "api",
    icon: Key,
    title: "API Access",
    description: "Manage API keys and tokens",
  },
  {
    id: "appearance",
    icon: Palette,
    title: "Appearance",
    description: "Customize your interface",
  },
  {
    id: "integrations",
    icon: Globe,
    title: "Integrations",
    description: "Connect external services",
  },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: smoothEase }}
        className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8"
        style={{ color: "#DFD9E2", letterSpacing: "-0.02em" }}
      >
        Settings
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Sidebar Navigation - Hidden on mobile, shown as tabs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3"
        >
          {/* Mobile Tabs */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 mb-4">
            {settingsSections.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className="px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all"
                style={{
                  backgroundColor: activeSection === tab.id ? "#5BC0EB" : "transparent",
                  color: activeSection === tab.id ? "#210B2C" : "rgba(223, 217, 226, 0.7)",
                  border: `1px solid ${
                    activeSection === tab.id ? "#5BC0EB" : "rgba(223, 217, 226, 0.1)"
                  }`,
                }}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Desktop Sidebar */}
          <div
            className="hidden lg:block rounded-2xl border p-3"
            style={{
              backgroundColor: "#395C6B",
              borderColor: "rgba(223, 217, 226, 0.1)",
            }}
          >
            {settingsSections.map((section, i) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className="w-full p-4 flex items-center gap-3 transition-all relative"
                  style={{
                    backgroundColor: isActive ? "rgba(0, 217, 255, 0.08)" : "transparent",
                    borderLeft: isActive ? "3px solid #00D9FF" : "3px solid transparent",
                  }}
                  whileHover={{ backgroundColor: "rgba(0, 217, 255, 0.05)" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05, ease: smoothEase }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: isActive ? "#00D9FF" : "rgba(255, 255, 255, 0.7)" }}
                  />
                  <div className="text-left">
                    <div
                      className="text-sm"
                      style={{ color: isActive ? "#00D9FF" : "#FFFFFF" }}
                    >
                      {section.title}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: smoothEase }}
          className="col-span-9"
        >
          {/* Profile Settings */}
          {activeSection === "profile" && (
            <div className="space-y-6">
              <div
                className="rounded-3xl border p-8"
                style={{
                  backgroundColor: "#151B23",
                  borderColor: "rgba(0, 217, 255, 0.15)",
                }}
              >
                <h2 className="text-2xl mb-6" style={{ color: "#FFFFFF" }}>
                  Profile Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm mb-2" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                      style={{
                        backgroundColor: "#0D1117",
                        color: "#FFFFFF",
                        border: "1px solid rgba(0, 217, 255, 0.15)",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="alex.morgan@example.com"
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                      style={{
                        backgroundColor: "#0D1117",
                        color: "#FFFFFF",
                        border: "1px solid rgba(0, 217, 255, 0.15)",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Company
                    </label>
                    <input
                      type="text"
                      defaultValue="Intelligence Corp"
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                      style={{
                        backgroundColor: "#0D1117",
                        color: "#FFFFFF",
                        border: "1px solid rgba(0, 217, 255, 0.15)",
                      }}
                    />
                  </div>
                  <button
                    className="px-8 py-3 rounded-xl transition-all"
                    style={{
                      backgroundColor: "#00D9FF",
                      color: "#0A0E14",
                      boxShadow: "0 0 24px rgba(0, 217, 255, 0.3)",
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === "notifications" && (
            <div className="space-y-6">
              <div
                className="rounded-3xl border p-8"
                style={{
                  backgroundColor: "#151B23",
                  borderColor: "rgba(0, 217, 255, 0.15)",
                }}
              >
                <h2 className="text-2xl mb-6" style={{ color: "#FFFFFF" }}>
                  Notification Preferences
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Email Notifications",
                      description: "Receive scan results and alerts via email",
                      enabled: emailNotifications,
                      setter: setEmailNotifications,
                    },
                    {
                      title: "Push Notifications",
                      description: "Get real-time alerts in your browser",
                      enabled: pushNotifications,
                      setter: setPushNotifications,
                    },
                    {
                      title: "Weekly Reports",
                      description: "Receive weekly summary reports",
                      enabled: true,
                      setter: () => {},
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-6 rounded-2xl"
                      style={{
                        backgroundColor: "#1E252E",
                        border: "1px solid rgba(0, 217, 255, 0.1)",
                      }}
                    >
                      <div>
                        <div className="text-lg mb-1" style={{ color: "#FFFFFF" }}>
                          {item.title}
                        </div>
                        <div className="text-sm" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                          {item.description}
                        </div>
                      </div>
                      <button
                        onClick={() => item.setter(!item.enabled)}
                        className="relative w-14 h-7 rounded-full transition-all"
                        style={{
                          backgroundColor: item.enabled ? "#00D9FF" : "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <motion.div
                          className="absolute top-1 w-5 h-5 rounded-full"
                          style={{ backgroundColor: "#FFFFFF" }}
                          animate={{ left: item.enabled ? "32px" : "4px" }}
                          transition={{ duration: 0.2 }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeSection === "security" && (
            <div className="space-y-6">
              <div
                className="rounded-3xl border p-8"
                style={{
                  backgroundColor: "#151B23",
                  borderColor: "rgba(0, 217, 255, 0.15)",
                }}
              >
                <h2 className="text-2xl mb-6" style={{ color: "#FFFFFF" }}>
                  Security Settings
                </h2>
                <div className="space-y-6">
                  <div
                    className="p-6 rounded-2xl"
                    style={{
                      backgroundColor: "#1E252E",
                      border: "1px solid rgba(0, 217, 255, 0.1)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Shield className="w-6 h-6" style={{ color: "#00D9FF" }} />
                        <div>
                          <div className="text-lg" style={{ color: "#FFFFFF" }}>
                            Two-Factor Authentication
                          </div>
                          <div className="text-sm" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                            Add an extra layer of security to your account
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                        className="relative w-14 h-7 rounded-full transition-all"
                        style={{
                          backgroundColor: twoFactorEnabled ? "#00D9FF" : "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <motion.div
                          className="absolute top-1 w-5 h-5 rounded-full"
                          style={{ backgroundColor: "#FFFFFF" }}
                          animate={{ left: twoFactorEnabled ? "32px" : "4px" }}
                          transition={{ duration: 0.2 }}
                        />
                      </button>
                    </div>
                    {twoFactorEnabled && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 p-4 rounded-xl"
                        style={{
                          backgroundColor: "rgba(16, 185, 129, 0.1)",
                          border: "1px solid rgba(16, 185, 129, 0.3)",
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5" style={{ color: "#10B981" }} />
                          <span style={{ color: "#10B981" }}>2FA is enabled and active</span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div
                    className="p-6 rounded-2xl"
                    style={{
                      backgroundColor: "#1E252E",
                      border: "1px solid rgba(0, 217, 255, 0.1)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Key className="w-6 h-6" style={{ color: "#00D9FF" }} />
                      <div>
                        <div className="text-lg" style={{ color: "#FFFFFF" }}>
                          Change Password
                        </div>
                        <div className="text-sm" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                          Update your account password
                        </div>
                      </div>
                    </div>
                    <button
                      className="px-6 py-2 rounded-xl border transition-all"
                      style={{
                        borderColor: "rgba(0, 217, 255, 0.3)",
                        color: "#00D9FF",
                      }}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API Access */}
          {activeSection === "api" && (
            <div className="space-y-6">
              <div
                className="rounded-3xl border p-8"
                style={{
                  backgroundColor: "#151B23",
                  borderColor: "rgba(0, 217, 255, 0.15)",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl" style={{ color: "#FFFFFF" }}>
                    API Keys
                  </h2>
                  <button
                    className="px-6 py-2 rounded-xl transition-all"
                    style={{
                      backgroundColor: "#00D9FF",
                      color: "#0A0E14",
                    }}
                  >
                    Generate New Key
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Production Key", created: "2026-01-15", lastUsed: "2 hours ago" },
                    { name: "Development Key", created: "2026-02-20", lastUsed: "1 day ago" },
                  ].map((key, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-2xl"
                      style={{
                        backgroundColor: "#1E252E",
                        border: "1px solid rgba(0, 217, 255, 0.1)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg mb-1" style={{ color: "#FFFFFF" }}>
                            {key.name}
                          </div>
                          <div className="text-sm mb-2" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                            Created: {key.created} • Last used: {key.lastUsed}
                          </div>
                          <div
                            className="font-mono text-sm px-3 py-2 rounded inline-block"
                            style={{
                              backgroundColor: "#0D1117",
                              color: "#00D9FF",
                            }}
                          >
                            exp_••••••••••••{Math.random().toString(36).substr(2, 6)}
                          </div>
                        </div>
                        <button
                          className="p-2 rounded-xl transition-all"
                          style={{
                            backgroundColor: "rgba(248, 113, 113, 0.1)",
                            border: "1px solid rgba(248, 113, 113, 0.3)",
                          }}
                        >
                          <Trash2 className="w-5 h-5" style={{ color: "#F87171" }} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeSection === "appearance" && (
            <div className="space-y-6">
              <div
                className="rounded-3xl border p-8"
                style={{
                  backgroundColor: "#151B23",
                  borderColor: "rgba(0, 217, 255, 0.15)",
                }}
              >
                <h2 className="text-2xl mb-6" style={{ color: "#FFFFFF" }}>
                  Appearance Settings
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm mb-3" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Theme
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {["Dark", "System", "Auto"].map((theme) => (
                        <button
                          key={theme}
                          className="p-4 rounded-xl transition-all"
                          style={{
                            backgroundColor: theme === "Dark" ? "rgba(0, 217, 255, 0.1)" : "#1E252E",
                            border: theme === "Dark" ? "2px solid #00D9FF" : "2px solid transparent",
                          }}
                        >
                          <div style={{ color: theme === "Dark" ? "#00D9FF" : "#FFFFFF" }}>
                            {theme}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-3" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Accent Color
                    </label>
                    <div className="grid grid-cols-5 gap-3">
                      {["#00D9FF", "#0EA5E9", "#10B981", "#F59E0B", "#F87171"].map((color) => (
                        <button
                          key={color}
                          className="w-full aspect-square rounded-xl transition-all"
                          style={{
                            backgroundColor: color,
                            border: color === "#00D9FF" ? "3px solid #FFFFFF" : "3px solid transparent",
                            boxShadow: color === "#00D9FF" ? `0 0 24px ${color}` : "none",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeSection === "integrations" && (
            <div className="space-y-6">
              <div
                className="rounded-3xl border p-8"
                style={{
                  backgroundColor: "#151B23",
                  borderColor: "rgba(0, 217, 255, 0.15)",
                }}
              >
                <h2 className="text-2xl mb-6" style={{ color: "#FFFFFF" }}>
                  Connected Services
                </h2>
                <div className="space-y-4">
                  {[
                    { name: "Slack", icon: Zap, connected: true, color: "#00D9FF" },
                    { name: "Google Workspace", icon: Database, connected: false, color: "#0EA5E9" },
                    { name: "Microsoft Teams", icon: Globe, connected: false, color: "#3B82F6" },
                  ].map((service, i) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={i}
                        className="p-6 rounded-2xl flex items-center justify-between"
                        style={{
                          backgroundColor: "#1E252E",
                          border: "1px solid rgba(0, 217, 255, 0.1)",
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{
                              backgroundColor: `${service.color}15`,
                              border: `1px solid ${service.color}30`,
                            }}
                          >
                            <Icon className="w-6 h-6" style={{ color: service.color }} />
                          </div>
                          <div>
                            <div className="text-lg" style={{ color: "#FFFFFF" }}>
                              {service.name}
                            </div>
                            <div className="text-sm" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                              {service.connected ? "Connected" : "Not connected"}
                            </div>
                          </div>
                        </div>
                        <button
                          className="px-6 py-2 rounded-xl transition-all"
                          style={{
                            backgroundColor: service.connected ? "rgba(248, 113, 113, 0.1)" : "#00D9FF",
                            color: service.connected ? "#F87171" : "#0A0E14",
                            border: service.connected ? "1px solid rgba(248, 113, 113, 0.3)" : "none",
                          }}
                        >
                          {service.connected ? "Disconnect" : "Connect"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}