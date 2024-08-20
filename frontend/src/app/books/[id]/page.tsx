import React from 'react';
import { getBookData } from "@/lib/loaders";
import { getStrapiURL } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Tags from "@/components/custom-ui/tags";

export default async function Page({ params }: { params: { id: string } }) {
    const book: Book = await getBookData(String(params.id));

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

                        <Tags tags={book.tags} />
                    </div>
                    <div className="ml-auto">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                            Button
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Comments</h3>

                <div className="mb-6">
                    <Textarea
                        placeholder="Write a comment..."
                        className="w-full p-4 mb-4 bg-card text-card-foreground border rounded-lg focus:outline-none"
                    />
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                        Post Comment
                    </Button>
                </div>

                <div className="space-y-4">
                    <div className="bg-card p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-muted-foreground">User1 • 2 hours ago</p>
                        <p className="text-base text-card-foreground">
                            This book was an amazing read! Highly recommend.
                        </p>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-muted-foreground">User2 • 1 day ago</p>
                        <p className="text-base text-card-foreground">
                            I found the story a bit slow, but the characters were well-developed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
