import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SortDropdown({sort, onSortChange}: any) {
    const handleSortChange = (value: string) => {
        onSortChange(value);
    };

    return (
        <div className="ml-4">
            <Select value={sort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="title:asc">Sort by Name (A-Z)</SelectItem>
                        <SelectItem value="title:desc">Sort by Name (Z-A)</SelectItem>
                        <SelectItem value="createdAt:desc">Sort by Newest</SelectItem>
                        <SelectItem value="createdAt:asc">Sort by Oldest</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
