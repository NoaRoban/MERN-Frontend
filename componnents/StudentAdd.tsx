import { useState, FC, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import StudentModel, { Student } from '../model/StudentModel';
import * as ImagePicker from 'expo-image-picker';


const StudentAdd: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    console.log("My app is running")
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [avatarUri, setAvatarUri] = useState("")

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
                console.log('the URI ========'+uri)
                setAvatarUri(uri)
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
                setAvatarUri(uri)
            }

        } catch (err) {
            console.log("open camera error:" + err)
        }
    }

    const onSaveCallback = async () => {
        console.log("save button was pressed")
        const student: Student = {
            id: id,
            name: name,
            image: "url",
        }
        try {
            if (avatarUri != "") {
                console.log("uploading image" + avatarUri)
                const url = await StudentModel.uploadImage(avatarUri)
                student.image = url
                console.log("got url from upload: " + url)
            }
            console.log("saving student")
            await StudentModel.addStudent(student)
        } catch (err) {
            console.log("fail adding studnet: " + err)
        }
        navigation.goBack()
    }

    const onCancellCallback = () => {
        navigation.goBack()
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    {avatarUri == "" && <Image source={require('../assets/ava.png')} style={styles.avatar}></Image>}
                    {avatarUri != "" && <Image source={{ uri: avatarUri }} style={styles.avatar}></Image>}

                    <TouchableOpacity onPress={openCamera} >
                        <Ionicons name={'camera'} style={styles.cameraButton} size={50} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openGallery} >
                        <Ionicons name={'image'} style={styles.galleryButton} size={50} />
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.input}
                    onChangeText={setId}
                    value={id}
                    placeholder={'Student ID'}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder={'Student Name'}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setAddress}
                    value={address}
                    placeholder={'Student Address'}
                />
                <View style={styles.buttonesContainer}>
                    <TouchableOpacity onPress={onCancellCallback} style={styles.button}>
                        <Text style={styles.buttonText}>CANCELL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onSaveCallback} style={styles.button}>
                        <Text style={styles.buttonText}>SAVE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatar: {
        height: 250,
        resizeMode: "contain",
        alignSelf: 'center',
        width: '100%'
    },
    cameraButton: {
        position: 'absolute',
        bottom: -10,
        left: 10,
        width: 50,
        height: 50,
    },
    galleryButton: {
        position: 'absolute',
        bottom: -10,
        right: 10,
        width: 50,
        height: 50,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    buttonesContainer: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        margin: 12,
        padding: 12,
        backgroundColor: 'blue',
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    }
});

export default StudentAdd