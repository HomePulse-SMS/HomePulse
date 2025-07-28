import React, {useEffect, useState} from "react";
import {ScrollView, Text, TouchableOpacity} from "react-native";
import {Picker} from "@react-native-picker/picker";

const Page=(props)=>{
    const [countries,setCountries] = useState([]);
    const [states, setState] = useState([]);
    const [cities, setCity] = useState([]);
    const [subCities, setSubCities] = useState([]);
    const [id, setId] = useState(0);
    const [newData, setNewData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedSubCity, setSelectedSubCity] = useState('');

    useEffect(() => {
        fetch('http://172.18.4.222:8080/admin/getAllLocation', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res =>res.json())
            .then(data => {
                setNewData(data);
                console.log("this is data ", data);

                const countries = [...new Set(data.data
                    .map(location => location.country)
                    .filter(country => country !== null))];
                setCountries(countries)
            })
            .catch(error => console.error("Error:", error));
    },[]);

    const country=(e)=>{
        setSelectedCountry(e);
        const state = [...new Set(newData.data
            .filter(location=>location.country === e)
            .map(location => location.state)
            .filter(state => state !== null))];
        console.log("Data ",selectedState)
        setState(state)
    }

    const state=(e)=>{
        setSelectedState(e);
        const city = [...new Set(newData.data
            .filter(location=>location.state === e)
            .map(location => location.city)
            .filter(city => city !== null))];
        console.log("Data ",selectedState)
        setCity(city)
    }

    const city=(e)=>{
        setSelectedCity(e);
        const city = [...new Set(newData.data
            .filter(location=>location.city === e)
            .map(location => location.district)
            .filter(city => city !== null))];
        setSubCities(city)
    }

    return(
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Picker
                selectedValue={selectedCountry}
                onValueChange={(itemValue) => country(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="-- Select Country --" value="" />
                {countries.map((item, index) => (
                    <Picker.Item label={item} value={item} key={index} />
                ))}
            </Picker>
            <Text>{selectedCountry}</Text>
            <Picker
                selectedValue={selectedState}
                onValueChange={(itemValue) => state(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="-- Select State --" value="" />
                {states.map((item, index) => (
                    <Picker.Item label={item} value={item} key={index} />
                ))}
            </Picker>
            <Picker
                selectedValue={selectedCity}
                onValueChange={(itemValue) => city(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="-- Select City --" value="" />
                {cities.map((item, index) => (
                    <Picker.Item label={item} value={item} key={index} />
                ))}
            </Picker>
            <Picker
                selectedValue={selectedSubCity}
                onValueChange={(itemValue) => setSelectedSubCity(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="-- Select District --" value="" />
                {subCities.map((item, index) => (
                    <Picker.Item label={item} value={item} key={index} />
                ))}
            </Picker>
            <TouchableOpacity
                style={[styles.button, styles.blue]}
                onPress={() => {
                    props.page(1)
                    props.id(id)
                } }
            >
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

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
    },
    blue: {
        backgroundColor: '#007bff',
    }
}

export default Page;
