import React from "react";
import { SafeAreaView, View, Text, Image, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import GET_ONE_BOOK from "../graphql/Book";

import tw from 'twrnc';

const OneBook = (props:any) => {
    const id = props.route.params.id;
    const { data, loading } = useQuery(GET_ONE_BOOK, {
        variables: {
            bookId: id
        }
    });
    console.log(data)

    return(
        <SafeAreaView>
            {loading ? <View style={tw`h-full bg-black flex justify-center items-center`}><Text style={tw`text-[#B1050E] text-2xl font-bold`}>Bookflix</Text></View>: 
                <View>
                    <Text style={tw`text-black text-xl`}>{data.book.title}</Text>
                    <Image style={tw`w-96 h-96`} source={{uri: `${data.book.url}`}} />
                </View>
            }
        </SafeAreaView>
    )
}

export default OneBook;

