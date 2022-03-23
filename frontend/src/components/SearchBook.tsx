import React from "react";
import { ScrollView, View, Text, Pressable, Image, TextInput } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import tw from 'twrnc';

const SearchBook = (props:any) => {

    return(
        <ScrollView style={tw`bg-black`}>
            <View style={tw`flex flex-row justify-between mt-10 ml-4`}>
                <Pressable onPress={() => props.navigation.navigate("BookFlix")}>
                    <FontAwesomeIcon style={tw`text-white mr-8`} size={ 20 } icon={ faArrowLeft }/>
                </Pressable>
                <Image style={tw`w-6 h-6 mr-4`} source={{uri:'https://images.unsplash.com/photo-1626423567486-9c5fcb38199f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=706&q=80'}} />
            </View>
            <TextInput style={tw`bg-[#212227] text-white mt-4 h-10 w-full`} placeholder="Rechercher un livre" />
        </ScrollView>
    )
}

export default SearchBook;