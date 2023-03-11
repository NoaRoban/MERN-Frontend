
import apiClient from "../api/ClientApi"
import PostApi from "../api/PostApi"
import FormData from "form-data"

export type Post = {
    _id?: string;
    text: string;
    userId: string;
    imageUrl: string;
}

const getAllPosts = async () => {
    const res: any = await PostApi.getAllPosts()
    console.log('res--------'+ res.status)
    let data = Array<Post>()
    if (res.status == 200) {
        res.data.forEach((obj: any) => {
            //console.log("element: " + obj._id)
            const post: Post = {
                _id: obj._id,
                text: obj.text,
                userId: obj.userId,
                imageUrl: obj.imageUrl
            }
            data.push(post)
        });
    }
    return data
}
const getPostById = async (postId: string) => {
    try {
        const post = PostApi.getPostById(postId)
    } catch (err) {
        console.log("post by id fail: " + err)
    }
}
const addNewPost = async (post: Post) => {
    console.log("~~~~~~~add new post~~~~~~~~~~~")
    
    const data = {
        text: post.text,
        userId: post.userId,
        imageUrl: post.imageUrl
    }
    try {
        const res = PostApi.addNewPost(data)
    } catch (err) {
        console.log("add post fail: " + err)
    }
}

const uploadImage = async (imageURI: String) => {
    var body = new FormData();
    body.append('file', { name: "name", type: 'image/jpeg', uri: imageURI });
    try {
        const res = await PostApi.uploadImage(body)
        if (!res.ok) {
            console.log("~~~~save failed " + res.problem)
        } else {
            if (res.data) {
                const d: any = res.data
                console.log("----= url:" + d.url)
                return d.url
            }
        }
    } catch (err) {
        console.log("save post img failed " + err)
    }
    return ""
}
export default { getAllPosts,getPostById, addNewPost, uploadImage }