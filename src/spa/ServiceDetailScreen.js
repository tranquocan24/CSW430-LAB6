import React, { useState, useLayoutEffect, useCallback } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, Modal } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { deleteService } from "../api/serviceAPI";

const ServiceDetailScreen = ({ route, navigation }) => {
    const { service } = route.params;
    const [modalVisible, setModalVisible] = useState(false);

    const HeaderRight = useCallback(() => (
        <Menu>
            <MenuTrigger>
                <Icon name="more-vert" size={24} color="#fff" style={styles.iconStyle} />
            </MenuTrigger>
            <MenuOptions customStyles={{
                optionsContainer: {
                    marginTop: 50,
                    width: 150,
                    borderRadius: 8,
                },
            }}>
                <MenuOption onSelect={() => navigation.navigate('UpdateService', { service })}>
                    <Text style={styles.menuText}>Update</Text>
                </MenuOption>
                <MenuOption onSelect={() => setModalVisible(true)}>
                    <Text style={styles.menuText}>Delete</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    ), [navigation, service]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight />,
        });
    }, [navigation, HeaderRight]);

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

    const handleDelete = async () => {
        setModalVisible(false);
        try {
            await deleteService(service._id);
            Alert.alert("Service deleted successfully");
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert("Error deleting service");
        }
    };

    const getCreatorName = () => (service.creator ? service.creator : 'Unknown');

    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.label}>Service Name: </Text>
                <Text style={styles.value}>{service.name}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Price: </Text>
                <Text style={styles.value}>{service.price.toLocaleString('vi-VN')} đ</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Creator: </Text>
                <Text style={styles.value}>{getCreatorName()}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Time: </Text>
                <Text style={styles.value}>{formatDate(service.createdAt)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Final Updated: </Text>
                <Text style={styles.value}>{formatDate(service.updatedAt)}</Text>
            </View>

            <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Warning</Text>
                        <Text style={styles.modalMessage}>
                            Are you sure you want to remove this service? This operation cannot be returned
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                                <Text style={styles.deleteButtonText}>DELETE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>CANCEL</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    successBanner: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    successText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    card: {
        padding: 10,
    },
    row: {
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#d44b62ff',
    },
    highlightCreator: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    menuOption: {
        padding: 12,
        fontSize: 16,
    },
    menuOptionDelete: {
        color: '#d44b62ff',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        width: '80%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    modalMessage: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        lineHeight: 22,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    deleteButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    deleteButtonText: {
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    cancelButtonText: {
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ServiceDetailScreen;
