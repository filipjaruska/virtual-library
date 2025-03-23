import { getUserMeLoader } from "@/lib/services/get-user-me-loader"
import { getFavoriteBooks } from "@/lib/actions/favorite-actions"
import UserProfileClient from "@/components/custom-ui/user-profile-client"

export default async function UserDashboardPage() {
    const user = await getUserMeLoader()
    const favorites = await getFavoriteBooks()

    const totalFavorites = favorites?.data.length || 0

    const uniqueAuthors = new Set(favorites?.data.map((book: any) => book.author) || [])
    const allTags = favorites?.data.flatMap((book: any) => book.tags || []) || []
    const uniqueTags = new Set(allTags.map((tag: any) => tag.name))

    const tagCounts = allTags.reduce((acc: any, tag: any) => {
        acc[tag.name] = (acc[tag.name] || 0) + 1
        return acc
    }, {})

    const mostCommonTag =
        Object.entries(tagCounts)
            .sort((a, b) => (b[1] as number) - (a[1] as number))
            .map(([name]) => name)[0] || "None"

    const stats = {
        totalFavorites,
        uniqueAuthors: uniqueAuthors.size,
        uniqueTags: uniqueTags.size,
        mostCommonTag,
    }

    return <UserProfileClient user={user} favorites={favorites || []} stats={stats} />
}