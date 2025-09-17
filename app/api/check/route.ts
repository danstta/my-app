import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "../../../lib/auth";

/**
 * Normalize: lowercase, trim, Serbian diacritics to ASCII, remove non-alnum.
 * Example: "03:14" -> "0314", "ljubav" -> "ljubav", "ć" -> "c", "đ" -> "dj".
 */
function norm(input: string) {
  let s = (input || "").toLowerCase().trim();
  const map: Record<string, string> = {
    č: "c",
    ć: "c",
    š: "s",
    ž: "z",
    đ: "dj",
    Č: "c",
    Ć: "c",
    Š: "s",
    Ž: "z",
    Đ: "dj",
  };
  s = s
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("");
  s = s.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  s = s.replace(/[^a-z0-9]/g, "");
  return s;
}

/**
 * Answers are normalized with norm(). Customize these to your real clues!
 */
const ANSWERS: Record<string, string[]> = {
  "1": ["earth"], // Kutija
  "2": ["erste"], // Maskica za telefon
  "3": ["ringispil"], // Naša pesma + sveće u obliku srca
  "4": ["osmeh"], // Zelena činija za ukras + staviti jednu sveću unutra!
  "5": ["gljiva"],
  "6": ["28"],
  "7": ["sunce"],
  "8": ["prag"],
  "9": ["kava"],
  "10": ["blago"],
  "11": ["fenomenalno"],
  "12": ["nokte"],
  "13": ["312"], // 312 = 52 * 6
  "14": ["daaaaaaaaaaaaaaaaaaa"],
  "15": ["hari"],
  "16": ["nemanjina", "knezmihailova", "terazije"], // pick your real street
  "17": ["dj", "ad", "da"], // set your actual initials together
  "18": ["mint"], // choose the correct one
  "19": ["savadunav", "dunavsava"],
  "20": ["42"], // replace with DD+MM
  "21": ["ljubav"],
};

export async function POST(req: NextRequest) {
  // Require session
  const token = cookies().get("portal_auth")?.value || null;
  if (!verifySession(token)) {
    return NextResponse.json(
      { ok: false, reason: "Not authorized." },
      { status: 401 }
    );
  }

  try {
    const { id, answer } = (await req.json()) as {
      id?: number | string;
      answer?: string;
    };
    if (!id || typeof answer !== "string") {
      return NextResponse.json(
        { ok: false, reason: "Bad request." },
        { status: 400 }
      );
    }
    const key = String(id);
    const bucket = ANSWERS[key];
    if (!bucket) {
      return NextResponse.json(
        { ok: false, reason: "Unknown puzzle." },
        { status: 404 }
      );
    }
    const got = norm(answer);
    const ok = bucket.some((x) => x === got);
    return NextResponse.json({ ok, reason: ok ? undefined : "Try again." });
  } catch (e) {
    return NextResponse.json(
      { ok: false, reason: "Server error." },
      { status: 500 }
    );
  }
}