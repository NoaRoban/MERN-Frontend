import { useContext, useEffect } from 'react';
import { TouchableOpacity, Image } from 'react-native';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext';

WebBrowser.maybeCompleteAuthSession();

interface Props {
    disabled?: boolean;
}

const GoogleSignInButton = ({ disabled }: Props) => {
    const { googleSignin } = useContext(AuthContext);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId:'298476555151-frdnkdur7hbu85cp8s5c4t5ekhd84pq5.apps.googleusercontent.com',
        androidClientId: '298476555151-h708gdfjp9uuetismrlopau1ulh7jcf7.apps.googleusercontent.com',
        scopes: ['email', 'profile'],
    });

    const logGoogleUser = async (accessToken: string): Promise<boolean> => {
        return await googleSignin(accessToken) || false;
    }

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            if (authentication) {
                const { accessToken } = authentication;
                logGoogleUser(accessToken);
            }
        }
    }, [response]);

    return (
        <TouchableOpacity
            style={{
                marginTop: 10,
                borderWidth: 1,
                borderColor:'#EF86C1',
                borderRadius: 50,
                padding: 7,
                marginLeft:70,
                width: 80,
                height: 65,
                alignItems: 'center',

            }}
            disabled={disabled}
            onPress={() => {
                promptAsync();
            }}
        >
      <Image source ={require('../../assets/icons/googleIcon.png')}></Image>
        </TouchableOpacity>
    );
}

export default GoogleSignInButton;