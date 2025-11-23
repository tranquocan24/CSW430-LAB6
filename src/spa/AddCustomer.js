import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { addACustomer } from "../api/serviceAPI";

const AddCustomer = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleAddCustomer = async () => {
        if (!name.trim()) {
            Alert.alert("Please input a name");
            return;
        }

        if (!phone.trim()) {
            Alert.alert("Please input a phone number");
            return;
        }
        const phoneParse = parseFloat(phone)
        try {
            await addACustomer(name.trim(), phoneParse)
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error adding new customer")
        }
    }

    return (
        <KeyboardAvoidingView style={style.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={style.formGroup}>
                <Text style={style.label}>Customer name*</Text>
                <TextInput style={style.input} value={name} onChangeText={setName} placeholder="Input your customer's name" />
            </View>
            <View style={style.formGroup}>
                <Text style={style.label}>Phone*</Text>
                <TextInput style={style.input} value={phone} onChangeText={setPhone} placeholder="Input phone number" />
            </View>
            <TouchableOpacity style={style.addButton} onPress={handleAddCustomer}>
                <Text style={style.buttonText}>Add</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#d44b62ff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddCustomer;