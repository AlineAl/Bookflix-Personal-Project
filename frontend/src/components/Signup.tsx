import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
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
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = regexEmail.test(formState.email);
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const password = regexPassword.test(formState.password);
    const regexUsername = /^[A-Z][A-Za-zéèê-]+$/;
    const username = regexUsername.test(formState.username);

    const [signup] = useMutation(SIGNUP_MUTATION, {
        variables: {
            username: formState.username,
            email: formState.email,
            password: formState.password
        }
    })
    
    return(
        <ScrollView style={tw`mt-12`}>
            <Pressable style={tw`flex flex-row justify-end mr-6`} onPress={() => {
                goBack("Home")
            }}>
                <FontAwesomeIcon size={25} icon={ faXmark } />
            </Pressable>
            <View>
                <Text style={tw`font-bold text-center text-2xl mt-6`}>Prêt à entrer dans mon monde livresque ?</Text>
                <Text style={tw`text-zinc-800 mt-6 text-center mx-2`}>Saisissez votre adresse e-mail ainsi que votre mot de passe pour créer votre compte</Text>
            </View> 
            <View style={username ? [tw`mt-2 mx-6 border-blue-500 border-2 rounded`] : [tw`mt-2 mx-6 border-[#B82C2B] border-2 rounded`]}>
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
                { username ? <Text style={tw`m-0 p-0`}></Text> : <Text style={tw`ml-6 text-[#B82C2B]`}>Le nom utilisateur n'est pas valide !</Text>}
            <View style={email ? [tw`mt-2 mx-6 border-blue-500 border-2 rounded`] : [tw`mt-2 mx-6 border-[#B82C2B] border-2 rounded`]}>
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
                { email ? <Text style={tw`m-0 p-0`}></Text> : <Text style={tw`ml-6 text-[#B82C2B]`}>Veuillez entrer une adresse e-mail valide !</Text>}
            <View style={password ? [tw`mt-2 mx-6 border-blue-500 border-2 rounded`] : [tw`mt-2 mx-6 border-[#B82C2B] border-2 rounded`]}>
                <Text style={tw`ml-2 mt-2 text-zinc-500 text-xs`}>Mot de passe</Text>
                <TextInput
                    secureTextEntry={true}
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
                { password ? <Text style={tw`m-0 p-0`}></Text> : <Text style={tw`ml-6 text-[#B82C2B]`}>Le mot de passe doit comporter au moins 8 caractères, une majuscule et un chiffre</Text>}
            <Pressable onPress={() => {
                if(email && username && password) {
                    signup()
                    push('Home');
                    alert('Votre compte a bien été enregistré !');
                } else {
                    alert("Votre compte n'a pas pu être enregistré")
                }
            }}>
                <Text style={tw`text-white text-lg uppercase mt-6 mx-6 rounded text-center bg-[#F6131D] py-2`}>Commencer</Text>
            </Pressable>
        </ScrollView>
    )
};

export default Signup;