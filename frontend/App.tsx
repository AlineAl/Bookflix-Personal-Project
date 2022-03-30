import { AppRegistry } from 'react-native';
import Home from './src/components/Home';
import BooksList from './src/components/BooksList';
import OneBook from './src/components/Book';
import SearchBook from './src/components/SearchBook';
import Signup from './src/components/Signup';
import Login from './src/components/Login';
import MyProfile from './src/components/Profile';
import './style.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN } from './src/constants';
import { setContext } from '@apollo/client/link/context';
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

const authLink = setContext( async (_:any, { headers }:any) => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator  screenOptions={{headerShown: false}} initialRouteName={'Home'}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="BookFlix" component={BooksList} />
            <Stack.Screen name="Book" component={OneBook} />
            <Stack.Screen name="SearchBook" component={SearchBook} />
            <Stack.Screen name="MyProfile" component={MyProfile} />
          </Stack.Navigator>
        </NavigationContainer>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('frontend', () => App);

