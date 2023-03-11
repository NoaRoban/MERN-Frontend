import React, { useContext, useState,useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import AuthNavigationContainer from "./AuthScreens/AuthNavigation";
import Navigation from "./Navigation";
import StudentList from "./StudentList";
import UnAuthNavContainer from "./AuthScreens/UnAuthNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthNavigation from "./AuthScreens/AuthNavigation";
import AppLoading from 'expo-app-loading'

const NavigationIndex = () => {
   
    const { userInfo } = useContext(AuthContext);
    console.log('user id: '+ userInfo.id)
    console.log('user access token: '+ userInfo.accessToken)
    console.log('user refresh token: '+ userInfo.refreshToken)

    return userInfo.refreshToken? <AuthNavigation/> : <UnAuthNavContainer />
}

export default NavigationIndex;