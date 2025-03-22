import React from 'react';
import Tags from "@/components/custom-ui/tags";
import CreateCommentForm from "@/components/form/comment-form";
import { Button } from "@/components/ui/button";
import { StrapiImage } from '@/components/ui/strapi-image';
import { getBookData } from "@/lib/loaders";
import { getUserMeLoader } from "@/lib/services/get-user-me-loader";
import { notFound } from 'next/navigation';
import { Book, BookComment } from "@/lib/types/books";
import { FavoriteButton } from '@/components/custom-ui/favorite-button';
import { getFavoriteBooks } from '@/lib/actions/favorite-actions';

export default async function BookPage(props: {
    params: { slug: string }
}) {
    const params = await props.params; // This is a workaround for an error
    const bookData = await getBookData(params.slug);
    if (!bookData) {
        notFound();
    }

    const user: any = await getUserMeLoader()
    return (
        <div className="mx-auto py-8 px-4 md:px-8">
            <div className="bg-card shadow-md rounded-lg flex flex-col md:flex-row overflow-hidden">
                <div className="md:w-1/3 w-full">
                    <StrapiImage
                        src={bookData.image.formats?.large?.url || bookData.image.url}
                        alt={bookData.title}
                        height={150}
                        width={150}
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-primary mb-4">{bookData.title}</h1>
                        <h2 className="text-xl text-muted-foreground mb-2">By {bookData.author}</h2>
                        <p className="text-lg text-card-foreground mb-6">{bookData.description}</p>

                        <Tags tags={bookData.tags} />
                    </div>
                    <div className="ml-auto">
                        <FavoriteButton bookId={bookData.id} />
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <CreateCommentForm bookId={bookData.id} canSubmit={user.ok} user={user.data} />

                <div className="space-y-4">
                    {bookData?.comments?.data.map((comment: BookComment) => (
                        <div key={comment.id} className="bg-card p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-muted-foreground">
                                {comment.user?.username || "Anonymous"} • {new Date(comment.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-base text-card-foreground">
                                {comment.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
