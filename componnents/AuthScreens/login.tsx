import { StatusBar } from 'expo-status-bar';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { isEmailValid } from '../../utils/validators';
import { AuthContext } from '../../context/AuthContext';
import Register from './register';
import Spinner from 'react-native-loading-spinner-overlay'
import StudentList from '../StudentList';
import Navigation from '../Navigation'
import NavigationIndex from '../Index'
import GoogleSignInButton from './GoogleAuth';

const EMAIL = "email";
const PASSWORD = "password";

type iField = "email" | "password"
type iErrMsg = { field: iField | "", msg: string };
type iFormData = { email: string, password: string };

const Login : FC<{ route: any, navigation: any }> = ({ route, navigation }) => {    
  const { register, handleSubmit, setValue } = useForm<iFormData>({ mode: "onChange" });

  const { isLoading, login } = useContext(AuthContext);

  const [errMsg, setErrMsg] = useState<iErrMsg>({ field: "", msg: "" });

  const onSubmit = useCallback(async (formData: iFormData) => {
    const { email, password } = formData;

    if (!email) {
        setErrMsg({ field: EMAIL, msg: "Required field" });

        return;
    } else if (!isEmailValid(email)) {
        setErrMsg({ field: EMAIL, msg: "Email is not valid" })

        return;
    }

    if (!password) {
        setErrMsg({ field: PASSWORD, msg: "Required field" })

        return;
    }
    const res = await login(email, password)

    setErrMsg({ field: "", msg: res as string })

  }, []);

  const onChangeField = useCallback(
      (name: iField) => (text: string) => {
          setValue(name, text);
          if (errMsg.field) {
              setErrMsg({ field: "", msg: "" })
          }
      },
      []
  );

  useEffect(() => {
      register('email');
      register('password');
  }, [register]);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <View>
      <Spinner visible={isLoading} />
      <Text style={styles.login}>Login</Text>
      <Image source ={require('../../assets/logoIcon.png')} style={styles.logo}></Image>
      
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

    {errMsg.msg &&
      <Text style={{ color: 'red', marginLeft:10, fontWeight: 'bold' }} >
          {errMsg.msg}
      </Text>
    }

    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)} disabled={isLoading}>
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

      <GoogleSignInButton disabled={isLoading} />
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
    marginBottom: 0,
    marginTop: 5,
  },
});

export default Login