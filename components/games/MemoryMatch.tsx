"use client";

import { useMemo, useState } from "react";

type Card = { id: number; emoji: string; open: boolean; found: boolean };

export default function MemoryMatch(props: {
  emojis: string[];
  onComplete?: () => void;
}) {
  const deck = useMemo(() => {
    const pairs = props.emojis.flatMap((e, idx) => [
      { id: idx * 2, emoji: e },
      { id: idx * 2 + 1, emoji: e },
    ]);
    // Shuffle
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    return pairs.map((p) => ({ ...p, open: false, found: false })) as Card[];
  }, [props.emojis]);

  const [cards, setCards] = useState<Card[]>(deck);
  const [selected, setSelected] = useState<number[]>([]);

  function click(idx: number) {
    const c = cards[idx];
    if (c.open || c.found) return;
    let next = cards.slice();
    next[idx] = { ...c, open: true };
    const sel = [...selected, idx];
    setCards(next);
    setSelected(sel);

    if (sel.length === 2) {
      const [a, b] = sel;
      const match = next[a].emoji === next[b].emoji;
      setTimeout(() => {
        next = next.slice();
        if (match) {
          next[a] = { ...next[a], found: true };
          next[b] = { ...next[b], found: true };
        } else {
          next[a] = { ...next[a], open: false };
          next[b] = { ...next[b], open: false };
        }
        setCards(next);
        setSelected([]);
        if (next.every((x) => x.found) && props.onComplete) props.onComplete();
      }, 500);
    }
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(60px, 1fr))",
        gap: 10,
        maxWidth: 420,
        margin: "10px auto",
      }}
    >
      {cards.map((c, i) => (
        <button
          key={c.id}
          onClick={() => click(i)}
          className="button"
          style={{
            padding: 14,
            height: 72,
            background: c.open || c.found ? "#1e2344" : "#0f1324",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span style={{ fontSize: 24 }}>{c.open || c.found ? c.emoji : "❔"}</span>
        </button>
      ))}
    </div>
  );
}