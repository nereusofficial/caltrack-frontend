const DashboardHeader = () => {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).toUpperCase();

  return (
    <header className="flex h-[71px] flex-shrink-0 items-center justify-between border-b border-[rgba(0,180,255,0.08)] bg-[rgba(1,10,24,0.95)] px-6">
      <div>
        <div className="text-[1.3rem] font-medium tracking-[0.08em] text-[#c8eeff]">
          Welcome back, Hunter.
        </div>
        <div className="font-mono text-[8px] tracking-[0.2em] text-[rgba(0,180,255,0.3)]">
          {dateStr} · GATE STATUS: OPEN
        </div>
      </div>

      <div className="flex items-center gap-[14px]">
        {/* Notification bell */}
        <div className="relative cursor-pointer">
          <i className="ti ti-bell text-[20px] text-[rgba(0,180,255,0.4)]" aria-hidden="true" />
          <div className="absolute -right-[1px] -top-[1px] h-[6px] w-[6px] rounded-full bg-[#00ff96] shadow-[0_0_5px_rgba(0,255,150,0.8)]" />
        </div>
        {/* Avatar */}
        <div className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[rgba(0,200,255,0.3)] bg-[rgba(0,60,140,0.4)] font-mono text-[9px] text-[#00c8ff]">
          SJ
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;