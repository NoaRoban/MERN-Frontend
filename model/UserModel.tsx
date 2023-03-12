import userApi from "../api/UserApi";
import FormData from "form-data"
import PostApi from "../api/PostApi";

export type Post = {
    _id?: string;
    text: string;
    userId: string;
    imageUrl: string;
}
const uploadImage = async (imageURI: String) => {
    var body = new FormData();
    body.append('file', { name: "name", type: 'image/jpeg', uri: imageURI });
    try {
        const res = await userApi.uploadUserImage(body)
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

const getAllMyPosts = async (userId:string) => {
    const res: any = await PostApi.getAllPostByUserId(userId)
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
export default {getAllMyPosts, uploadImage }