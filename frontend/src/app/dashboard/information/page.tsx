import { AreaChartComponent } from "@/components/custom-ui/area-chart"
import PieChartComponent from "@/components/custom-ui/pie-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateBooksChartData, getAuthorStats, getBooksStats, getCommentsStats, getTagsData } from "@/lib/loaders"
import { FaComment } from "react-icons/fa"
import { ImBooks } from "react-icons/im"
import { MdPeople } from "react-icons/md"

export const revalidate = 3600;

function PieChartCustom({ data }: { data: any }) {
    if (!data?.length) {
        return <div className="flex h-full items-center justify-center text-muted-foreground">No category data available</div>
    }
    return <PieChartComponent data={data} />
}

function AreaChartCustom({ data }: { data: any }) {
    if (!data?.length) {
        return <div className="flex h-full items-center justify-center text-muted-foreground">No monthly data available</div>
    }
    return <AreaChartComponent data={data} />
}

export default async function DashboardInformationPage() {
    const booksStats = await getBooksStats()
    const commentsStats = await getCommentsStats()
    const usersStats = await getAuthorStats()
    const tagsData = await getTagsData()
    const areaChartData = await generateBooksChartData()

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col sm:gap-4 sm:py-4">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <h1 className="text-2xl font-bold mb-2">Library Statistics</h1>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Total Books</CardTitle>
                                <ImBooks className="w-4 h-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{booksStats.total}</div>
                                <p className="text-xs text-muted-foreground">Books in collection</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Average Comments</CardTitle>
                                <FaComment className="w-4 h-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {booksStats.total > 0 ? (commentsStats.total / booksStats.total).toFixed(1) : "0"}
                                </div>
                                <p className="text-xs text-muted-foreground">Comments per book</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                                <FaComment className="w-4 h-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{commentsStats.total}</div>
                                <p className="text-xs text-muted-foreground">Community engagement</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Authors</CardTitle>
                                <MdPeople className="w-4 h-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{usersStats?.total}</div>
                                <p className="text-xs text-muted-foreground">Unique authors</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Card className="md:col-span-1">
                            <CardHeader className="pb-2">
                                <CardTitle>Book Categories</CardTitle>
                            </CardHeader>
                            <CardContent className="h-80">
                                <PieChartCustom data={tagsData.chartData} />
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-1">
                            <CardHeader className="pb-2">
                                <CardTitle>Monthly Additions</CardTitle>
                            </CardHeader>
                            <CardContent className="h-80">
                                <AreaChartCustom data={areaChartData} />
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}