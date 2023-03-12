import FormData from "form-data";

import apiClient from "./ClientApi";

import { URL_PATHS } from "../utils/constants";
import { iEditUser } from "../utils/types/@User";

const getUser = async (userId: string) => {
    console.log("GET USER  -----      "+ userId)
    return apiClient.get(`/${URL_PATHS.user}/${userId}`);
};

const editUserInfo = async (userId: string, userData: iEditUser) => {
    console.log("user id in editUserInfo   " +userId)
    console.log("user data in edit user info   " +userData.imageUrl)
    return apiClient.post(`/${URL_PATHS.user}/edit-user/${userId}`, userData);
};

const uploadUserImage = async (imageURI: any)=> {
    console.log('~~~~~~~~~~ upload image---------')
    return apiClient.post("/file/file", imageURI);

};



const userApi = {
    getUser,
    editUserInfo,
    uploadUserImage,
};

export default userApi;
