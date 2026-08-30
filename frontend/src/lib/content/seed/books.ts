import type { Book, BookLink } from "@/lib/types/books";

/**
 * The bundled collection: public-domain titles with real metadata.
 *
 * Outbound links are built rather than hand-written. Gutenberg's numeric ebook
 * ids are easy to transcribe wrongly, and a wrong id silently resolves to a
 * different book, so the catalogue search is used instead — it always lands on
 * the right work.
 */
function links(title: string, author: string, wikipedia: string): BookLink[] {
  const query = encodeURIComponent(`${title} ${author}`);
  return [
    {
      text: "Read on Project Gutenberg",
      url: `https://www.gutenberg.org/ebooks/search/?query=${query}`,
    },
    {
      text: "Wikipedia",
      url: `https://en.wikipedia.org/wiki/${wikipedia}`,
    },
  ];
}

interface SeedEntry {
  slug: string;
  title: string;
  author: string;
  year: number;
  wikipedia: string;
  tags: string[];
  description: string;
  addedAt: string;
}

const entries: SeedEntry[] = [
  {
    slug: "frankenstein",
    title: "Frankenstein; or, The Modern Prometheus",
    author: "Mary Shelley",
    year: 1818,
    wikipedia: "Frankenstein",
    tags: ["gothic", "horror", "science fiction"],
    description:
      "A young natural philosopher assembles a living creature from dead matter, then abandons it in horror at what he has made. The creature, articulate and desperately lonely, comes back to bargain with him.",
    addedAt: "2025-03-04",
  },
  {
    slug: "dracula",
    title: "Dracula",
    author: "Bram Stoker",
    year: 1897,
    wikipedia: "Dracula",
    tags: ["gothic", "horror"],
    description:
      "Told entirely through letters, diaries and newspaper clippings, an English solicitor's business trip to a Transylvanian castle becomes the opening move in a vampire's careful invasion of London.",
    addedAt: "2025-03-11",
  },
  {
    slug: "pride-and-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    wikipedia: "Pride_and_Prejudice",
    tags: ["romance", "satire"],
    description:
      "Elizabeth Bennet and the wealthy, reserved Mr Darcy misjudge each other thoroughly and at length. A comedy of manners about money, class and the slow correction of first impressions.",
    addedAt: "2025-03-18",
  },
  {
    slug: "moby-dick",
    title: "Moby-Dick; or, The Whale",
    author: "Herman Melville",
    year: 1851,
    wikipedia: "Moby-Dick",
    tags: ["adventure", "tragedy"],
    description:
      "Ishmael signs onto a Nantucket whaler and finds its captain has turned the voyage into a private hunt for the white whale that took his leg. Digressive, encyclopaedic and unhinged in the best way.",
    addedAt: "2025-03-25",
  },
  {
    slug: "the-adventures-of-sherlock-holmes",
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    year: 1892,
    wikipedia: "The_Adventures_of_Sherlock_Holmes",
    tags: ["mystery"],
    description:
      "Twelve short cases narrated by Dr Watson, from a scandal in Bohemia to a speckled band. The collection that fixed the shape of detective fiction for everyone who came after.",
    addedAt: "2025-04-02",
  },
  {
    slug: "the-time-machine",
    title: "The Time Machine",
    author: "H. G. Wells",
    year: 1895,
    wikipedia: "The_Time_Machine",
    tags: ["science fiction", "dystopia"],
    description:
      "A Victorian inventor travels to the year 802,701 and finds humanity split into two species, one gentle and idle above ground, the other pale and industrial below.",
    addedAt: "2025-04-09",
  },
  {
    slug: "the-war-of-the-worlds",
    title: "The War of the Worlds",
    author: "H. G. Wells",
    year: 1898,
    wikipedia: "The_War_of_the_Worlds",
    tags: ["science fiction", "horror"],
    description:
      "Martian cylinders land in the Surrey countryside and the greatest empire on earth is dismantled in a fortnight. An unnamed narrator walks through the wreckage of southern England.",
    addedAt: "2025-04-16",
  },
  {
    slug: "twenty-thousand-leagues-under-the-seas",
    title: "Twenty Thousand Leagues Under the Seas",
    author: "Jules Verne",
    year: 1870,
    wikipedia: "Twenty_Thousand_Leagues_Under_the_Seas",
    tags: ["adventure", "science fiction"],
    description:
      "Three castaways are taken aboard the Nautilus, an electric submarine commanded by the brilliant and vengeful Captain Nemo, and become guests who are not permitted to leave.",
    addedAt: "2025-04-23",
  },
  {
    slug: "around-the-world-in-eighty-days",
    title: "Around the World in Eighty Days",
    author: "Jules Verne",
    year: 1872,
    wikipedia: "Around_the_World_in_Eighty_Days",
    tags: ["adventure"],
    description:
      "Phileas Fogg wagers half his fortune that he can circle the globe in eighty days, and sets off with a French valet and a Scotland Yard detective who is convinced he is a bank robber.",
    addedAt: "2025-04-30",
  },
  {
    slug: "journey-to-the-center-of-the-earth",
    title: "Journey to the Center of the Earth",
    author: "Jules Verne",
    year: 1864,
    wikipedia: "Journey_to_the_Center_of_the_Earth",
    tags: ["adventure", "science fiction"],
    description:
      "A coded manuscript sends a professor, his nephew and an Icelandic guide down a volcanic crater into a subterranean world of prehistoric seas and living fossils.",
    addedAt: "2025-05-06",
  },
  {
    slug: "alices-adventures-in-wonderland",
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    year: 1865,
    wikipedia: "Alice%27s_Adventures_in_Wonderland",
    tags: ["children's", "satire"],
    description:
      "Alice follows a waistcoated rabbit down a hole and into a country where logic is applied with total rigour to entirely wrong premises.",
    addedAt: "2025-05-13",
  },
  {
    slug: "through-the-looking-glass",
    title: "Through the Looking-Glass",
    author: "Lewis Carroll",
    year: 1871,
    wikipedia: "Through_the_Looking-Glass",
    tags: ["children's", "satire"],
    description:
      "Alice climbs through a mirror into a world arranged as a chess problem, where she must cross the board rank by rank to be crowned.",
    addedAt: "2025-05-20",
  },
  {
    slug: "treasure-island",
    title: "Treasure Island",
    author: "Robert Louis Stevenson",
    year: 1883,
    wikipedia: "Treasure_Island",
    tags: ["adventure", "children's"],
    description:
      "Jim Hawkins finds a map in a dead sailor's sea chest and ships out for the Caribbean with a crew that turns out to be mostly pirates, led by a one-legged cook of enormous charm.",
    addedAt: "2025-05-27",
  },
  {
    slug: "strange-case-of-dr-jekyll-and-mr-hyde",
    title: "Strange Case of Dr Jekyll and Mr Hyde",
    author: "Robert Louis Stevenson",
    year: 1886,
    wikipedia: "Strange_Case_of_Dr_Jekyll_and_Mr_Hyde",
    tags: ["gothic", "horror", "mystery"],
    description:
      "A London lawyer investigates his old friend's association with a repellent young man named Hyde, and the will that leaves Hyde everything.",
    addedAt: "2025-06-03",
  },
  {
    slug: "the-picture-of-dorian-gray",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    year: 1890,
    wikipedia: "The_Picture_of_Dorian_Gray",
    tags: ["gothic", "philosophy"],
    description:
      "A beautiful young man wishes his portrait would age in his place. It does, and it records rather more than age.",
    addedAt: "2025-06-10",
  },
  {
    slug: "the-importance-of-being-earnest",
    title: "The Importance of Being Earnest",
    author: "Oscar Wilde",
    year: 1895,
    wikipedia: "The_Importance_of_Being_Earnest",
    tags: ["satire", "romance"],
    description:
      "Two men each invent a fictional relative to escape their social obligations, and are found out by two women who will only marry a man called Ernest.",
    addedAt: "2025-06-17",
  },
  {
    slug: "jane-eyre",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: 1847,
    wikipedia: "Jane_Eyre",
    tags: ["gothic", "romance", "coming-of-age"],
    description:
      "An orphan endures a charity school, becomes a governess at Thornfield Hall, and falls in love with her employer — who is keeping something on the third floor.",
    addedAt: "2025-06-24",
  },
  {
    slug: "wuthering-heights",
    title: "Wuthering Heights",
    author: "Emily Brontë",
    year: 1847,
    wikipedia: "Wuthering_Heights",
    tags: ["gothic", "romance", "tragedy"],
    description:
      "Heathcliff and Catherine's attachment survives class, marriage and death, and ruins two households across two generations. Nobody in it is likeable and it does not matter.",
    addedAt: "2025-07-01",
  },
  {
    slug: "great-expectations",
    title: "Great Expectations",
    author: "Charles Dickens",
    year: 1861,
    wikipedia: "Great_Expectations",
    tags: ["coming-of-age", "mystery"],
    description:
      "Pip, a blacksmith's apprentice, comes into money from an anonymous benefactor and moves to London to become a gentleman. His guesses about where it came from are wrong.",
    addedAt: "2025-07-08",
  },
  {
    slug: "a-tale-of-two-cities",
    title: "A Tale of Two Cities",
    author: "Charles Dickens",
    year: 1859,
    wikipedia: "A_Tale_of_Two_Cities",
    tags: ["tragedy", "romance"],
    description:
      "London and Paris in the years around the Revolution, and a dissolute barrister who finds one thing worth doing well.",
    addedAt: "2025-07-15",
  },
  {
    slug: "oliver-twist",
    title: "Oliver Twist",
    author: "Charles Dickens",
    year: 1838,
    wikipedia: "Oliver_Twist",
    tags: ["coming-of-age", "satire"],
    description:
      "A workhouse boy asks for more, is sold to an undertaker, runs to London and is taken in by a gang of child pickpockets. Dickens's furious attack on the Poor Law.",
    addedAt: "2025-07-22",
  },
  {
    slug: "a-christmas-carol",
    title: "A Christmas Carol",
    author: "Charles Dickens",
    year: 1843,
    wikipedia: "A_Christmas_Carol",
    tags: ["children's", "gothic"],
    description:
      "Three spirits visit a miser in one night and show him his past, his present and the grave nobody will visit.",
    addedAt: "2025-07-29",
  },
  {
    slug: "crime-and-punishment",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    year: 1866,
    wikipedia: "Crime_and_Punishment",
    tags: ["philosophy", "tragedy", "mystery"],
    description:
      "A destitute former student murders a pawnbroker to prove a theory about extraordinary men, and spends the rest of the novel being taken apart by his own conscience and a very patient investigator.",
    addedAt: "2025-08-05",
  },
  {
    slug: "the-brothers-karamazov",
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    year: 1880,
    wikipedia: "The_Brothers_Karamazov",
    tags: ["philosophy", "tragedy"],
    description:
      "Three brothers — sensualist, sceptic and novice monk — and the murder of the father none of them could stand. Contains the Grand Inquisitor.",
    addedAt: "2025-08-12",
  },
  {
    slug: "notes-from-underground",
    title: "Notes from Underground",
    author: "Fyodor Dostoevsky",
    year: 1864,
    wikipedia: "Notes_from_Underground",
    tags: ["philosophy"],
    description:
      "A retired civil servant argues from a basement in St Petersburg that people will act against their own interests purely to prove they are free to.",
    addedAt: "2025-08-19",
  },
  {
    slug: "war-and-peace",
    title: "War and Peace",
    author: "Leo Tolstoy",
    year: 1869,
    wikipedia: "War_and_Peace",
    tags: ["philosophy", "romance", "tragedy"],
    description:
      "Five aristocratic families through Napoleon's invasion of Russia, interleaved with Tolstoy's argument that history is not made by great men.",
    addedAt: "2025-08-26",
  },
  {
    slug: "anna-karenina",
    title: "Anna Karenina",
    author: "Leo Tolstoy",
    year: 1878,
    wikipedia: "Anna_Karenina",
    tags: ["romance", "tragedy"],
    description:
      "Anna leaves her husband for Vronsky and is destroyed by a society that would have forgiven the affair but not the honesty. Beside her, Levin quietly works out how to live.",
    addedAt: "2025-09-02",
  },
  {
    slug: "madame-bovary",
    title: "Madame Bovary",
    author: "Gustave Flaubert",
    year: 1856,
    wikipedia: "Madame_Bovary",
    tags: ["romance", "tragedy"],
    description:
      "A provincial doctor's wife, raised on romantic novels, tries to spend and love her way out of boredom and into the life she was promised.",
    addedAt: "2025-09-09",
  },
  {
    slug: "les-miserables",
    title: "Les Misérables",
    author: "Victor Hugo",
    year: 1862,
    wikipedia: "Les_Mis%C3%A9rables",
    tags: ["tragedy", "philosophy"],
    description:
      "Jean Valjean breaks parole, builds a new life under a new name, and is pursued for decades by a policeman who cannot conceive of a man changing.",
    addedAt: "2025-09-16",
  },
  {
    slug: "the-count-of-monte-cristo",
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    year: 1844,
    wikipedia: "The_Count_of_Monte_Cristo",
    tags: ["adventure", "tragedy"],
    description:
      "Imprisoned without trial on the word of three men who wanted what he had, Edmond Dantès escapes, finds a fortune, and returns as someone else entirely.",
    addedAt: "2025-09-23",
  },
  {
    slug: "the-three-musketeers",
    title: "The Three Musketeers",
    author: "Alexandre Dumas",
    year: 1844,
    wikipedia: "The_Three_Musketeers",
    tags: ["adventure"],
    description:
      "A young Gascon arrives in Paris determined to join the King's Musketeers and manages to challenge three of them to duels before lunch.",
    addedAt: "2025-09-30",
  },
  {
    slug: "don-quixote",
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    year: 1605,
    wikipedia: "Don_Quixote",
    tags: ["satire", "adventure"],
    description:
      "An elderly gentleman reads too many chivalric romances, declares himself a knight errant, and rides out with a farmer as his squire to right wrongs that are not there.",
    addedAt: "2025-10-07",
  },
  {
    slug: "gullivers-travels",
    title: "Gulliver's Travels",
    author: "Jonathan Swift",
    year: 1726,
    wikipedia: "Gulliver%27s_Travels",
    tags: ["satire", "adventure"],
    description:
      "A ship's surgeon visits four nations of increasingly uncomfortable mirrors, and returns unable to tolerate the company of his own species.",
    addedAt: "2025-10-14",
  },
  {
    slug: "robinson-crusoe",
    title: "Robinson Crusoe",
    author: "Daniel Defoe",
    year: 1719,
    wikipedia: "Robinson_Crusoe",
    tags: ["adventure"],
    description:
      "Twenty-eight years alone on an island off the Orinoco, recorded with an accountant's attention to inventory, shelter and the passage of time.",
    addedAt: "2025-10-21",
  },
  {
    slug: "the-scarlet-letter",
    title: "The Scarlet Letter",
    author: "Nathaniel Hawthorne",
    year: 1850,
    wikipedia: "The_Scarlet_Letter",
    tags: ["tragedy", "romance"],
    description:
      "In Puritan Boston, Hester Prynne is sentenced to wear an embroidered A and refuses to name the father of her child, who is standing in the crowd.",
    addedAt: "2025-10-28",
  },
  {
    slug: "adventures-of-huckleberry-finn",
    title: "Adventures of Huckleberry Finn",
    author: "Mark Twain",
    year: 1884,
    wikipedia: "Adventures_of_Huckleberry_Finn",
    tags: ["adventure", "coming-of-age", "satire"],
    description:
      "Huck fakes his own death and rafts down the Mississippi with Jim, a man escaping slavery, deciding along the way that he would rather go to hell than turn him in.",
    addedAt: "2025-11-04",
  },
  {
    slug: "the-adventures-of-tom-sawyer",
    title: "The Adventures of Tom Sawyer",
    author: "Mark Twain",
    year: 1876,
    wikipedia: "The_Adventures_of_Tom_Sawyer",
    tags: ["children's", "adventure"],
    description:
      "Whitewashed fences, a graveyard murder, a funeral the deceased attends, and a cave. Small-town Missouri boyhood as tall tale.",
    addedAt: "2025-11-11",
  },
  {
    slug: "the-call-of-the-wild",
    title: "The Call of the Wild",
    author: "Jack London",
    year: 1903,
    wikipedia: "The_Call_of_the_Wild",
    tags: ["adventure"],
    description:
      "Buck, a domestic dog stolen from a California ranch and sold into the Klondike gold rush, learns the law of club and fang and keeps going past it.",
    addedAt: "2025-11-18",
  },
  {
    slug: "heart-of-darkness",
    title: "Heart of Darkness",
    author: "Joseph Conrad",
    year: 1899,
    wikipedia: "Heart_of_Darkness",
    tags: ["adventure", "philosophy"],
    description:
      "Marlow takes a steamer up the Congo to retrieve an ivory agent who has stopped sending reports and started being worshipped.",
    addedAt: "2025-11-25",
  },
  {
    slug: "the-metamorphosis",
    title: "The Metamorphosis",
    author: "Franz Kafka",
    year: 1915,
    wikipedia: "The_Metamorphosis",
    tags: ["philosophy", "horror"],
    description:
      "Gregor Samsa wakes as an enormous insect and his first concern is that he has missed his train. His family's concern is the rent.",
    addedAt: "2025-12-02",
  },
  {
    slug: "the-trial",
    title: "The Trial",
    author: "Franz Kafka",
    year: 1925,
    wikipedia: "The_Trial",
    tags: ["philosophy", "dystopia"],
    description:
      "Josef K. is arrested one morning without being told the charge, and spends a year navigating a court that operates in attics and never states its case.",
    addedAt: "2025-12-09",
  },
  {
    slug: "a-portrait-of-the-artist-as-a-young-man",
    title: "A Portrait of the Artist as a Young Man",
    author: "James Joyce",
    year: 1916,
    wikipedia: "A_Portrait_of_the_Artist_as_a_Young_Man",
    tags: ["coming-of-age", "philosophy"],
    description:
      "Stephen Dedalus from infant babble to university, the prose maturing sentence by sentence alongside him, until he leaves Ireland to make something of his own.",
    addedAt: "2025-12-16",
  },
  {
    slug: "the-great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    wikipedia: "The_Great_Gatsby",
    tags: ["tragedy", "romance"],
    description:
      "A bond salesman spends a Long Island summer next door to a man who throws enormous parties for a woman who lives across the bay.",
    addedAt: "2025-12-23",
  },
  {
    slug: "the-secret-garden",
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    year: 1911,
    wikipedia: "The_Secret_Garden",
    tags: ["children's", "coming-of-age"],
    description:
      "A sour orphan sent to a Yorkshire manor finds a walled garden that has been locked for ten years, and brings both it and her invalid cousin back to life.",
    addedAt: "2026-01-06",
  },
  {
    slug: "peter-pan",
    title: "Peter and Wendy",
    author: "J. M. Barrie",
    year: 1911,
    wikipedia: "Peter_and_Wendy",
    tags: ["children's", "adventure"],
    description:
      "The boy who would not grow up takes the Darling children to an island of pirates and lost boys, and cannot understand why they eventually want to go home.",
    addedAt: "2026-01-13",
  },
  {
    slug: "the-wonderful-wizard-of-oz",
    title: "The Wonderful Wizard of Oz",
    author: "L. Frank Baum",
    year: 1900,
    wikipedia: "The_Wonderful_Wizard_of_Oz",
    tags: ["children's", "adventure"],
    description:
      "A Kansas cyclone drops Dorothy's house on a witch, and she walks a yellow brick road with three companions to ask a wizard for things they already have.",
    addedAt: "2026-01-20",
  },
  {
    slug: "the-jungle-book",
    title: "The Jungle Book",
    author: "Rudyard Kipling",
    year: 1894,
    wikipedia: "The_Jungle_Book",
    tags: ["children's", "adventure"],
    description:
      "Stories of Mowgli, raised by wolves and taught the Law of the Jungle by a bear and a panther, alongside tales of a mongoose and a white seal.",
    addedAt: "2026-01-27",
  },
  {
    slug: "anne-of-green-gables",
    title: "Anne of Green Gables",
    author: "L. M. Montgomery",
    year: 1908,
    wikipedia: "Anne_of_Green_Gables",
    tags: ["children's", "coming-of-age"],
    description:
      "An elderly brother and sister on Prince Edward Island send for an orphan boy to help on the farm and are sent a red-haired girl who never stops talking.",
    addedAt: "2026-02-03",
  },
  {
    slug: "little-women",
    title: "Little Women",
    author: "Louisa May Alcott",
    year: 1868,
    wikipedia: "Little_Women",
    tags: ["coming-of-age", "romance"],
    description:
      "Four sisters in Civil War Massachusetts, their father at the front and their money gone, growing up over a handful of years.",
    addedAt: "2026-02-10",
  },
  {
    slug: "the-yellow-wallpaper",
    title: "The Yellow Wallpaper",
    author: "Charlotte Perkins Gilman",
    year: 1892,
    wikipedia: "The_Yellow_Wallpaper",
    tags: ["gothic", "horror"],
    description:
      "Confined to an upstairs room for a rest cure and forbidden to write, a woman writes anyway, and begins to read the pattern on the wallpaper.",
    addedAt: "2026-02-17",
  },
  {
    slug: "the-awakening",
    title: "The Awakening",
    author: "Kate Chopin",
    year: 1899,
    wikipedia: "The_Awakening_(Chopin_novel)",
    tags: ["romance", "tragedy"],
    description:
      "During a summer on Grand Isle, a New Orleans wife discovers she wants a life of her own, and finds Louisiana society has no shape for one.",
    addedAt: "2026-02-24",
  },
  {
    slug: "emma",
    title: "Emma",
    author: "Jane Austen",
    year: 1815,
    wikipedia: "Emma_(novel)",
    tags: ["romance", "satire"],
    description:
      "A rich, clever young woman with nothing to do arranges other people's marriages with uniformly disastrous results, and misreads her own entirely.",
    addedAt: "2026-03-03",
  },
  {
    slug: "sense-and-sensibility",
    title: "Sense and Sensibility",
    author: "Jane Austen",
    year: 1811,
    wikipedia: "Sense_and_Sensibility",
    tags: ["romance"],
    description:
      "Two sisters, one guarded and one headlong, are left near-penniless by their father's will and must each survive an attachment to an unavailable man.",
    addedAt: "2026-03-10",
  },
  {
    slug: "the-hound-of-the-baskervilles",
    title: "The Hound of the Baskervilles",
    author: "Arthur Conan Doyle",
    year: 1902,
    wikipedia: "The_Hound_of_the_Baskervilles",
    tags: ["mystery", "gothic"],
    description:
      "A family legend about a spectral hound on Dartmoor, a fresh corpse, and Watson left alone at Baskerville Hall while Holmes is apparently in London.",
    addedAt: "2026-03-17",
  },
  {
    slug: "the-moonstone",
    title: "The Moonstone",
    author: "Wilkie Collins",
    year: 1868,
    wikipedia: "The_Moonstone",
    tags: ["mystery"],
    description:
      "A diamond looted from an Indian temple is given to a young woman on her birthday and vanishes overnight. Often called the first English detective novel.",
    addedAt: "2026-03-24",
  },
  {
    slug: "the-woman-in-white",
    title: "The Woman in White",
    author: "Wilkie Collins",
    year: 1859,
    wikipedia: "The_Woman_in_White_(novel)",
    tags: ["mystery", "gothic"],
    description:
      "A drawing master meets a woman dressed in white on a road outside London at midnight, and is drawn into a conspiracy of substituted identities and stolen inheritance.",
    addedAt: "2026-03-31",
  },
  {
    slug: "the-invisible-man",
    title: "The Invisible Man",
    author: "H. G. Wells",
    year: 1897,
    wikipedia: "The_Invisible_Man",
    tags: ["science fiction", "horror"],
    description:
      "A stranger arrives at a Sussex inn wrapped head to foot in bandages. He has solved invisibility and cannot reverse it, and it is driving him mad.",
    addedAt: "2026-04-07",
  },
  {
    slug: "the-island-of-doctor-moreau",
    title: "The Island of Doctor Moreau",
    author: "H. G. Wells",
    year: 1896,
    wikipedia: "The_Island_of_Doctor_Moreau",
    tags: ["science fiction", "horror", "philosophy"],
    description:
      "A shipwrecked man is landed on an island where a disgraced physiologist is surgically making animals into something close enough to people to recite laws.",
    addedAt: "2026-04-14",
  },
  {
    slug: "flatland",
    title: "Flatland: A Romance of Many Dimensions",
    author: "Edwin A. Abbott",
    year: 1884,
    wikipedia: "Flatland",
    tags: ["science fiction", "satire", "philosophy"],
    description:
      "A square living in a two-dimensional world is visited by a sphere, and is imprisoned for trying to explain the third dimension to his countrymen.",
    addedAt: "2026-04-21",
  },
  {
    slug: "we",
    title: "We",
    author: "Yevgeny Zamyatin",
    year: 1924,
    wikipedia: "We_(novel)",
    tags: ["dystopia", "science fiction"],
    description:
      "In the One State everyone lives in glass apartments on a published schedule. D-503, building a spaceship, starts keeping a journal and develops a soul. The ancestor of Nineteen Eighty-Four.",
    addedAt: "2026-04-28",
  },
  {
    slug: "the-iron-heel",
    title: "The Iron Heel",
    author: "Jack London",
    year: 1908,
    wikipedia: "The_Iron_Heel",
    tags: ["dystopia", "philosophy"],
    description:
      "A manuscript recovered centuries later describes the rise of an American oligarchy and the crushing of the labour movement beneath it.",
    addedAt: "2026-05-05",
  },
  {
    slug: "leaves-of-grass",
    title: "Leaves of Grass",
    author: "Walt Whitman",
    year: 1855,
    wikipedia: "Leaves_of_Grass",
    tags: ["poetry"],
    description:
      "The long free-verse book Whitman rewrote and expanded for the rest of his life, celebrating the body, the republic and himself without apology.",
    addedAt: "2026-05-12",
  },
  {
    slug: "walden",
    title: "Walden",
    author: "Henry David Thoreau",
    year: 1854,
    wikipedia: "Walden",
    tags: ["philosophy", "memoir"],
    description:
      "Two years in a self-built cabin by a Massachusetts pond, with an itemised budget, an argument about what a life costs, and a great deal about beans.",
    addedAt: "2026-05-19",
  },
  {
    slug: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    year: 180,
    wikipedia: "Meditations",
    tags: ["philosophy"],
    description:
      "Private Stoic notes written on campaign by a Roman emperor who never intended anyone to read them, mostly reminding himself to be less irritable.",
    addedAt: "2026-05-26",
  },
  {
    slug: "thus-spoke-zarathustra",
    title: "Thus Spoke Zarathustra",
    author: "Friedrich Nietzsche",
    year: 1883,
    wikipedia: "Thus_Spoke_Zarathustra",
    tags: ["philosophy", "poetry"],
    description:
      "A prophet comes down from ten years on a mountain to tell a marketplace about the overman, and is largely ignored in favour of a tightrope walker.",
    addedAt: "2026-06-02",
  },
  {
    slug: "narrative-of-the-life-of-frederick-douglass",
    title: "Narrative of the Life of Frederick Douglass",
    author: "Frederick Douglass",
    year: 1845,
    wikipedia: "Narrative_of_the_Life_of_Frederick_Douglass,_an_American_Slave",
    tags: ["memoir", "philosophy"],
    description:
      "Douglass's account of his birth into slavery in Maryland, teaching himself to read against the law, and his escape north — written to prove he had lived it.",
    addedAt: "2026-06-09",
  },
  {
    slug: "the-souls-of-black-folk",
    title: "The Souls of Black Folk",
    author: "W. E. B. Du Bois",
    year: 1903,
    wikipedia: "The_Souls_of_Black_Folk",
    tags: ["philosophy", "memoir"],
    description:
      "Fourteen essays on life behind the colour line in the post-Reconstruction South, introducing double consciousness and the veil.",
    addedAt: "2026-06-16",
  },
  {
    slug: "middlemarch",
    title: "Middlemarch",
    author: "George Eliot",
    year: 1871,
    wikipedia: "Middlemarch",
    tags: ["romance", "philosophy", "tragedy"],
    description:
      "A provincial town before the Reform Act, and two people who marry the wrong person for admirable reasons. Widely argued to be the best novel in English.",
    addedAt: "2026-06-23",
  },
  {
    slug: "the-turn-of-the-screw",
    title: "The Turn of the Screw",
    author: "Henry James",
    year: 1898,
    wikipedia: "The_Turn_of_the_Screw",
    tags: ["gothic", "horror", "mystery"],
    description:
      "A governess at a remote country house becomes convinced her two charges are in communication with the dead. Whether she is right is the whole book.",
    addedAt: "2026-06-30",
  },
  {
    slug: "the-hunchback-of-notre-dame",
    title: "The Hunchback of Notre-Dame",
    author: "Victor Hugo",
    year: 1831,
    wikipedia: "The_Hunchback_of_Notre-Dame",
    tags: ["gothic", "tragedy", "romance"],
    description:
      "Medieval Paris around its cathedral: a deaf bell-ringer, a Romani dancer, and an archdeacon whose obsession destroys all three.",
    addedAt: "2026-07-07",
  },
  {
    slug: "carmilla",
    title: "Carmilla",
    author: "Sheridan Le Fanu",
    year: 1872,
    wikipedia: "Carmilla",
    tags: ["gothic", "horror", "romance"],
    description:
      "A lonely girl in a Styrian schloss takes in a beautiful guest after a carriage accident, and begins to dream badly and weaken. Predates Dracula by twenty-six years.",
    addedAt: "2026-07-14",
  },
  {
    slug: "the-thirty-nine-steps",
    title: "The Thirty-Nine Steps",
    author: "John Buchan",
    year: 1915,
    wikipedia: "The_Thirty-Nine_Steps",
    tags: ["mystery", "adventure"],
    description:
      "A bored Scot in London finds a dead spy in his flat and runs for the Highlands pursued by both the police and the ring that killed him. The template for the chase thriller.",
    addedAt: "2026-07-21",
  },
  {
    slug: "the-mysterious-affair-at-styles",
    title: "The Mysterious Affair at Styles",
    author: "Agatha Christie",
    year: 1920,
    wikipedia: "The_Mysterious_Affair_at_Styles",
    tags: ["mystery"],
    description:
      "A country-house poisoning during the First World War, solved by a retired Belgian police officer billeted in the village. Poirot's first case.",
    addedAt: "2026-07-28",
  },
  {
    slug: "the-secret-adversary",
    title: "The Secret Adversary",
    author: "Agatha Christie",
    year: 1922,
    wikipedia: "The_Secret_Adversary",
    tags: ["mystery", "adventure"],
    description:
      "Two demobbed friends, broke and bored, advertise themselves as adventurers for hire and are immediately entangled in a hunt for a missing treaty.",
    addedAt: "2026-08-04",
  },
  {
    slug: "the-scarlet-pimpernel",
    title: "The Scarlet Pimpernel",
    author: "Baroness Orczy",
    year: 1905,
    wikipedia: "The_Scarlet_Pimpernel",
    tags: ["adventure", "romance"],
    description:
      "During the Terror, an English gentleman of no apparent substance smuggles French aristocrats out of Paris under a flower-shaped signature.",
    addedAt: "2026-08-11",
  },
  {
    slug: "north-and-south",
    title: "North and South",
    author: "Elizabeth Gaskell",
    year: 1855,
    wikipedia: "North_and_South_(Gaskell_novel)",
    tags: ["romance", "coming-of-age"],
    description:
      "A southern clergyman's daughter is transplanted to a northern mill town and collides, repeatedly, with a cotton manufacturer over strikes, class and eventually himself.",
    addedAt: "2026-08-18",
  },
];

export const seedBooks: Book[] = entries.map((entry, index) => ({
  id: index + 1,
  slug: entry.slug,
  title: entry.title,
  author: entry.author,
  year: entry.year,
  description: entry.description,
  tags: entry.tags,
  links: links(entry.title, entry.author, entry.wikipedia),
  addedAt: entry.addedAt,
}));

/** Every tag in the collection, ordered by how many books carry it. */
export const seedTags: string[] = Object.entries(
  seedBooks.reduce<Record<string, number>>((counts, book) => {
    for (const tag of book.tags) counts[tag] = (counts[tag] ?? 0) + 1;
    return counts;
  }, {})
)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([tag]) => tag);
