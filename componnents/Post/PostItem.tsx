import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import PostInfo from "./PostInfo";
import PostOwnerInfo from "./PostOwnerInfo";
// @ types
import { Post } from "../../utils/types/@Post";

interface Props {
    post: Post;
    isOwner?: boolean;
    handleEdit?: () => void;
}

const voidFunc = () => null;

const PostItem = ({ isOwner, post, handleEdit }: Props) => {
    const { text } = post;

    return (
        <View style={styles.container} >
            <PostOwnerInfo
                avatar={post.owner?.avatarUrl || ""}
                name={post.owner?.name || ""}
            />
            <View style={{ alignItems: 'center' }} >
                <PostInfo
                    text={text}
                    image={post.image || ""}
                    owner={{
                        isOwner: isOwner || false,
                        handleEdit: isOwner ? handleEdit || voidFunc : voidFunc
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15
    },
})

export default PostItem;