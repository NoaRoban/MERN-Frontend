import { StatusBar } from 'expo-status-bar';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {FontAwesome5} from '@expo/vector-icons'
import { Input, NativeBaseProvider, Button, Box, AspectRatio } from 'native-base';
import { UserOutlined } from '@ant-design/icons';
/***import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
GoogleSignin.configure();***/
import Spinner from 'react-native-loading-spinner-overlay'

import Login from './login'
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { iCurrentScreen } from './HomeScreen';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { isEmailValid } from '../utils/validators';
WebBrowser.maybeCompleteAuthSession();

/*const [request, response, promptAsync] = Google.useAuthRequest({
  androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
});*/


const EMAIL = "email";
const PASSWORD = "password";
const NAME = "name";

type iField = "email" | "password" | "name";
type iErrMsg = { field: iField | "", msg: string };
type iFormData = { email: string, password: string, name: string };

interface Props {
    setScreen: (newScreen: iCurrentScreen) => void;
}


const Register : FC<{ route: any, navigation: any,setScreen: Props}> = ({ route, navigation,setScreen: Props  }) => {
  /*const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegistered, setIsRegistered] = useState(false)*/

  const { register, handleSubmit, setValue } = useForm<iFormData>({
    mode: "onChange",
    defaultValues: { email: "noa123@gmail.com", password: "123456", name: "Noa" }
  });

  const { isLoading, register: registerUser } = useContext(AuthContext);

  const [errMsg, setErrMsg] = useState<iErrMsg>({ field: "", msg: "" });

  const onSubmit = useCallback(async (formData: iFormData) => {
    const { email, password, name } = formData;

    if (!email) {
        setErrMsg({ field: EMAIL, msg: "Required field" });
        return;
    } else if (!isEmailValid(email)) {
        setErrMsg({ field: EMAIL, msg: "Email is not valid" });
        return;
    }

    if (!password) {
        setErrMsg({ field: PASSWORD, msg: "Required field" });
        return;
    }

    if (!name) {
        setErrMsg({ field: NAME, msg: "Required field" });
        return;
    }

    const success = await registerUser(email, password, name);

    if (success !== true) {
        setErrMsg({ field: "", msg: success || "" });
    } else {
        //setScreen("LOGIN");
        navigation.navigate('Login')
    }
}, []);

const onChangeField = useCallback(
    (name: iField) => (text: string) => {
        setValue(name, text);
        if (errMsg.msg) {
            setErrMsg({ field: "", msg: "" });
        }
    },
    []
);

useEffect(() => {
  register('name');
  register('email');
  register('password');
}, [register]);

return (
  <View>
    <Spinner visible={isLoading} />
    <Text style={styles.signup}>Signup</Text>
    <Image source ={require('../assets/logoIcon.png')} style={styles.logo}></Image>
      
    <TextInput
      style={[styles.input,{ borderColor: errMsg.field === NAME ? "red" : '#111' } ]}
      onChangeText={onChangeField('name')}
      placeholder={'Name'}
      keyboardType="default"
    />
    <TextInput
      autoComplete="email"
      style={[styles.input,{ borderColor: errMsg.field === EMAIL ? "red" : '#111' } ]}
      onChangeText={onChangeField('email')}
      placeholder={'Email'}
      keyboardType="email-address"
      textContentType="emailAddress"
      

    />
     <TextInput
      secureTextEntry
      style={[styles.input,{ borderColor: errMsg.field === PASSWORD ? "red" : '#111' } ]}
      onChangeText={onChangeField('password')}
      placeholder={'Password'}
      autoComplete="password"
    />

    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)} disabled={isLoading}>
        <Text style={styles.btnText}>REGISTER NOW</Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
      <Text style={styles.transferToLogin}>Already have account? Login</Text>
    </TouchableOpacity>
    {errMsg.msg &&
      <Text style={{ color: 'red' }} >
          {errMsg.msg}
      </Text>
    }
    <View style={styles.lineStyle}>
      <View style={{flex:1, height:1, backgroundColor: '#EF86C1'}}/>
        <View>
          <Text style={{width: 50, textAlign: 'center'}}>Or</Text>
        </View>
      <View style={{flex:1, height:1, backgroundColor: '#EF86C1'}}/>
      </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo:{
    height:200,
    resizeMode:"contain",
    alignSelf: "center",
    borderRadius:30,
  },
  signup:{
    fontSize:30,
    alignSelf: "center",
    fontWeight: 'bold',
    color: '#EF86C1',
    marginBottom:10,
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  btn: {
    flex: 1,
    margin: 12,
    padding: 12,
    backgroundColor: '#EF86C1',
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    alignSelf: "center",
  },
  lineStyle: {
    flexDirection: 'row' ,
     margin: 5,
     padding: 5,
     marginTop: 30,
     marginLeft: 15,
     marginRight: 15,
     alignItems: "center",
  },
  buttonStyleX:{
    marginTop:12,
    marginLeft:15,
    marginRight:15
  },
  emailInput:{
    marginTop:10,
    marginRight:5
  },
  transferToLogin: {
    alignSelf: 'center',
    fontSize: 15,
    marginBottom: 0,
    marginTop: 5,
  },
});

export default Register