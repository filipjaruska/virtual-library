import {Button} from "@/components/ui/button";

async function run(path: string) {
    const baseUrl = "http://localhost:1337";
    try {
        const response = await fetch(baseUrl + path)
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}

export default async function Home() {

    const strapiData = await run("/api/home-page")
    const {title, description} = strapiData.data.attributes;
    return (
        <main>
            <h1>{title}</h1>
            <p>{description}</p>
            <Button>Button</Button>
        </main>
    );
}
