import { StatusBar } from 'expo-status-bar';
import { Badge } from 'react-native-paper';
import React, { FC, useState ,useContext,useEffect} from 'react';
import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity, ScrollView, RefreshControl, Button, FlatList } from 'react-native';
import userApi from '../api/UserApi';
import { AuthContext } from '../context/AuthContext';
import AppImagePicker from './AppImagePicker';
import { User } from '../utils/types/@User';
import Spinner from 'react-native-loading-spinner-overlay'
import { onChange } from 'react-native-reanimated';
import { Post } from '../utils/types/@Post';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import UserModel from '../model/UserModel';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import AllPosts from './Post/AllPosts';


const PersonalDetails: FC = ()=> {
  const { logout, isLoading, userInfo, getUserInfo, userData, editUserInfo, toggleLoading,userId, } = useContext(AuthContext);
  console.log('user id in personal details:   ' +userId)  
  console.log('user name in personal details:   ' +userData)
  console.log('user id in personal details:   ' +userId)
  const [imageUrl, setImageUrl] = useState<string>(userData?.imageUrl || '');

  const [editName, setEditName] = useState<string>(userData?.name || '');

  const [errMsg, setErrMsg] = useState<string>('');

  const [editMode, setEditMode] = useState<boolean>(false);

  const askPermission = async () => {
    try {
        const res = await ImagePicker.getCameraPermissionsAsync()
        if (!res.granted) {
            alert("camera permission is requiered!")
        }
    } catch (err) {
        console.log("ask permission error " + err)
    }
  }
  useEffect(() => {
    askPermission()
  }, [])

  const openCamera = async () => {
    try {
        const res = await ImagePicker.launchCameraAsync()
        if (!res.canceled && res.assets.length > 0) {
            const uri = res.assets[0].uri
            //console.log('the URI ========'+uri)
            setImageUrl(uri)
        }

    } catch (err) {
        console.log("open camera error:" + err)
    }
}
const openGallery = async () => {
  try {
      const res = await ImagePicker.launchImageLibraryAsync()
      if (!res.canceled && res.assets.length > 0) {
          const uri = res.assets[0].uri
          setImageUrl(uri)
      }

  } catch (err) {
      console.log("open camera error:" + err)
  }
}
  const onPressCallback =()=>{
    console.log("btn was pressed")
  }
  const handleEditUser = async () => {
    if (!editName) {
        setErrMsg('Name cannot be empty');
        return;
    }
    toggleLoading();
    let avatarUrl:any =''

    try{
      if (imageUrl != "") {
        console.log('imagggggggggggggge'+ imageUrl)
        console.log('imagggggggggggggge  userId'+ userId)
        
        const avatarUrl = await UserModel.uploadImage(imageUrl)

        //avatarUrl = await userApi.uploadUserImage(imageUrl, userId);
        console.log('the location that back from     ' +avatarUrl.toString())
        const res = await editUserInfo(userId, { imageUrl: avatarUrl.toString() || imageUrl , name: editName });

      }
      setImageUrl(imageUrl)
      toggleLoading()
    }catch(err){
      console.log("fail adding pic: " + err)
    }
}

const onRefresh = () => getUserInfo(userId);

  return (
    <View style = {styles.container}>
      <Spinner visible={isLoading} />
      <Image source ={require('../assets/icon2.png')} style={styles.logo}></Image>
      <View>
        
      {imageUrl == "" && <Image source={require('../assets/ava.png')} style={styles.avatar}></Image>}
      {imageUrl != "" && <Image source={{ uri: imageUrl }} style={styles.avatar}></Image>}
   
      </View>
      
       {editMode ?
         <><TouchableOpacity onPress={openCamera}>
          <Ionicons name={'camera'} style={styles.cameraButton} size={50} />
        </TouchableOpacity><TouchableOpacity onPress={openGallery}>
            <Ionicons name={'image'} style={styles.galleryButton} size={50} />
          </TouchableOpacity><TextInput
            value={editName}
            onChangeText={(text) => setEditName(text)}
            style={styles.input}
            placeholder={'Name: '} /></>
          :
          <Text style={{ paddingTop:15,
            paddingLeft:25,
            alignItems: 'center',
            fontSize:18,
            color:'#EF86C1',
            width: "70%",}}>Hi, {editName || ""}
            </Text>
            
      }
      <View style={{ alignContent: "center", marginTop: 10 }} >
        <Badge style={{fontSize:15, backgroundColor:'#EF86C1'}}>{userData?.posts?.length || 0}</Badge>
      </View>
      <ScrollView
        contentContainerStyle={styles.postsContainer}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
      >
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={()=>{
          if(editMode){
            handleEditUser(); 
            //disabled={isLoading}
          }
          setEditMode(prevState => !prevState);
          
        }} style={styles.btn}  >
          <Text style={styles.btnText}>{editMode ? "SUBMIT" : "EDIT"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo:{
    flex: 1,
    width: 400,
    height: 170,
    resizeMode: 'contain'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  flatlist: {
    flex: 1,
  },    
  avatar: {
  height: 200,
  resizeMode: "contain",
  alignSelf: 'center',
  width: '50%',
  borderRadius:5500,
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
  postsContainer: {
    justifyContent: "center",
  },
  cameraButton: {
    position: 'absolute',
    bottom: -10,
    left: 80,
    right:20,
    width: 50,
    height: 50,
},
galleryButton: {
    position: 'absolute',
    bottom: -10,
    right: 80,
    width: 50,
    height: 50,
},
  textInput: {
    paddingTop:15,
    paddingLeft:25,
    alignItems: 'center',
    fontSize:18,
    color:'#EF86C1',
    width: "70%",
  },
});

export default PersonalDetails