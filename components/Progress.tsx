"use client";

import { useEffect, useState } from "react";
import { TOTAL } from "../lib/puzzles";
import { readProgress } from "../lib/progress";

export default function Progress() {
  const [pct, setPct] = useState(0);
  const [num, setNum] = useState(0);

  useEffect(() => {
    const p = readProgress();
    setNum(p.highest);
    setPct(Math.round((p.highest / TOTAL) * 100));
    const onStorage = () => {
      const s = readProgress();
      setNum(s.highest);
      setPct(Math.round((s.highest / TOTAL) * 100));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="badge">Progress</span>
        <span className="badge mono">
          {num}/{TOTAL} • {pct}%
        </span>
      </div>
      <div className="progress-wrap" style={{ marginTop: 8 }}>
        <div className="progress-bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}