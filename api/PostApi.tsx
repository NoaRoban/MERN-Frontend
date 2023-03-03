import apiClient from "./ClientApi";

const getAllPosts = async () => {
    return apiClient.get("/post")
}

export default{ getAllPosts}