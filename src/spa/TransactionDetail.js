import React, { useState, useLayoutEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TransactionDetail = ({ route, navigation }) => {
    const { transaction } = route.params;
    const [modalVisible, setModalVisible] = useState(false);

    const HeaderRight = useCallback(() => (
        <Menu>
            <MenuTrigger>
                <Icon name="more-vert" size={24} color="#fff" style={styles.iconStyle} />
            </MenuTrigger>
            <MenuOptions customStyles={{
                optionsContainer: {
                    marginTop: 40,
                    width: 150,
                    borderRadius: 8,
                    padding: 8,
                },
            }}>
                <MenuOption onSelect={() => navigation.navigate('UpdateTransaction', { transaction })}>
                    <Text style={styles.menuText}>Update</Text>
                </MenuOption>
                <MenuOption onSelect={() => handleDelete()}>
                    <Text style={styles.menuText}>Delete</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    ), [navigation, transaction]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight />,
            headerStyle: { backgroundColor: '#FF6B7A' },
            headerTintColor: '#fff',
            title: 'Transaction detail',
        })
    }, [navigation, HeaderRight]);

    const handleDelete = () => {
        Alert.alert(
            "Delete Transaction",
            "Are you sure you want to delete this transaction?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => console.log("Delete transaction") }
            ]
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    const formatPrice = (price) => {
        return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
    };

    const calculateTotalServicePrice = (service) => {
        return (service.price * (service.quantity || 1));
    };

    const discount = (transaction.priceBeforePromotion || transaction.price) - transaction.price;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>General information</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Transaction code</Text>
                    <Text style={styles.valueBold}>{transaction.id}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Customer</Text>
                    <Text style={styles.valueBold}>
                        {transaction.customer?.name} - {transaction.customer?.phone}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Creation time</Text>
                    <Text style={styles.valueBold}>{formatDate(transaction.createdAt)}</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Services list</Text>

                {transaction.services && transaction.services.map((service, index) => (
                    <View key={index} style={styles.serviceItem}>
                        <View style={styles.serviceMainInfo}>
                            <Text style={styles.serviceName}>{service.name}</Text>
                            <Text style={styles.serviceQuantity}>x{service.quantity || 1}</Text>
                            <Text style={styles.servicePrice}>
                                {formatPrice(calculateTotalServicePrice(service))}
                            </Text>
                        </View>
                    </View>
                ))}

                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>
                        {formatPrice(transaction.priceBeforePromotion || transaction.price)}
                    </Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Cost</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Amount of money</Text>
                    <Text style={styles.valueBold}>
                        {formatPrice(transaction.priceBeforePromotion || transaction.price)}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Discount</Text>
                    <Text style={styles.valueBold}>
                        -{formatPrice(discount)}
                    </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.finalTotalLabel}>Total payment</Text>
                    <Text style={styles.finalTotalValue}>
                        {formatPrice(transaction.price)}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 12,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6B7A',
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        color: '#888',
        flex: 1,
    },
    valueBold: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        flex: 1.5,
        textAlign: 'right',
    },
    serviceItem: {
        marginBottom: 16,
    },
    serviceMainInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    serviceName: {
        fontSize: 14,
        color: '#333',
        flex: 2,
        marginRight: 8,
    },
    serviceQuantity: {
        fontSize: 14,
        color: '#888',
        width: 30,
        textAlign: 'center',
    },
    servicePrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'right',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 12,
    },
    totalLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#888',
    },
    totalValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    finalTotalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    finalTotalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF6B7A',
    },
    iconStyle: {
        padding: 8,
    },
    menuText: {
        fontSize: 16,
        padding: 8,
        color: '#333',
    },
});

export default TransactionDetail;