import { StatusBar } from 'expo-status-bar';
import { FC, useState } from 'react';
import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity } from 'react-native';

const Login : FC = ()=> {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <View>
      <Image source ={require('./assets/postbox.png')} style={styles.logo}></Image>
      <Text style={styles.login}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
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
  },
  login:{
    fontSize:35,
    alignSelf: "center",
    fontWeight: 'bold',
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
});

export default Login