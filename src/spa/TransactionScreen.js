import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAllTransaction } from "../api/serviceAPI";

const TransactionScreen = ({ navigation }) => {
    const [transaction, setTransaction] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchTransaction();
        });
        return unsubscribe;
    }, [navigation]);

    const fetchTransaction = async () => {
        try {
            const data = await getAllTransaction();
            setTransaction(data);
        } catch (error) {
            Alert.alert("Failed fetching API");
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={transactionStyle.transactionItem}
                onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
            >
                <View style={transactionStyle.transactionContent}>
                    <View style={transactionStyle.transactionLeft}>
                        <View style={transactionStyle.transactionHeader}>
                            <Text style={transactionStyle.transactionId}>{item.id}</Text>
                            <Text style={transactionStyle.transactionDate}> - {formatDate(item.createdAt)}</Text>
                            {item.status === 'cancelled' && (
                                <Text style={transactionStyle.cancelledBadge}> - Cancelled</Text>
                            )}
                        </View>
                        {item.services && item.services.map((service, index) => (
                            <Text
                                key={index}
                                style={transactionStyle.serviceName}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                - {service.name}
                            </Text>
                        ))}
                        <Text style={transactionStyle.customerName}>
                            Customer: {item.customer?.name || ''}
                        </Text>
                    </View>

                    <View style={transactionStyle.transactionRight}>
                        <Text style={transactionStyle.totalPrice}>
                            {formatPrice(item.price)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={transactionStyle.container}>
            <FlatList
                data={transaction}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={transactionStyle.listContainer}
            />

            <TouchableOpacity
                style={transactionStyle.fab}
                onPress={() => navigation.navigate('AddTransaction')}
            >
                <Text style={transactionStyle.fabIcon}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const transactionStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContainer: {
        padding: 12,
    },
    transactionItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    transactionContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    transactionLeft: {
        flex: 1,
        marginRight: 12,
    },
    transactionRight: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    transactionHeader: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 8,
    },
    transactionId: {
        fontSize: 12.5,
        fontWeight: 'bold',
        color: '#333',
    },
    transactionDate: {
        fontSize: 12.5,
        color: '#333',
    },
    cancelledBadge: {
        fontSize: 12.5,
        color: '#FF0000',
        fontWeight: '500',
    },
    serviceName: {
        fontSize: 12.5,
        color: '#666',
        marginBottom: 4,
    },
    customerName: {
        fontSize: 13,
        color: '#999',
        marginTop: 4,
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6B7A',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 80,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FF6B7A',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    fabIcon: {
        fontSize: 32,
        color: '#fff',
        fontWeight: '300',
    },
});

export default TransactionScreen;