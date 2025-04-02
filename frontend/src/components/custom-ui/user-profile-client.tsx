"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Heart, User2, BarChart3, BookMarked, Users, MessageSquare } from "lucide-react"
import BookCard from "@/components/custom-ui/book-card"
import { Badge } from "@/components/ui/badge"
import { User } from "@/lib/types/books"

interface UserProfileStats {
    totalFavorites: number;
    uniqueAuthors: number;
    uniqueTags: number;
    mostCommonTag: string;
}

export default function UserProfileClient({ user, favorites, stats }: any) {
    const [activeTab, setActiveTab] = useState("favorites")

    if (!user.ok) {
        return <div className="p-8 text-center">User information not available</div>
    }

    const getAvatarUrl = (image: any) => {
        if (!image) return "https://placehold.co/96x96";

        if (typeof image === 'string') return image;

        if (image.formats?.thumbnail?.url) return image.formats.thumbnail.url;
        if (image.url) return image.url;

        if (image.image?.url) return image.image.url;

        return "https://placehold.co/96x96";
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <div className="grid gap-8 md:grid-cols-3">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                    >
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle>Profile</CardTitle>
                                <CardDescription>Your personal information</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center space-y-4">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src={getAvatarUrl(user.data?.image)} alt="User Avatar" height={96} width={96} />
                                    </Avatar>

                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold">{user.data.username}</h2>
                                        <p className="text-muted-foreground">{user.data.email}</p>
                                    </div>

                                    <div className="w-full pt-4 border-t">
                                        <div className="flex items-start py-2">
                                            <MessageSquare className="mr-2 h-4 w-4 mt-1 text-muted-foreground" />
                                            <div>
                                                <span className="text-sm font-medium">About Me</span>
                                                {user.data.bio ? (
                                                    <p className="text-muted-foreground mt-1">{user.data.bio}</p>
                                                ) : (
                                                    <p className="text-muted-foreground mt-1 italic">No bio provided</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full pt-2 border-t">
                                        <div className="flex items-center py-2">
                                            <User2 className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span>Member since {new Date(user.data.createdAt || "").toLocaleDateString()}</span>
                                        </div>

                                        <div className="flex items-center py-2">
                                            <BookMarked className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span>{stats.totalFavorites} favorite books</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <div className="md:col-span-2">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="favorites">
                                        <Heart className="mr-2 h-4 w-4" />
                                        Favorites
                                    </TabsTrigger>
                                    <TabsTrigger value="stats">
                                        <BarChart3 className="mr-2 h-4 w-4" />
                                        Statistics
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="favorites" className="mt-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Your Favorite Books</CardTitle>
                                            <CardDescription>You have {stats.totalFavorites} favorite books</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            {favorites.data.length === 0 ? (
                                                <div className="text-center py-8 text-muted-foreground">
                                                    <BookOpen className="mx-auto h-12 w-12 mb-4 opacity-30" />
                                                    <p>You haven't added any favorite books yet.</p>
                                                    <p className="text-sm">Browse the catalog and click the heart icon to add favorites.</p>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    <AnimatePresence>
                                                        {favorites.data.map((book: any, index: any) => (
                                                            <div key={book.id}>
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 20 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    transition={{ delay: index * 0.05, duration: 0.3 }}
                                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                                >
                                                                    <BookCard {...book} />
                                                                </motion.div>
                                                            </div>
                                                        ))}
                                                    </AnimatePresence>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="stats" className="mt-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Reading Statistics</CardTitle>
                                            <CardDescription>Insights about your reading preferences</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-6 md:grid-cols-2">
                                                <StatCard
                                                    icon={<BookMarked className="h-5 w-5" />}
                                                    title="Favorite Books"
                                                    value={stats.totalFavorites}
                                                    description="Total books in your collection"
                                                />

                                                <StatCard
                                                    icon={<Users className="h-5 w-5" />}
                                                    title="Authors"
                                                    value={stats.uniqueAuthors}
                                                    description="Different authors you enjoy"
                                                />

                                                <StatCard
                                                    icon={<BookOpen className="h-5 w-5" />}
                                                    title="Genres & Tags"
                                                    value={stats.uniqueTags}
                                                    description="Variety in your collection"
                                                />

                                                <div className="bg-card rounded-lg p-4 border">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="font-medium">Most Common Tag</h3>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <Badge variant="primary" className="text-sm">
                                                            {stats.mostCommonTag}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mt-2">Your most frequent book category</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

// Helper component for statistics cards
function StatCard({ icon, title, value, description }: any) {
    return (
        <div className="bg-card rounded-lg p-4 border">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{title}</h3>
                <div className="text-primary">{icon}</div>
            </div>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
    )
}

// Helper function to get Strapi media URL
function getStrapiMedia(url: any) {
    if (!url) return null
    if (url.startsWith("http") || url.startsWith("https")) {
        return url
    }
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${url}`
}

