import apiClient from "./ClientApi";
import { URL_PATHS } from "../utils/constants";

interface iSignup {
    email: string;
    password: string;
    name: string
}
const signUpUser = async (data: iSignup) => {
    const { email, password, name } = data;
    return apiClient.post(`/${URL_PATHS.auth}/register`, { email, password, name });
}

interface iSigin {
    email: string;
    password: string;
}
const signInUser = async (data: iSigin) => {
    const { email, password } = data;
    console.log("email: "+ email)
    return apiClient.post(`/${URL_PATHS.auth}/login`, { email, password });
}

const logoutUser = async (token: string) => {
    return apiClient.get(
        `/${URL_PATHS.auth}/logout`,
        {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }
    );
}

const fetchUserInfo = async (accessToken: string) => {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
    });
    const userInfo = await response.json()
    return userInfo
}

export interface iGoogleSign {
    email: string;
    name: string;
    avatar: string;
}
const googleSignUser = async (data: iGoogleSign) => {
    const { avatar, email, name } = data;
    return apiClient.post(`/${URL_PATHS.auth}/google-sign-user`, { avatar, email, name });
}


const authApi = {
    googleSignUser,
    logoutUser,
    signInUser,
    signUpUser,
    fetchUserInfo,
}

export default authApi;