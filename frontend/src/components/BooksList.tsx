import React from 'react';
import { useState } from 'react';
import { FlatList, ScrollView, Text, Pressable, View, Image } from 'react-native';

import Modal from 'react-native-modal';
import Header from './Header';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlay, faHeart, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useMutation } from "@apollo/client";
import LIKES_MUTATION from '../graphql/LikesMutation';
import GET_BOOKS from '../graphql/BooksList';
import tw from 'twrnc';

const BooksList = ({ navigation: { navigate, push }}:any) => {
    const { data, loading } = useQuery(GET_BOOKS);
    
    const [isModalVisible, setModalVisible] = useState(false);
    const [idBook, setIdBook] = useState();
    const [titleBook, setTitleBook] = useState();
    const [bodyBook, setBodyBook] = useState();
    const [dateBook, setDateBook] = useState();
    const [genreBook, setGenreBook] = useState();
    const [urlBook, setUrlBook] = useState();
    const [authorBook, setAuthorBook] = useState();
    const [likesBook, setLikeBook] = useState([]);
    
    const [LikeBook] = useMutation(LIKES_MUTATION, {
        variables: {
            bookId: idBook
        },
        onCompleted: ({ like }) => {
           setLikeBook(likesBook) 
        }
    })
    
    const toggleModal = (id:any, title:any, body:any, date:any, genre:any, url:any, author:any, like:any) => {
        setModalVisible(!isModalVisible);
        setIdBook(id);
        setTitleBook(title);
        setBodyBook(body);
        setDateBook(date);
        setGenreBook(genre);
        setAuthorBook(author);
        setUrlBook(url);
        setLikeBook(like);
    };

    return(
        <ScrollView style={tw`h-full bg-black`}>
            {loading ? <View style={tw`h-full bg-black flex flex-row justify-center items-center`}><Text style={tw`text-[#B1050E] text-2xl font-bold`}>Bookflix</Text></View> :
                <View>
                    <Header />
                    <Text style={tw`text-white text-lg font-bold mt-6 ml-4`}>Liste de livres</Text>

                    <FlatList
                        style={tw`mt-4 mx-1`}
                        data={data.feed.books}
                        horizontal
                        refreshing={data.networkStatus === 4}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) =>
                            <View>
                                <Pressable onPress={() => {
                                    toggleModal(item.id, item.title, item.body, item.date, item.genre, item.url, item.author, item.likers)
                                }}>
                                    <Image style={tw`w-26 h-36 ml-2 mb-8 rounded`} source={{uri:`${item.url}`}} />
                                </Pressable>
                            </View>
                        }
                    />

                    <Modal 
                        isVisible={isModalVisible}
                        backdropOpacity={0}
                        swipeDirection={['up', 'left', 'right', 'down']}
                        style={tw`m-0 flex justify-end`}
                    >
                        <View style={tw`w-full h-66 bg-[#181818] rounded-t-xl`}>
                            <View style={tw`flex flex-row justify-around mt-2`}>
                                <Image style={tw`w-20 h-33 ml-1 rounded`} source={{uri:`${urlBook}`}} />
                                <View style={tw`w-50 ml-2`}>
                                    <Text style={tw`text-white text-base font-bold`}>{titleBook}</Text>
                                    <View style={tw`flex flex-row`}>
                                        <Text style={tw`text-[#BABABA] mr-2 text-xs`}>{dateBook}</Text>
                                        <Text style={tw`text-[#BABABA] mr-2 text-xs`}>{authorBook}</Text>
                                        <Text style={tw`text-[#BABABA] text-xs`}>{genreBook}</Text>
                                    </View>
                                    <View style={tw`mt-2 w-60`}>
                                        <Text style={tw`text-white mr-4 text-xs overflow-hidden h-28`}>{bodyBook}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Pressable onPress={() => {
                                            toggleModal(idBook, titleBook, bodyBook, dateBook, genreBook, urlBook, authorBook, likesBook)
                                        }}>
                                        <View><FontAwesomeIcon size={ 27 } style={tw`text-white bg-[#252526] rounded-full`} icon={ faXmark } /></View>
                                    </Pressable>
                                </View>
                            </View>
                            <View style={tw`flex flex-row justify-center mt-4`}>
                                <Pressable onPress={() => {
                                    navigate("Book", {
                                        id: idBook
                                    })
                                    toggleModal(idBook, titleBook, bodyBook, dateBook, genreBook, urlBook, authorBook, likesBook);
                                }}>
                                    <View style={tw`mr-4`}>
                                        <FontAwesomeIcon size={ 30 } style={tw`text-white`} icon={ faPlay } />
                                    </View>
                                </Pressable>
                                <View>
                                    <Pressable onPress={() => {
                                        LikeBook();
                                    }}>
                                        <FontAwesomeIcon size={ 30 } style={tw`text-white`} icon={ faHeart } />
                                    </Pressable>
                                </View>
                                {
                                    likesBook.length === 0 ? <Text>''</Text> :
                                    <View>
                                        <Text style={tw`text-white text-xl ml-1`}>{likesBook.length}</Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </Modal>
                </View>
            }
        </ScrollView>
    )
}

export default BooksList;