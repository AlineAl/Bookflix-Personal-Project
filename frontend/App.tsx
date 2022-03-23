import { AppRegistry } from 'react-native';
import BooksList from './src/components/BooksList';
import OneBook from './src/components/Book';
import SearchBook from './src/components/SearchBook';
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
          <Stack.Navigator  screenOptions={{headerShown: false}}>
            <Stack.Screen name="BookFlix" component={BooksList} />
            <Stack.Screen name="Book" component={OneBook} />
            <Stack.Screen name="SearchBook" component={SearchBook} />
          </Stack.Navigator>
        </NavigationContainer>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('frontend', () => App);

