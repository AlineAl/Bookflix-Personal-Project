import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Pressable, Image, TextInput, FlatList } from "react-native";
import { useQuery } from '@apollo/client';
import GET_BOOKS from '../graphql/BooksList';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faMagnifyingGlass, faPlay } from "@fortawesome/free-solid-svg-icons";
import tw from 'twrnc';

const SearchBook = (props:any) => {
    const { data } = useQuery(GET_BOOKS);
    const [filterBook, setFilterBook ] = useState();

    useEffect(() => {
        setFilterBook(data.feed.books)
    }, [])

    const searchFilter = (text:any) => {
        if(text) {
            const newData = data.feed.books.filter((item:any) => {
                const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setFilterBook(newData);
        } else {
            setFilterBook(data.feed.books)
        }
    }

    return(
        <ScrollView style={tw`bg-black`}>
            <View style={tw`flex flex-row justify-between mt-5 ml-4`}>
                <Pressable onPress={() => props.navigation.navigate("BookFlix")}>
                    <FontAwesomeIcon style={tw`text-white mr-8`} size={ 20 } icon={ faArrowLeft }/>
                </Pressable>
                <Image style={tw`w-6 h-6 mr-4`} source={{uri:'https://images.unsplash.com/photo-1626423567486-9c5fcb38199f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=706&q=80'}} />
            </View>
            <View style={tw`flex flex-row bg-[#212227] h-12 mt-4`}>
                <FontAwesomeIcon style={tw`text-[#bababa] mt-4 mx-6`} size={ 17 } icon={ faMagnifyingGlass }/>
                <TextInput 
                    style={tw`text-white flex items-center h-4 mt-4 w-full`} 
                    placeholder="Rechercher un livre"
                    placeholderTextColor='#bababa'
                    onChangeText={(event) => {
                        searchFilter(event);
                    }}
                />
            </View>
            
            <FlatList 
                style={tw`mt-4 mx-1`}
                data={filterBook}
                refreshing={data.networkStatus === 4}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <View style={tw`flex flex-row items-center bg-[#181818] mb-1`}>
                        <View style={tw`flex flex-row items-center bg-[#181818] mb-1`}>
                            <Image style={tw`w-32 h-16 ml-2 rounded opacity-75`} source={{uri:`${item.url}`}} />
                            <View style={tw`w-40`}>
                                <Text style={tw`text-white ml-4 mr-8`}>{item.title}</Text>
                            </View>
                        </View>
                        <View>
                            <Pressable onPress={() => {
                                    props.navigation.navigate("Book", {
                                        id: item.id
                                    })
                                }
                            }>
                                <FontAwesomeIcon size={ 30 } style={tw`text-white`} icon={ faPlay } />
                            </Pressable>
                        </View>
                    </View>
                }
            />
        </ScrollView>
    )
}

export default SearchBook;