import SectionLabel from "./SectionLabel";

const HunterCard = () => (
  <div className="h-full flex flex-col">
    <SectionLabel label="Hunter Status" />
    <div className="relative flex-1 border border-[rgba(0,180,255,0.2)] bg-[rgba(0,20,50,0.7)] px-5 py-5 flex flex-col gap-4 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(0,200,255,0.45),transparent)" }} />

      {[
        "absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2",
        "absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2",
        "absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2",
        "absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2",
      ].map((cls, i) => (
        <div key={i} className={`${cls} border-[#00c8ff]`}
          style={{ boxShadow: `${i%2===0?"-":""}1px ${i<2?"-":""}1px 6px rgba(0,200,255,0.3)` }} />
      ))}

      {/* Avatar + name */}
      <div className="flex flex-col items-center gap-3">
        <svg width="90" height="90" viewBox="0 0 90 90">
          <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(0,100,160,0.25)" strokeWidth="3"/>
          <circle cx="45" cy="45" r="38" fill="none" stroke="#00c8ff" strokeWidth="3"
            strokeDasharray="239" strokeDashoffset="60"
            strokeLinecap="round" transform="rotate(-90 45 45)"
            style={{ filter: "drop-shadow(0 0 4px rgba(0,200,255,0.7))" }}/>
          <circle cx="45" cy="45" r="28" fill="rgba(0,30,70,0.8)" stroke="rgba(0,180,255,0.15)" strokeWidth="1"/>
          <text x="45" y="41" textAnchor="middle" fill="#c8eeff" fontSize="13" fontFamily="Rajdhani" fontWeight="700">SJW</text>
          <text x="45" y="54" textAnchor="middle" fill="rgba(0,180,255,0.5)" fontSize="7" fontFamily="Share Tech Mono">E-CLASS</text>
        </svg>
        <div className="text-center">
          <div className="text-[1.05rem] font-semibold tracking-[0.06em] text-[#c8eeff]">Sung Jin-Woo</div>
          <div className="font-mono text-[10px] tracking-[0.2em] text-[#00c8ff] mt-[2px]">[ E-CLASS HUNTER ]</div>
        </div>
      </div>

      <div className="h-px bg-[rgba(0,180,255,0.1)]" />

      {/* XP bar */}
      <div>
        <div className="mb-[6px] flex justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[rgba(0,160,200,0.55)]">Rank XP</span>
          <span className="font-mono text-[10px] text-[rgba(0,180,255,0.7)]">340 / 1,000</span>
        </div>
        <div className="h-[5px] bg-[rgba(0,100,160,0.2)]">
          <div className="h-[5px] w-[34%] bg-gradient-to-r from-[#0080ff] to-[#00d4ff]"
            style={{ boxShadow: "0 0 6px rgba(0,200,255,0.6)" }} />
        </div>
        <div className="mt-[5px] font-mono text-[9px] text-[rgba(0,160,200,0.45)]">660 XP until D-Rank</div>
      </div>

      <div className="h-px bg-[rgba(0,180,255,0.1)]" />

      {/* Stat grid */}
      <div className="grid grid-cols-3 gap-[6px]">
        {[
          { label: "Quests", val: "2",  color: "#ffd700" },
          { label: "Streak", val: "7",  color: "#00ff96" },
          { label: "Days",   val: "14", color: "#00c8ff" },
        ].map(({ label, val, color }) => (
          <div key={label} className="flex flex-col items-center border border-[rgba(0,180,255,0.08)] bg-[rgba(0,15,40,0.5)] py-[10px]">
            <div className="font-mono text-[9px] text-[rgba(0,160,200,0.5)]">{label}</div>
            <div className="mt-1 text-[1.15rem] font-semibold" style={{ color }}>{val}</div>
          </div>
        ))}
      </div>

      <div className="h-px bg-[rgba(0,180,255,0.1)]" />

      {/* Attributes */}
      <div className="flex flex-col gap-[9px]">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[rgba(0,160,200,0.5)]">Attributes</div>
        {[
          { attr: "Strength",  val: 42, color: "#ff6b6b" },
          { attr: "Agility",   val: 67, color: "#00ff96" },
          { attr: "Endurance", val: 55, color: "#00c8ff" },
          { attr: "Vitality",  val: 38, color: "#ffd700" },
        ].map(({ attr, val, color }) => (
          <div key={attr}>
            <div className="mb-[4px] flex justify-between">
              <span className="font-mono text-[10px] text-[rgba(160,210,255,0.6)]">{attr}</span>
              <span className="font-mono text-[10px]" style={{ color }}>{val}</span>
            </div>
            <div className="h-[4px] bg-[rgba(0,100,160,0.2)]">
              <div className="h-[4px]" style={{ width: `${val}%`, background: color, boxShadow: `0 0 3px ${color}80` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="h-px bg-[rgba(0,180,255,0.1)]" />

      {/* Active Buffs */}
      <div className="flex flex-col gap-[6px]">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[rgba(0,160,200,0.5)]">Active Buffs</div>
        {[
          { name: "Daily Streak",  icon: "🔥", bg: "rgba(255,160,0,0.1)",  border: "rgba(255,160,0,0.22)",  text: "#ffd700" },
          { name: "Protein Bonus", icon: "💪", bg: "rgba(0,255,150,0.07)", border: "rgba(0,255,150,0.18)",  text: "#00ff96" },
          { name: "Gate Open",     icon: "⚡", bg: "rgba(0,150,255,0.07)", border: "rgba(0,150,255,0.18)",  text: "#00c8ff" },
        ].map(({ name, icon, bg, border, text }) => (
          <div key={name} className="flex items-center gap-3 px-3 py-[7px]"
            style={{ background: bg, border: `1px solid ${border}` }}>
            <span className="text-[13px]">{icon}</span>
            <span className="font-mono text-[10px]" style={{ color: text }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HunterCard;