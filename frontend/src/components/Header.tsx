import React from 'react';
import { SafeAreaView, Text, View, Image, ImageBackground } from 'react-native';
import NavBar from './Navbar';
import tw from 'twrnc';

const Header = () => {

    return(
        <SafeAreaView style={tw`h-full bg-black`}>
            <ImageBackground style={tw`w-full h-96`} source={{uri:'https://images.unsplash.com/photo-1505663912202-ac22d4cb3707?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'}}>
                <View>
                    <NavBar />
                    <Text style={tw`text-white ml-12`}>Livres</Text>
                </View>
                <Text style={tw`text-white text-xl mt-52 mx-8 text-center`}>"The best way to predict the future is to invent it", Alan Kay</Text>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Header;