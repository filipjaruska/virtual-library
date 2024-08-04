import qs from 'qs'
import {Button} from "@/components/ui/button";
import {flattenAttributes} from "@/lib/utils";
import {HeroSection} from "@/components/section/hero-section";

const homePageQuery = qs.stringify({
    populate: {
        blocks: {
            populate: {
                image: {
                    fields: ["url", "alternativeText"],
                },
                link: {
                    populate: true,
                }
            }
        }
    }
});
async function run(path: string) {
    const baseUrl = "http://localhost:1337";
    
    const url = new URL(path, baseUrl);
    url.search = homePageQuery;
    try {
        const response = await fetch(url.href, {cache: "no-store"});
        const data = await response.json()
        const lattenData = flattenAttributes(data)
        console.dir(lattenData,  {depth: null})
        return lattenData;
    } catch (error) {
        console.log(error)
    }
}

export default async function Home() {

    const strapiData = await run("/api/home-page")
    const {title, description, blocks} = strapiData;
    return (
        <main>
            <HeroSection data={blocks[0]}/>
        </main>
    );
}
