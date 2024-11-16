import { AreaChartComponent } from "@/components/custom-ui/area-chart";
import PieChartComponent from "@/components/custom-ui/pie-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BsBookshelf } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { MdDoNotDisturbOnTotalSilence } from "react-icons/md";

export default function Component() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Total Borrowing</CardTitle>
                                <ImBooks className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">258</div>
                                <p className="text-xs text-muted-foreground">Books</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
                                <BsBookshelf className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">56</div>
                                <p className="text-xs text-muted-foreground">Books</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                                <FaComment className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">434</div>
                                <p className="text-xs text-muted-foreground">Comments</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Total Total</CardTitle>
                                <MdDoNotDisturbOnTotalSilence className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">16</div>
                                <p className="text-xs text-muted-foreground">Total</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <PieChartComponent />
                        </Card>
                        <Card>
                            <AreaChartComponent />
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}