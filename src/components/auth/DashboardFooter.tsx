const DashboardFooter = () => (
  <footer className="flex h-[40px] flex-shrink-0 items-center justify-between border-t border-[rgba(0,180,255,0.08)] bg-[rgba(1,8,20,0.98)] px-8">
    <span className="font-mono text-[9px] tracking-[0.2em] text-[rgba(0,140,180,0.3)]">
      CAL-SYS · RANK: E-CLASS · GATE: OPEN · SESSION ACTIVE
    </span>
    <div className="flex gap-[4px]">
      {[true, false, false, false, false].map((on, i) => (
        <div
          key={i}
          className={`h-[5px] w-[5px] rounded-full ${on ? "bg-[#00c8ff]" : "bg-[rgba(0,80,140,0.3)]"}`}
          style={on ? { boxShadow: "0 0 5px rgba(0,200,255,0.5)" } : {}}
        />
      ))}
    </div>
  </footer>
);

export default DashboardFooter;