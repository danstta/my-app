"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Progress from "../components/Progress";

export default function HomePage() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [authed, setAuthed] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((d) => setAuthed(!!d.ok))
      .finally(() => setChecking(false));
  }, []);

  async function login() {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, dob }),
      });
      const data = await res.json();
      if (data.ok) {
        setAuthed(true);
        setMsg("Dobrodošla ❤️");
      } else {
        setMsg(data.reason || "Pogrešno ime ili datum rođenja ova igra je samo za Milicu!");
      }
    } catch {
      setMsg("Network error.");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    setAuthed(false);
  }

  return (
    <main className="panel">
      <h1 style={{ textAlign: "center" }}>Dobrodošla bubić 💚</h1>
      <p style={{ textAlign: "center" }}>
        Reši puzle online i uživo i za svako uspešno (i neuspešno) rešavanje dobijaš po neki poklončić. Nadam se da će ti biti zanimljivoo LOL XD.
      </p>

      {!checking && !authed && (
        <div className="col" style={{ maxWidth: 520, margin: "0 auto" }}>
          <div className="row" style={{ width: "100%" }}>
            <input
              className="input"
              placeholder="Tvoje ime"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="row" style={{ width: "100%" }}>
            <input
              className="input"
              placeholder="Datum rođenja u formatu (DD.MM.YYYY)"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <button className="button" onClick={login} disabled={loading}>
            {loading ? "Checking…" : "Kreni"}
          </button>
          {msg && (
            <div className="hint" style={{ textAlign: "center" }}>
              {msg}
            </div>
          )}
        </div>
      )}

      {authed && (
        <>
          <div
            className="row"
            style={{
              marginTop: 12,
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <Link className="button" href="/c/warmup">
              Kreni →
            </Link>
            <Link className="button secondary" href="/p/1">
              Continue →
            </Link>
            <button className="button secondary" onClick={logout}>
              Log out
            </button>
          </div>
          <div style={{ marginTop: 18 }}>
            <Progress />
          </div>
          <p style={{ marginTop: 16, textAlign: "center" }}>
            Ako ti je nešto previše teško, ja ću ti pomoći laganoo 😜
          </p>
        </>
      )}
    </main>
  );
}