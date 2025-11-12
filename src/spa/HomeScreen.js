import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { getAllServices } from "../api/serviceAPI";

const HomeScreen = ({ navigation }) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchService();
        });

        return unsubscribe;
    }, [navigation]);

    const fetchService = async () => {
        try {
            const data = await getAllServices();
            setServices(data);
        } catch (error) {
            Alert.alert("Error fetching services");
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ServiceDetail', { service: item })}>
            <View style={homeStyles.serviceItem}>
                <Text style={homeStyles.serviceName}>{item.name}</Text>
                <Text style={homeStyles.servicePrice}>{item.price.toLocaleString('vi-VN')} đ</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={homeStyles.container}>
            <Text style={homeStyles.title}>KAMI SPA</Text>
            <View style={homeStyles.section}>
                <Text style={homeStyles.sectionTitle}>Danh sách dịch vụ</Text>
                <TouchableOpacity style={homeStyles.addButton} onPress={() => navigation.navigate('AddService')}>
                    <Text style={homeStyles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <FlatList data={services}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                showVerticalScrollIndicator={false}
            />
        </View>
    )
};
const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 20,
        color: '#d44b62ff',
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#d44b62ff',
        borderRadius: 30,
        marginRight: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
    },
    serviceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 16,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 12,
    },
    serviceName: {
        fontWeight: 'bold',
    },
});

export default HomeScreen;

