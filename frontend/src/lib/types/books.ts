export interface Books {
    books: Book[];
}

export interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    image: ImageProps;
    tags: Tag[];
    comments?: CommentsData;
}

interface ImageProps {
    url: string;
    alternativeText: string;
}

export interface Tag {
    id: number;
    name: string;
}

interface CommentsData {
    data: BookComment[];
}

export interface BookComment {
    id: number;
    content: string;
    createdAt: string;
    user?: User;
}

export interface User {
    id: number;
    username: string;
    email?: string;
    provider?: string;
    confirmed?: boolean;
    blocked?: boolean;
    createdAt?: string;
    updatedAt?: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
}