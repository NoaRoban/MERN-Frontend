import { FC, useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, Button, Alert, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons';

import StudentList from './StudentList';
import StudentDetails from './StudentDetails';
import StudentAdd from './StudentAdd';


const InfoScreen: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Info Screen</Text>
    </View>
  );
}



const StudentStack = createNativeStackNavigator();
const StudentStackCp: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const addNewStudents = () => {
    navigation.navigate('StudentAdd')
  }
  return (
    <StudentStack.Navigator>
      <StudentStack.Screen name="StudentList" component={StudentList} options={{
        headerRight: () => (
          <TouchableOpacity
            onPress={addNewStudents}>
            <Ionicons name={'add-outline'} size={40} color={'gray'} />
          </TouchableOpacity>
        ),
      }
      } />
      <StudentStack.Screen name="StudentDetails" component={StudentDetails} />
      <StudentStack.Screen name="StudentAdd" component={StudentAdd} />
    </StudentStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const App: FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          if (route.name === 'InfoScreen') {
            iconName = focused
              ? 'information-circle'
              : 'information-circle-outline';
          } else if (route.name === 'StudentStackCp') {
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons login ={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="StudentStackCp" component={StudentStackCp} options={{ headerShown: false }} />
        <Tab.Screen name="InfoScreen" component={InfoScreen} />
      </Tab.Navigator>

    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: 'grey',
  },

});

export default App
