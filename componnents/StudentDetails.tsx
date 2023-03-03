import { FC, useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const StudentDetails: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const studentId = JSON.stringify(route.params.studentId)

    // useEffect(() => {
    //     navigation.setOptions({ title: 'new Title' + id });
    // })

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>{studentId}</Text>
        </View>
    );
}

export default StudentDetails