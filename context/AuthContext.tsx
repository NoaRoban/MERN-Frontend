import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiResponse } from 'apisauce';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { Value } from 'react-native-reanimated';
import authApi from '../api/AuthApi';
import apiClient from '../api/ClientApi';
import userApi from '../api/UserApi';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';
import { Post } from '../utils/types/@Post';
import { iEditUser, User } from '../utils/types/@User';


type UserInfo = {
    accessToken: string;
    refreshToken: string;
    id: string;
};

type UserData = {
    name: string;
    id: string;
    imageUrl: string;
};

type AuthContextType = {
    userId: string;
    isLoading: boolean;
    userInfo: UserInfo;
    splashLoading: boolean;
    register: (email: string, password: string, name: string) => Promise<true | string> | null;
    login: (email: string, password: string) => Promise<true | string> | null;
    logout: () => void;
    toggleLoading: () => void;
    editUserInfo: (userId: string, data: iEditUser) => void;
    getUserInfo: (id: string) => void;
    googleSignin: (accessToken: string) => Promise<boolean> | null;
    userData?: User;
    isLoggedIn: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    userId: '',
    userData: {imageUrl: '',
        email: '',
        name: '',
        posts: []},
    isLoading: false,
    userInfo: { accessToken: '', refreshToken: '', id: '' },
    splashLoading: false,
    register: (email: string, password: string, name: string) => null,
    login: (email: string, password: string) => null,
    googleSignin: () => null,
    editUserInfo: () => null,
    getUserInfo: () => null,
    logout: () => { },
    toggleLoading: () => { },
    isLoggedIn: () => {},
});

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<UserInfo>({ accessToken: '', refreshToken: '', id: '' })

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [splashLoading, setSplashLoading] = useState<boolean>(false)

    const [userData, setUserData] = useState<User>()
    const [userId, setUserId] = useState('')
    const register = async (email: string, password: string, name: string): Promise<true | string> => {
        setIsLoading(true);
        const res = await authApi.signUpUser({ email, password, name })
        const data: any = res?.data;
        if (data?.err) {
            setIsLoading(false);
            return data.err as string;
        }
        console.log('the user ID:' + data._id)
      
        setUserId(data._id)
        //setUserData(user)
        //userId =data._id
        setIsLoading(false);
        return true;
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        console.log('isLoading ' + isLoading)

        const res = await authApi.signInUser({ email, password });
        const data: UserInfo | any = res.data;
        
        if (data.err) {
            setIsLoading(false);

            return data.err as string;
        }
        //console.log('the user ID:' + data.id)

        await createUserSession(data);
        setIsLoading(false);
        return true;
    };

    const googleSignin = async (googleToken: string) => {
        const userInfo = await authApi.fetchUserInfo(googleToken);

        const res = await
            authApi.googleSignUser({
                email: userInfo.email,
                name: userInfo.given_name,
                avatar: userInfo.picture
            });

        const data: UserInfo | any = res.data;

        if (!data.err) {
            await createUserSession(data);
        }

        return true;
    }

    const logout = async () => {
        setIsLoading(true);

        await Promise.all([
            authApi.logoutUser(userInfo.refreshToken),
            AsyncStorage.removeItem('userInfo'),
            AsyncStorage.clear()
        ]);

        setIsLoading(false);
        setUserInfo({ accessToken: '', refreshToken: '', id: '' });
    }

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);    
            let userInfo: any = await AsyncStorage.getItem('userInfo')
          
            
            console.log(' ~~~~~~~~~~~~~~the user info~~~~~~~~~~~ '+userInfo.id)
            userInfo = JSON.parse(userInfo);
            console.log(' ~~~~~~~~~~~~~~the user info~~~~~~~~~~~ '+userInfo.accessToken)
            if (userInfo) {
                setUserInfo(userInfo);
                apiClient.setHeader('Authorization', `Bearer ${userInfo.accessToken}`)
            }
            setSplashLoading(false);
        } catch (e) {
            setSplashLoading(false);
        }
    };

    const toggleLoading = (val?: boolean) => setIsLoading(prevState => val || !prevState);

    const editUserInfo = async (userId: string, data: iEditUser) => {
        await userApi.editUserInfo(userId, data);
        getUserInfo(userId);
    }

    const getUserInfo = async (userId: string) => {
        const res = await userApi.getUser(userId)
        console.log(' the user data~~~~~~~~~~~ '+res.data)

        setUserData(res.data as User);
    }

    const createUserSession = async (data: UserInfo) => {
        try{
            let id:any = await userApi.getUser(data.id)
            /*for(let i = 0; i < id.data.length; i++) {
                let item = id.data[i];
                if(item.id === 1) {
                    id = item;
                    break;
                }
            }*/
            //id = JSON.parse(id);

            console.log('userrrrrrrrrrrrrrrrrrrr   name   '+id.data?.name);
            console.log('userrrrrrrrrrrrrrrrrrrr   name  '+id.data?.name);
            const user: User = {
                imageUrl: id.data?.imageUrl,
                email: id.data?.email,
                name: id.data?.name,
                posts: id.data?.posts,
            }
            let storedObject = {
                                'id':data.id,
                                'accessToken': data.accessToken,
                                'refreshToken': data.refreshToken
                            };

            setUserId(data.id)
            const storedDetalils= {
                'imageUrl': id.data?.imageUrl,
                'email': id.data?.email,
                'name': id.data?.name,
                'posts': id.data?.posts,
            };
            const userRes1 = await AsyncStorage.setItem('userInfo', JSON.stringify(storedObject));
            const userRes2 = await AsyncStorage.setItem('userDetails', JSON.stringify(storedDetalils));

            //const [userRes] = await Promise.all([userApi.getUser(data.id), AsyncStorage.setItem(ACCESS_TOKEN, data.accessToken), AsyncStorage.setItem(REFRESH_TOKEN, data.refreshToken)])
            //const userData = id.data;

            //const userData = {'name': (await id).data.};
           /* const user:User ={
                imageUrl: '',
                email: id.data[0].email,
                name: id.data[0].name,
                posts: []
            }  */  
             setUserData(user);
             //console.log('the user dataaaa    ' + userData.name)
             //console.log('the user dataaaa    ' + userData?.email)

            //setUserData({'name':id.data[0].name, 'email':  })
            setUserInfo(data);
         
            apiClient.setHeader('Authorization', `Bearer ${storedObject.accessToken}`)
        }catch(err){
            console.log('Failed to save the data to the storage')
        }
    }

    const getUserId = async (data: UserInfo) => {
        try{
            let userId = userApi.getUser(data.id)
            //setUserId(data.id)
            return userId
        }catch(err){
            console.log('Failed to save the data to the storage')
        }
    }
    const setUserDetails = async () => {
        try{
            const userDetails:any = await userApi.getUser(userInfo.id)
            //const data = await userDetails.json();
            const user: User = {
                imageUrl: userDetails.data?.imageUrl,
                email: userDetails.data?.email,
                name: userDetails.data[0]?.name,
                posts: userDetails.data?.posts,
            }
            let userD: any = await AsyncStorage.getItem('userDetails')

            console.log(' ~~~~~~~~~~~~~~name in async~~~~~~~~~~~ '+ userDetails.data?.email)
            //console.log(' ~~~~~~~~~~~~~~name~~~~~~~~~~~ '+ res.data?.name)

            setUserData(userDetails);
            setIsLoading(false);
        }catch(err){
            console.log('Failed to save the data to the storage')
        }
    }
    useEffect(() => {
        isLoggedIn();
        setUserDetails();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                userId,
                isLoading,
                userInfo,
                splashLoading,
                register,
                login,
                logout,
                getUserInfo,
                googleSignin,
                userData,
                editUserInfo,
                toggleLoading,
                isLoggedIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};