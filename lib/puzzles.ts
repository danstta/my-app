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
    title: "Wordle :)",
    type: "text",
    prompt:
      "Ne rešavaj igru nego reši naslov.",
    hint: "",
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
    title: "Lokacija",
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
    gift: "👏👏👏👏👏",
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
    title: "🎀",
    type: "text",
    prompt: "Na prstima.",
    hint: "De pogledaj dobro rukeeee?",
    gift: "💅💅💅💅",
    category: "edible",
  },
  {
    id: 13,
    title: "Matematika hiihihhihi",
    type: "text",
    prompt:
      "Saberi sve cifre tvog srpskog broja telefona i pomnoži ih sa brojem gljiva ispred sebe.",
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
    title: "",
    type: "text",
    prompt:
      "U kom gradu smo se prvi put poljubili?",
    hint: "Hmmmmm?",
    gift: "Kupon za Danilovu masažu (priceless)",
    category: "nerdy",
  },
  {
    id: 17,
    title: "💚",
    type: "choice",
    prompt: "Da li me vojiš?",
    hint: "💚",
    options: ["Da"],
    gift: "😙😙😙😙😙😙😙😙😙",
    category: "experience",
  },
  {
    id: 18,
    title: "🟢",
    type: "choice",
    prompt: "Tvoja omiljena boja?",
    hint: "zelena",
    options: ["mint", "tamna", "svetla"],
    gift: "🥺💚",
    category: "experience",
  },
  {
    id: 19,
    title: "Film",
    type: "choice",
    prompt: "Koja nas boja opisuje?",
    options: ["Kliknime"],
    hint: "hm?",
    gift: "Nadam se da ti se svidja!",
    category: "personal",
  },
  {
    id: 20,
    title: "🫐🫐🫐",
    type: "text",
    prompt:
      "Kako se zoveeš?",
    hint: "?",
    gift: "🫐🫐🫐🫐🫐",
    category: "personal",
  },
  {
    id: 21,
    title: "Čestitka",
    type: "choice",
    prompt:
      "Volim te, srećan rođendanko!",
    hint: ":)",
    options: ["VolimTe"],
    gift:
      "Čestitka!",
    category: "personal",
  },
];

export function getPuzzle(id: number): Puzzle | undefined {
  return puzzles.find((p) => p.id === id);
}