"use client";

import { useState } from "react";

export default function Hint(props: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 12 }}>
      <button className="button1" onClick={() => setOpen((x) => !x)}>
        {open ? "Sakrij hint" : "Prikaži hint"}
      </button>
      {open && <div className="hint" style={{ marginTop: 10 }}>{props.text}</div>}
    </div>
  );
}