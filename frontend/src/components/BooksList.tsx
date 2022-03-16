import React from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useQuery, gql } from "@apollo/client";

const GET_BOOKS = gql`
    query BooksList {
        feed {
            books {
                id
                title
                body
                author
                date
                genre
                url
            }
        }
    }
`

const BooksList = () => {
    const { data, loading } = useQuery(GET_BOOKS);

    return(
        <View style={styles.container}>
            {loading ? <Text>Loading...</Text> :
                <FlatList
                    data={data.feed.books}
                    refreshing={data.networkStatus === 4}
                    onRefresh={() => data.refetch()}
                    renderItem={({ item }) =>
                    <View>
                        <Text>{item.title}</Text>
                        <Text>{item.body}</Text>
                    </View>
                    }
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#BF1A2C'
    },
    loading: {
        margin: 50,
    },
    title: {
        fontSize: 24,
        margin: 20,
    },
  });

export default BooksList;