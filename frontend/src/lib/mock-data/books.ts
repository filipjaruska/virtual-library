// Mock data for books to replace backend API calls

export const mockBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A classic American novel set in the Jazz Age, exploring themes of decadence, excess, and the American Dream.",
    slug: "the-great-gatsby",
    createdAt: "2024-01-15T10:00:00.000Z",
    image: {
      url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=1200&fit=crop",
      alternativeText: "The Great Gatsby book cover",
      formats: {
        large: {
          url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=1200&fit=crop",
        },
      },
    },
    tags: [{ name: "fiction" }, { name: "popular" }],
    links: [
      { text: "Read on Project Gutenberg", url: "https://www.gutenberg.org" },
      {
        text: "Author Biography",
        url: "https://en.wikipedia.org/wiki/F._Scott_Fitzgerald",
      },
    ],
    comments: [],
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A gripping tale of racial injustice and childhood innocence in the American South during the 1930s.",
    slug: "to-kill-a-mockingbird",
    createdAt: "2024-02-10T10:00:00.000Z",
    image: {
      url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=1200&fit=crop",
      alternativeText: "To Kill a Mockingbird book cover",
      formats: {
        large: {
          url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=1200&fit=crop",
        },
      },
    },
    tags: [{ name: "fiction" }, { name: "popular" }],
    links: [
      { text: "Read Online", url: "#" },
      { text: "Book Discussion", url: "#" },
    ],
    comments: [],
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian novel about totalitarianism, surveillance, and the manipulation of truth in a oppressive society.",
    slug: "1984",
    createdAt: "2024-03-05T10:00:00.000Z",
    image: {
      url: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=1200&fit=crop",
      alternativeText: "1984 book cover",
      formats: {
        large: {
          url: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=1200&fit=crop",
        },
      },
    },
    tags: [
      { name: "Classic" },
      { name: "Dystopian" },
      { name: "Science Fiction" },
    ],
    links: [
      { text: "Read on Project Gutenberg", url: "https://www.gutenberg.org" },
    ],
    comments: [],
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "A romantic novel of manners that critiques the British landed gentry at the end of the 18th century.",
    slug: "pride-and-prejudice",
    createdAt: "2024-04-20T10:00:00.000Z",
    image: {
      url: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=1200&fit=crop",
      alternativeText: "Pride and Prejudice book cover",
      formats: {
        large: {
          url: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=1200&fit=crop",
        },
      },
    },
    tags: [{ name: "romance novel" }, { name: "fiction" }, { name: "popular" }],
    links: [{ text: "Free eBook", url: "#" }],
    comments: [],
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description:
      "A story about teenage rebellion and alienation, following Holden Caulfield's experiences in New York City.",
    slug: "the-catcher-in-the-rye",
    createdAt: "2024-05-15T10:00:00.000Z",
    image: {
      url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=1200&fit=crop",
      alternativeText: "The Catcher in the Rye book cover",
      formats: {
        large: {
          url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=1200&fit=crop",
        },
      },
    },
    tags: [{ name: "fiction" }, { name: "gold" }],
    links: [],
    comments: [],
  },
  {
    id: 6,
    title: "Brave New World",
    author: "Aldous Huxley",
    description:
      "A futuristic dystopian novel that explores genetic engineering, psychological manipulation, and social control.",
    slug: "brave-new-world",
    createdAt: "2024-06-10T10:00:00.000Z",
    image: {
      url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=1200&fit=crop",
      alternativeText: "Brave New World book cover",
      formats: {
        large: {
          url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=1200&fit=crop",
        },
      },
    },
    tags: [{ name: "sci-fi" }, { name: "thriller" }],
    links: [{ text: "Read Online", url: "#" }],
    comments: [],
  },
  {
    id: 7,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description:
      "An epic high-fantasy novel following the quest to destroy the One Ring and defeat the Dark Lord Sauron.",
    slug: "the-lord-of-the-rings",
    createdAt: "2024-07-05T10:00:00.000Z",
    image: {
      url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=1200&fit=crop",
      alternativeText: "The Lord of the Rings book cover",
      formats: {
        large: {
          url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=1200&fit=crop",
        },
      },
    },
    tags: [{ name: "fiction" }, { name: "popular" }],
    links: [
      { text: "Tolkien Official Site", url: "https://www.tolkien.co.uk" },
    ],
    comments: [],
  },
  {
    id: 8,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description:
      "The first book in the Harry Potter series, introducing a young wizard discovering his magical heritage.",
    slug: "harry-potter-philosophers-stone",
    createdAt: "2024-08-12T10:00:00.000Z",
    image: {
      url: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=800&h=1200&fit=crop",
      alternativeText: "Harry Potter book cover",
      formats: {
        large: {
          url: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=800&h=1200&fit=crop",
        },
      },
    },
    tags: [
      { name: "children's literature" },
      { name: "fiction" },
      { name: "popular" },
    ],
    links: [{ text: "Wizarding World", url: "https://www.wizardingworld.com" }],
    comments: [],
  },
  {
    id: 9,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description:
      "A fantasy adventure about Bilbo Baggins and his unexpected journey with dwarves to reclaim their homeland.",
    slug: "the-hobbit",
    createdAt: "2024-09-20T10:00:00.000Z",
    image: {
      url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=1200&fit=crop",
      alternativeText: "The Hobbit book cover",
      formats: {
        large: {
          url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=1200&fit=crop",
        },
      },
    },
    tags: [{ name: "fiction" }, { name: "children's literature" }],
    links: [],
    comments: [],
  },
  {
    id: 10,
    title: "Moby-Dick",
    author: "Herman Melville",
    description:
      "An epic tale of obsession, following Captain Ahab's quest to hunt the white whale that maimed him.",
    slug: "moby-dick",
    createdAt: "2024-10-15T10:00:00.000Z",
    image: {
      url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=1200&fit=crop",
      alternativeText: "Moby-Dick book cover",
      formats: {
        large: {
          url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&h=1200&fit=crop",
        },
      },
    },
    tags: [{ name: "fiction" }, { name: "gold" }],
    links: [
      { text: "Read on Project Gutenberg", url: "https://www.gutenberg.org" },
    ],
    comments: [],
  },
  {
    id: 11,
    title: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    description:
      "A series of fantasy novels set in the magical land of Narnia, filled with talking animals and epic battles.",
    slug: "chronicles-of-narnia",
    createdAt: "2024-11-05T10:00:00.000Z",
    image: {
      url: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800&h=1200&fit=crop",
      alternativeText: "Chronicles of Narnia book cover",
      formats: {
        large: {
          url: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800&h=1200&fit=crop",
        },
      },
    },
    tags: [{ name: "children's literature" }, { name: "fiction" }],
    links: [],
    comments: [],
  },
  {
    id: 12,
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    description:
      "A coming-of-age story following the life of orphaned Jane Eyre and her experiences as a governess.",
    slug: "jane-eyre",
    createdAt: "2024-12-01T10:00:00.000Z",
    image: {
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=1200&fit=crop",
      alternativeText: "Jane Eyre book cover",
      formats: {
        large: {
          url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=1200&fit=crop",
        },
      },
    },
    tags: [{ name: "romance novel" }, { name: "fiction" }],
    links: [{ text: "Free eBook", url: "#" }],
    comments: [],
  },
  {
    id: 13,
    title: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "A philosophical novel about a young shepherd's journey to find his personal legend and discover the meaning of life.",
    slug: "the-alchemist",
    createdAt: "2024-12-05T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/8513007-L.jpg",
      alternativeText: "The Alchemist book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/8513007-L.jpg",
        },
      },
    },
    tags: [{ name: "fiction" }, { name: "popular" }],
    links: [],
    comments: [],
  },
  {
    id: 14,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    description:
      "A thrilling mystery involving secret codes, religious history, and a deadly conspiracy spanning centuries.",
    slug: "the-da-vinci-code",
    createdAt: "2024-12-06T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/8235432-L.jpg",
      alternativeText: "The Da Vinci Code book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/8235432-L.jpg",
        },
      },
    },
    tags: [{ name: "thriller" }, { name: "fiction" }],
    links: [],
    comments: [],
  },
  {
    id: 15,
    title: "The Hunger Games",
    author: "Suzanne Collins",
    description:
      "In a dystopian future, a young girl must fight to the death in a televised competition to save her family.",
    slug: "the-hunger-games",
    createdAt: "2024-12-07T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/7864826-L.jpg",
      alternativeText: "The Hunger Games book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/7864826-L.jpg",
        },
      },
    },
    tags: [
      { name: "Dystopian" },
      { name: "Young Adult" },
      { name: "Science Fiction" },
    ],
    links: [],
    comments: [],
  },
  {
    id: 16,
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    description:
      "A journalist and a hacker team up to investigate a decades-old disappearance in this gripping thriller.",
    slug: "the-girl-with-the-dragon-tattoo",
    createdAt: "2024-12-08T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
      alternativeText: "The Girl with the Dragon Tattoo book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
        },
      },
    },
    tags: [{ name: "thriller" }, { name: "popular" }],
    links: [],
    comments: [],
  },
  {
    id: 17,
    title: "Life of Pi",
    author: "Yann Martel",
    description:
      "A young boy survives a shipwreck and is stranded on a lifeboat in the Pacific Ocean with a Bengal tiger.",
    slug: "life-of-pi",
    createdAt: "2024-12-09T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/8478134-L.jpg",
      alternativeText: "Life of Pi book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/8478134-L.jpg",
        },
      },
    },
    tags: [{ name: "fiction" }, { name: "gold" }],
    links: [],
    comments: [],
  },
  {
    id: 18,
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    description:
      "A powerful story of friendship, betrayal, and redemption set against the backdrop of Afghanistan's tumultuous history.",
    slug: "the-kite-runner",
    createdAt: "2024-12-10T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/8683653-L.jpg",
      alternativeText: "The Kite Runner book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/8683653-L.jpg",
        },
      },
    },
    tags: [{ name: "fiction" }, { name: "popular" }],
    links: [],
    comments: [],
  },
  {
    id: 19,
    title: "The Book Thief",
    author: "Markus Zusak",
    description:
      "Set in Nazi Germany, this story follows a young girl who steals books and shares them during World War II.",
    slug: "the-book-thief",
    createdAt: "2024-12-11T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/8304857-L.jpg",
      alternativeText: "The Book Thief book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/8304857-L.jpg",
        },
      },
    },
    tags: [{ name: "fiction" }, { name: "gold" }],
    links: [],
    comments: [],
  },
  {
    id: 20,
    title: "The Fault in Our Stars",
    author: "John Green",
    description:
      "Two teenagers meet at a cancer support group and fall in love in this heartbreaking contemporary novel.",
    slug: "the-fault-in-our-stars",
    createdAt: "2024-12-12T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/7884721-L.jpg",
      alternativeText: "The Fault in Our Stars book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/7884721-L.jpg",
        },
      },
    },
    tags: [
      { name: "Young Adult" },
      { name: "Romance" },
      { name: "Contemporary" },
    ],
    links: [],
    comments: [],
  },
  {
    id: 21,
    title: "Gone Girl",
    author: "Gillian Flynn",
    description:
      "When a woman disappears on her anniversary, dark secrets about her marriage begin to surface.",
    slug: "gone-girl",
    createdAt: "2024-12-13T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/8055704-L.jpg",
      alternativeText: "Gone Girl book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/8055704-L.jpg",
        },
      },
    },
    tags: [
      { name: "Mystery" },
      { name: "Thriller" },
      { name: "Psychological" },
    ],
    links: [],
    comments: [],
  },
  {
    id: 22,
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    description:
      "A dystopian novel depicting a totalitarian society where women are subjugated and stripped of their rights.",
    slug: "the-handmaids-tale",
    createdAt: "2024-12-14T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/8551124-L.jpg",
      alternativeText: "The Handmaid's Tale book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/8551124-L.jpg",
        },
      },
    },
    tags: [
      { name: "Dystopian" },
      { name: "Science Fiction" },
      { name: "Classic" },
    ],
    links: [],
    comments: [],
  },
  {
    id: 23,
    title: "The Road",
    author: "Cormac McCarthy",
    description:
      "A father and son journey through a post-apocalyptic landscape in this haunting tale of survival and love.",
    slug: "the-road",
    createdAt: "2024-12-15T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/8509574-L.jpg",
      alternativeText: "The Road book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/8509574-L.jpg",
        },
      },
    },
    tags: [
      { name: "Post-Apocalyptic" },
      { name: "Fiction" },
      { name: "Drama" },
    ],
    links: [],
    comments: [],
  },
  {
    id: 24,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description:
      "A groundbreaking exploration of human history from the Stone Age to the modern age.",
    slug: "sapiens",
    createdAt: "2024-12-16T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/8417598-L.jpg",
      alternativeText: "Sapiens book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/8417598-L.jpg",
        },
      },
    },
    tags: [{ name: "biography" }, { name: "popular" }],
    links: [],
    comments: [],
  },
  {
    id: 25,
    title: "Educated",
    author: "Tara Westover",
    description:
      "A memoir about a woman who grows up in a survivalist family and eventually earns a PhD from Cambridge.",
    slug: "educated",
    createdAt: "2024-12-17T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/8734127-L.jpg",
      alternativeText: "Educated book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/8734127-L.jpg",
        },
      },
    },
    tags: [{ name: "biography" }, { name: "new" }],
    links: [],
    comments: [],
  },
  {
    id: 26,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    description:
      "A psychotherapist becomes obsessed with a patient who murdered her husband and then stopped speaking.",
    slug: "the-silent-patient",
    createdAt: "2024-12-18T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/8715472-L.jpg",
      alternativeText: "The Silent Patient book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/8715472-L.jpg",
        },
      },
    },
    tags: [
      { name: "Mystery" },
      { name: "Thriller" },
      { name: "Psychological" },
    ],
    links: [],
    comments: [],
  },
  {
    id: 27,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    description:
      "A woman who grew up isolated in the marshes becomes the prime suspect in a murder case.",
    slug: "where-the-crawdads-sing",
    createdAt: "2024-12-19T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/8709854-L.jpg",
      alternativeText: "Where the Crawdads Sing book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/8709854-L.jpg",
        },
      },
    },
    tags: [{ name: "fiction" }, { name: "romance novel" }],
    links: [],
    comments: [],
  },
  {
    id: 28,
    title: "Project Hail Mary",
    author: "Andy Weir",
    description:
      "A lone astronaut must save humanity by solving an impossible scientific mystery in this thrilling space adventure.",
    slug: "project-hail-mary",
    createdAt: "2024-12-20T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/10881432-L.jpg",
      alternativeText: "Project Hail Mary book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/10881432-L.jpg",
        },
      },
    },
    tags: [
      { name: "Science Fiction" },
      { name: "Adventure" },
      { name: "Thriller" },
    ],
    links: [],
    comments: [],
  },
  {
    id: 29,
    title: "Dune",
    author: "Frank Herbert",
    description:
      "Set on a desert planet, this epic follows Paul Atreides as he becomes embroiled in politics, religion, and war.",
    slug: "dune",
    createdAt: "2024-12-21T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/8552828-L.jpg",
      alternativeText: "Dune book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/8552828-L.jpg",
        },
      },
    },
    tags: [{ name: "sci-fi" }, { name: "popular" }],
    links: [],
    comments: [],
  },
  {
    id: 30,
    title: "The Martian",
    author: "Andy Weir",
    description:
      "An astronaut is stranded on Mars and must use his ingenuity to survive until rescue is possible.",
    slug: "the-martian",
    createdAt: "2024-12-22T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/8267733-L.jpg",
      alternativeText: "The Martian book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/8267733-L.jpg",
        },
      },
    },
    tags: [
      { name: "Science Fiction" },
      { name: "Adventure" },
      { name: "Survival" },
    ],
    links: [],
    comments: [],
  },
  {
    id: 31,
    title: "The Night Circus",
    author: "Erin Morgenstern",
    description:
      "Two young magicians compete in a mysterious circus that appears only at night, with dangerous consequences.",
    slug: "the-night-circus",
    createdAt: "2024-12-23T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/7577823-L.jpg",
      alternativeText: "The Night Circus book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/7577823-L.jpg",
        },
      },
    },
    tags: [{ name: "fiction" }, { name: "romance novel" }, { name: "gold" }],
    links: [],
    comments: [],
  },
  {
    id: 32,
    title: "A Thousand Splendid Suns",
    author: "Khaled Hosseini",
    description:
      "Two Afghan women's lives intersect in this powerful story of friendship, sacrifice, and resilience.",
    slug: "a-thousand-splendid-suns",
    createdAt: "2024-12-24T10:00:00.000Z",
    image: {
      url: "https://covers.openlibrary.org/b/id/8528559-L.jpg",
      alternativeText: "A Thousand Splendid Suns book cover",
      formats: {
        large: {
          url: "https://covers.openlibrary.org/b/id/8528559-L.jpg",
        },
      },
    },
    tags: [{ name: "fiction" }, { name: "upcoming" }],
    links: [],
    comments: [],
  },
];

export const mockComments = [
  {
    id: 1,
    content:
      "An absolute masterpiece! The imagery and symbolism are outstanding.",
    createdAt: "2024-11-01T14:30:00.000Z",
    user: {
      id: 1,
      username: "bookworm42",
    },
  },
  {
    id: 2,
    content: "This book changed my perspective on society and conformity.",
    createdAt: "2024-11-15T09:20:00.000Z",
    user: {
      id: 2,
      username: "literarylion",
    },
  },
  {
    id: 3,
    content: "One of the most thought-provoking novels I've ever read.",
    createdAt: "2024-12-10T16:45:00.000Z",
    user: {
      id: 3,
      username: "readergirl",
    },
  },
];
