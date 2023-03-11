import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { Text } from "react-native-paper";

interface Props {
    text: string;
    image: string;
    owner?: { isOwner: boolean, handleEdit: () => void }
}

const PostInfo = ({ image, text, owner }: Props) => (
    <View style={styles.container} >
        <Text style={styles.text} >
            {text}
        </Text>
        <Image source={{ uri: image }} style={styles.image} />
        {owner?.isOwner &&
            <TouchableOpacity style={{ alignItems: "center" }} onPress={owner.handleEdit} >
                <Ionicons name="create-outline" color={'red'} size={32} />
                <Text>Edit Post</Text>
            </TouchableOpacity>
        }
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#111',
        width: "90%",
        height: 65,
        borderColor: 'red',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
        overflow: "scroll",
        alignContent: "center",

    },
    text: {},
    image: {
        height: 55,
        width: 55,
        position: "absolute",
        right: 0,
        overflow: "hidden",
        borderRadius: 20,
        top: 5,
        bottom: 5,
    },
})

export default PostInfo;