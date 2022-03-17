import { StatusBar } from 'expo-status-bar';
import { AppRegistry } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import BooksList from './src/components/BooksList';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { ENDPOINT_API } from "@env"

const httpLink = createHttpLink({
  uri: ENDPOINT_API
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <BooksList />
      </View>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('frontend', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
