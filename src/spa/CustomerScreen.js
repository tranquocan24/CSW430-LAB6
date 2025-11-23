import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { getAllCustomer } from "../api/serviceAPI";
import Icon from "react-native-vector-icons/MaterialIcons"
import AddCustomer from "../spa/AddCustomer"
const CustomerScreen = ({ navigation }) => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchCustomer();
        });
        return unsubscribe;
    }, [navigation]);
    const fetchCustomer = async () => {
        try {
            const data = await getAllCustomer();
            setCustomers(data);
        } catch (error) {
            Alert.alert("Error fetching services");
        }
    }

    const renderItem = ({ item }) => (
        <View style={customerStyles.customerItem}>
            <View>
                <Text style={customerStyles.customerText}>Customer: <Text style={{ color: '#000000ff' }}>{item.name}</Text></Text>
                <Text style={customerStyles.customerText}>Phone: <Text style={{ color: '#000000ff' }}>{item.phone}</Text></Text>
                <Text style={customerStyles.customerText}>Total money: <Text style={{ color: '#d44b62ff' }}>{item.totalSpent} đ</Text></Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", paddingRight: 20 }}>
                <Icon name="card-membership" size={20} style={{ color: '#d44b62ff' }}></Icon>
                <Text style={{ color: '#d44b62ff', fontWeight: 'bold' }} >{item.loyalty}</Text>
            </View>
        </View>
    );

    return (
        <View style={customerStyles.container}>
            <FlatList data={customers}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
            />
            <View style={customerStyles.fabContainer}>
                <TouchableOpacity style={customerStyles.addButton} onPress={() => navigation.navigate('AddCustomer')}>
                    <Text style={customerStyles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const customerStyles = StyleSheet.create({
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
    customerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        borderColor: '#828080ff',
        padding: 10,
    },
    customerText: {
        color: '#828080ff',
        fontWeight: 'bold',
    },
    fabContainer: {
        position: 'absolute',
        bottom: 30,
        right: 1,
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
        fontSize: 36,
        lineHeight: 36
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

export default CustomerScreen;