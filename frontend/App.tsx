import { AppRegistry } from 'react-native';
import { View } from 'react-native';
import BooksList from './src/components/BooksList';
import OneBook from './src/components/Book';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { ENDPOINT_API } from "@env";

const Stack = createNativeStackNavigator();

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
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="BookFlix" component={BooksList} />
            <Stack.Screen name="Book" component={OneBook} />
          </Stack.Navigator>
        </NavigationContainer>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('frontend', () => App);

