import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Audio } from 'expo-av';

export default function CallAlert({ visible, name, photo, onAllow, onDeny }) {
    useEffect(() => {
        let sound;

        async function startRingtone() {
            try {
                // Ensure audio plays in silent mode (iOS) and keeps looping
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: false,
                    staysActiveInBackground: true,
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: false,
                });

                const { sound: soundObject } = await Audio.Sound.createAsync(
                    require('../assets/ringtone.mp3'),
                    { isLooping: true }
                );

                sound = soundObject;
                await sound.playAsync();
            } catch (err) {
                console.log("Error playing sound:", err);
            }
        }

        if (visible) {
            startRingtone();
        }

        return () => {
            if (sound) {
                sound.stopAsync();
                sound.unloadAsync();
            }
        };
    }, [visible]);

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <Image source={{ uri: photo }} style={styles.image} />
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={[styles.button, styles.allow]} onPress={onAllow}>
                            <Text style={styles.btnText}>Allow</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.deny]} onPress={onDeny}>
                            <Text style={styles.btnText}>Don't Allow</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        width: 300,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 12,
        marginHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
    },
    allow: { backgroundColor: '#4CAF50' },
    deny: { backgroundColor: '#F44336' },
    btnText: { color: '#fff', fontSize: 16 },
});
