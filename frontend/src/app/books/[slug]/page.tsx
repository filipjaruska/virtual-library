import { CommentsList } from "@/components/custom-ui/comments-list"
import { ExternalLinks } from "@/components/custom-ui/external-links"
import { FavoriteButton } from "@/components/custom-ui/favorite-button"
import Tags from "@/components/custom-ui/tags"
import CreateCommentForm from "@/components/form/comment-form"
import { StrapiImage } from "@/components/ui/strapi-image"
import { getBookData } from "@/lib/loaders"
import { getUserMeLoader } from "@/lib/services/get-user-me-loader"
import { notFound } from "next/navigation"


export default async function BookPage(props: {
    params: { slug: string }
}) {
    const params = await props.params // This is a workaround for an error
    const bookData = await getBookData(params.slug)
    if (!bookData) {
        notFound()
    }

    const user: any = await getUserMeLoader()

    const externalLinks = [
        { name: "Amazon", url: bookData.amazon_url },
        { name: "The StoryGraph", url: bookData.storygraph_url },
    ].filter((link) => link.url)

    return (
        <div className="mx-auto py-8 px-4 md:px-8 max-w-6xl">
            <div className="bg-card shadow-md rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 w-full flex items-center justify-center p-4 md:p-6">
                        <div className="relative w-full max-w-[300px] aspect-[2/3] overflow-clip rounded-md shadow-lg">
                            <StrapiImage
                                src={bookData.image.formats?.large?.url || bookData.image.url}
                                alt={bookData.title}
                                height={450}
                                width={300}
                                className="w-full h-full object-contain"
                                hoverEffect="zoom"
                            />
                        </div>
                    </div>

                    <div className="md:w-2/3 w-full p-4 md:p-6 lg:p-8 flex flex-col">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-primary">{bookData.title}</h1>
                                <h2 className="text-xl text-muted-foreground mt-1">By {bookData.author}</h2>
                            </div>
                            <div className="mt-2 md:mt-0">
                                <FavoriteButton bookId={bookData.id} />
                            </div>
                        </div>

                        <div className="mb-4">
                            <Tags tags={bookData.tags} />
                        </div>

                        <div className="prose prose-sm md:prose-base text-card-foreground mb-6">
                            <p className="text-lg">{bookData.description}</p>
                        </div>

                        {externalLinks.length > 0 && (
                            <div className="mt-auto pt-4 border-t border-border">
                                <ExternalLinks links={externalLinks} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <CreateCommentForm bookId={bookData.id} canSubmit={user.ok} user={user.data} />
                <CommentsList comments={bookData?.comments?.data || []} />
            </div>
        </div>
    )
}
