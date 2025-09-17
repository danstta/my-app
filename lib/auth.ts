import crypto from "crypto";

const SECRET = process.env.SECRET || "change-me-secret-danilo";

export type Session = {
  name: string;
  dob: string; // normalized "dd.mm.yyyy"
  iat: number;
};

function hmac(input: string) {
  return crypto.createHmac("sha256", SECRET).update(input).digest("hex");
}

// Very tiny stateless token: base64(payload).hexsig
export function signSession(s: Session): string {
  const payload = Buffer.from(JSON.stringify(s)).toString("base64url");
  const sig = hmac(payload);
  return `${payload}.${sig}`;
}

export function verifySession(token?: string | null): Session | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expect = hmac(payload);
  if (expect !== sig) return null;
  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as Session;
    return data;
  } catch {
    return null;
  }
}

export function normalizeDob(input: string): string {
  // Accept "YYYY-MM-DD" or "DD.MM.YYYY" or "DD/MM/YYYY"
  const s = input.trim();
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/;
  const dotted = /^(\d{2})[./](\d{2})[./](\d{4})$/;
  if (iso.test(s)) {
    const m = s.match(iso)!;
    return `${m[3]}.${m[2]}.${m[1]}`; // dd.mm.yyyy
  }
  if (dotted.test(s)) {
    const m = s.match(dotted)!;
    return `${m[1]}.${m[2]}.${m[3]}`;
  }
  return s;
}

export function normalizeName(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}