import {Button} from "@/components/ui/button";
import {flattenAttributes} from "@/lib/utils";

async function run(path: string) {
    const baseUrl = "http://localhost:1337";
    try {
        const response = await fetch(baseUrl + path)
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
    const {title, description} = strapiData;
    return (
        <main>
            <h1>{title}</h1>
            <p>{description}</p>
            <Button>Button</Button>
        </main>
    );
}
