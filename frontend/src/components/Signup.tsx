import React from "react";
import { View, Text, TextInput, Pressable, SafeAreaView } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import tw from 'twrnc';

const Signup = ({ navigation: {goBack}}:any) => {

    return(
        <SafeAreaView style={tw`mt-12`}>
            <Pressable style={tw`flex flex-row justify-end mr-6`} onPress={() => {
                goBack("Home")
            }}>
                <FontAwesomeIcon size={25} icon={ faXmark } />
            </Pressable>
            <View>
                <Text style={tw`font-bold text-center text-2xl mt-6`}>Prêt à entrer dans mon monde livresque ?</Text>
                <Text style={tw`text-zinc-800 mt-6 text-center mx-2`}>Saisissez votre adresse e-mail ainsi que votre mot de passe pour créer votre compte</Text>
            </View>
            <View style={tw`mt-6 mx-6 border-blue-500 border-2 rounded`}>
                <Text style={tw`ml-2 mt-2 text-zinc-500 text-xs`}>E-mail</Text>
                <TextInput 
                    style={tw`ml-2 mb-2`}
                />
            </View>
            <View style={tw`mt-6 mx-6 border-blue-500 border-2 rounded`}>
                <Text style={tw`ml-2 mt-2 text-zinc-500 text-xs`}>Mot de passe</Text>
                <TextInput 
                    style={tw`ml-2 mb-2`}
                />
            </View>
            <Pressable onPress={() => {}}>
                <Text style={tw`text-white text-lg uppercase mt-6 mx-6 rounded text-center bg-[#E50815] py-2`}>Commencer</Text>
            </Pressable>
        </SafeAreaView>
    )
};

export default Signup;