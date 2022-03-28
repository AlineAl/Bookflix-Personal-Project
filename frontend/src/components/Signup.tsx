import React, { useState } from "react";
import { View, Text, TextInput, Pressable, SafeAreaView } from "react-native";
import SIGNUP_MUTATION from '../graphql/SignupMutation';
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import tw from 'twrnc';

const Signup = ({ navigation: {goBack, push}}:any) => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [signup] = useMutation(SIGNUP_MUTATION, {
        variables: {
            username: formState.username,
            email: formState.email,
            password: formState.password
        },
        onCompleted: ({signup}) => {
            push('Home');
            alert('Votre compte a bien été enregistré !');
        }
    })

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
                <Text style={tw`ml-2 mt-2 text-zinc-500 text-xs`}>Username</Text>
                <TextInput 
                    style={tw`ml-2 mb-2`}
                    onChangeText={(event) => {
                        setFormState({
                            ...formState,
                            username: event
                        })
                    }}
                    value={formState.username}
                />
            </View>
            <View style={tw`mt-6 mx-6 border-blue-500 border-2 rounded`}>
                <Text style={tw`ml-2 mt-2 text-zinc-500 text-xs`}>E-mail</Text>
                <TextInput 
                    style={tw`ml-2 mb-2`}
                    onChangeText={(event) => {
                        setFormState({
                            ...formState,
                            email: event
                        })
                    }}
                    value={formState.email}
                />
            </View>
            <View style={tw`mt-6 mx-6 border-blue-500 border-2 rounded`}>
                <Text style={tw`ml-2 mt-2 text-zinc-500 text-xs`}>Mot de passe</Text>
                <TextInput 
                    style={tw`ml-2 mb-2`}
                    onChangeText={(event) => {
                        setFormState({
                            ...formState,
                            password: event
                        })
                    }}
                    value={formState.password}
                />
            </View>
            <Pressable onPress={() => {signup()}}>
                <Text style={tw`text-white text-lg uppercase mt-6 mx-6 rounded text-center bg-[#E50815] py-2`}>Commencer</Text>
            </Pressable>
        </SafeAreaView>
    )
};

export default Signup;