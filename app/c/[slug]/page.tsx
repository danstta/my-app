import Link from "next/link";
import { categoryBySlug } from "../../../lib/categories";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = categoryBySlug(params.slug);
  if (!cat) {
    return (
      <main className="panel">
        <h2>Unknown category</h2>
        <p>Return home and try again.</p>
        <Link className="button" href="/">
          Home
        </Link>
      </main>
    );
  }

  return (
    <main className="panel">
      <div className="category-banner" style={{ borderColor: cat.color, background: "#0f1220" }}>
        <h2 style={{ color: cat.color }}>{cat.name}</h2>
        <p>{cat.intro}</p>
      </div>
      <div style={{ marginTop: 30, marginBottom: 20}}>
        <Link className="button" href={`/p/${cat.startId}`}>
          Kreni →
        </Link>
      </div>
    </main>
  );
}
