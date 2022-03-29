import React, { useState, useEffect } from 'react';
import { StyleSheet, Pressable, Modal, Text, View, ImageBackground, Image } from 'react-native';
import { useQuery } from "@apollo/client";
import GET_BOOKS from '../graphql/BooksList';
import NavBar from './Navbar';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import tw from 'twrnc';
import { DancingScript_700Bold } from '@expo-google-fonts/dancing-script';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';


const Header = () => {
    const { data } = useQuery(GET_BOOKS);
    const [isModalVisible, setModalVisible] = useState(false);
    const [urlBook, setUrlBook] = useState();
    const [titleBook, setTitleBook] = useState();

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }
    
    const randomUrl = () => {
        const urlBooks = data.feed.books.map((book:any) => book.url);
        setUrlBook(urlBooks[Math.floor(Math.random() * data.feed.books.length)]);
    }

    const randomTitle = () => {
        const titleBooks = data.feed.books.map((book:any) => book.title);
        setTitleBook(titleBooks[Math.floor(Math.random() * data.feed.books.length)])
    }

    useEffect(() => {
        randomUrl();
        randomTitle();
    }, [])

    let [fontsLoaded] = useFonts({
        DancingScript_700Bold
    });

    if(!fontsLoaded) {
        return <AppLoading />
    }

    return(
        <View>
            <ImageBackground style={tw`w-full h-96`} imageStyle={{ opacity: 0.3 }} source={{uri:`${urlBook}`}}>
                <NavBar />
                <Text style={styles.textDancing}>"The best way to predict the future is to invent it", Alan Kay</Text>
            </ImageBackground>

            <View style={tw`flex-row justify-around items-center mt-4 mx-4`}>
                <Text style={tw`text-white text-xs`}>Émotion</Text>
                <Text style={tw`text-gray-700 text-[8px]`}>●</Text>
                <Text style={tw`text-white text-xs`}>Connaissance</Text>
                <Text style={tw`text-gray-700 text-[8px]`}>●</Text>
                <Text style={tw`text-white text-xs`}>Curiosité</Text>
                <Text style={tw`text-gray-700 text-[8px]`}>●</Text>
                <Text style={tw`text-white text-xs`}>Inspiration</Text>
                <Text style={tw`text-gray-700 text-[8px]`}>●</Text>
                <Text style={tw`text-white text-xs`}>Voyage</Text>
            </View>
            <View>
                <Pressable style={tw`bg-white flex-row justify-center mt-4 mx-26 py-2 rounded`} 
                    onPress={() => {
                        toggleModal();
                    }}>
                    <Text style={tw`text-black font-bold`}>▶︎ Une idée lecture ?</Text>
                </Pressable>
            </View>
            <Modal
                visible={isModalVisible}
                transparent
            >
                <View style={tw`w-full h-30 mt-40 bg-black mt-86`}>
                    <Text>Coucou</Text>
                    <Pressable onPress={() => {
                            toggleModal();
                            randomTitle();
                        }}>
                        <View style={tw`mr-2`}><FontAwesomeIcon size={ 30 } style={tw`text-white`} icon={ faXmark } /></View>
                    </Pressable>
                    <Text style={tw`text-white text-center text-xl`}>{titleBook}</Text>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    textDancing: {
        fontFamily: "DancingScript_700Bold",
        color: "white",
        fontSize: 24,
        marginTop: 208,
        marginLeft: 32,
        marginRight: 32,
        textAlign: 'center'

    }
})

export default Header;