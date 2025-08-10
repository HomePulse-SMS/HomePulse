// /components/AddablePicker.js
import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddablePicker = ({ label, items, setItems, selectedValue, setSelectedValue,setUseNewer }) => {
    const [input, setInput] = useState('');
    const [showAddOption, setShowAddOption] = useState(false);



    const handleInputChange = (text) => {
        setInput(text);
        setShowAddOption(text.length > 0 && !items.includes(text));
    };

    useEffect(() => {
        fetch('http://locslhost:8080/admin/addSociety', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {

            })
            .catch(error => console.error("Error:", error));
    },[]);

    const handleAdd = () => {
        setItems([...items, input]);
        setSelectedValue(input);
        setInput('');
        setUseNewer(true)
        setShowAddOption(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            <TextInput
                style={styles.input}
                placeholder={`Type ${label.toLowerCase()}`}
                value={input}
                onChangeText={handleInputChange}
            />

            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => {
                    if (itemValue === '__add__') {
                        handleAdd();
                    } else {
                        setSelectedValue(itemValue);
                    }
                }}
                style={styles.picker}
            >
                <Picker.Item label={`-- Select ${label} --`} value="" />
                {items.map((item, index) => (
                    <Picker.Item label={item} value={item} key={index} />
                ))}
                {showAddOption && (
                    <Picker.Item label={`➕ Add "${input}"`} value="__add__" />
                )}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: 20 },
    label: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
    input: {
        borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
        padding: 10, marginBottom: 10,
    },
    picker: {
        borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
        backgroundColor: '#f2f2f2',
    },
});

export default AddablePicker;
