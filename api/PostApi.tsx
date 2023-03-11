import { iEditPost, Post } from "../utils/types/@Post";
import apiClient from "./ClientApi";

const post = 'post'

const getAllPosts = async () => {
    return apiClient.get(`/${post}`);
};

const getPostById = async (postId: string) => {
    return apiClient.get(`/${post}/${postId}`);
};


const addNewPost = async (postJson: any) => {
    return apiClient.post("/post", postJson);
};

const editPost = async (postId: string, editedPost: iEditPost) => {
    return apiClient.put(`/${post}/${postId}`, editedPost);
}
const uploadImage = async (image: any) => {
    return apiClient.post("/file/file", image);
  };

export default {
    getAllPosts,
    getPostById,
    addNewPost,
    editPost,
    uploadImage,
};