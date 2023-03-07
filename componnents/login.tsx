import { StatusBar } from 'expo-status-bar';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { isEmailValid } from '../utils/validators';
import { AuthContext } from '../context/AuthContext';
import Register from './register';

const EMAIL = "email";
const PASSWORD = "password";

type iField = "email" | "password"
type iErrMsg = { field: iField | "", msg: string };
type iFormData = { email: string, password: string };

const Login : FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  //const {test} = useContext(AuthContext)
  return (
    <View>
      <Text style={styles.login}>Login</Text>
      <Image source ={require('../assets/logoIcon.png')} style={styles.logo}></Image>
      
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder={'Email: '}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder={'Password: '}
      />
       <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
        <Text style={styles.transferToRegister}>New to the app? Register</Text>
      </TouchableOpacity>
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
  login:{
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
  transferToRegister: {
    alignSelf: 'center',
    fontSize: 15,
    marginBottom: 5,
    marginTop: 5,
  },
});

export default Login