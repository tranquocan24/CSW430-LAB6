/* eslint-disable react/jsx-no-undef */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Menu, MenuProvider } from 'react-native-popup-menu';

import LoginScreen from './src/spa/LoginScreen';
import HomeScreen from './src/spa/HomeScreen';
import AddServiceScreen from './src/spa/AddServiceScreen';
import ServiceDetailScreen from './src/spa/ServiceDetailScreen';
import UpdateServiceScreen from './src/spa/UpdateServiceScreen';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerStyle: { backgroundColor: '#d44b62ff' },
              title: 'HUYỀN TRINH',
              headerTintColor: '#fff',
              headerLeft: () => null,
            }}
          />
          <Stack.Screen
            name="AddService"
            component={AddServiceScreen}
            options={{
              title: 'Service',
              headerStyle: { backgroundColor: '#d44b62ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Stack.Screen
            name="ServiceDetail"
            component={ServiceDetailScreen}
            options={{
              title: 'Service Details',
              headerStyle: { backgroundColor: '#d44b62ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Stack.Screen
            name="UpdateService"
            component={UpdateServiceScreen}
            options={{
              title: 'Update Service',
              headerStyle: { backgroundColor: '#d44b62ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

export default App;
