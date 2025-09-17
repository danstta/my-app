"use client";

import { useEffect, useState } from "react";
import { Puzzle } from "../lib/puzzles";
import MemoryMatch from "./games/MemoryMatch";

export default function PuzzleInput(props: {
  puzzle: Puzzle;
  onSolved: () => void;
}) {
  const { puzzle, onSolved } = props;

  const [answer, setAnswer] = useState("");
  const [choice, setChoice] = useState<string | null>(null);
  const [slider, setSlider] = useState<number>(puzzle.slider?.min ?? 0);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Gating for side-game: if present, show first
  const [gameReady, setGameReady] = useState(puzzle.game ? false : true);

  useEffect(() => {
    setAnswer("");
    setChoice(null);
    setSlider(puzzle.slider?.min ?? 0);
    setMsg(null);
    setGameReady(puzzle.game ? false : true);
  }, [puzzle]);

  async function submit() {
    setLoading(true);
    setMsg(null);
    let payload: string = answer;
    if (puzzle.type === "choice") {
      payload = (choice ?? "").toString();
    } else if (puzzle.type === "slider") {
      payload = slider.toString();
    }

    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: puzzle.id, answer: payload }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        reason?: string;
      };
      if (data.ok) {
        setMsg("Correct! 🎉");
        setTimeout(onSolved, 600);
      } else {
        setMsg(data.reason ?? "Not yet. Try again.");
      }
    } catch (e) {
      setMsg("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function renderGame() {
    if (!puzzle.game || gameReady) return null;
    if (puzzle.game === "maps") {
      const q = puzzle.gameData?.query || "coffee belgrade";
      return (
        <div className="hint" style={{ marginTop: 8 }}>
          
          <div className="row" style={{ marginTop: 8 }}>
            <a
              className="button"
              href={`https://www.google.com/maps/search/${encodeURIComponent(q)}`}
              target="_blank"
              rel="noreferrer"
            >
              Otvori Google Maps
            </a>
            <button className="button secondary" onClick={() => setGameReady(true)}>
              Upiši rešenje
            </button>
          </div>
        </div>
      );
    }
    if (puzzle.game === "memory") {
      return (
        <div className="hint" style={{ marginTop: 8 }}>
          Quick warmup: match all the pairs.
          <MemoryMatch
            emojis={puzzle.gameData?.emojis || ["💜", "☕", "📸", "🦆", "🌟", "🎧"]}
            onComplete={() => setGameReady(true)}
          />
          <div className="row" style={{ justifyContent: "center" }}>
            <button className="button" onClick={() => setGameReady(true)}>
              Continue
            </button>
          </div>
        </div>
      );
    }
    return (<div className="row" style={{ justifyContent: "center" }}>
            <button className="button" onClick={() => setGameReady(true)}>
              Continue
            </button>
          </div>);
  }

  return (
    <div>
      <p style={{ marginTop: 6 }}>{puzzle.prompt}</p>

      {!gameReady && renderGame()}

      {(gameReady || !puzzle.game) && (
        <>
          {puzzle.type === "text" && (
            <input
              className="input"
              placeholder="Upiši rešenje"
              autoComplete="off"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          )}

          {puzzle.type === "choice" && (
            <div className="row" style={{ marginTop: 6 }}>
              {puzzle.options?.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setChoice(opt)}
                  className="button2"
                  style={{
                    background:
                      choice === opt
                        ? "linear-gradient(135deg,#3ad29f,#00c2a8)"
                        : undefined,
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {puzzle.type === "slider" && (
            <div style={{ marginTop: 12 }}>
              <input
                className="range"
                type="range"
                min={puzzle.slider?.min}
                max={puzzle.slider?.max}
                step={puzzle.slider?.step ?? 1}
                value={slider}
                onChange={(e) => setSlider(Number(e.target.value))}
              />
              <div className="row" style={{ marginTop: 8 }}>
                <span className="badge">Value</span>
                <span className="badge mono">{slider}</span>
              </div>
            </div>
          )}

          <div className="row" style={{ marginTop: 12 }}>
            <button className="button" disabled={loading} onClick={() => submit()}>
              Pošalji
            </button>
            {loading && <span className="badge mono">Checking…</span>}
            {msg && <span className="badge">{msg}</span>}
          </div>
        </>
      )}
    </div>
  );
}