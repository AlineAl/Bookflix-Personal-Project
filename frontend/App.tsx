import { StatusBar } from 'expo-status-bar';
import { AppRegistry } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { ENDPOINT_API } from "@env";

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
        <View>
          <Header />
        </View>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('frontend', () => App);

