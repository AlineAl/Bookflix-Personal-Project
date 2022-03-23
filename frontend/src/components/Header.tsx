import React, { useState, useEffect } from 'react';
import { StyleSheet, Pressable, Alert, Text, View, ImageBackground } from 'react-native';
import { useQuery } from "@apollo/client";
import GET_BOOKS from '../graphql/BooksList';
import NavBar from './Navbar';

import tw from 'twrnc';
import { DancingScript_700Bold } from '@expo-google-fonts/dancing-script';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';


const Header = () => {
    const { data } = useQuery(GET_BOOKS);
    const [urlBook, setUrlBook] = useState();
    
    const randomUrl = () => {
        const urlBooks = data.feed.books.map((book:any) => book.url);
        setUrlBook(urlBooks[Math.floor(Math.random() * data.feed.books.length)]);
    }

    useEffect(() => {
        randomUrl();
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
                <View>
                    <NavBar />
                    <Text style={tw`text-white ml-12`}>Livres</Text>
                </View>
                <Text style={styles.textDancing}>"The best way to predict the future is to invent it", Alan Kay</Text>
            </ImageBackground>

            <View style={tw`flex-row justify-around mt-4 mx-4`}>
                <Text style={tw`text-white text-xs`}>Émotion</Text>
                <Text style={tw`text-gray-700 text-xs`}>●</Text>
                <Text style={tw`text-white text-xs`}>Connaissance</Text>
                <Text style={tw`text-gray-700 text-xs`}>●</Text>
                <Text style={tw`text-white text-xs`}>Curiosité</Text>
                <Text style={tw`text-gray-700 text-xs`}>●</Text>
                <Text style={tw`text-white text-xs`}>Inspiration</Text>
                <Text style={tw`text-gray-700 text-xs`}>●</Text>
                <Text style={tw`text-white text-xs`}>Voyage</Text>
            </View>
            <View>
                <Pressable style={tw`bg-white flex-row justify-center mt-4 mx-32 py-2 rounded`} onPress={() => randomUrl}>
                    <Text style={tw`text-black font-bold`}>▶︎ Une idée lecture ?</Text>
                </Pressable>
            </View>
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