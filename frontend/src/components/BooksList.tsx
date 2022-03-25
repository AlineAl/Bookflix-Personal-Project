import React from 'react';
import { useState } from 'react';
import { FlatList, ScrollView, Text, Pressable, View, Image, SectionList } from 'react-native';

import Modal from 'react-native-modal';
import Header from './Header';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlay, faHeart, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from "@apollo/client";
import GET_BOOKS from '../graphql/BooksList';
import tw from 'twrnc';

const BooksList = ({ navigation: { navigate }}:any) => {
    const { data, loading } = useQuery(GET_BOOKS);

    const [isModalVisible, setModalVisible] = useState(false);
    const [idBook, setIdBook] = useState();
    const [titleBook, setTitleBook] = useState();
    const [bodyBook, setBodyBook] = useState();
    const [dateBook, setDateBook] = useState();
    const [genreBook, setGenreBook] = useState();
    const [urlBook, setUrlBook] = useState();
    const [authorBook, setAuthorBook] = useState();
    
    const toggleModal = (id:any, title:any, body:any, date:any, genre:any, url:any, author:any) => {
        setModalVisible(!isModalVisible);
        setIdBook(id);
        setTitleBook(title);
        setBodyBook(body);
        setDateBook(date);
        setGenreBook(genre);
        setAuthorBook(author);
        setUrlBook(url);
    };

    return(
        <ScrollView style={tw`h-full bg-black`}>
            {loading ? <View style={tw`h-full bg-black flex justify-center items-center`}><Text style={tw`text-[#B1050E] text-2xl font-bold`}>Bookflix</Text></View> :
                <View>
                    <Header />
                    <Text style={tw`text-white text-lg font-bold mt-6 ml-4`}>Liste de livres</Text>

                    <ScrollView horizontal>
                        <FlatList
                            style={tw`mt-4 mx-1`}
                            data={data.feed.books}
                            showsVerticalScrollIndicator={false}
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            numColumns={data.feed.books.length / 2}
                            refreshing={data.networkStatus === 4}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) =>
                                <View>
                                    <Pressable onPress={() => {
                                        toggleModal(item.id, item.title, item.body, item.date, item.genre, item.url, item.author)
                                    }}>
                                        <Image style={tw`w-26 h-36 ml-2 mb-8 rounded`} source={{uri:`${item.url}`}} />
                                    </Pressable>
                                </View>
                            }
                        />
                    </ScrollView>

                    <Modal 
                        isVisible={isModalVisible}
                        backdropOpacity={0}
                        swipeDirection={['up', 'left', 'right', 'down']}
                        style={tw`m-0 flex justify-end`}
                    >
                        <View style={tw`w-full h-56 bg-[#181818] rounded-t-xl`}>
                            <View style={tw`flex flex-row justify-around mt-2`}>
                                <Image style={tw`w-26 h-36 ml-2 rounded`} source={{uri:`${urlBook}`}} />
                                <View style={tw`w-60 ml-2`}>
                                    <Text style={tw`text-white text-lg font-bold`}>{titleBook}</Text>
                                    <View style={tw`flex flex-row`}>
                                        <Text style={tw`text-[#BABABA] mr-4 text-xs`}>{dateBook}</Text>
                                        <Text style={tw`text-[#BABABA] mr-4 text-xs`}>{authorBook}</Text>
                                        <Text style={tw`text-[#BABABA] text-xs`}>{genreBook}</Text>
                                    </View>
                                    <View style={tw`mt-2 w-68`}>
                                        <Text style={tw`text-white text-xs overflow-hidden h-26`}>{bodyBook}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Pressable onPress={() => {
                                            toggleModal(idBook, titleBook, bodyBook, dateBook, genreBook, urlBook, authorBook)
                                        }}>
                                        <View style={tw`mt-2 mr-2`}><FontAwesomeIcon size={ 30 } style={tw`text-white bg-[#252526] rounded-full`} icon={ faXmark } /></View>
                                    </Pressable>
                                </View>
                            </View>
                            <View style={tw`flex flex-row justify-center mt-4`}>
                                <Pressable onPress={() => {
                                    navigate("Book", {
                                        id: idBook
                                    })
                                }}>
                                    <View style={tw`mr-4`}>
                                        <FontAwesomeIcon size={ 30 } style={tw`text-white`} icon={ faPlay } />
                                    </View>
                                </Pressable>
                                <View><FontAwesomeIcon size={ 30 } style={tw`text-white`} icon={ faHeart } /></View>
                            </View>
                        </View>
                    </Modal>
                </View>
            }
        </ScrollView>
    )
}

export default BooksList;