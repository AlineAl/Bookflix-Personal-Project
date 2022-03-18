import React from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import tw from 'twrnc';

const NavBar = () => {

    return (
        <SafeAreaView style={tw`bg-transparent h-16`}>
            <View style={tw`flex-row justify-between mt-6 mx-4`}>
                <View>
                    <Text style={tw`text-white text-xl`}>Bookflix</Text>
                </View>
                <View style={tw`flex-row items-center`}>
                    <FontAwesomeIcon style={tw`text-white mr-8`} icon={ faMagnifyingGlass } />
                    <Image style={tw`w-6 h-6`} source={{uri:'https://images.unsplash.com/photo-1626423567486-9c5fcb38199f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=706&q=80'}} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default NavBar;