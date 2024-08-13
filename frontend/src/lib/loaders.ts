import qs from "qs";
import { unstable_noStore as noStore} from "next/cache"; //TODO remove later
import { flattenAttributes, getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

async function fetchData(url: string) {
    const authToken = null;
    const headers = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        },
    };

    try {
        const response = await fetch(url, authToken ? headers : {});
        const data = await response.json();
        return flattenAttributes(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function getBookData(bookId: String) {
    const url = new URL(`/api/books/${bookId}`, baseUrl);
    url.search = qs.stringify({
        populate: {
            image: {
                fields: ["url", "alternativeText"],
            },
        },
    });

    return await fetchData(url.href);
}

export async function getBooksPageData(){
    noStore()
    const url = new URL("/api/books", baseUrl);
    url.search = qs.stringify({
        populate: {
            books:{
                populate: true,
            },
            image: {
                fields: ["url", "alternativeText"],
            }
        }
    })
    console.log(url.search)
    return await fetchData(url.href)
}

export async function getHomePageData() {
    noStore()
    const url = new URL("/api/home-page", baseUrl)
    url.search = qs.stringify({
        populate: {
            blocks: {
                populate: {
                    image: {
                        fields: ["url", "alternativeText"],
                    },
                    link: {
                        populate: true,
                    },
                    feature: {
                        populate: true
                    },
                    qnas: {
                        populate: true
                    }
                }
            }
        }
    })
    return await fetchData(url.href)
}

export async function getGlobalPageData(){
    noStore()
    const url = new URL("/api/global", baseUrl)
    url.search = qs.stringify({
        populate:[
            "header.logoText",
            "header.ctaButton",
            "footer.logoText",
            "footer.socialLink",
        ]
    })
    return await fetchData(url.href)
}

export async function getGlobalPageMetadata(){
    const url = new URL("/api/global", baseUrl);
    url.search = qs.stringify({
        fields: ["title", "description"],
    })
    return await fetchData(url.href)
}