// screens/SocietyDetails.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SocietyDetails = ({ navigation, route }) => {
    const [societyName, setSocietyName] = useState('');
    const [address, setAddress] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Society Name</Text>
            <TextInput style={styles.input} value={societyName} onChangeText={setSocietyName} />

            <Text style={styles.label}>Address</Text>
            <TextInput style={styles.input} value={address} onChangeText={setAddress} />

            <TouchableOpacity
                style={[styles.button, styles.blue]}
                onPress={() =>
                    navigation.navigate('SecretaryDetails', {
                        ...route.params,
                        societyName,
                        address,
                    })
                }
            >
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    label: { fontSize: 16, fontWeight: 'bold', marginTop: 20 },
    input: {
        borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
        padding: 10, marginTop: 5,
    },
    button: {
        marginTop: 30, padding: 15, borderRadius: 10,
        alignItems: 'center',
    },
    blue: { backgroundColor: '#007BFF' },
    buttonText: { color: '#fff', fontSize: 16 },
});

export default SocietyDetails;
