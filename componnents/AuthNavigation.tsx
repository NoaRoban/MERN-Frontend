import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator();

const AuthNavigationContainer = () => (
    <NavigationContainer children={undefined}/>
)

export default AuthNavigationContainer;