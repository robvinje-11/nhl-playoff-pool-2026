import { useState, useEffect } from "react";
import { submitEntry } from "./firebase";

const T = {
  CAR: { name: "Carolina Hurricanes", short: "Hurricanes", abbr: "CAR", bg: "#CC0000", text: "#fff", seed: 1, seedTag: "D2", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/car.png" },
  OTT: { name: "Ottawa Senators", short: "Senators", abbr: "OTT", bg: "#000000", text: "#fff", seed: 8, seedTag: "D3", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/ott.png" },
  PIT: { name: "Pittsburgh Penguins", short: "Penguins", abbr: "PIT", bg: "#FCB514", text: "#000", seed: 2, seedTag: "D1", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/pit.png" },
  PHI: { name: "Philadelphia Flyers", short: "Flyers", abbr: "PHI", bg: "#F74902", text: "#fff", seed: 3, seedTag: "WC1", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/phi.png" },
  TBL: { name: "Tampa Bay Lightning", short: "Lightning", abbr: "TBL", bg: "#002868", text: "#fff", seed: 2, seedTag: "D2", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/tb.png" },
  MTL: { name: "Montreal Canadiens", short: "Canadiens", abbr: "MTL", bg: "#AF1E2D", text: "#fff", seed: 3, seedTag: "D3", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/mtl.png" },
  BUF: { name: "Buffalo Sabres", short: "Sabres", abbr: "BUF", bg: "#003087", text: "#fff", seed: 2, seedTag: "D1", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/buf.png" },
  BOS: { name: "Boston Bruins", short: "Bruins", abbr: "BOS", bg: "#000000", text: "#FCB514", seed: 7, seedTag: "WC2", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/bos.png" },
  DAL: { name: "Dallas Stars", short: "Stars", abbr: "DAL", bg: "#006847", text: "#fff", seed: 2, seedTag: "D2", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/dal.png" },
  MIN: { name: "Minnesota Wild", short: "Wild", abbr: "MIN", bg: "#154734", text: "#fff", seed: 3, seedTag: "D3", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/min.png" },
  COL: { name: "Colorado Avalanche", short: "Avalanche", abbr: "COL", bg: "#6F263D", text: "#fff", seed: 1, seedTag: "D1", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/col.png" },
  LAK: { name: "Los Angeles Kings", short: "Kings", abbr: "LAK", bg: "#111111", text: "#A2AAAD", seed: 8, seedTag: "WC2", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/la.png" },
  EDM: { name: "Edmonton Oilers", short: "Oilers", abbr: "EDM", bg: "#041E42", text: "#FF4C00", seed: 2, seedTag: "D1", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/edm.png" },
  ANA: { name: "Anaheim Ducks", short: "Ducks", abbr: "ANA", bg: "#000000", text: "#F47A38", seed: 3, seedTag: "WC1", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/ana.png" },
  VGK: { name: "Vegas Golden Knights", short: "Golden Knights", abbr: "VGK", bg: "#333F42", text: "#B4975A", seed: 2, seedTag: "D2", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/vgk.png" },
  UTA: { name: "Utah Mammoth", short: "Mammoth", abbr: "UTA", bg: "#010101", text: "#71AFE5", seed: 7, seedTag: "D3", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/utah.png" },
};

const EAST_R1 = [
  { top: "CAR", bottom: "OTT" },
  { top: "PIT", bottom: "PHI" },
  { top: "TBL", bottom: "MTL" },
  { top: "BUF", bottom: "BOS" },
];
const WEST_R1 = [
  { top: "DAL", bottom: "MIN" },
  { top: "COL", bottom: "LAK" },
  { top: "EDM", bottom: "ANA" },
  { top: "VGK", bottom: "UTA" },
];

const FN = "'Oswald', sans-serif";
const BN = "'Bebas Neue', sans-serif";

function Strip({ id, big, onClick, gold }) {
  const t = T[id];
  if (!t) return null;
  const h = big ? 72 : 32;
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", height: h, width: "100%",
        background: t.bg, borderRadius: big ? 12 : 4, overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        border: gold ? "2px solid #FCB514" : "1px solid rgba(255,255,255,0.12)",
        boxShadow: gold ? "0 0 16px #FCB51444" : "0 2px 6px rgba(0,0,0,0.3)",
        transition: "transform 0.12s",
      }}
    >
      <div style={{
        width: big ? 48 : 22, height: "100%", background: "rgba(0,0,0,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: FN, fontWeight: 900, fontSize: big ? 24 : 13, color: t.text,
        borderRight: "1px solid rgba(255,255,255,0.15)", flexShrink: 0,
      }}>{t.seed}</div>
      <div style={{
        width: big ? 60 : 28, height: "100%", background: "rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <img
          src={t.logo} alt={t.abbr}
          style={{ width: big ? 48 : 20, height: big ? 48 : 20, objectFit: "contain" }}
          onError={(e) => { e.target.onerror = null; e.target.style.display = "none"; }}
        />
      </div>
      <div style={{
        flex: 1, padding: big ? "0 16px" : "0 6px",
        fontFamily: FN, fontWeight: 700, fontSize: big ? 20 : 11,
        color: t.text, letterSpacing: big ? 1.5 : 0.5,
        textTransform: "uppercase", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}>{big ? t.name : t.short}</div>
      {big && (
        <div style={{
          padding: "4px 12px", marginRight: 12, borderRadius: 4,
          background: "rgba(255,255,255,0.15)", fontSize: 12, fontWeight: 700,
          color: "rgba(255,255,255,0.7)", fontFamily: FN, letterSpacing: 1,
        }}>{t.seedTag}</div>
      )}
    </div>
  );
}

const FLOW = [];
EAST_R1.forEach((m, i) => FLOW.push({ t: "r1", c: "east", r: "ROUND 1", l: "Match " + (i + 1) + " of 4", m, i }));
FLOW.push({ t: "eR2a", c: "east", r: "ROUND 2", l: "Semifinal 1 of 2" });
FLOW.push({ t: "eR2b", c: "east", r: "ROUND 2", l: "Semifinal 2 of 2" });
FLOW.push({ t: "eFin", c: "east", r: "CONFERENCE FINALS", l: "Eastern Conference Final" });
WEST_R1.forEach((m, i) => FLOW.push({ t: "r1", c: "west", r: "ROUND 1", l: "Match " + (i + 1) + " of 4", m, i }));
FLOW.push({ t: "wR2a", c: "west", r: "ROUND 2", l: "Semifinal 1 of 2" });
FLOW.push({ t: "wR2b", c: "west", r: "ROUND 2", l: "Semifinal 2 of 2" });
FLOW.push({ t: "wFin", c: "west", r: "CONFERENCE FINALS", l: "Western Conference Final" });
FLOW.push({ t: "scf" });
FLOW.push({ t: "tb" });

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [player, setPlayer] = useState({ firstName: "", lastName: "", email: "" });
  const [picks, setPicks] = useState({ eastR1: [], eastR2: [], eastFinal: null, westR1: [], westR2: [], westFinal: null, champion: null });
  const [tb, setTb] = useState("");
  const [step, setStep] = useState(0);
  const [err, setErr] = useState("");
  const [splashDone, setSplashDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (screen === "splash") {
      const t1 = setTimeout(() => setSplashDone(true), 3400);
      const t2 = setTimeout(() => setScreen("bracket"), 4200);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [screen]);

  const cur = FLOW[step] || null;
  const total = FLOW.length;
  const pct = (step / total) * 100;

  function doPick(id) {
    const f = cur;
    if (!f) return;
    if (f.t === "r1") {
      if (f.c === "east") setPicks(p => { const a = [...p.eastR1]; a[f.i] = id; return { ...p, eastR1: a }; });
      else setPicks(p => { const a = [...p.westR1]; a[f.i] = id; return { ...p, westR1: a }; });
    } else if (f.t === "eR2a") setPicks(p => { const a = [...p.eastR2]; a[0] = id; return { ...p, eastR2: a }; });
    else if (f.t === "eR2b") setPicks(p => { const a = [...p.eastR2]; a[1] = id; return { ...p, eastR2: a }; });
    else if (f.t === "eFin") setPicks(p => ({ ...p, eastFinal: id }));
    else if (f.t === "wR2a") setPicks(p => { const a = [...p.westR2]; a[0] = id; return { ...p, westR2: a }; });
    else if (f.t === "wR2b") setPicks(p => { const a = [...p.westR2]; a[1] = id; return { ...p, westR2: a }; });
    else if (f.t === "wFin") setPicks(p => ({ ...p, westFinal: id }));
    else if (f.t === "scf") setPicks(p => ({ ...p, champion: id }));
    setStep(s => s + 1);
  }

  function goBack() {
    if (step <= 0) return;
    const prev = step - 1;
    const pf = FLOW[prev];
    if (pf.t === "r1") {
      if (pf.c === "east") setPicks(v => { const a = [...v.eastR1]; a[pf.i] = undefined; return { ...v, eastR1: a, eastR2: [], eastFinal: null, champion: null }; });
      else setPicks(v => { const a = [...v.westR1]; a[pf.i] = undefined; return { ...v, westR1: a, westR2: [], westFinal: null, champion: null }; });
    } else if (pf.t === "eR2a") setPicks(v => ({ ...v, eastR2: [], eastFinal: null, champion: null }));
    else if (pf.t === "eR2b") setPicks(v => ({ ...v, eastR2: [v.eastR2[0]], eastFinal: null, champion: null }));
    else if (pf.t === "eFin") setPicks(v => ({ ...v, eastFinal: null, champion: null }));
    else if (pf.t === "wR2a") setPicks(v => ({ ...v, westR2: [], westFinal: null, champion: null }));
    else if (pf.t === "wR2b") setPicks(v => ({ ...v, westR2: [v.westR2[0]], westFinal: null, champion: null }));
    else if (pf.t === "wFin") setPicks(v => ({ ...v, westFinal: null, champion: null }));
    else if (pf.t === "scf") setPicks(v => ({ ...v, champion: null }));
    setStep(prev);
  }

  function getMatchup() {
    if (!cur) return null;
    if (cur.t === "r1") return cur.m;
    if (cur.t === "eR2a" && picks.eastR1[0] && picks.eastR1[1]) return { top: picks.eastR1[0], bottom: picks.eastR1[1] };
    if (cur.t === "eR2b" && picks.eastR1[2] && picks.eastR1[3]) return { top: picks.eastR1[2], bottom: picks.eastR1[3] };
    if (cur.t === "eFin" && picks.eastR2[0] && picks.eastR2[1]) return { top: picks.eastR2[0], bottom: picks.eastR2[1] };
    if (cur.t === "wR2a" && picks.westR1[0] && picks.westR1[1]) return { top: picks.westR1[0], bottom: picks.westR1[1] };
    if (cur.t === "wR2b" && picks.westR1[2] && picks.westR1[3]) return { top: picks.westR1[2], bottom: picks.westR1[3] };
    if (cur.t === "wFin" && picks.westR2[0] && picks.westR2[1]) return { top: picks.westR2[0], bottom: picks.westR2[1] };
    return null;
  }

  async function doSubmit() {
    setSubmitting(true);
    const entry = {
      player,
      picks: {
        eastR1: picks.eastR1,
        eastR2: picks.eastR2,
        eastFinal: picks.eastFinal,
        westR1: picks.westR1,
        westR2: picks.westR2,
        westFinal: picks.westFinal,
        champion: picks.champion,
      },
      tiebreaker: parseInt(tb),
    };
    const result = await submitEntry(entry);
    setSubmitting(false);
    if (result.success) {
      setScreen("done");
    } else {
      setErr("Submission failed. Please try again.");
    }
  }

  const bg = "radial-gradient(ellipse at center, #0d1b2a, #050a12)";

  /* ═══ SPLASH ═══ */
  if (screen === "splash") {
    return (
      <div style={{
        position: "fixed", inset: 0, zIndex: 9999, background: bg,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        opacity: splashDone ? 0 : 1, transition: "opacity 0.8s",
      }}>
        <div style={{ fontSize: 52, fontFamily: BN, color: "#fff", letterSpacing: 4, lineHeight: 1, textAlign: "center" }}>
          🏒 NHL PLAYOFF
        </div>
        <div style={{ fontSize: 30, fontFamily: BN, color: "#71AFE5", letterSpacing: 6, marginTop: 4 }}>POOL 2026</div>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, #71AFE5, transparent)", margin: "24px auto" }} />
        <div style={{ fontSize: 10, letterSpacing: 4, color: "#4a5a6a", fontFamily: FN, fontWeight: 600 }}>POWERED BY</div>
        <div style={{ fontSize: 16, letterSpacing: 2, color: "#7a8a9a", fontFamily: FN, fontWeight: 700, marginTop: 6, textAlign: "center" }}>RTV BUSINESS SOLUTIONS GROUP LTD.</div>
      </div>
    );
  }

  /* ═══ BRACKET OVERVIEW ═══ */
  if (screen === "bracket") {
    return (
      <div style={{ minHeight: "100vh", background: bg, paddingBottom: 24 }}>
        <div style={{
          background: "linear-gradient(180deg, #1a3050, #0a1525)", padding: "18px 12px 14px",
          textAlign: "center", borderBottom: "2px solid #71AFE5",
        }}>
          <div style={{ fontSize: 14, fontFamily: FN, fontWeight: 600, color: "#71AFE5", letterSpacing: 4 }}>2026 NHL</div>
          <div style={{ fontSize: 44, fontFamily: BN, color: "#fff", letterSpacing: 4, lineHeight: 1 }}>PLAYOFF</div>
          <div style={{
            fontSize: 30, fontFamily: BN, letterSpacing: 6,
            background: "linear-gradient(90deg, #8ab4d4, #fff, #8ab4d4)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1,
          }}>BRACKET</div>
        </div>

        <div style={{ padding: "12px 8px", display: "flex", gap: 6, maxWidth: 900, margin: "0 auto" }}>
          <div style={{ flex: 1 }}>
            <div style={{ textAlign: "center", fontSize: 9, fontWeight: 800, color: "#71AFE5", fontFamily: FN, letterSpacing: 3, marginBottom: 6, padding: "4px 0", borderBottom: "1px solid #1e3a5f" }}>FIRST ROUND</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {EAST_R1.map((m, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Strip id={m.top} /><Strip id={m.bottom} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ width: 48, display: "flex", flexDirection: "column", justifyContent: "space-around", paddingTop: 24 }}>
            <div style={{ fontSize: 7, color: "#4a6a8a", fontFamily: FN, letterSpacing: 1, textAlign: "center" }}>R2</div>
            {[0,1,2,3].map(i => <div key={i} style={{ height: 28, background: "#0d1b2a", borderRadius: 3, border: "1px solid #1e293b" }} />)}
          </div>
          <div style={{ width: 76, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <div style={{ fontSize: 7, color: "#4a6a8a", fontFamily: FN, letterSpacing: 1, textAlign: "center" }}>CONF<br/>FINALS</div>
            <div style={{ height: 28, width: "100%", background: "#0d1b2a", borderRadius: 3, border: "1px solid #1e293b" }} />
            <div style={{ fontSize: 36, margin: "4px 0" }}>🏆</div>
            <div style={{ fontSize: 8, fontWeight: 800, color: "#FCB514", fontFamily: FN, letterSpacing: 1, textAlign: "center", lineHeight: 1.3 }}>STANLEY CUP<br/>FINAL</div>
            <div style={{ height: 28, width: "100%", background: "#0d1b2a", borderRadius: 3, border: "1px solid #1e293b" }} />
            <div style={{ fontSize: 7, color: "#4a6a8a", fontFamily: FN, letterSpacing: 1, textAlign: "center" }}>CONF<br/>FINALS</div>
          </div>
          <div style={{ width: 48, display: "flex", flexDirection: "column", justifyContent: "space-around", paddingTop: 24 }}>
            <div style={{ fontSize: 7, color: "#4a6a8a", fontFamily: FN, letterSpacing: 1, textAlign: "center" }}>R2</div>
            {[0,1,2,3].map(i => <div key={i} style={{ height: 28, background: "#0d1b2a", borderRadius: 3, border: "1px solid #1e293b" }} />)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ textAlign: "center", fontSize: 9, fontWeight: 800, color: "#FF6B35", fontFamily: FN, letterSpacing: 3, marginBottom: 6, padding: "4px 0", borderBottom: "1px solid #5f2e1e" }}>FIRST ROUND</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {WEST_R1.map((m, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Strip id={m.top} /><Strip id={m.bottom} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 16px" }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: "#71AFE5", fontFamily: FN, letterSpacing: 3 }}>EASTERN CONFERENCE</span>
          <span style={{ fontSize: 9, fontWeight: 800, color: "#FF6B35", fontFamily: FN, letterSpacing: 3 }}>WESTERN CONFERENCE</span>
        </div>

        <div style={{ padding: "12px 16px 0", maxWidth: 400, margin: "0 auto" }}>
          <div style={{ background: "#111827", borderRadius: 10, padding: "12px 16px", border: "1px solid #1e293b", marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#FCB514", fontFamily: FN, letterSpacing: 2, marginBottom: 6, textAlign: "center" }}>SCORING</div>
            {[["Round 1","1 pt"],["Round 2","2 pts"],["Conf. Finals","4 pts"],["Cup Final","8 pts"]].map(([r,p])=>(
              <div key={r} style={{display:"flex",justifyContent:"space-between",padding:"2px 0",fontSize:12,fontFamily:FN,color:"#c9d6df"}}>
                <span>{r}</span><span style={{color:"#71AFE5",fontWeight:700}}>{p}</span>
              </div>
            ))}
            <div style={{marginTop:6,paddingTop:6,borderTop:"1px solid #1e293b",fontSize:10,color:"#6a7a8a",fontFamily:FN,textAlign:"center"}}>Tiebreaker: Total goals in Stanley Cup Final Series</div>
          </div>
          <button onClick={()=>setScreen("register")} style={{
            width:"100%",padding:"16px",borderRadius:10,border:"none",
            background:"linear-gradient(135deg, #71AFE5, #3d8bc9)",color:"#fff",
            fontSize:20,fontWeight:800,fontFamily:FN,letterSpacing:4,cursor:"pointer",
            boxShadow:"0 4px 24px #71AFE544",
          }}>ENTER THE POOL — $25</button>
          <div style={{fontSize:9,color:"#3a4a5a",fontFamily:FN,marginTop:12,letterSpacing:2,textAlign:"center"}}>POWERED BY RTV BUSINESS SOLUTIONS GROUP LTD.</div>
        </div>
      </div>
    );
  }

  /* ═══ REGISTRATION ═══ */
  if (screen === "register") {
    const inp = {
      width:"100%",padding:"16px",borderRadius:10,border:"2px solid #1e293b",
      background:"#0a1220",color:"#e8edf2",fontSize:18,fontFamily:FN,fontWeight:600,
      outline:"none",boxSizing:"border-box",letterSpacing:1,
    };
    const go = () => {
      if (!player.firstName.trim()||!player.lastName.trim()){setErr("Enter your full name.");return;}
      if (!player.email.trim()||!player.email.includes("@")){setErr("Enter a valid email.");return;}
      setErr("");setScreen("picking");setStep(0);
    };
    return (
      <div style={{minHeight:"100vh",background:bg,padding:"48px 20px",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{fontSize:32,fontFamily:BN,color:"#fff",letterSpacing:3,marginBottom:4}}>PLAYER REGISTRATION</div>
        <div style={{fontSize:14,color:"#71AFE5",fontFamily:FN,letterSpacing:3,marginBottom:32,fontWeight:600}}>$25 ENTRY FEE</div>
        <div style={{maxWidth:400,width:"100%",display:"flex",flexDirection:"column",gap:18}}>
          <div>
            <label style={{fontSize:12,color:"#6a7a8a",fontFamily:FN,letterSpacing:2,marginBottom:6,display:"block"}}>FIRST NAME</label>
            <input style={inp} value={player.firstName} onChange={e=>setPlayer(p=>({...p,firstName:e.target.value}))} placeholder="First Name" />
          </div>
          <div>
            <label style={{fontSize:12,color:"#6a7a8a",fontFamily:FN,letterSpacing:2,marginBottom:6,display:"block"}}>LAST NAME</label>
            <input style={inp} value={player.lastName} onChange={e=>setPlayer(p=>({...p,lastName:e.target.value}))} placeholder="Last Name" />
          </div>
          <div>
            <label style={{fontSize:12,color:"#6a7a8a",fontFamily:FN,letterSpacing:2,marginBottom:6,display:"block"}}>EMAIL ADDRESS</label>
            <input style={inp} type="email" value={player.email} onChange={e=>setPlayer(p=>({...p,email:e.target.value}))} placeholder="email@example.com" />
          </div>
          {err&&<div style={{color:"#ef4444",fontSize:14,fontFamily:FN}}>{err}</div>}
          <button onClick={go} style={{
            marginTop:8,padding:"18px",borderRadius:10,border:"none",
            background:"linear-gradient(135deg, #71AFE5, #3d8bc9)",color:"#fff",
            fontSize:20,fontWeight:800,fontFamily:FN,letterSpacing:4,cursor:"pointer",
          }}>START PICKS →</button>
        </div>
      </div>
    );
  }

  /* ═══ SUBMITTED ═══ */
  if (screen === "done") {
    return (
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:bg,padding:"40px 20px"}}>
        <div style={{fontSize:72,marginBottom:16}}>🏒</div>
        <div style={{fontSize:40,fontFamily:BN,color:"#22c55e",letterSpacing:3}}>PICKS SUBMITTED!</div>
        <div style={{fontSize:18,color:"#c9d6df",fontFamily:FN,marginTop:12,textAlign:"center"}}>Thanks {player.firstName}! Your bracket is locked in.</div>
        <div style={{fontSize:14,color:"#6a7a8a",fontFamily:FN,marginTop:8}}>Good luck!</div>
        <div style={{marginTop:32,background:"#111827",borderRadius:10,padding:"16px 28px",border:"1px solid #1e293b"}}>
          <div style={{fontSize:13,color:"#8fa8c0",fontFamily:FN,letterSpacing:2,textAlign:"center"}}>ENTRY FEE: $25 — CONTACT POOL ADMIN TO PAY</div>
        </div>
        <div style={{fontSize:10,color:"#3a4a5a",fontFamily:FN,marginTop:32,letterSpacing:2}}>POWERED BY RTV BUSINESS SOLUTIONS GROUP LTD.</div>
      </div>
    );
  }

  /* ═══ REVIEW ═══ */
  if (screen === "review") {
    const Sec = ({title,items,color})=>(
      <div style={{marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:800,color:color||"#71AFE5",fontFamily:FN,letterSpacing:2,marginBottom:5}}>{title}</div>
        <div style={{display:"flex",flexDirection:"column",gap:2}}>
          {items.filter(Boolean).map((id,i)=><Strip key={i} id={id}/>)}
        </div>
      </div>
    );
    return (
      <div style={{minHeight:"100vh",background:bg,padding:"24px 16px",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{fontSize:32,fontFamily:BN,color:"#fff",letterSpacing:3,marginBottom:4}}>REVIEW YOUR PICKS</div>
        <div style={{fontSize:14,color:"#6a7a8a",fontFamily:FN,letterSpacing:1,marginBottom:18}}>{player.firstName} {player.lastName}</div>
        <div style={{maxWidth:440,width:"100%",background:"#0a1220",borderRadius:14,padding:"16px",border:"1px solid #1e293b"}}>
          <Sec title="EAST — ROUND 1 (1 pt each)" items={picks.eastR1}/>
          <Sec title="EAST — ROUND 2 (2 pts each)" items={picks.eastR2}/>
          <Sec title="EAST — CONF. FINAL (4 pts)" items={[picks.eastFinal]}/>
          <div style={{height:1,background:"#1e293b",margin:"10px 0"}}/>
          <Sec title="WEST — ROUND 1 (1 pt each)" items={picks.westR1} color="#FF6B35"/>
          <Sec title="WEST — ROUND 2 (2 pts each)" items={picks.westR2} color="#FF6B35"/>
          <Sec title="WEST — CONF. FINAL (4 pts)" items={[picks.westFinal]} color="#FF6B35"/>
          <div style={{height:1,background:"#1e293b",margin:"10px 0"}}/>
          <div style={{fontSize:12,fontWeight:800,color:"#FCB514",fontFamily:FN,letterSpacing:2,marginBottom:6}}>🏆 CHAMPION (8 pts)</div>
          {picks.champion&&<Strip id={picks.champion} gold/>}
          <div style={{marginTop:10,padding:"10px",background:"#111827",borderRadius:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:11,color:"#6a7a8a",fontFamily:FN}}>TIEBREAKER</span>
            <span style={{fontSize:26,fontFamily:BN,color:"#FCB514",letterSpacing:2}}>{tb} GOALS</span>
          </div>
        </div>
        <div style={{display:"flex",gap:12,marginTop:20,width:"100%",maxWidth:440}}>
          <button onClick={()=>{setScreen("picking");setStep(total-1);}} style={{
            flex:1,padding:"16px",borderRadius:10,border:"1px solid #1e293b",
            background:"transparent",color:"#6a7a8a",fontSize:16,fontWeight:700,fontFamily:FN,letterSpacing:2,cursor:"pointer",
          }}>← BACK</button>
          <button onClick={doSubmit} disabled={submitting} style={{
            flex:2,padding:"16px",borderRadius:10,border:"none",
            background:submitting?"#555":"linear-gradient(135deg, #22c55e, #16a34a)",color:"#fff",
            fontSize:18,fontWeight:800,fontFamily:FN,letterSpacing:3,cursor:submitting?"wait":"pointer",
            boxShadow:"0 4px 20px #22c55e44",
          }}>{submitting?"SUBMITTING...":"SUBMIT ✓"}</button>
        </div>
        {err&&<div style={{color:"#ef4444",fontSize:14,fontFamily:FN,marginTop:8}}>{err}</div>}
      </div>
    );
  }

  /* ═══ PICKING FLOW ═══ */
  if (screen === "picking") {
    if (!cur){setScreen("review");return null;}

    const progBar = (
      <div style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        background:"#050a12ee",backdropFilter:"blur(10px)",
        padding:"10px 16px 8px",borderBottom:"1px solid #1e293b",
      }}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
          <span style={{fontSize:12,color:"#6a7a8a",fontFamily:FN,letterSpacing:1,fontWeight:600}}>PICK {step+1} OF {total}</span>
          {step>0&&<button onClick={goBack} style={{fontSize:14,color:"#71AFE5",background:"none",border:"none",cursor:"pointer",fontFamily:FN,fontWeight:700}}>← BACK</button>}
        </div>
        <div style={{height:4,background:"#1e293b",borderRadius:2}}>
          <div style={{height:4,background:"linear-gradient(90deg, #71AFE5, #FCB514)",borderRadius:2,width:pct+"%",transition:"width 0.3s"}}/>
        </div>
      </div>
    );

    if (cur.t === "tb") {
      return (
        <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:bg,padding:"70px 20px 40px"}}>
          {progBar}
          <div style={{fontSize:36,fontFamily:BN,color:"#FCB514",letterSpacing:3}}>TIEBREAKER</div>
          <div style={{fontSize:18,color:"#c9d6df",fontFamily:FN,margin:"20px 0 32px",textAlign:"center",maxWidth:340,lineHeight:1.5}}>
            How many <span style={{color:"#FCB514",fontWeight:800}}>TOTAL GOALS</span> will be scored in the Stanley Cup Final Series?
          </div>
          <input type="number" inputMode="numeric" value={tb}
            onChange={e=>setTb(e.target.value.replace(/[^0-9]/g,""))}
            placeholder="0"
            style={{width:180,padding:"20px",borderRadius:14,border:"2px solid #1e293b",background:"#0a1220",color:"#FCB514",fontSize:48,fontFamily:BN,textAlign:"center",outline:"none",letterSpacing:4}}
          />
          {err&&<div style={{color:"#ef4444",fontSize:14,fontFamily:FN,marginTop:8}}>{err}</div>}
          <button onClick={()=>{if(!tb||parseInt(tb)<1){setErr("Enter a number.");return;}setErr("");setScreen("review");}} style={{
            marginTop:32,padding:"18px 48px",borderRadius:10,border:"none",
            background:"linear-gradient(135deg, #71AFE5, #3d8bc9)",color:"#fff",
            fontSize:20,fontWeight:800,fontFamily:FN,letterSpacing:4,cursor:"pointer",
          }}>REVIEW PICKS →</button>
        </div>
      );
    }

    if (cur.t === "scf") {
      return (
        <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",background:bg,padding:"70px 16px 24px"}}>
          {progBar}
          <div style={{textAlign:"center",marginBottom:8}}>
            <div style={{fontSize:52}}>🏆</div>
            <div style={{fontSize:40,fontFamily:BN,color:"#FCB514",letterSpacing:4,marginTop:4}}>STANLEY CUP FINAL</div>
            <div style={{fontSize:16,color:"#6a7a8a",fontFamily:FN,letterSpacing:3,marginTop:4}}>8 POINTS — TAP THE CHAMPION</div>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",gap:16,maxWidth:440,width:"100%",margin:"0 auto"}}>
            <div style={{textAlign:"center",fontSize:13,color:"#71AFE5",fontFamily:FN,letterSpacing:3,fontWeight:700}}>EASTERN CHAMPION</div>
            <div onClick={()=>doPick(picks.eastFinal)} style={{cursor:"pointer",borderRadius:14,overflow:"hidden",border:"2px solid #FCB51444"}}>
              <Strip id={picks.eastFinal} big/>
            </div>
            <div style={{textAlign:"center",fontSize:28,fontFamily:BN,color:"#FCB514",letterSpacing:8,background:"#111827",width:80,margin:"0 auto",padding:"6px 0",borderRadius:8}}>VS</div>
            <div style={{textAlign:"center",fontSize:13,color:"#FF6B35",fontFamily:FN,letterSpacing:3,fontWeight:700}}>WESTERN CHAMPION</div>
            <div onClick={()=>doPick(picks.westFinal)} style={{cursor:"pointer",borderRadius:14,overflow:"hidden",border:"2px solid #FCB51444"}}>
              <Strip id={picks.westFinal} big/>
            </div>
          </div>
        </div>
      );
    }

    const mu = getMatchup();
    if (!mu) return <div style={{minHeight:"100vh",background:bg}}/>;
    const confColor = cur.c==="east"?"#71AFE5":"#FF6B35";
    const confName = cur.c==="east"?"EASTERN CONFERENCE":"WESTERN CONFERENCE";

    return (
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",background:bg,padding:"70px 16px 24px"}}>
        {progBar}
        <div style={{textAlign:"center",marginBottom:12}}>
          <div style={{fontSize:14,color:confColor,fontFamily:FN,letterSpacing:4,fontWeight:700}}>{confName}</div>
          <div style={{fontSize:38,fontFamily:BN,color:"#fff",letterSpacing:3,marginTop:4}}>{cur.r}</div>
          <div style={{fontSize:15,color:"#5a7a9a",fontFamily:FN,letterSpacing:2,marginTop:2}}>{cur.l}</div>
        </div>
        <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",gap:16,maxWidth:440,width:"100%",margin:"0 auto"}}>
          <div style={{textAlign:"center",fontSize:15,color:"#4a6a8a",fontFamily:FN,letterSpacing:3,fontWeight:700,marginBottom:4}}>TAP TO SELECT WINNER</div>
          <div onClick={()=>doPick(mu.top)} style={{cursor:"pointer",borderRadius:14,overflow:"hidden",border:"2px solid rgba(255,255,255,0.1)"}}>
            <Strip id={mu.top} big/>
          </div>
          <div style={{textAlign:"center",fontSize:28,fontFamily:BN,color:"#2a3a4a",letterSpacing:8,background:"#111827",width:80,margin:"0 auto",padding:"6px 0",borderRadius:8,border:"1px solid #1e293b"}}>VS</div>
          <div onClick={()=>doPick(mu.bottom)} style={{cursor:"pointer",borderRadius:14,overflow:"hidden",border:"2px solid rgba(255,255,255,0.1)"}}>
            <Strip id={mu.bottom} big/>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
