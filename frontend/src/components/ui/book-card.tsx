import React from "react";
import {getStrapiURL} from "@/lib/utils";
import Link from "next/link";
interface ImageProps {
    id: number;
    url: string;
    alternativeText: string;
}
interface BookCardProps {
    id: number;
    title: string;
    author: string;
    image: ImageProps;
    description: string;
}

const BookCard: React.FC<BookCardProps> = ({title, author, image, description, id}) => {
    
    return (
        <div className="shadow-md rounded-lg overflow-hidden border-2 hover:scale-105 hover:cursor-pointer">
            <Link href={String(id)}>
            <img style={{ userSelect: "none" }} src={getStrapiURL() + image.url} alt={title} className="w-full h-48 object-cover"/>
            <div className="p-4">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-sm opacity-50">{author}</p>
                <p className="mt-2 opacity-70">{description}</p>
            </div>
            </Link>
        </div>
    );
};

export default BookCard;
