// Mock data for homepage content to replace backend API calls

export const mockHomePageData = {
  blocks: [
    {
      __component: "layout.hero-section",
      id: 1,
      heading: "Welcome to Virtual Library",
      subHeading: "Discover, explore, and share your favorite books",
      image: {
        url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop",
        alternativeText: "Library books",
        formats: {
          large: {
            url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop",
          },
        },
      },
      link: {
        id: 1,
        text: "Browse Books",
        url: "/books",
      },
    },
    {
      __component: "layout.features-section",
      id: 2,
      title: "Why Choose Virtual Library",
      description: "Your ultimate destination for book discovery and community",
      feature: [
        {
          id: 1,
          heading: "Vast Collection",
          subHeading: "Access thousands of books across all genres",
          icon: "ICON_1",
        },
        {
          id: 2,
          heading: "Save Your Favorites",
          subHeading: "Bookmark books and build your personal reading list",
          icon: "ICON_2",
        },
        {
          id: 3,
          heading: "Always Available",
          subHeading: "Access your library anytime, anywhere, on any device",
          icon: "ICON_3",
        },
      ],
    },
    {
      __component: "layout.qna-section",
      id: 3,
      title: "Frequently Asked Questions",
      description: "Find answers to common questions about Virtual Library",
      qnas: [
        {
          id: 1,
          heading: "How do I add books to my favorites?",
          answer:
            "Simply click the heart icon on any book card or detail page to add it to your favorites collection.",
        },
        {
          id: 2,
          heading: "Can I leave comments on books?",
          answer:
            "Yes! Once you're signed in, you can leave comments and reviews on any book page to share your thoughts with the community.",
        },
        {
          id: 3,
          heading: "How do I search for specific books?",
          answer:
            "Use the search bar at the top of the page or browse by tags and categories on the books page.",
        },
        {
          id: 4,
          heading: "Is the library free to use?",
          answer:
            "Yes! Virtual Library is completely free to use. Create an account to access all features including favorites and comments.",
        },
        {
          id: 5,
          heading: "Can I filter books by genre?",
          answer:
            "Absolutely! Use the tag filters on the books page to narrow down results by genre, author, or other categories.",
        },
      ],
    },
  ],
};
