import { Post } from "./@Post";

export interface User {
    imageUrl: string;
    email: string;
    name: string;
    posts: Post[];
}

export interface iEditUser {
    imageUrl?: string;
    name?: string;
}