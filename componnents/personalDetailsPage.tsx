import { StatusBar } from 'expo-status-bar';
import { FC, useState } from 'react';
import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity } from 'react-native';


const PersonalDetails: FC = ()=> {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const onPressCallback =()=>{
    console.log("btn was pressed")
  }
  return (
    <View style = {styles.container}>
      <Image source ={require('./assets/avatar.png')} style={styles.avatar}></Image>
      <TextInput
        style={styles.input}
        onChangeText={setId}
        value={id}
        placeholder={'Id: '}
      />
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder={'Name: '}
      />
      <TextInput
        style={styles.input}
        onChangeText={setAddress}
        value={address}
        placeholder={'Address: '}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onPressCallback} style={styles.btn}>
          <Text style={styles.btnText}>CANCEL</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressCallback} style={styles.btn}>
          <Text style={styles.btnText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar:{
    height:300,
    resizeMode:"contain",
    alignSelf: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  btn: {
    flex: 1,
    margin: 12,
    padding: 12,
    backgroundColor: '#EF86C1',
    borderRadius: 10,
  },
  btnText: {
    textAlign: "center",
  },
});

export default PersonalDetails