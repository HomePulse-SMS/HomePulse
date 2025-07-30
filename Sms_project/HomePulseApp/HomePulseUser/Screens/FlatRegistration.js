import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Image
} from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const FlatRegistration = ({ route, navigation }) => {
    const {  city, apartment } = route.params;
    let pincode = 411057

    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const [flatNumber, setFlatNumber] = useState('');
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [showSuccessGif, setShowSuccessGif] = useState(false);

    const handleRegister = () => {
        if (!fullName || !mobile || !flatNumber || !email) {
            Alert.alert('Please fill in all fields!');
            return;
        }

        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
            //Alert.alert('Request Sent', 'Your flat registration is submitted for approval');
            setShowSuccessGif(true);
            saveUserData({pincode, city, apartment, flatNumber}).then(r =>r);
            setTimeout(() => {
                navigation.replace('Dashboard', {
                    fullName,
                    flatNumber,
                    apartment,
                    city
                });
            }, 5000);
        }, 1000);
    };

    const saveUserData = async (userData) => {
        try {
            await AsyncStorage.setItem('isRegistered', 'true');
            await AsyncStorage.setItem('userData', JSON.stringify(userData)); // optional
        } catch (e) {
            console.error('Error saving registration:', e);
        }
    };

    if (submitting) {
        return (
            <View style={styles.loaderContainer}><LottieView
                source={require('./registrartion.json')}
                autoPlay
                loop={false}
                style={{ width: 180, height: 180 }}
            />
                <Text style={{ marginTop: 15, fontSize: 16 }}>Submitting...</Text>
                <Text style={{ marginTop: 15, fontSize: 16 }}>Your Registration will be approved</Text>
                <Text style={{ marginTop: 15, fontSize: 16 }}>by Secretary soon...</Text>
            </View>
        );
    }

    if (showSuccessGif) {
        return (
            <View style={styles.loaderContainer}>
                <LottieView
                    source={require('./stamp.json')} // Put your Lottie file here
                    autoPlay
                    loop={false}
                    style={{ width: 500, height: 300 }}
                />
                <Text style={{ fontSize: 18, marginTop: 15 }}>Welcome to {apartment} Society!</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <LottieView
                source={require('./registrartion.json')}
                autoPlay
                loop
                style={{ width: 350, height: 180 }}
            />
            <Text style={styles.title}>🏡 Flat Registration</Text>
            <Text style={styles.subInfo}>📍 {city}, {apartment}</Text>

            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                value={mobile}
                keyboardType="phone-pad"
                onChangeText={setMobile}
            />
            <TextInput
                style={styles.input}
                placeholder="Flat Number"
                value={flatNumber}
                onChangeText={setFlatNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={email}
                keyboardType="email-address"
                onChangeText={setEmail}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f8fbff',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
        color: '#34495e',
    },
    subInfo: {
        fontSize: 16,
        color: '#7f8c8d',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 2,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#2ecc71',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
    },
});

export default FlatRegistration;
