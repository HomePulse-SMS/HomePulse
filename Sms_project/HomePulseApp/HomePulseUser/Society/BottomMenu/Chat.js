import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import CommentSection from './CommentSection';


export default function Chats(props) {
    const item = props.item
    const [comments, setComments] = useState([]);


    const handleAddComment = (commentText) => {
        setComments(prev => [...prev, commentText]);
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.title}</Text>
                <Ionicons name="ellipsis-vertical" size={20} color="#333" />
            </View>
            {item.image && (
                <Image
                    source={{ uri: item.image }}
                    style={styles.bannerImage}
                    resizeMode="cover"
                />
            )}

            <Text style={styles.description}>{item.description}</Text>

            {item.status === 'active' && item.options[0] !== '' && item.options[1] !== '' && (
                <View style={styles.optionsRow}>
                    {item.options.map((option) => (
                        <TouchableOpacity key={option} style={styles.optionBtn}>
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <View style={styles.cardFooter}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="heart-outline" size={18} color="#333" />
                    <Text style={styles.iconText}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="chatbubble-outline" size={18} color="#333" />
                    <Text style={styles.iconText}>Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="share-social-outline" size={18} color="#333" />
                    <Text style={styles.iconText}>Share</Text>
                </TouchableOpacity>
                <View style={styles.viewsBox}>
                    <Text style={styles.viewsText}>
                        {Object.values(item.votes).reduce((a, b) => a + b, 0)} Views
                    </Text>
                </View>
            </View>
            <CommentSection comments={comments} onAddComment={handleAddComment} />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    option: {
        backgroundColor: '#e0f0ff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
    },
    disabledOption: {
        backgroundColor: '#ddd',
    },
    optionText: {
        fontSize: 14,
    },
    status: {
        marginTop: 10,
        fontSize: 13,
        fontStyle: 'italic',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        borderRadius: 30,
        elevation: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    cancelBtn: {
        backgroundColor: '#ccc',
    },
    createBtn: {
        backgroundColor: '#007BFF',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },

    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },

    optionBtn: {
        backgroundColor: '#007BFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },

    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        alignItems: 'center',
    },

    iconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    iconText: {
        fontSize: 12,
        color: '#333',
    },

    viewsBox: {
        backgroundColor: '#eee',
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },

    viewsText: {
        fontSize: 12,
        color: '#777',
    },
    bannerImage: {
        width: '100%',
        height: 180,
        borderRadius: 12,
        marginBottom: 10,
    }


});
