interface ImageProps {
    id: number;
    url: string;
    alternativeText: string;
}

interface Tag {
    id: number;
    name: string;
}

interface Book {
    id: number;
    title: string;
    author: string;
    image: ImageProps;
    description: string;
    tags: Tag[];
}

interface Books{
    books: Book[];
}