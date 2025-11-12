/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { login } from "../api/serviceAPI";

const LoginScreen = ({ navigation }) => {
    const [phone, setPhone] = useState('0373007856');
    const [password, setPassword] = useState('123');

    const handleLogin = async () => {
        if (!phone || !password) {
            Alert.alert("Please input phone and password");
            return;
        }
        try {
            await login(phone, password);
            Alert.alert("OK");
            navigation.replace('Home');
        } catch (error) {
            Alert.alert("Invalid phone or password");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 46,
        marginBottom: 60,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#d44b62ff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#d44b62ff',
        padding: 14,
        marginTop: 30,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 200,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});

export default LoginScreen;