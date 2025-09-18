import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "../../lib/auth";

export default async function PuzzleLayout(props: { children: React.ReactNode }) {
  const coks = await cookies();
  const token = coks.get("portal_auth")?.value || null;
  const sess = verifySession(token);
  if (!sess) redirect("/");
  return <>{props.children}</>;
}