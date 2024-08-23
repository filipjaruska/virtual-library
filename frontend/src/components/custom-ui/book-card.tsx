import React from "react";
import {getStrapiURL} from "@/lib/utils";
import Link from "next/link";
import Tags from "@/components/custom-ui/tags";
import {Book} from "@/lib/types/books";


const BookCard: React.FC<Book> = ({title, author, image, description, id, tags}) => {

    return (
        <div className="shadow-md rounded-lg overflow-hidden border-2 hover:scale-105 hover:cursor-pointer">
            <Link href={"books/" + String(id)}>
                <img style={{userSelect: "none"}} src={getStrapiURL() + image.url} alt={title}
                     className="w-full h-48 object-cover"/>
                <div className="p-4">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <div className="flex flex-row justify-between">
                        <p className="text-sm opacity-50">{author}</p>
                        <Tags tags={tags}/>
                    </div>
                    <p className="mt-2 opacity-70">{description}</p>
                </div>
            </Link>
        </div>
    );
};

export default BookCard;
