"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLibraryStore } from "@/stores/library-store";

const commentSchema = z.object({
  author: z.string().trim().max(40, "Keep the name under 40 characters.").optional(),
  content: z
    .string()
    .trim()
    .min(4, "A comment needs at least 4 characters.")
    .max(400, "Keep it under 400 characters."),
});

type CommentValues = z.infer<typeof commentSchema>;

export default function CommentForm({ slug }: { slug: string }) {
  const addComment = useLibraryStore((state) => state.addComment);

  const form = useForm<CommentValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { author: "", content: "" },
  });

  const onSubmit = (values: CommentValues) => {
    addComment(slug, values.author ?? "", values.content);
    form.reset({ author: values.author, content: "" });
  };

  return (
    <div className="rounded-lg border bg-card p-4 sm:p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Optional — defaults to “You”" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What did you make of it?"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              Saved in this browser only — nothing is sent anywhere.
            </p>
            <Button type="submit">Post comment</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
