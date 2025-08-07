import React, {useState} from "react";
import {Alert, Platform, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as ImagePicker from 'expo-image-picker';

/*New one updated*/
const Page2=(props)=>{

    const [societyName, setSocietyName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need camera roll permissions to upload photo.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);  // use this uri to show or upload
        }
    };




    return(
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.label}>Society Name</Text>
            <TextInput
                style={styles.input}
                value={societyName}
                onChangeText={setSocietyName}
                placeholder="Enter society name"
                placeholderTextColor="#999"
            />

            <Text style={styles.label}>SubCity</Text>
            <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter address"
                placeholderTextColor="#999"
            />

            <TouchableOpacity style={styles.uploadButton} onPress={handlePickImage}>
                <Text style={styles.uploadText}>📷 Upload Photo</Text>
            </TouchableOpacity>


            <View style={styles.btn}>
                <TouchableOpacity
                    style={[styles.button, styles.blue]}
                    onPress={() => props.page(0)}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.blue]}
                    onPress={() => {
                        props.page(2)
                        props.details({
                            sname: societyName,
                            address: address,
                            image: image,
                        })
                    }}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

/*const styles ={
    container: {
        flex: 1,
        padding: 20,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: Platform.OS === 'web' ? '100vh' : undefined, // Full height on web
        width: '100%',
    },
    formWrapper: {
        width: Platform.OS === 'web' ? '60%' : '100%',
        maxWidth: 800,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

}*/

const styles = {
    label: { fontSize: 16, marginBottom: 10 },
    input: {
        borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 8, borderRadius: 5,
    },
    picker: {
        borderWidth: 1,
        borderColor: 'gray',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    button: {
        paddingVertical: 15,
        borderRadius: 12,
        marginVertical: 10,
        alignItems: 'center',
        elevation: 3,
        width: '45%',
    },
    blue: {
        backgroundColor: '#007bff',
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-between', // or 'space-around' / 'space-evenly'
        marginTop: 30,
    },uploadButton: {
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginVertical: 10,
    },

    uploadText: {
        color: '#333',
        fontSize: 16,
    }

}

export default Page2;

