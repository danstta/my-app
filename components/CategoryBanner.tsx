export default function CategoryBanner(props: {
  name: string;
  color: string;
  intro: string;
}) {
  return (
    <div
      className="category-banner"
      style={{
        borderColor: props.color,
        background:
          "linear-gradient(135deg, rgba(124,92,255,0.15), rgba(0,0,0,0.2))",
      }}
    >
      <h3 style={{ color: props.color, marginBottom: 6 }}>{props.name}</h3>
      <p style={{ margin: 0 }}>{props.intro}</p>
    </div>
  );
}