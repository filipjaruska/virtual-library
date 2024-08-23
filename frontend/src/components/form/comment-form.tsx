"use client";
import React from 'react'
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";

import {Button} from "@/components/ui/button";
import {CreateComment} from "@/lib/actions/create-comment";
import {User} from "@/lib/types/books";
import {Textarea} from "@/components/ui/textarea";

interface Props {
    bookId: number,
    user: User,
    canSubmit: boolean,
}

const fromSchema = z.object({
    comment: z.string().min(4).max(144),
});

const CreateCommentForm = ({bookId, user, canSubmit}: Props) => {
    const form = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            comment: '',
        },
    });

    async function onSubmit(value: z.infer<typeof fromSchema>) {
        await CreateComment(bookId, user, value).then((result: any) => {
            if (result?.success) {
                form.reset();
                // toast.success(result.success);
            }
            if (result?.error) {
                // toast.error(result.error);
            }
        })

    }

    return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-6 gap-4 mb-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 flex flex-col'>
                    <h3 className="text-2xl font-bold text-primary mb-4">Comments</h3>
                    <div>
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            {...field} id='comment' name='comment'
                                            placeholder="Write a comment..."
                                            className="w-full p-4 mb-4 border rounded-lg focus:outline-none"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    {canSubmit ? <Button type='submit'>Submit</Button> :
                        <div className="text-red-700 font-extrabold text-center">You do not have permission to EXIST!
                            (upload)</div>}
                </form>
            </Form>
        </div>
    )
}

export default CreateCommentForm