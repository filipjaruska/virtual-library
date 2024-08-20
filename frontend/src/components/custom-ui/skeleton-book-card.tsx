import React from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {Badge} from "@/components/ui/badge";

const BookCardSkeleton: React.FC<any> = () => {
    return (
        <div className="shadow-md rounded-lg overflow-hidden border-2 hover:scale-105 hover:cursor-pointer">
            <Skeleton className="w-full h-48 object-cover"/>
            <div className="p-4">
                <Skeleton className="w-3/4 text-xl font-bold h-8"/>
                <div className="flex flex-row justify-between mt-2">
                    <Skeleton className="opacity-50 w-1/3 h-3"/>
                    <div className="flex flex-row space-x-2">
                        {Array.from({ length: Math.random() > 0.5 ? 2 : 1 }).map((_, index) => (
                            <Badge key={index} variant={Math.random() > 0.5 ? "default" : "primary"} className="min-w-12"/>
                        ))}
                    </div>
                </div>
                <Skeleton className="mt-2 opacity-70 w-full h-6"/>
                <Skeleton className="mt-1 opacity-70 w-full h-6"/>
                <Skeleton className="mt-1 opacity-70 w-3/4 h-6"/>
            </div>
        </div>
    );
};

export default BookCardSkeleton;
