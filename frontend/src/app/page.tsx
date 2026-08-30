import { HeroSection } from "@/components/section/hero-section";
import { FeatureSection } from "@/components/section/features-section";
import QnaSection from "@/components/section/qna-section";
import KBarInfoPopup from "@/components/custom-ui/command-bar-info-popup";
import { getHomePage } from "@/lib/content";
import type { HomeBlock } from "@/lib/types/site";

/** Renders one entry of the CMS dynamic zone. */
function blockRenderer(block: HomeBlock) {
  switch (block.__component) {
    case "layout.hero-section":
      return <HeroSection key={block.id} data={block} />;
    case "layout.features-section":
      return <FeatureSection key={block.id} data={block} />;
    case "layout.qna-section":
      return <QnaSection key={block.id} data={block} />;
    default:
      return null;
  }
}

export default async function HomePage() {
  const { blocks } = await getHomePage();

  return (
    <>
      {blocks.map(blockRenderer)}
      <KBarInfoPopup />
    </>
  );
}
