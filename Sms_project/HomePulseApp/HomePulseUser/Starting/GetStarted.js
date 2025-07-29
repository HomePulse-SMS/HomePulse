import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import splash from './nature.jpg';

const GetStarted = ({navigation}) => {
    /*await AsyncStorage.removeItem('isRegistered');
    await AsyncStorage.removeItem('userData');*/

    return (
        <ImageBackground source={splash} style={styles.background} resizeMode="stretch">
            <View style={styles.overlay}/>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome to</Text>
                <Text style={styles.subtitle}>SmartSociety</Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        color: '#fff',
        fontWeight: '300',
        marginBottom: 10,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 50,
        textShadowColor: '#000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 6,
    },
    button: {
        backgroundColor: '#00C897',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default GetStarted;
