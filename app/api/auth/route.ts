import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  normalizeDob,
  normalizeName,
  signSession,
  verifySession,
} from "../../../lib/auth";

// Set your girlfriend's name and DOB here or via env vars
const ALLOWED_NAME =
  process.env.ALLOWED_NAME?.toLowerCase() || "Milica"; // edit
const ALLOWED_DOB =
  (process.env.ALLOWED_DOB && process.env.ALLOWED_DOB.toLowerCase()) ||
  "18.09.2004."; // dd.mm.yyyy (edit)

export async function POST(req: NextRequest) {
  const { name, dob } = (await req.json()) as {
    name?: string;
    dob?: string;
  };

  const n = normalizeName(name ?? "");
  const d = normalizeDob(dob ?? "").toLowerCase();

  const ok = n === normalizeName(ALLOWED_NAME) && d === ALLOWED_DOB;

  if (!ok) {
    return NextResponse.json(
      { ok: false, reason: "Wrong name or date of birth." },
      { status: 401 }
    );
  }

  const token = signSession({
    name: n,
    dob: d,
    iat: Date.now(),
  });

  cookies().set("portal_auth", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const c = cookies().get("portal_auth")?.value || null;
  const sess = verifySession(c);
  return NextResponse.json({ ok: !!sess, session: sess || null });
}

export async function DELETE() {
  cookies().delete("portal_auth");
  return NextResponse.json({ ok: true });
}