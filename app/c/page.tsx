import Link from "next/link";
import { categoryBySlug } from "../../../lib/categories";

export default function CategoryIntro(props: {
  params: { slug: string };
}) {
  const cat = categoryBySlug(props.params.slug);
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
      <div
        className="category-banner"
        style={{ borderColor: cat.color, background: "#101428" }}
      >
        <h2 style={{ color: cat.color }}>{cat.name}</h2>
        <p>{cat.intro}</p>
        <p className="mono" style={{ opacity: 0.85 }}>
          P.S. You’ve got this. I’m cheering for you!
        </p>
      </div>
      <div className="row" style={{ marginTop: 16 }}>
        <Link className="button" href={`/p/${cat.startId}`}>
          Enter {cat.name} →
        </Link>
        <Link className="button secondary" href="/">
          Home
        </Link>
      </div>
    </main>
  );
}