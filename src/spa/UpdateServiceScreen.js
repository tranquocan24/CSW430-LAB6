import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { updateService } from "../api/serviceAPI";

const UpdateServiceScreen = ({ route, navigation }) => {
    const { service } = route.params;
    const [name, setName] = useState(service.name);
    const [price, setPrice] = useState(service.price.toString());

    const handleUpdate = async () => {
        if (!name.trim()) {
            Alert.alert("Please input a name");
            return;
        }
        if (!price.trim()) {
            Alert.alert("Please input a price");
            return;
        }

        const priceNumber = parseFloat(price);
        if (isNaN(priceNumber) || priceNumber < 0) {
            Alert.alert("Error", "Price must be a number and greater than or equal to 0");
            return;
        }

        try {
            await updateService(service._id, name.trim(), priceNumber);
            Alert.alert("Service updated successfully");
            navigation.navigate('ServiceDetail', { service: { ...service, name: name.trim(), price: priceNumber } });
        } catch (error) {
            Alert.alert("Error updating service");
        }
    };

    return (
        <KeyboardAvoidingView style={style.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={style.formGroup}>
                <Text style={style.label}>Service name*</Text>
                <TextInput style={style.input} value={name} onChangeText={setName} placeholder="Input a service name" />
            </View>
            <View style={style.formGroup}>
                <Text style={style.label}>Price*</Text>
                <TextInput style={style.input} value={price} onChangeText={setPrice} placeholder="0" keyboardType="numeric" />
            </View>
            <TouchableOpacity style={style.addButton} onPress={handleUpdate}>
                <Text style={style.buttonText}>Update</Text>
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
export default UpdateServiceScreen;