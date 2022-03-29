import React from "react";
import { ScrollView, View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import GET_ONE_BOOK from "../graphql/Book";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass, faArrowLeft, faHeart } from "@fortawesome/free-solid-svg-icons";
import tw from 'twrnc';
import { FrederickatheGreat_400Regular } from '@expo-google-fonts/fredericka-the-great'

const OneBook = (props:any) => {
    const id = props.route.params.id;
    const { data, loading } = useQuery(GET_ONE_BOOK, {
        variables: {
            bookId: id
        }
    });
    console.log

    return(
        <ScrollView style={tw`bg-black`}>
            <View style={tw`flex-row justify-between mt-8 mb-2 mx-4`}>
                <View>
                    <Pressable onPress={() => props.navigation.reset({routes: [{name: "BookFlix"}]})}>
                        <FontAwesomeIcon style={tw`text-white mr-8`} size={ 20 } icon={ faArrowLeft }/>
                    </Pressable>
                </View>
                <View style={tw`flex-row items-center`}>
                    <FontAwesomeIcon style={tw`text-white mr-8`} icon={ faMagnifyingGlass } />
                    <Image style={tw`w-6 h-6`} source={{uri:'https://images.unsplash.com/photo-1626423567486-9c5fcb38199f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=706&q=80'}} />
                </View>
            </View>
            {loading ? <View style={tw`h-full bg-black flex justify-center items-center`}><Text style={tw`text-[#B1050E] text-2xl font-bold`}>Bookflix</Text></View>: 
                <View>
                    <Image style={tw`w-full h-96`} source={{uri: `${data.book.url}`}} />
                    <Text style={styles.textStaatliches}>Bookflix</Text>
                    <Text style={tw`text-white text-2xl font-bold ml-3`}>{data.book.title}</Text>
                    <View style={tw`flex flex-row ml-3 mt-2`}>
                        <Text style={tw`text-[#BABABA] mr-3 text-xs`}>{data.book.date}</Text>
                        <Text style={tw`text-[#BABABA] mr-3 text-xs`}>{data.book.author}</Text>
                        <Text style={tw`text-[#BABABA] text-xs`}>{data.book.genre}</Text>
                    </View>
                    <Text style={tw`text-white ml-3 mt-2`}>{data.book.body}</Text>
                    <View style={tw`flex flex-row justify-center mt-2`}>
                        <FontAwesomeIcon size={ 30 } style={tw`text-white`} icon={ faHeart } />
                        {
                            data.book.likers.length === 0 ? <Text></Text> :
                            <View>
                                <Text style={tw`text-white text-xl ml-1`}>{data.book.likers.length}</Text>
                            </View>
                        }
                    </View>
                </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textStaatliches: {
        fontFamily: "FrederickatheGreat_400Regular",
        color: "#B1050E",
        fontSize: 24,
        marginLeft: 10,
        marginTop: 4
    }
})

export default OneBook;

