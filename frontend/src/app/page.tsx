import { getHomePageData } from "@/lib/loaders";

import { HeroSection } from "@/components/section/hero-section";
import { FeatureSection } from "@/components/section/features-section";
import QnaSection from "@/components/section/qna-section";
import KBarInfoPopup from "@/components/custom-ui/command-bar-info-popup";
import { getHidePopupCookie } from "@/lib/services/get-kbar-popup";

function blockRenderer(block: any) {
    const key = `${block.__component}-${block.id}`;
    switch (block.__component) {
        case "layout.hero-section":
            return <HeroSection key={key} data={block} />;
        case "layout.features-section":
            return <FeatureSection key={key} data={block} />;
        case "layout.qna-section":
            return <QnaSection key={key} data={block} />;
        default:
            return null;
    }
}

export default async function Home() {
    const strapiData = await getHomePageData();
    const initialHidePopup = await getHidePopupCookie();
    console.log("initialHidePopup", initialHidePopup);
    const { blocks } = strapiData;
    if (!blocks) return <div>No block found!</div>
    console.dir(blocks, { depth: null });
    return (
        <main>
            {blocks.map((block: any) => blockRenderer(block))}
            <KBarInfoPopup initialHidePopup={initialHidePopup} />
        </main>
    );
}
