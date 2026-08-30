import type { BookComment } from "@/lib/types/books";

interface SeedComment {
  slug: string;
  author: string;
  content: string;
  createdAt: string;
}

const entries: SeedComment[] = [
  {
    slug: "frankenstein",
    author: "Marta",
    content:
      "Went in expecting the film monster and got a creature who reads Paradise Lost and argues better than anyone else in the book. Nothing prepared me for that.",
    createdAt: "2025-04-12",
  },
  {
    slug: "frankenstein",
    author: "Tomáš",
    content:
      "The framing device does a lot of quiet work — by the time you reach the creature's account you have been handed it through two unreliable narrators.",
    createdAt: "2025-06-20",
  },
  {
    slug: "dracula",
    author: "Jonas",
    content:
      "The epistolary format still works. The first four chapters in the castle are as good as anything in the genre; the London section sags a little in the middle.",
    createdAt: "2025-05-02",
  },
  {
    slug: "pride-and-prejudice",
    author: "Elif",
    content:
      "Read it for the romance, stayed for Mr Bennet being witheringly rude to everyone in his own house.",
    createdAt: "2025-05-19",
  },
  {
    slug: "pride-and-prejudice",
    author: "Sam",
    content:
      "The letter in volume two is the hinge of the whole novel and it is basically a very long correction of the record.",
    createdAt: "2025-11-08",
  },
  {
    slug: "moby-dick",
    author: "Petr",
    content:
      "Skip the cetology chapters on a first read if you must, but come back for them. They are the reason the ending lands the way it does.",
    createdAt: "2025-06-14",
  },
  {
    slug: "moby-dick",
    author: "Aoife",
    content: "Three attempts over ten years. Finished it on the third. Worth it.",
    createdAt: "2026-02-21",
  },
  {
    slug: "the-adventures-of-sherlock-holmes",
    author: "Nikola",
    content:
      "The Red-Headed League is the perfect short mystery — the absurd premise turns out to be the most efficient possible cover for the actual crime.",
    createdAt: "2025-07-03",
  },
  {
    slug: "the-time-machine",
    author: "Rahul",
    content:
      "The Eloi and Morlocks get all the attention but the last few pages, on the beach under a dying sun, are the part I still think about.",
    createdAt: "2025-08-01",
  },
  {
    slug: "the-war-of-the-worlds",
    author: "Greta",
    content:
      "Written in 1898 and still the best account of what an ordinary person actually does during a collapse: walks, hides, and gets bad information.",
    createdAt: "2025-09-11",
  },
  {
    slug: "twenty-thousand-leagues-under-the-seas",
    author: "Milan",
    content:
      "Verne's inventory of the Nautilus reads like a spec sheet and I mean that as praise.",
    createdAt: "2025-08-27",
  },
  {
    slug: "alices-adventures-in-wonderland",
    author: "Kaja",
    content:
      "It is not nonsense, it is logic applied without mercy to nonsense premises. Very different thing.",
    createdAt: "2025-09-05",
  },
  {
    slug: "treasure-island",
    author: "Owen",
    content:
      "Long John Silver is the whole book. Every scene he is in gets better and every scene he isn't drags slightly.",
    createdAt: "2025-10-02",
  },
  {
    slug: "strange-case-of-dr-jekyll-and-mr-hyde",
    author: "Béatrice",
    content:
      "Worth remembering the original readers did not know the twist. Read as a mystery rather than a fable it is much stranger.",
    createdAt: "2025-10-19",
  },
  {
    slug: "the-picture-of-dorian-gray",
    author: "Ivan",
    content:
      "Lord Henry says something quotable roughly every fourth line and almost all of it is poison. That is the joke.",
    createdAt: "2025-11-14",
  },
  {
    slug: "jane-eyre",
    author: "Hana",
    content:
      "The Lowood chapters are bleak enough that Thornfield feels like a relief, which is exactly the trap the book is setting.",
    createdAt: "2025-12-01",
  },
  {
    slug: "wuthering-heights",
    author: "Fergus",
    content:
      "Everyone remembers it as a love story. It is a two-generation account of property, revenge and appalling parenting.",
    createdAt: "2025-12-12",
  },
  {
    slug: "great-expectations",
    author: "Lena",
    content:
      "The opening in the churchyard and the last scene in the garden are doing the same thing twenty years apart. Dickens at his most controlled.",
    createdAt: "2026-01-09",
  },
  {
    slug: "crime-and-punishment",
    author: "Dmitri",
    content:
      "Porfiry Petrovich is the most interesting detective in fiction precisely because he never really investigates. He just talks until Raskolnikov cracks.",
    createdAt: "2026-01-22",
  },
  {
    slug: "crime-and-punishment",
    author: "Sára",
    content:
      "The fever passages are hard going but the disorientation is the point — you are meant to lose track of what is real alongside him.",
    createdAt: "2026-05-30",
  },
  {
    slug: "the-brothers-karamazov",
    author: "Andrej",
    content:
      "The Grand Inquisitor chapter can be read alone and often is, but it hits differently when you know it is Ivan trying to win an argument with his brother.",
    createdAt: "2026-02-04",
  },
  {
    slug: "anna-karenina",
    author: "Ronja",
    content:
      "Levin mowing the field for a day is somehow the most alive chapter in a novel that also contains a horse race and a suicide.",
    createdAt: "2026-02-14",
  },
  {
    slug: "the-count-of-monte-cristo",
    author: "Yusuf",
    content:
      "Twelve hundred pages and not one of them is slow. The unabridged edition is worth the commitment.",
    createdAt: "2026-03-02",
  },
  {
    slug: "don-quixote",
    author: "Clara",
    content:
      "Part two, where the characters have read part one and know who Quixote is, was four hundred years early to that idea.",
    createdAt: "2026-03-15",
  },
  {
    slug: "adventures-of-huckleberry-finn",
    author: "Marcus",
    content:
      "Chapter 31 — 'All right, then, I'll go to hell' — is the whole moral argument of the book in one line, and Huck thinks he is damning himself.",
    createdAt: "2026-03-28",
  },
  {
    slug: "heart-of-darkness",
    author: "Ingrid",
    content:
      "Short, and heavier than books five times the length. The frame narrator on the Thames at the start and end changes what the middle means.",
    createdAt: "2026-04-05",
  },
  {
    slug: "the-metamorphosis",
    author: "Josef",
    content:
      "The horror is not the insect. It is that his family adjusts to it within about a week.",
    createdAt: "2026-04-18",
  },
  {
    slug: "the-trial",
    author: "Wei",
    content:
      "Unfinished, and the incompleteness suits it. The chapters can be reordered without much damage, which is either a flaw or the point.",
    createdAt: "2026-04-26",
  },
  {
    slug: "the-great-gatsby",
    author: "Nadia",
    content:
      "Nick spends the entire novel insisting he is honest and reserving judgement, and does neither. Best unreliable narrator in American fiction.",
    createdAt: "2026-05-08",
  },
  {
    slug: "the-secret-garden",
    author: "Priya",
    content:
      "Read it at eight and again at thirty. At eight it is about a garden. At thirty it is about grief.",
    createdAt: "2026-05-16",
  },
  {
    slug: "the-wonderful-wizard-of-oz",
    author: "Bruno",
    content:
      "The book is much odder than the film — the silver shoes, the china country, the hammer-heads. Worth reading even if you know the story.",
    createdAt: "2026-05-24",
  },
  {
    slug: "little-women",
    author: "Emese",
    content:
      "Alcott did not want to marry Jo off and you can feel the resistance in the prose of the second half.",
    createdAt: "2026-06-06",
  },
  {
    slug: "the-yellow-wallpaper",
    author: "Astrid",
    content:
      "Twenty pages. Read it in one sitting and then read the last paragraph again.",
    createdAt: "2026-06-11",
  },
  {
    slug: "we",
    author: "Kiran",
    content:
      "Orwell reviewed this before writing Nineteen Eighty-Four and it shows. Zamyatin's version is stranger and more mathematical.",
    createdAt: "2026-06-19",
  },
  {
    slug: "flatland",
    author: "Théo",
    content:
      "Half geometry lesson, half savage satire of Victorian class and gender. The maths is the easier half to take.",
    createdAt: "2026-06-27",
  },
  {
    slug: "the-hound-of-the-baskervilles",
    author: "Rosa",
    content:
      "The best of the novels because Watson is alone for most of it and has to actually do the work.",
    createdAt: "2026-07-04",
  },
  {
    slug: "the-woman-in-white",
    author: "Callum",
    content:
      "Count Fosco, his white mice, and his absolute politeness make him far more frightening than any straightforward villain would be.",
    createdAt: "2026-07-12",
  },
  {
    slug: "the-turn-of-the-screw",
    author: "Miriam",
    content:
      "I have read it three times and changed my mind about the governess every time. That is not a flaw, it is the machine working.",
    createdAt: "2026-07-19",
  },
  {
    slug: "the-mysterious-affair-at-styles",
    author: "Gareth",
    content:
      "Christie's first, and the mechanics are already fully formed. The timetable of who was where is airtight.",
    createdAt: "2026-08-02",
  },
  {
    slug: "middlemarch",
    author: "Solveig",
    content:
      "The famous line about hearing the grass grow and the squirrel's heartbeat is buried in chapter twenty and it stops you dead.",
    createdAt: "2026-08-09",
  },
  {
    slug: "north-and-south",
    author: "Deniz",
    content:
      "Gaskell actually knew mill towns, and it shows — the strike is written from both sides without either becoming a lecture.",
    createdAt: "2026-08-15",
  },
  {
    slug: "carmilla",
    author: "Lucia",
    content:
      "Predates Dracula by decades and is far more atmospheric per page. The dreamlike ambiguity does more than Stoker's paperwork.",
    createdAt: "2026-08-20",
  },
];

export const seedComments: Record<string, BookComment[]> = entries.reduce<
  Record<string, BookComment[]>
>((grouped, entry, index) => {
  const comment: BookComment = {
    id: `seed-${index + 1}`,
    author: entry.author,
    content: entry.content,
    createdAt: entry.createdAt,
  };
  (grouped[entry.slug] ??= []).push(comment);
  return grouped;
}, {});

export const seedCommentCount = entries.length;

export const seedCommentDates: string[] = entries.map((entry) => entry.createdAt);
