import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard",          icon: "ti-layout-dashboard", label: "Dashboard"   },
  { to: "/dashboard/quests",   icon: "ti-trophy",           label: "Quests"      },
  { to: "/dashboard/workout",  icon: "ti-sword",            label: "Workout"     },
  { to: "/dashboard/food-log", icon: "ti-salad",            label: "Food Log"    },
  { to: "/dashboard/progress", icon: "ti-chart-line",       label: "Progress"    },
  { to: "/dashboard/ai",       icon: "ti-robot",            label: "AI Advisor"  },
  { to: "/dashboard/profile",  icon: "ti-user",             label: "Profile"     },
];

const DashboardSidebar = () => (
  <aside className="relative z-10 flex w-[250px] flex-shrink-0 flex-col border-r border-[rgba(0,180,255,0.1)] bg-[rgba(1,12,28,0.98)]">

    {/* Logo */}
    <div className="border-b border-[rgba(0,180,255,0.08)] px-7 py-[25px]">
      <div className="text-[1.3rem] font-light uppercase tracking-[0.2em] text-[#c8eeff]">
        Cal<span className="font-bold text-[#00d4ff]">Track</span>
      </div>
      <div className="mt-1 font-mono text-[8px] tracking-[0.3em] text-[rgba(0,180,255,0.25)]">
        HUNTER SYSTEM v4.1
      </div>
    </div>

    {/* Nav */}
    <nav className="flex-1 py-2">
      {navItems.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/dashboard"}
          className={({ isActive }) =>
            `relative flex items-center gap-[10px] px-[22px] py-[16px] text-[0.9rem] tracking-[0.04em] transition-all duration-150 ` +
            (isActive
              ? "bg-[rgba(0,180,255,0.08)] text-[#00d4ff] before:absolute before:bottom-[6px] before:left-0 before:top-[6px] before:w-[2px] before:bg-[#00d4ff] before:shadow-[0_0_8px_#00d4ff]"
              : "text-[rgba(140,190,220,0.5)] hover:bg-[rgba(0,180,255,0.04)] hover:text-[rgba(180,220,255,0.8)]")
          }
        >
          <i className={`ti ${icon} text-[18px] w-6 text-center`} aria-hidden="true" />
          {label}
        </NavLink>
      ))}
    </nav>

    {/* Hunter card */}
    <div className="m-[10px] border border-[rgba(0,180,255,0.12)] bg-[rgba(0,20,50,0.5)] p-[10px]">
      <div className="text-[0.95rem] font-semibold tracking-[0.06em] text-[#c8eeff]">Sung Jin-Woo</div>
      <div className="mb-[6px] mt-[2px] font-mono text-[8px] tracking-[0.2em] text-[#00c8ff]">
        [ E-CLASS HUNTER ]
      </div>
      <div className="h-[3px] bg-[rgba(0,100,160,0.25)]">
        <div className="h-[3px] w-[34%] bg-gradient-to-r from-[#0080ff] to-[#00d4ff] shadow-[0_0_6px_rgba(0,200,255,0.5)]" />
      </div>
      <div className="mt-[4px] font-mono text-[8px] text-[rgba(0,160,200,0.4)]">
        340 / 1,000 XP · RANK UP AT 1000
      </div>
    </div>
  </aside>
);

export default DashboardSidebar;