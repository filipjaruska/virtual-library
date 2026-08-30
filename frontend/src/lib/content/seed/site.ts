import type { GlobalData, HomePage } from "@/lib/types/site";

/**
 * Mirrors the shape Strapi returns for the `home-page` and `global` single
 * types, so the same block renderer drives both content sources.
 */
export const seedHomePage: HomePage = {
  blocks: [
    {
      __component: "layout.hero-section",
      id: 1,
      heading: "A library that fits in a browser tab",
      subHeading:
        "Public-domain classics, searchable, filterable and yours to shelve.",
      link: { id: 1, text: "Browse the collection", url: "/books" },
    },
    {
      __component: "layout.features-section",
      id: 2,
      title: "What you can do here",
      description: "Everything runs client-side once the page has loaded.",
      feature: [
        {
          id: 1,
          heading: "Search and filter",
          subHeading:
            "Find a title by name, author or description, narrow by genre, and sort the results seven ways.",
          icon: "ICON_1",
        },
        {
          id: 2,
          heading: "Build a shelf",
          subHeading:
            "Mark favourites and track what you want to read, are reading, or have finished. It stays in your browser.",
          icon: "ICON_2",
        },
        {
          id: 3,
          heading: "Leave a note",
          subHeading:
            "Add comments to any book. Yours sit alongside the ones that ship with the collection.",
          icon: "ICON_3",
        },
      ],
    },
    {
      __component: "layout.qna-section",
      id: 3,
      title: "Questions",
      qnas: [
        {
          id: 1,
          heading: "Do I need an account?",
          answer:
            "No. There is no sign-up and no server storing anything about you. Favourites, reading status and comments are kept in your browser's local storage and never leave the device.",
        },
        {
          id: 2,
          heading: "Where does the catalogue come from?",
          answer:
            "It ships with the site as a bundled dataset of public-domain works. The project was originally built against a Strapi CMS, and it still reads from Strapi when one is configured — the bundled data is the fallback.",
        },
        {
          id: 3,
          heading: "Why are the covers illustrations rather than photographs?",
          answer:
            "Each cover is generated from the book's own slug, so it is stable, unique and needs no external image host. Nothing on the page requests a third-party asset.",
        },
        {
          id: 4,
          heading: "How do I clear my data?",
          answer:
            "There is a reset button at the bottom of the shelf page. It empties favourites, reading status and your comments in one go.",
        },
        {
          id: 5,
          heading: "Is there a keyboard shortcut?",
          answer:
            "Press Ctrl+K anywhere for the command palette, and Ctrl+F on the books page to jump to the search field.",
        },
      ],
    },
  ],
};

export const seedGlobal: GlobalData = {
  title: "Virtual Library",
  description:
    "A browsable collection of public-domain classics, built with Next.js and Strapi.",
  header: {
    logoText: { id: 1, text: "Virtual Library", url: "/" },
    ctaButton: { id: 2, text: "Browse books", url: "/books" },
  },
  footer: {
    logoText: { id: 3, text: "Virtual Library", url: "/" },
    text: "Built as the practical part of a bachelor's thesis on Next.js and headless CMS architecture.",
    socialLink: [
      {
        id: 4,
        text: "GitHub",
        url: "https://github.com/filipjaruska/virtual-library",
      },
    ],
  },
};
