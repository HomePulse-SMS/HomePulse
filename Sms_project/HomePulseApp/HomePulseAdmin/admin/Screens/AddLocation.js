import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import AddablePicker from "./AddablePicker";

const AddLocation = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [subCities, setSubCities] = useState([]);
    const [newData, setNewData] = useState([]);
    const [useNewer,setUseNewer] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedSubCity, setSelectedSubCity] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/admin/getAllLocation', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                setNewData(data);
                const countries = [...new Set(data.data
                    .map(location => location.country)
                    .filter(country => country !== null))];
                console.log("Newer : ",countries);
                setCountries(countries)
            })
            .catch(error => console.error("Error:", error));
    },[]);

    const add = async () => {
        console.log("use ",useNewer);
        if(useNewer){
            await fetch("http://localhost:8080/admin/addLocation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    country : selectedCountry,
                    state : selectedState,
                    city: selectedCity,
                    district: selectedSubCity,
                })
            }).then((res) => {
                console.log(res);
                return res.json();
            })
                .catch((error) => console.error("Error:", error));
        }
    }

    const country=(e)=>{
        setSelectedCountry(e);
        const state = [...new Set(newData.data
            .filter(location=>location.country === e)
            .map(location => location.state)
            .filter(state => state !== null))];
        console.log("Data ",selectedState)
        setStates(state)
    }

    const state=(e)=>{
        setSelectedState(e);
        const city = [...new Set(newData.data
            .filter(location=>location.state === e)
            .map(location => location.city)
            .filter(city => city !== null))];
        console.log("Data ",selectedState)
        setCities(city)
    }

    const city=(e)=>{
        setSelectedCity(e);
        const city = [...new Set(newData.data
            .filter(location=>location.city === e)
            .map(location => location.district)
            .filter(city => city !== null))];
        setSubCities(city)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <AddablePicker
                    label="Country"
                    items={countries}
                    setItems={setCountries}
                    selectedValue={selectedCountry}
                    setSelectedValue={country}
                    setUseNewer={setUseNewer}
                />
                <AddablePicker
                    label="State"
                    items={states}
                    setItems={setStates}
                    selectedValue={selectedState}
                    setSelectedValue={state}
                    setUseNewer={setUseNewer}
                />
                <AddablePicker
                    label="City"
                    items={cities}
                    setItems={setCities}
                    selectedValue={selectedCity}
                    setSelectedValue={city}
                />
                <AddablePicker
                    label="District"
                    items={subCities}
                    setItems={setSubCities}
                    selectedValue={selectedSubCity}
                    setSelectedValue={setSelectedSubCity}
                    setUseNewer={setUseNewer}
                />
                <TouchableOpacity
                    style={[styles.button, styles.blue]}
                    onPress={() => add()}
                >
                    <Text style={styles.buttonText}>Add Location</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
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
    },
    blue: {
        backgroundColor: '#007bff',
    }
});

export default AddLocation;
