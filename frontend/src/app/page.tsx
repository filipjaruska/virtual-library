import {getHomePageData} from "@/lib/loaders";

import {HeroSection} from "@/components/section/hero-section";
import {FeatureSection} from "@/components/section/features-section";

function blockRenderer(block: any) {
    switch (block.__component) {
        case "layout.hero-section":
            return <HeroSection key={block.id} data={block}/>;
        case "layout.features-section":
            return <FeatureSection key={block.id} data={block}/>;
        default:
            return null;
    }
}

export default async function Home() {

    const strapiData = await getHomePageData();
    const {blocks} = strapiData;
    if (!blocks) return <div>No block found!</div>
    return (
        <main>
            {blocks.map((block: any) => blockRenderer(block))}
        </main>
    );
}
