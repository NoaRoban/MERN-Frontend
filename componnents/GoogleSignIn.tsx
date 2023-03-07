import { useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

// @ expo
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Ionicons from '@expo/vector-icons/Ionicons';


WebBrowser.maybeCompleteAuthSession();

interface Props {
    disabled?: boolean;
}

const GoogleSignInButton = ({ disabled }: Props) => {
    //const { googleSignin } = useContext(AuthContext);

    const [_, response, promptAsync] = Google.useAuthRequest({
        expoClientId: process.env.EXPO_CLIENT_ID,
        iosClientId: process.env.OAUTH_IOS_CLIENT_ID,
        scopes: ['email', 'profile'],
    });

    const logGoogleUser = async (accessToken: string): Promise<boolean> => {
        //return await googleSignin(accessToken) || false;

        // const userInfo = await authApi.fetchUserInfo(accessToken);
        // console.log(userInfo);
        // const res = await authApi.googleSignUser({ email: userInfo.email, name: userInfo.given_name, avatar: userInfo.picture });

        // if(res.data.status === 200) {
        // write user to the AuthContext
        // }
        return true;
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
                marginTop: 35,
                borderWidth: 0.5,
                borderRadius: 40,
                padding: 7,
                borderColor: 'blue'
            }}
            disabled={disabled}
            onPress={() => {
                promptAsync();
            }}
        >
            <Ionicons name="logo-google" size={35} color="#f4c20d" />
        </TouchableOpacity>
    );
}

export default GoogleSignInButton;