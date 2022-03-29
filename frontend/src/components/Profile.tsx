import React from "react";
import { ScrollView, Text, View, Pressable, Image } from "react-native";
import NavBar from "./Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN } from "../constants";
import tw from 'twrnc';

const MyProfile = ({navigation: {push}}:any) => {

    return(
        <ScrollView style={tw`h-full bg-black`}>
            <NavBar />
            <View style={tw`flex-row justify-center mt-12`}>
                <Image style={tw`w-92 h-92`} source={{uri:'https://images.unsplash.com/photo-1626423567486-9c5fcb38199f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=706&q=80'}} /> 
            </View>
            <View>
                <Text style={tw`text-white text-lg mt-6 text-center`}>Merci de ta visite et à très bientôt !</Text>
            </View>
            <Pressable onPress={async () => {
                    await AsyncStorage.removeItem(AUTH_TOKEN);
                    push("Home")
                }}>
                    <Text style={tw`text-white text-center mt-6 text-xl`}>Déconnexion</Text>
            </Pressable>
        </ScrollView>
    )
}

export default MyProfile;