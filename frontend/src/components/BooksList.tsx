import React from 'react';
import { useState } from 'react';
import { FlatList, SafeAreaView, Text, Pressable, View, Image, ScrollView } from 'react-native';

import Modal from 'react-native-modal';
import Header from './Header';
// import OneBook from './Book';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from "@apollo/client";
import GET_BOOKS from '../graphql/BooksList';
import OneBook from './Book';
import tw from 'twrnc';

const BooksList = ({ navigation: { push }}:any) => {
    const { data, loading } = useQuery(GET_BOOKS);

    const [isModalVisible, setModalVisible] = useState(false);
    
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return(
        <SafeAreaView style={tw`h-full bg-black`}>
            {loading ? <View style={tw`h-full bg-black flex justify-center items-center`}><Text style={tw`text-[#B1050E] text-2xl font-bold`}>Bookflix</Text></View> :
                <View>
                    <Header />
                    <Text style={tw`text-white text-lg font-bold mt-6 ml-4`}>Liste de livres</Text>
                    <FlatList
                        style={tw`mt-4 mx-1`}
                        data={data.feed.books}
                        refreshing={data.networkStatus === 4}
                        horizontal
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) =>
                            <View>
                                <Pressable onPress={() => {
                                    push("Book", {
                                        id: item.id
                                    })
                                }}>
                                    <Image style={tw`w-26 h-36 ml-2 rounded`} source={{uri:`${item.url}`}} />
                                </Pressable>
                            </View>
                        }
                    />
                    <Modal 
                        isVisible={isModalVisible}
                        key={data.feed.books.id}
                        backdropOpacity={0}
                        swipeDirection={['up', 'left', 'right', 'down']}
                        style={tw`m-0 flex justify-end`}
                    >
                        <View style={tw`w-full h-60 bg-[#181818] rounded-t-xl`}>
                            <Pressable onPress={toggleModal}>
                                <View style={tw`mt-4 mr-4 flex items-end`}><FontAwesomeIcon size={ 30 } style={tw`text-white bg-[#252526] rounded-full`} icon={ faXmark } /></View>
                            </Pressable>
                        </View>
                    </Modal>
                </View>
            }
        </SafeAreaView>
    )
}

export default BooksList;