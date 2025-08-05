import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const Page3 = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = message => {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill in both fields');
            return;
        }

        Alert.alert('Success', `Society added for user: ${username}`);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Secretary Username</Text>
            <TextInput style={styles.input} value={username} onChangeText={setUsername} />

            <Text style={styles.label}>Secretary Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Text style={styles.label}>Confirmed Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.btn}>
                <TouchableOpacity
                    style={[styles.button, styles.blue]}
                    onPress={() => props.page(0)}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.blue]} onPress={()=>{
                    props.saved(username,password)
                }}>
                    <Text style={styles.buttonText}>Add Society</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    label: { fontSize: 16, fontWeight: 'bold', marginTop: 20 },
    input: {
        borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
        padding: 10, marginTop: 5,
    },
    button: {
        marginTop: 30, padding: 15, borderRadius: 10,
        alignItems: 'center',
    },
    blue: { backgroundColor: '#28a745' },
    buttonText: { color: '#fff', fontSize: 16 },
});

export default Page3;
