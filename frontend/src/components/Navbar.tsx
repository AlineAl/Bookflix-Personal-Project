import React from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet } from 'react-native';
import { Link } from '@react-navigation/native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import tw from 'twrnc';
import { FrederickatheGreat_400Regular } from '@expo-google-fonts/fredericka-the-great';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const NavBar = () => {
    let [fontsLoaded] = useFonts({
        FrederickatheGreat_400Regular
    });

    if(!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <SafeAreaView style={tw`bg-transparent h-16`}>
            <View style={tw`flex-row justify-between mt-6 mx-4`}>
                <View>
                    <Link to={{screen:'Home'}}>
                        <Text style={styles.textStaatliches}>Bookflix</Text>
                    </Link>
                </View>
                <View style={tw`flex-row items-center`}>
                    <Link to={{screen:'SearchBook'}} style={tw`mr-8`}>
                        <FontAwesomeIcon style={tw`text-white`} icon={ faMagnifyingGlass } />
                    </Link>
                    <Link to={{screen:'MyProfile'}}>
                        <Image style={tw`w-6 h-6`} source={{uri:'https://images.unsplash.com/photo-1626423567486-9c5fcb38199f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=706&q=80'}} />
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textStaatliches: {
        fontFamily: "FrederickatheGreat_400Regular",
        color: "#B1050E",
        fontSize: 24
    }
})

export default NavBar;