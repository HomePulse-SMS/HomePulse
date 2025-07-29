import React, { useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('GetStarted');
        }, 3000); // 3 seconds splash

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const checkRegistration = async () => {
            const isRegistered = await AsyncStorage.getItem('isRegistered');

            setTimeout(() => {
                if (isRegistered === 'true') {
                    navigation.replace('GetStarted');
                } else {
                    navigation.replace('GetStarted');
                }
            }, 3000);
        };

        checkRegistration().then(r => r);
    }, []);

    return (
        <View style={styles.container}>
            <LottieView
                source={require('./splash.json')} // put your Lottie JSON here
                autoPlay
                loop
                style={styles.lottie}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: '100%',
        height: '100%',
    }
});

export default SplashScreen;
