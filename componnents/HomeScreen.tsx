import React, { FC, useEffect, useMemo, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
//import GoogleSignInButton from '../componnents/GoogleSignIn';
import Login from './login';
import Register from './register';
//import ForgetPasswordScreen from '../componnents/';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, Image, ActivityIndicatorBase, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ActionBarImage from './ActionBarImage'
import Navigation from './Navigation';
import { AuthContext } from '../context/AuthContext';

const LOGIN = "LOGIN";
const REGISTER = "REGISTER";
const FORGET_PASSWORD = "FORGET_PASSWORD";

export type iCurrentScreen = "LOGIN" | "REGISTER" | "FORGET_PASSWORD";
const Stack = createNativeStackNavigator();

export const Home: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const LoginToApp = () => {
    navigation.navigate('Login')
  }
  const RegisterToApp = () => {
    navigation.navigate('Register')
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}} >
      <View>
        <Image source ={require('../assets/logoIcon.png') } style={{width: 200, height:200, marginBottom:70, borderRadius:30}}></Image>
      </View>
      <TouchableOpacity 
        onPress={LoginToApp} 
        style={{width:300,height:60, backgroundColor: '#EF86C1',borderRadius: 10, flexDirection:'row', justifyContent:'center'}}>
        <Ionicons name={'log-in'} size={43} color={'white'} style={{padding:10, borderRadius:10, paddingEnd:30}} />
        <Text style={{color: 'white', alignSelf: "center",fontSize:20,fontWeight:'bold'}}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity 
          onPress={RegisterToApp}
          style={{width:300,height:60, margin: 18,backgroundColor: '#EF86C1',borderRadius: 10,flexDirection:'row', justifyContent:'center'}}>
        <Ionicons name={'person-add'} size={35} color={'white'} style={{padding:10, borderRadius:10}} />
        <Text style={{color: 'white', alignSelf: "center",fontSize:20, fontWeight:'bold'}}>Register</Text>
      </TouchableOpacity>
    </View>
  ); 
}

const App: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [userToken, setUserToken] = useState(null)

  /*const authContext = useMemo(() => ({
    login:() => {
      //setUserToken(UserInfo.accessToken | null)
      setIsLoading(false)
    },
    signOut: ()=> {
      //setUserToken(null)
      setIsLoading(false)
    },
    signUp: ()=> {
      //setUserToken('vfvvf')
      setIsLoading(false)
    },
  }), undefined);*/

  /*useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    },1000)
  }, [])*/

  /*if(isLoading){
    return(
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }*/
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeActivity" screenOptions={{headerLeft: () => <ActionBarImage />}} >
          <Stack.Screen name="Home" component={Home}  options={{ headerTintColor: '#fff'}}/>
          <Stack.Screen name="Login" component={Login} options={{ headerTintColor: '#fff'}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );


  

/*const HomeScreen : FC = () => {
    /*const googleSignIn = async () => {
        const [request, response, promptAsync] = await Google.useAuthRequest({
            expoClientId: '',
            iosClientId: '',
            androidClientId: '',
        });

        if (response?.type === 'success') {
            const { authentication } = response;
        }
    }*/
   /* return (
        <NavigationContainer>
            <loginStack.Navigator>
                <loginStack.Screen name="Login" component={LoginScreen} />
                <loginStack.Screen name="Register" component={RegisterScreen} />
            </loginStack.Navigator>
        </NavigationContainer>
    );*/
}

export default App