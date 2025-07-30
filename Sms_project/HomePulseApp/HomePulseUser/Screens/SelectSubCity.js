import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image, SafeAreaView,
} from 'react-native';
import LottieView from 'lottie-react-native';

const SelectSubCity = ({ route, navigation }) => {
    const { subcity } = route.params;
    const [loading, setLoading] = useState(true);
    const [cities, setData] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        fetch('http://192.168.0.183:8080/admin/getAllSociety', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(fetchedData => {
                const snameList = (fetchedData.data || [])
                    .filter(item => item && item.location && item.location.city === subcity)
                    .map(item => item.location.district)
                    .filter(district => district !== null && district !== undefined);

                const distinctCities = [...new Set(snameList)];
                setData(distinctCities);
            })
            .catch(error => console.error("Error:", error));
    }, []);



    const handleCitySelect = (district) => {
        navigation.navigate('SelectApartment', { district });
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <LottieView
                    source={require('./Animation - 1744446306740.json')}
                    autoPlay
                    loop
                    style={{ width: 150, height: 150 }}
                />
                <Text style={styles.loadingText}>Loading Cities...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>🏙️ Select Your SubCity</Text>
            <FlatList
                data={cities}
                keyExtractor={(item) => item}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => handleCitySelect(item)}>
                        <Image source={require('../Starting/city-icon.png')} style={styles.icon} />
                        <Text style={styles.cityName}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eef3f9',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#2c3e50',
    },
    container: {
        flex: 1,
        backgroundColor: '#f2f8ff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
        color: '#2d3436',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 14,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    icon: {
        width: 28,
        height: 28,
        marginRight: 15,
    },
    cityName: {
        fontSize: 18,
        fontWeight: '500',
        color: '#34495e',
    },
});

export default SelectSubCity;
