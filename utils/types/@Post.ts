export interface Post {
    _id?: string;
    text: string;
    image?: string;
    userId?: string;
    owner?: PostOnwer
}

export interface PostOnwer {
    name: string;
    email: string;
    avatarUrl: string;
    _id: string;
}

export interface iEditPost {
    text?: string;
    image?: string;
}