interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  }).toUpperCase();

  return (
    <header className="flex h-[64px] flex-shrink-0 items-center justify-between border-b border-[rgba(0,180,255,0.08)] bg-[rgba(1,10,24,0.95)] px-4 sm:px-8">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="flex lg:hidden items-center justify-center w-9 h-9 border border-[rgba(0,180,255,0.2)] text-[rgba(0,180,255,0.5)] hover:text-[#00d4ff] transition-colors"
          aria-label="Open menu"
        >
          <i className="ti ti-menu-2 text-[20px]" />
        </button>

        <div>
          <div className="text-[1rem] sm:text-[1.2rem] font-medium tracking-[0.08em] text-[#c8eeff]">
            Welcome back, Hunter.
          </div>
          <div className="mt-[2px] font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-[rgba(0,180,255,0.3)] hidden sm:block">
            {dateStr} · GATE STATUS: OPEN
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative cursor-pointer">
          <i className="ti ti-bell text-[22px] text-[rgba(0,180,255,0.45)]" aria-hidden="true" />
          <div className="absolute -right-[1px] -top-[1px] h-[7px] w-[7px] rounded-full bg-[#00ff96]"
            style={{ boxShadow: "0 0 6px rgba(0,255,150,0.8)" }} />
        </div>
        <div className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full border border-[rgba(0,200,255,0.35)] bg-[rgba(0,60,140,0.4)] font-mono text-[10px] text-[#00c8ff]">
          SJ
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;