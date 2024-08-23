import React from 'react';
import {getBookData} from "@/lib/loaders";
import {getStrapiURL} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Tags from "@/components/custom-ui/tags";
import {Book, BookComment} from "@/lib/types/books";
import CreateCommentForm from "@/components/form/comment-form";
import {getUserMeLoader} from "@/lib/services/get-user-me-loader";

export default async function Page({params}: { params: { id: string } }) {
    const book: Book = await getBookData(String(params.id));
    const user: any = await getUserMeLoader()
    return (
        <div className="mx-auto py-8 px-4 md:px-8">
            <div className="bg-card shadow-md rounded-lg flex flex-col md:flex-row overflow-hidden">
                <div className="md:w-1/3 w-full">
                    <img
                        src={getStrapiURL() + book.image.url}
                        alt={book.image.alternativeText}
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-primary mb-4">{book.title}</h1>
                        <h2 className="text-xl text-muted-foreground mb-2">By {book.author}</h2>
                        <p className="text-lg text-card-foreground mb-6">{book.description}</p>

                        <Tags tags={book.tags}/>
                    </div>
                    <div className="ml-auto">
                        <Button
                            className="bg-primary text-primary-foreground hover:bg-primary/90">
                            Button
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <CreateCommentForm bookId={book.id} canSubmit={user.ok} user={user.data}/>

                <div className="space-y-4">
                    {book?.comments?.data.map((comment: BookComment) => (
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
