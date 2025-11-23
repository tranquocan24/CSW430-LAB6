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
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LoginScreen from './src/spa/LoginScreen';
import HomeScreen from './src/spa/HomeScreen';
import AddServiceScreen from './src/spa/AddServiceScreen';
import ServiceDetailScreen from './src/spa/ServiceDetailScreen';
import UpdateServiceScreen from './src/spa/UpdateServiceScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerScreen from './src/spa/CustomerScreen';
import AddCustomer from './src/spa/AddCustomer';
import TransactionScreen from './src/spa/TransactionScreen';
import TransactionDetail from './src/spa/TransactionDetail';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import SettingScreen from './src/spa/SettingScreen';
const getTabBarIcon = ({ focused, route, size }) => {
  let iconName = 'error';
  let iconColor = focused ? '#d44b62ff' : '#888';

  if (route.name === 'HomeTab') {
    iconName = 'home';
  } else if (route.name === 'TransactionTab') {
    iconName = 'paid';
  } else if (route.name === 'CustomerTab') {
    iconName = 'groups';
  } else if (route.name === 'SettingTab') {
    iconName = 'settings';
  }

  return <Icon name={iconName} size={size} color={iconColor} />;
};
function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) =>
          getTabBarIcon({ route, focused, size }),
        tabBarActiveTintColor: '#d44b62ff',
        tabBarInactiveTintColor: '#888',
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: '#d44b62ff' },
          title: 'Home',
          headerTintColor: '#fff',
          headerLeft: () => null,
        }}
      />
      <Tab.Screen
        name="TransactionTab"
        component={TransactionScreen}
        options={{
          headerStyle: { backgroundColor: '#d44b62ff' },
          title: 'Transaction',
          headerTintColor: '#fff',
        }}
      />
      <Tab.Screen
        name="CustomerTab"
        component={CustomerScreen}
        options={{
          headerStyle: { backgroundColor: '#d44b62ff' },
          title: 'Customer',
          headerTintColor: '#fff',
        }}
      />
      <Tab.Screen
        name="SettingTab"
        component={SettingScreen}
        options={{
          headerStyle: { backgroundColor: '#d44b62ff' },
          title: 'Setting',
          headerTintColor: '#fff',
        }}
      />
    </Tab.Navigator>
  );
}
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
            component={TabNavigator}
            options={{ headerShown: false }}
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
          <Stack.Screen
            name="AddCustomer"
            component={AddCustomer}
            options={{
              title: 'Add customer',
              headerStyle: { backgroundColor: '#d44b62ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Stack.Screen
            name="TransactionDetail"
            component={TransactionDetail}
            options={{
              title: 'Transaction Details',
              headerStyle: { backgroundColor: '#d44b62ff' },
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

export default App;
