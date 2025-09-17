export const metadata = {
  title: "21 Portal",
  description:
    "❤️.",
};

import "./globals.css";
import Link from "next/link";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <div className="brand">
              <div className="brand-badge" />
              <Link href="/">21 Portal</Link>
            </div>
          </header>
          <main>
            {props.children}
          </main>
          <footer>
            Napravljeno za Milicu od srca. ~tvoj bubić
          </footer>
        </div>
      </body>
    </html>
  );
}