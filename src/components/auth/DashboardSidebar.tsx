import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard",          icon: "ti-layout-dashboard", label: "Dashboard"  },
  { to: "/dashboard/quests",   icon: "ti-trophy",           label: "Quests"     },
  { to: "/dashboard/workout",  icon: "ti-sword",            label: "Workout"    },
  { to: "/dashboard/food-log", icon: "ti-salad",            label: "Food Log"   },
  { to: "/dashboard/progress", icon: "ti-chart-line",       label: "Progress"   },
  { to: "/dashboard/ai",       icon: "ti-robot",            label: "AI Advisor" },
];

const DashboardSidebar = () => (
  <aside className="relative z-10 flex w-[240px] flex-shrink-0 flex-col border-r border-[rgba(0,180,255,0.1)] bg-[rgba(1,12,28,0.98)]">

    {/* Logo */}
    <div className="border-b border-[rgba(0,180,255,0.08)] px-5 py-5">
      <div className="text-[1.6rem] font-light uppercase tracking-[0.2em] text-[#c8eeff]">
        Cal<span className="font-bold text-[#00d4ff]">Track</span>
      </div>
      <div className="mt-1 font-mono text-[8px] tracking-[0.3em] text-[rgba(0,180,255,0.25)]">
        HUNTER SYSTEM v4.1
      </div>
    </div>

    {/* Nav */}
    <nav className="flex-1 py-3">
      {navItems.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/dashboard"}
          className={({ isActive }) =>
            `relative flex items-center gap-3 px-5 py-[17px] text-[0.95rem] tracking-[0.04em] transition-all duration-150 ` +
            (isActive
              ? "bg-[rgba(0,180,255,0.08)] text-[#00d4ff] before:absolute before:bottom-[6px] before:left-0 before:top-[6px] before:w-[2px] before:bg-[#00d4ff] before:[box-shadow:0_0_8px_#00d4ff]"
              : "text-[rgba(140,190,220,0.5)] hover:bg-[rgba(0,180,255,0.04)] hover:text-[rgba(180,220,255,0.8)]")
          }
        >
          <i className={`ti ${icon} text-[19px] w-5 text-center`} aria-hidden="true" />
          {label}
        </NavLink>
      ))}
    </nav>

    {/* Logout */}
    <div className="border-t border-[rgba(0,180,255,0.08)] p-3">
      <button
        onClick={() => {/* handle logout */}}
        className="group relative flex w-full items-center gap-3 px-4 py-[13px] text-[0.9rem] tracking-[0.04em] text-[rgba(140,190,220,0.5)] transition-all duration-150 hover:bg-[rgba(0,180,255,0.04)] hover:text-[rgba(180,220,255,0.8)]"
      >
        <span
          className="pointer-events-none absolute left-0 top-[6px] bottom-[6px] w-[2px] bg-[#00d4ff] opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          style={{ boxShadow: "0 0 8px #00d4ff" }}
        />
        <i className="ti ti-logout text-[19px] w-5 text-center" aria-hidden="true" />
        Logout
      </button>
    </div>

  </aside>
);

export default DashboardSidebar;