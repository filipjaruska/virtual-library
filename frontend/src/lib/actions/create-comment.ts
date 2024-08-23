"use server";
import {revalidatePath} from "next/cache";
import {z} from "zod";
import {getStrapiURL} from "@/lib/utils";
import {User} from "@/lib/types/books";

const fromSchema = z.object({
    comment: z.string().min(4),
});

type Comment = z.infer<typeof fromSchema>;

export const CreateComment = async (
    bookId: number,
    user: User,
    comment: Comment,
) => {
    const newVote = await postComment(bookId, user, comment);

    revalidatePath("/");

    if (!newVote) return {error: "Comment failed"};
    else return {success: "Comment successful"};
};

const postComment = async (bookId: number, user: User, content: Comment) => {
    try {
        const commentResponse = await fetch(getStrapiURL() + `/api/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    content: content.comment,
                    book: bookId,
                    user: user,
                },
            }),
        });

        const commentData = await commentResponse.json();

        if (!commentResponse.ok) {
            console.error("Failed to create comment:", commentData);
            return;
        }

        const bookResponse = await fetch(getStrapiURL() + `/api/books/${bookId}?populate=comments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const bookData = await bookResponse.json();

        if (!bookResponse.ok) {
            console.error("Failed to fetch the book's current comments:", bookData);
            return;
        }

        const existingComments = bookData.data.attributes.comments.data.map((comment: { id: number }) => comment.id);

        const updatedComments = [...existingComments, commentData.data.id];

        const updateBookResponse = await fetch(getStrapiURL() + `/api/books/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    comments: updatedComments,
                },
            }),
        });

        const updateBookData = await updateBookResponse.json();

        if (!updateBookResponse.ok) {
            console.error("Failed to update book with new comment:", updateBookData);
            return;
        }

        console.log("Comment created and linked successfully");
    } catch (error) {
        console.error("Error posting comment:", error);
    }
    return {}
};