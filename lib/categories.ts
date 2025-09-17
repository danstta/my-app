export type Category = {
  slug: string;
  name: string;
  intro: string;
  color: string;
  startId: number;
  endId: number;
};

export const categories: Category[] = [
  {
    slug: "warmup",
    name: "💚 Zagrevanje",
    intro:
      "Za početak krećemo sa laganim stvarima wuuhuu",
    color: "#5cf692ff",
    startId: 1,
    endId: 4,
  },
  {
    slug: "funny",
    name: "Vajb",
    intro:
      "U ovom delu pripremamo se za stvaranje portala!",
    color: "#f59e0b",
    startId: 5,
    endId: 7,
  },
  {
    slug: "practical",
    name: "Praktično",
    intro: "Useful little things for every day. Small upgrades, big vibes.",
    color: "#10b981",
    startId: 8,
    endId: 9,
  },
  {
    slug: "beauty",
    name: "🌶️ Hihihiii",
    intro: "🌶️🌶️🌶️🌶️🌶️🌶️🌶️🌶️🌶️🌶️🌶️",
    color: "#cd0000ff",
    startId: 10,
    endId: 11,
  },
  {
    slug: "edible",
    name: "Slatkiši",
    intro: "Sad kad smo se zasladili nastalvjamo daljee 😋",
    color: "#8e59d7ff",
    startId: 12,
    endId: 12,
  },
  {
    slug: "cozy",
    name: "Matematika",
    intro:
      "Znam da je obožavaš!",
    color: "#22d3ee",
    startId: 13,
    endId: 14,
  },
  {
    slug: "nerdy",
    name: "V o l i m ------------> t e",
    intro:
      " p u n o o o o o o o o o",
    color: "#e0f674ff",
    startId: 15,
    endId: 16,
  },
  {
    slug: "experience",
    name: "Experience",
    intro: "Moments > things. Let’s plan the next little adventures.",
    color: "#84cc16",
    startId: 17,
    endId: 18,
  },
  {
    slug: "personal",
    name: "Personal",
    intro:
      "The heart of it all. Our memories, our story, our promises. ❤️",
    color: "#fb7185",
    startId: 19,
    endId: 21,
  },
];

export function categoryForPuzzle(id: number) {
  return categories.find((c) => id >= c.startId && id <= c.endId);
}

export function categoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function nextCategoryAfter(id: number) {
  const idx = categories.findIndex(
    (c) => id >= c.startId && id <= c.endId
  );
  if (idx < 0) return null;
  return categories[idx + 1] || null;
}

export function isFirstOfCategory(id: number) {
  const cat = categoryForPuzzle(id);
  return !!cat && id === cat.startId;
}