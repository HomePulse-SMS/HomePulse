import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

const newsGroups = [
    [
        {
            title: 'Ganesh Festival Celebration',
            description: 'Celebrate the Ganesh Festival with cultural programs and activities.',
            image: 'https://www.punekarnews.in/wp-content/uploads/2024/09/Forest-Countys-Ashtavinayak-Themed-Bappa-I-Img-Credit-Swaraj-Dharmadhikari.png'
        },
        {
            title: 'Annual Society Meeting',
            description: 'Join us for the annual meeting to discuss upcoming projects and budget.',
            image: 'https://img-cdn.publive.online/fit-in/1280x960/filters:format(webp)/bollyy/media/media_files/2024/12/31/Drp5FdfclYHgdNcsble3.jpg'
        }
    ],
    [
        {
            title: 'New Gym Opening',
            description: 'The new society gym is now open! Residents can register at the clubhouse.',
            image: 'https://5.imimg.com/data5/SELLER/Default/2023/10/356053986/XV/LY/HC/47723611/all-gym-equipments-for-new-gym-opening-1000x1000.jpeg'
        },
        {
            title: 'Monsoon Safety Tips',
            description: 'Important safety tips for the monsoon season to keep our society safe.',
            image: 'https://absortech.com/wp-content/uploads/2022/06/umbrella_rain_monsoon-season.jpg'
        }
    ]
];

export default function Timeline() {
    return (
        <Swiper
            style={styles.wrapper}
            loop={true}
            horizontal={false} // outer swiper flips up/down
            showsPagination={false}
        >
            {newsGroups.map((group, groupIndex) => (
                <Swiper
                    key={groupIndex}
                    loop={true}
                    horizontal={true} // inner swiper flips left/right
                    showsPagination={true}
                >
                    {group.map((news, newsIndex) => (
                        <View key={newsIndex} style={styles.slide}>
                            <Image source={{ uri: news.image }} style={styles.image} />
                            <View style={styles.overlay}>
                                <Text style={styles.title}>{news.title}</Text>
                                <Text style={styles.description}>{news.description}</Text>
                            </View>
                        </View>
                    ))}
                </Swiper>
            ))}
        </Swiper>
    );
}

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    image: {
        position: 'absolute',
        width: width,
        height: height
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        padding: 20
    },
    title: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold'
    },
    description: {
        fontSize: 16,
        color: '#fff',
        marginTop: 5
    }
});
