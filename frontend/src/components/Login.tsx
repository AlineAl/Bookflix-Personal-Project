import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import LOGIN_MUTATION from "../graphql/LoginMutation";
import { useMutation } from "@apollo/client";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FrederickatheGreat_400Regular } from '@expo-google-fonts/fredericka-the-great';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import tw from 'twrnc';
import { AUTH_TOKEN } from "../constants";

const Login = ({navigation: {goBack, push}}:any) => {
    const [formState, setFormState] = useState({
        login: true,
        email: '',
        password: ''
    });


    const [login] = useMutation(LOGIN_MUTATION, {
        variables: {
            email: formState.email,
            password: formState.password
        },
        onCompleted: async ({ login }) => {
            try {
                await AsyncStorage.setItem(AUTH_TOKEN, login.token);
                push('Home');
            } catch (error) {
                console.log(error)
            }
        }
    });
    
    let [fontsLoaded] = useFonts({
        FrederickatheGreat_400Regular
    });
    
    if(!fontsLoaded) {
        return <AppLoading />
    }
    
    return(
        <ScrollView style={tw`bg-black h-full`}>
            <View style={tw`flex flex-row items-center mt-10 ml-4`}>
                <Pressable onPress={() => {
                    goBack("Home")
                }}>
                    <FontAwesomeIcon size={ 20 } icon={ faArrowLeft } style={tw`text-white mr-2`} />
                </Pressable>
                <Text style={styles.textStaatliches}>Bookflix</Text>
            </View>
            <View style={formState.email ? tw`mt-30 mx-6 bg-zinc-600 rounded` : tw`mt-30 mx-6 bg-zinc-600 rounded border-2 border-[#B82C2B]`}>
                <Text style={tw`ml-2 mt-2 text-white text-xs`}>E-mail</Text>
                <TextInput 
                    style={tw`ml-2 mb-4`}
                    onChangeText={(event) => {
                        setFormState({
                            ...formState,
                            email: event
                        })
                    }}
                    value={formState.email}
                />
            </View>
                {formState.email ? <Text style={tw`m-0 p-0`}></Text> : <Text style={tw`ml-6 text-[#B82C2B]`}>Veuillez entrer votre e-mail pour vous logger</Text>}
            <View style={formState.password ? tw`mt-6 mx-6 bg-zinc-600 rounded` : tw`mt-6 mx-6 bg-zinc-600 rounded border-2 border-[#B82C2B]`}>
                <Text style={tw`ml-2 mt-2 text-white text-xs`}>Mot de passe</Text>
                <TextInput
                    secureTextEntry={true}
                    style={tw`ml-2 mb-4`}
                    onChangeText={(event) => {
                        setFormState({
                            ...formState,
                            password: event
                        })
                    }}
                    value={formState.password}
                />
            </View>
                {formState.password ? <Text style={tw`m-0 p-0`}></Text> : <Text style={tw`ml-6 text-[#B82C2B]`}>Veuillez entrer votre mot de passe pour vous logger</Text>}
            <Pressable onPress={() => {
                if(formState.password && formState.email) {
                    login()
                } else {
                    alert("Veuillez remplir tous les champs")
                }
            }}>
                <Text style={tw`text-white text-lg mt-8 mx-8 border-white border-2 rounded text-center bg-black py-2`}>S'identifier</Text>
            </Pressable>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textStaatliches: {
        fontFamily: "FrederickatheGreat_400Regular",
        color: "#B1050E",
        fontSize: 24,
        marginLeft: 10
    }
})

export default Login;