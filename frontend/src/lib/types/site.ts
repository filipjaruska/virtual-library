export interface CtaLink {
  id: number;
  text: string;
  url: string;
}

export interface HeroBlock {
  __component: "layout.hero-section";
  id: number;
  heading: string;
  subHeading: string;
  link: CtaLink;
}

export interface FeaturesBlock {
  __component: "layout.features-section";
  id: number;
  title: string;
  description: string;
  feature: {
    id: number;
    heading: string;
    subHeading: string;
    icon: string;
  }[];
}

export interface QnaBlock {
  __component: "layout.qna-section";
  id: number;
  title: string;
  qnas: {
    id: number;
    heading: string;
    answer: string;
  }[];
}

export type HomeBlock = HeroBlock | FeaturesBlock | QnaBlock;

export interface HomePage {
  blocks: HomeBlock[];
}

export interface GlobalData {
  title: string;
  description: string;
  header: {
    logoText: CtaLink;
    ctaButton: CtaLink;
  };
  footer: {
    logoText: CtaLink;
    text: string;
    socialLink: CtaLink[];
  };
}
