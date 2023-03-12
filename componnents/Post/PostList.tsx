import { FC, useState, useEffect, useContext } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, FlatList, TouchableHighlight } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import PersonalDetails from '../PersonalDetails';
import PostModel, { Post } from '../../model/PostModel';

const ListItem: FC<{ _id?: string, text: string, userId?: string,imageUrl: string, onRowSelected: (_id: String) => void }> =
    ({ _id, text, userId,imageUrl, onRowSelected }) => {
        const onClick = () => {
            console.log('int he row: row was selected ' + text)
            onRowSelected(text)
        }

        console.log("image: " + imageUrl)
        return (
            <TouchableHighlight onPress={onClick} underlayColor={'gainsboro'}>
                <View style={styles.listRow}>
                    {imageUrl == "" && <Image style={styles.listRowImage} source={require('../../assets/ava.png')} />}
                    {imageUrl != "" && <Image style={styles.listRowImage} source={{ uri: imageUrl.toString() }} />}

                    <View style={styles.listRowTextContainer}>
                        <Text style={styles.listRowName}>{text}</Text>
                        <Text style={styles.listRowId}>{userId}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }


const PostList: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const onRowSelected = (id: String) => {
        console.log("in the list: row was selected " + id)
        //navigation.navigate('PersonalDetails', { userId: id })
    }

    const [posts, setPosts] = useState<Array<Post>>();
    const {userInfo} = useContext(AuthContext)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log('focus')
            let posts: Post[] = []
            try {
                posts = await PostModel.getAllPosts()
                console.log("fetching posts complete")
            } catch (err) {
                console.log("fail fetching posts " + err)
            }
            console.log("fetching finish")
            setPosts(posts)
        })
        return unsubscribe
    })


    return (
        <FlatList style={styles.flatlist}
            data={posts}
            //keyExtractor={post => post.text.toString()}
            renderItem={({ item }) => (
                <ListItem text={item.text} userId={item.userId} imageUrl={item.imageUrl} onRowSelected={onRowSelected} />
            )}
        >
        </FlatList>
    );
};


const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        backgroundColor: 'grey',
    },
    flatlist: {
        flex: 1,
    },
    listRow: {
        margin: 4,
        flexDirection: "row",
        height: 150,
        elevation: 1,
        borderRadius: 2,
    },
    listRowImage: {
        margin: 10,
        resizeMode: "contain",
        height: 130,
        width: 130,
    },
    listRowTextContainer: {
        flex: 1,
        margin: 10,
        justifyContent: "space-around"
    },
    listRowName: {
        fontSize: 30
    },
    listRowId: {
        fontSize: 25
    }
});

export default PostList