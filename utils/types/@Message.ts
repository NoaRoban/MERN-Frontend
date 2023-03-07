export interface Message {
    _id: string;
    message: string;
    createdAt: Date;
    owner: MessageOwner;
    userId: string;
}

export interface MessageOwner {
    avatarUrl: string;
    name: string;
}