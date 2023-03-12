import { FC, useState, useEffect,useContext } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, Button, Alert, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons';

import StudentList from '../StudentList';
import StudentDetails from '../StudentDetails';
import PostAdd from '../Post/PostAdd';
import PostList from '../Post/PostList'
import NavigationIndex from '../Index'
import { AuthContext } from '../../context/AuthContext';
import PersonalDetails from '../PersonalDetails';

const InfoScreen: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Info Screen</Text>
    </View>
  );
}

const SIZE = 15;


const PostStack = createNativeStackNavigator();
const PostStackCp: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const { logout } = useContext(AuthContext);
  const addNewPost = () => {
    navigation.navigate('PostAdd')
  }
  const logOut = async() => {
    await logout()
  }
  /*useEffect(() => {
    logout();
  }, []);*/
  return (
    <PostStack.Navigator>
      <PostStack.Screen name="Posts" component={PostList} options={{
        headerRight: () => (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={addNewPost}>
              <Ionicons name={'add-outline'} size={40} color={'gray'} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={logOut}>
              <Ionicons name={'log-out'} size ={40}  color={'gray'}  />
            </TouchableOpacity>
          </View>
        ),
      }
      } />
      <PostStack.Screen name="PersonalDetails" component={PersonalDetails} />
      <PostStack.Screen name="PostAdd" component={PostAdd} />
    </PostStack.Navigator>
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
          } else if (route.name === 'PostStackCp') {
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons login ={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="PostStackCp" component={PostStackCp} options={{ headerShown: false }} />
        <Tab.Screen name="My Profile" component={PersonalDetails} options={{ headerShown: false }} />

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
