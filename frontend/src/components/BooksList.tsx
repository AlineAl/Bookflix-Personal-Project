import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { useQuery } from "@apollo/client";
import tw from 'twrnc';
import GET_BOOKS from '../graphql/BooksList';

const BooksList = () => {
    const { data, loading } = useQuery(GET_BOOKS);

    return(
        <SafeAreaView>
            {loading ? <Text>Loading...</Text> :
                <FlatList
                    data={data.feed.books}
                    refreshing={data.networkStatus === 4}
                    renderItem={({ item }) =>
                    <View>
                        <Text>{item.title}</Text>
                        <Text>{item.body}</Text>
                    </View>
                    }
                />
            }
        </SafeAreaView>
    )
}

export default BooksList;