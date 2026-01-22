import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/lib/types/books";

export default function Tags({ tags }: { tags: Tag[] }) {
    return (
        <div className="text-muted-foreground">
            {tags.map((tag, index) => (
                <Badge
                    variant={["popular", "new", "gold", "upcoming"].includes(tag.name) ? "primary" : "default"}
                    key={tag.id || `tag-${index}-${tag.name}`}
                    className="mr-2"
                >
                    {tag.name}
                </Badge>
            ))}
        </div>
    );
}