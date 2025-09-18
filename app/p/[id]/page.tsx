"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Hint from "../../../components/Hint";
import Progress from "../../../components/Progress";
import PuzzleInput from "../../../components/PuzzleInput";
import { getPuzzle, TOTAL } from "../../../lib/puzzles";
import { markSolved, readProgress } from "../../../lib/progress";
import {
  categoryForPuzzle,
  nextCategoryAfter,
  isFirstOfCategory,
} from "../../../lib/categories";
import CategoryBanner from "../../../components/CategoryBanner";

export default function PuzzlePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const search = useSearchParams();

  const id = Number(params.id);
  const puzzle = useMemo(() => getPuzzle(id), [id]);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(false);
    const prog = readProgress().highest;
    const skip = search.get("skip") === "1";
    if (!skip && id > 1 && prog < id - 1) {
      router.replace(`/p/${prog > 0 ? prog : 1}`);
    }
  }, [id, router, search]);

  if (!puzzle) {
    return (
      <main className="panel">
        <h2>Not found</h2>
        <p>Invalid puzzle id.</p>
      </main>
    );
  }

  function onSolved() {
    markSolved(puzzle!.id);
    setUnlocked(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new StorageEvent("storage"));
    }
  }

  const nextId = id + 1;
  const isLast = id >= TOTAL;
  const cat = categoryForPuzzle(id);

  return (
    <main className="panel">
      {isFirstOfCategory(id) && cat && (
        <div style={{ marginBottom: 12 }}>
          <CategoryBanner
            name={cat.name}
            color={cat.color}
            intro={cat.intro}
          />
        </div>
      )}

      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2>
          Portal {puzzle.id}: {puzzle.title}
        </h2>
        <span className="badge mono">
          {id}/{TOTAL}
        </span>
      </div>

      {!unlocked ? (
        <>
          <PuzzleInput puzzle={puzzle} onSolved={onSolved} />
          <Hint text={puzzle.hint} />
        </>
      ) : (
        <>
          <h3>USPEŠNO! 🎉</h3>
          {puzzle.gift && <p>{puzzle.gift}</p>}
          <div className="row" style={{ marginTop: 14 }}>
            {!isLast ? (
              <button
                className="button"
                onClick={() => {
                  const nextCat = nextCategoryAfter(puzzle.id);
                  if (nextCat && nextId === nextCat.startId) {
                    router.push(`/c/${nextCat.slug}`);
                  } else {
                    router.push(`/p/${nextId}`);
                  }
                }}
              >
                Dalje
              </button>
            ) : (
              <button
                className="button"
                onClick={() => router.push("/completed")}
              >
                Idi na kraj              </button>
            )}
          </div>
        </>
      )}

      <div style={{ marginTop: 18 }}>
        <Progress />
      </div>
    </main>
  );
}