// Mock data for global site configuration to replace backend API calls

export const mockGlobalData = {
  title: "Virtual Library",
  description:
    "Discover and explore your next favorite book in our virtual library",
  header: {
    logoText: {
      id: 1,
      text: "Virtual Library",
      url: "/",
    },
    ctaButton: {
      id: 2,
      text: "Sign In",
      url: "/signin",
    },
  },
  footer: {
    logoText: {
      id: 3,
      text: "Virtual Library",
      url: "/",
    },
    text: "© 2024 Virtual Library. Created by Filip Jaruška.",
    socialLink: [
      {
        id: 1,
        text: "Twitter",
        url: "https://x.com/FilipJaruska",
      },
      {
        id: 2,
        text: "Website",
        url: "https://jaruska.dev",
      },
    ],
  },
};

export const mockGlobalMetadata = {
  title: "Virtual Library - Discover Your Next Favorite Book",
  description:
    "Explore thousands of books, create your personal library, and connect with a community of readers.",
};
