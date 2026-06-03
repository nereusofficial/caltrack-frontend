const AuthChevrons = () => (
  <div className="flex items-center gap-3">
    <div className="h-px flex-1"
      style={{ background: "linear-gradient(90deg, transparent, rgba(0,180,255,0.2))" }} />
    <div className="flex flex-col items-center gap-1">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[6px] w-[10px] rotate-45 border-b-2 border-r-2 border-[rgba(0,200,255,0.5)]" />
        ))}
      </div>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[6px] w-[10px] rotate-45 border-b-2 border-r-2 border-[rgba(0,200,255,0.2)]" />
        ))}
      </div>
    </div>
    <div className="h-px flex-1"
      style={{ background: "linear-gradient(270deg, transparent, rgba(0,180,255,0.2))" }} />
  </div>
);

export default AuthChevrons;