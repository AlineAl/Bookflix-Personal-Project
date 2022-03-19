import React from 'react';
import { FlatList, SafeAreaView, Text, View, Image } from 'react-native';
import Header from './Header';
import { useQuery } from "@apollo/client";
import GET_BOOKS from '../graphql/BooksList';
import tw from 'twrnc';

const BooksList = () => {
    const { data, loading } = useQuery(GET_BOOKS);

    return(
        <SafeAreaView style={tw`h-full bg-black`}>
            {loading ? <View style={tw`h-full bg-black flex justify-center items-center`}><Text style={tw`text-[#B1050E] text-2xl font-bold`}>Bookflix</Text></View> :
                <View>
                    <Header />
                    <Text style={tw`text-white text-lg font-bold mt-6 ml-4`}>Liste de livres</Text>
                    <FlatList
                        style={tw`mt-4 mx-1`}
                        data={data.feed.books}
                        refreshing={data.networkStatus === 4}
                        horizontal
                        renderItem={({ item }) =>
                        <View>
                            <Image style={tw`w-26 h-36 ml-2 rounded`} source={{uri:`${item.url}`}} />
                        </View>
                        }
                    />
                </View>
            }
        </SafeAreaView>
    )
}

export default BooksList;