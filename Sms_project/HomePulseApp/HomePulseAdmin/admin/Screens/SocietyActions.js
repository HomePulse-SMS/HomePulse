import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const SocietyActions = ({navigation}) => {
    const handlePress = (action) => {
        Alert.alert(`${action} pressed`);
    };

    const addLocation = () => {

    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Society Management</Text>

            <TouchableOpacity
                style={[styles.button, styles.blue]}
                onPress={() => navigation.navigate('AddLocation')}
            >
                <Text style={styles.buttonText}>➕ Add Location</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.green]}
                onPress={() => navigation.navigate('CreateSociety')}
            >
                <Text style={styles.buttonText}>🏘️ Create Society</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.orange]}
                onPress={() => handlePress('Block Society')}
            >
                <Text style={styles.buttonText}>🚫 Block Society</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.red]}
                onPress={() => handlePress('Delete Society')}
            >
                <Text style={styles.buttonText}>🗑️ Delete Society</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        alignSelf: 'center',
        color: '#333',
    },
    button: {
        paddingVertical: 15,
        borderRadius: 12,
        marginVertical: 10,
        alignItems: 'center',
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    blue: {
        backgroundColor: '#007bff',
    },
    green: {
        backgroundColor: '#28a745',
    },
    orange: {
        backgroundColor: '#fd7e14',
    },
    red: {
        backgroundColor: '#dc3545',
    },
});

export default SocietyActions;
