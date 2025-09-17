export type PuzzleType = "text" | "choice" | "slider";

export type GameType = "maps" | "scramble" | "memory";

export type Puzzle = {
  id: number;
  title: string;
  type: PuzzleType;
  prompt: string;
  hint: string;
  gift?: string;
  options?: string[]; // for "choice"
  slider?: { min: number; max: number; step?: number; unit?: string };
  category: string; // slug
  game?: GameType;
  gameData?: Record<string, any>;
};

export const TOTAL = 21;

export const puzzles: Puzzle[] = [
  {
    id: 1,
    title: "!atšop algitS",
    type: "text",
    prompt:
      "Pronađi dve iste, lako je!",
    hint: "Sve je ovo bilo beskorisno hihihi, Stigla pošta što znači da moraš da odeš da je uzmeš :)",
    gift: "Ovo nije poklon ali kako ćeš sve ove poklone bez neke korpe!",
    category: "warmup",
    game: "memory",
    gameData: {
      // Simple 6-pair memory to warm up
      emojis: ["💜", "🌟", "🎧", "☕", "📸", "🦆"],
    },
  },
  {
    id: 2,
    title: "Kava",
    type: "text",
    prompt:
      "Koja banka je najbliža mestu gde smo se prvi put sreli :)?",
    hint: "Nema hinta otvori google maps pa si nađi sama!",
    gift: "Kao što si primetila ova igra je zelena pa dobijaš joj nešto zeleno!",
    category: "warmup",
    game: "maps",
    gameData: {
      query: "Hrvatska Vukovar Zimska Lučica", // customize to your spot
    },
  },
  {
    id: 3,
    title: "Naša pesma",
    type: "text",
    prompt:
      "Upiši ime naše pesme :)",
    hint: "Balašević logičnoooooo",
    gift: "Da si ne slomiš sluške treba ti nešto da ih zaštiti wuhu!",
    category: "warmup",
  },
  {
    id: 4,
    title: "🕯️ + 💚",
    type: "text",
    prompt:
      "Napravi si srce od sveća i kad to napraviš dobićeš kod da nastaviš dalje!",
    hint: "🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥",
    gift: "Da nastaviš dalje trebaće ti ova činija da staviš jednu preostalu sveću unutra :)",
    category: "warmup",
  },
  {
    id: 5,
    title: "Šuma",
    type: "text",
    prompt: "Kapa na glavi, a kišobran nisam,\n" +
    "u šumi rastem, al’ nisam ni lisa.\n" +
    "Tko me skuplja, košaricu skriva,\n" +
    "jer sam ja mala, ali sretna _ _ _ _ _!",
    hint: "Kak ne znaš ovoo??",
    gift: "Pozicioniraj 4 gljive oko srca koje si napravila!",
    category: "funny",
  },
  {
    id: 6,
    title: "🟡🔻🟡",
    type: "slider",
    prompt: "Nađi rešenje zagonetke i postavi koji broj dobijaš kada pomnožiš broj slova te reči sa 4",
    hint: "Count them. No tricks.",
    slider: { min: 1, max: 50, step: 1 },
    gift: "Postavi 2 paprike negde po svojoj želji!",
    category: "funny",
  },
  {
    id: 7,
    title: "🟡",
    type: "text",
    prompt:
      "Trebaće ti papir i olovka za ovo hihihi --> .medo en ejdgin ovarpaz ila ,menatsen rečevan ,međod ortujU",
    hint: "Obrnuto čitanje sekana!",
    gift: "Da nastaviš dalje moraš ih nositi na glavi!",
    category: "funny",
  },
  {
    id: 8,
    title: "Grad",
    type: "text",
    prompt: "Koji grad smo prvi put posetili zajedno?",
    hint: "🇨🇿",
    gift: "Mali slatkiš koji smo svi voleli (nadam se i ti)!",
    category: "practical",
  },
  {
    id: 9,
    title: "🟤🍂",
    type: "text",
    prompt: "Zagonetka: Ujutro sam prva, bez mene se ne kreće, u ruku me primiš, toplina poteče...",
    hint: "☕",
    gift: "Da je imaš di sipat i da prošiirš kolekciju nadam se da je nemaš već :)",
    category: "practical",
  },
  {
    id: 10,
    title: "🌶️ Paprike iznenađenja",
    type: "text",
    prompt: "Pred tobom su crvene paprike koje si dobila. Otvori ih :)",
    hint: "Ne boj se, nisu ljutee samo pazljivo izvuci papiriće i složi ih kao slagalicu!",
    gift: "Mapa će ti biti jako bitna za nastavak tvoje male avanture 🏴‍☠️",
    category: "beauty",
  },
  {
    id: 11,
    title: "😃",
    type: "choice",
    prompt: "Kako se provodiš trenutno?",
    hint: "😏------------------------------------------------->😎",
    options: ["Sranje", "Onako", "Odlično", "Fenomenalno"],
    gift: "Pošto se provodiš fenomenalno bilo bi lepo da izvadiš tu čokoladu iz frižidera da se zasladimoo 🍫",
    category: "beauty",
  },
  {
    id: 12,
    title: "Yes/No",
    type: "text",
    prompt: "Šta nema čovečuljak iznad meseca na sebi?",
    hint: "De pogledaj dobro rukeeee?",
    gift: "On si nema nokte al ti imaš! 💅💅💅💅",
    category: "edible",
  },
  {
    id: 13,
    title: "Matematika hiihihhihi",
    type: "text",
    prompt:
      "Saberi sve cifre tvog srpskog broja telefona i pomnoži ih sa brojem patuljka na mapi.",
    hint: "Računaj si šta čekaš?? treba ti i 381 deo isto.",
    gift: "Bravo dobro računaš a kao nagrada ideeee... korektor za šminkanjee wuu huuu!",
    category: "cozy",
  },
  {
    id: 14,
    title: "💚",
    type: "choice",
    prompt: "Podesetnik da te punoo punoo vojiim! A jel ti mene vojiš?",
    options: ["Da", "Daa", "Daaa", "Daaaaaaaaaaaaaaaaaaa"],
    hint: "💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚",
    gift: "Da se opustiš :)",
    category: "cozy",
  },
  {
    id: 15,
    title: "Slatkiš",
    type: "text",
    prompt: "Koji restoran gde smo stalno jeli je obeležio naš početak?",
    hint: "Krepe + Trg",
    gift: "Slatkišiiii",
    category: "nerdy",
  },
  {
    id: 16,
    title: "Cafe street",
    type: "text",
    prompt:
      "Enter the street name of our go-to cafe (lowercase, no spaces).",
    hint: "Whatever your real cafe street is.",
    gift: "Gift #16 (Experience): Coffee date voucher.",
    category: "nerdy",
  },
  {
    id: 17,
    title: "Initials",
    type: "text",
    prompt: "Type our two initials together, e.g., 'dj' (lowercase).",
    hint: "Your letters + mine.",
    gift: "Gift #17 (Nerdy): Keycap with initial.",
    category: "experience",
  },
  {
    id: 18,
    title: "Favorite color",
    type: "choice",
    prompt: "Pick my favorite color.",
    hint: "You know this. Customize in answers.",
    options: ["mint", "lilac", "black", "blue"],
    gift: "Gift #18 (Cozy): Blanket.",
    category: "experience",
  },
  {
    id: 19,
    title: "Two rivers",
    type: "text",
    prompt: "Belgrade’s two rivers (no spaces, lowercase, any order).",
    hint: "Sava and Danube (Dunav).",
    gift: "Gift #19 (Personal): Polaroid with UV note.",
    category: "personal",
  },
  {
    id: 20,
    title: "Date math",
    type: "text",
    prompt:
      "Add our day and month numbers (DD + MM). Enter the sum (digits).",
    hint: "Use your real dates.",
    gift: "Gift #20 (Funny): Meme mug.",
    category: "personal",
  },
  {
    id: 21,
    title: "Final key",
    type: "text",
    prompt:
      "The final word is our promise: six letters. Same as puzzle 7 result.",
    hint: "Same as the acrostic.",
    gift:
      "Gift #21 (Finale): Your letter + album + Spotify glass plaque of our song.",
    category: "personal",
  },
];

export function getPuzzle(id: number): Puzzle | undefined {
  return puzzles.find((p) => p.id === id);
}