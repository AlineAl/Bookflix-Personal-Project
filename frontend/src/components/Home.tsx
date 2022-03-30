import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Pressable } from 'react-native';
import { initialWindowSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN } from '../constants';

import { FrederickatheGreat_400Regular } from '@expo-google-fonts/fredericka-the-great';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import tw from 'twrnc';

const Home = ({ navigation: { navigate, push }}:any) => {
    const [token, setToken] = useState('');

    const StorageExists = async () => {
        try {
           await AsyncStorage.getItem(AUTH_TOKEN)
           .then(value => {
               if(value !== null) {
                   setToken(value);
               }
           })
        } catch (error) {
            console.log(error)
        }
    }

    StorageExists();

    let [fontsLoaded] = useFonts({
        FrederickatheGreat_400Regular
    });

    if(!fontsLoaded) {
        return <AppLoading />
    }

    return(
        <SafeAreaView style={tw`bg-black h-full`}>
            <ImageBackground style={tw`w-full h-full`} imageStyle={{ opacity: 0.5 }} source={{uri: 'https://images.unsplash.com/photo-1419640303358-44f0d27f48e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1385&q=80'}}>
                <View style={tw`flex flex-row mt-4 items-center justify-between`}>
                    <Text style={styles.textStaatliches}>Bookflix</Text>
                    {   
                        token ? 
                            <Pressable onPress={() => {
                                navigate("BookFlix")
                            }}>
                                <Text style={tw`text-white mr-3 uppercase`}>Voir les livres</Text>
                            </Pressable>
                        :   
                            <Pressable onPress={() => {
                                navigate("Login")
                            }}>
                                <Text style={tw`text-white mr-3 uppercase`}>S'identifier</Text>
                            </Pressable>
                    }
                </View>
                <View>
                    <Text style={tw`text-white font-bold text-4xl text-center mt-60 mx-3`}>Je vous partage ici les livres qui ont marqué ma vie</Text>
                    <Text style={tw`text-white mx-3 text-center mt-8`}>Petit projet d'entraînement personnel fait par ❤️ avec React-Native, Expo, TailwindCSS, ApolloGraphQL, Prisma, Nexus et PostgreSQL</Text>
                </View>

                {
                    token ? 
                        <Pressable onPress={async () => {
                            await AsyncStorage.removeItem(AUTH_TOKEN);
                            push("Home")
                        }}>
                            <Text style={tw`text-white text-center mt-8`}>Déconnexion</Text>
                        </Pressable>
                    :
                        <Pressable onPress={() =>{
                            navigate("Signup")
                        }
                        }>
                            <Text style={tw`text-white text-lg uppercase mt-6 text-center bg-[#E50815] sm:bg-purple-500 py-2`}>Commencer</Text>
                        </Pressable>
                }
            </ImageBackground>
        </SafeAreaView>
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

export default Home;