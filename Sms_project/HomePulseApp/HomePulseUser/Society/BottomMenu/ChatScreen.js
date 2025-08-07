/*
import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import io from 'socket.io-client';

const ChatScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [commentText, setCommentText] = useState({});

    const socketRef = useRef(null);

    const socket = io('http://192.168.0.10:3000');

    useEffect(() => {
        // Replace with your server URL (e.g. local or deployed backend)
        socketRef.current = io('http://192.168.0.10:3000');

        // Listening to poll creation (optional)
        socketRef.current.on('newPoll', (newPoll) => {
            setPolls(prev => [newPoll, ...prev]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);


    /!*const handleSubmit = () => {
        if (!title) return;

        const newPoll = {
            id: Date.now().toString(),
            title,
            description,
            options: [option1, option2],
            votes: { [option1]: 0, [option2]: 0 },
            status: 'active',
        };

        setPolls([newPoll, ...polls]);
        setModalVisible(false);
        setTitle('');
        setDescription('');
        setOption1('');
        setOption2('');
    };*!/

    const handleSubmit = () => {
        if (!title || !option1 || !option2) return;

        const newPoll = {
            id: Date.now().toString(),
            title,
            description,
            options: [option1, option2],
            votes: { [option1]: 0, [option2]: 0 },
            status: 'active',
        };

        // Send poll to server via socket
        socketRef.current.emit('createPoll', newPoll);

        setPolls([newPoll, ...polls]);
        setModalVisible(false);
        setTitle('');
        setDescription('');
        setOption1('');
        setOption2('');
    };


    const [polls, setPolls] = useState([
        {
            id: '1',
            title: 'Should we install solar panels?',
            description: 'Eco-friendly energy for the society.',
            image: 'https://energy-oil-gas.com/wp-content/uploads/sites/3/2023/05/Solar-panels-800x445.jpg',
            options: ['Yes', 'No'],
            votes: { Yes: 15, No: 5 },
            status: 'active',
            comments: ['Great idea!', 'Very costly.'],
        },
        {
            id: '2',
            title: 'Change security agency?',
            description: '',
            options: ['Continue', 'Change'],
            votes: { Continue: 20, Change: 8 },
            status: 'closed',
            comments: [],
        },
    ]);

    const [visibleComments, setVisibleComments] = useState({});

    const toggleComments = (id) => {
        setVisibleComments((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleCreatePoll = () => {
        setModalVisible(true);
    };

    const handleComment = (pollId, text) => {
        if (!text.trim()) return;

        // Emit comment to server
        socket.emit('newComment', { pollId, text });

        setPolls(prevPolls =>
            prevPolls.map(poll => {
                if (poll.id === pollId) {
                    return {
                        ...poll,
                        comments: [...poll.comments, text],
                    };
                }
                return poll;
            })
        );
        setCommentText(prev => ({ ...prev, [pollId]: '' }));
    };


    const handleVote = (pollId, option) => {
        setPolls(prevPolls =>
            prevPolls.map(poll => {
                if (poll.id === pollId && poll.status === 'active') {
                    return {
                        ...poll,
                        votes: {
                            ...poll.votes,
                            [option]: poll.votes[option] + 1
                        }
                    };
                }
                return poll;
            })
        );
    };


    const renderPoll = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>

            {item.image && (
                <Image source={{ uri: item.image }} style={styles.bannerImage} />
            )}

            {item.description !== '' && (
                <Text style={styles.description}>{item.description}</Text>
            )}

            <View style={styles.optionsRow}>
                {item.options.map((opt) => (
                    <TouchableOpacity
                        key={opt.id}
                        style={[
                            styles.option,
                            item.status !== 'active' && styles.disabledOption,
                        ]}
                        disabled={item.status !== 'active'}
                    >
                        <Text style={styles.optionText}>
                            {opt} ({item.votes[opt]} votes)
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.socialRow}>
                <TouchableOpacity>
                    <Ionicons name="heart-outline" size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleComments(item.id)}>
                    <Ionicons name="chatbubble-outline" size={20} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="share-social-outline" size={20} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 'auto', fontSize: 12, color: '#555' }}>
                    20 Views
                </Text>
            </View>

            {visibleComments[item.id] && (
                <View style={styles.commentSection}>
                    {item.comments.map((cmt, index) => (
                        <Text key={index} style={styles.comment}>
                            • {cmt}
                        </Text>
                    ))}
                    {/!*<View style={styles.commentInputRow}>
                        <TextInput
                            style={styles.input}
                            placeholder="New comment"
                            placeholderTextColor="#666"
                        />
                        <TouchableOpacity style={styles.postBtn}>
                            <Text style={{ color: '#007BFF' }}>Post</Text>
                        </TouchableOpacity>
                    </View>*!/}
                    <View style={styles.commentInputRow}>
                        <TextInput
                            style={styles.input}
                            placeholder="New comment"
                            placeholderTextColor="#666"
                            value={commentText[item.id] || ''}
                            onChangeText={(text) =>
                                setCommentText((prev) => ({ ...prev, [item.id]: text }))
                            }
                        />
                        <TouchableOpacity
                            style={styles.postBtn}
                            onPress={() => handleComment(item.id, commentText[item.id] || '')}
                        >
                            <Text style={{ color: '#007BFF' }}>Post</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={polls}
                keyExtractor={(item) => item.id}
                renderItem={renderPoll}
                contentContainerStyle={styles.list}
            />

            <TouchableOpacity style={styles.fab} onPress={handleCreatePoll}>
                <Ionicons name="add-circle" size={64} color="#007BFF" />
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Create New Poll</Text>

                        <TextInput
                            placeholder="Poll Title"
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            placeholder="Description"
                            style={styles.input}
                            value={description}
                            onChangeText={setDescription}
                        />
                        <TextInput
                            placeholder="Option 1"
                            style={styles.input}
                            value={option1}
                            onChangeText={setOption1}
                        />
                        <TextInput
                            placeholder="Option 2"
                            style={styles.input}
                            value={option2}
                            onChangeText={setOption2}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelBtn]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.createBtn]}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.buttonText}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    list: {
        padding: 16,
        paddingBottom: 80,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    bannerImage: {
        width: '100%',
        height: 180,
        borderRadius: 12,
        marginVertical: 10,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    option: {
        backgroundColor: '#e0f0ff',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        margin: 5,
        alignItems: 'center',
    },
    disabledOption: {
        backgroundColor: '#ccc',
    },
    optionText: {
        fontSize: 14,
    },
    socialRow: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 20,
        alignItems: 'center',
    },
    commentSection: {
        marginTop: 10,
    },
    comment: {
        fontSize: 13,
        marginVertical: 2,
        color: '#444',
    },
    commentInputRow: {
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center',
        borderBottomWidth: 3,
        borderColor: '#262626',
    },
    postBtn: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: '#fff',
        borderRadius: 32,
        elevation: 5,
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
        borderRadius: 8,
        padding: 1,
        marginBottom: 1,
        width:'80%'
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
});



export default ChatScreen;
*/


import React, { useEffect, useRef, useState } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, Modal, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import io from 'socket.io-client';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../firebaseConfig'; // your firebase.js path
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const ChatScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [commentText, setCommentText] = useState({});
    const [polls, setPolls] = useState([]);
    const [visibleComments, setVisibleComments] = useState({});
    const [image, setImage] = useState(null);

    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io('http://192.168.0.10:3000');

        socketRef.current.on('initialPolls', (existingPolls) => {
            setPolls(existingPolls.reverse()); // optional: latest first
        });

        socketRef.current.on('newPoll', (newPoll) => {
            setPolls(prev => [newPoll, ...prev]);
        });

        socketRef.current.on('voteUpdate', ({ pollId, option }) => {
            setPolls(prev =>
                prev.map(p =>
                    p.id === pollId
                        ? { ...p, votes: { ...p.votes, [option]: p.votes[option] + 1 } }
                        : p
                )
            );
        });

        socketRef.current.on('commentAdded', ({ pollId, text }) => {
            setPolls(prev =>
                prev.map(p =>
                    p.id === pollId
                        ? { ...p, comments: [...p.comments, text] }
                        : p
                )
            );
        });

        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access media library is required!');
            }
        })();

        return () => {
            socketRef.current.disconnect();
        };
    }, []);


    const handleSubmit = () => {
        if (!title) return;

        const newPoll = {
            id: Date.now().toString(),
            title,
            description,
            options: [option1, option2],
            votes: { [option1]: 0, [option2]: 0 },
            comments: [],
            status: 'active',
            image: image
        };

        socketRef.current.emit('createPoll', newPoll);

        setModalVisible(false);
        setTitle('');
        setDescription('');
        setOption1('');
        setOption2('');
    };

    const handleVote = (pollId, option) => {
        socketRef.current.emit('vote', { pollId, option });
    };


    const handlePickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!result.cancelled && result.assets && result.assets.length > 0) {
                const imageUri = result.assets[0].uri;
                const response = await fetch(imageUri);
                const blob = await response.blob();

                const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
                const storageRef = ref(storage, `chat_images/${fileName}`);

                await uploadBytes(storageRef, blob);
                const downloadURL = await getDownloadURL(storageRef);

                console.log('✅ Uploaded image URL:', downloadURL);
                setImage(downloadURL);
                // You can now send this downloadURL in your chat message or save it
            }
        } catch (error) {
            console.error('❌ Upload Error:', error);
        }
    };




    const handleComment = (pollId, text) => {
        if (!text.trim()) return;

        socketRef.current.emit('newComment', { pollId, text });
        setCommentText(prev => ({ ...prev, [pollId]: '' }));
    };

    const toggleComments = (id) => {
        setVisibleComments(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const renderPoll = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            {item.image && <Image source={{ uri: item.image }} style={styles.bannerImage} />}
            {item.description !== '' && <Text style={styles.description}>{item.description}</Text>}

            <View style={styles.optionsRow}>
                {item.options.map((opt) => (
                    opt!==''?
                        <TouchableOpacity
                            key={opt}
                            style={[
                                styles.option,
                                item.status !== 'active' && styles.disabledOption,
                            ]}
                            disabled={item.status !== 'active'}
                            onPress={() => handleVote(item.id, opt)}
                        >
                            <Text style={styles.optionText}>
                                {opt} ({item.votes?.[opt] || 0} votes)
                            </Text>
                        </TouchableOpacity>
                        : null
                ))}
            </View>

            <View style={styles.socialRow}>
                <TouchableOpacity>
                    <Ionicons name="heart-outline" size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleComments(item.id)}>
                    <Ionicons name="chatbubble-outline" size={20} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="share-social-outline" size={20} />
                </TouchableOpacity>
            </View>

            {visibleComments[item.id] && (
                <View style={styles.commentSection}>
                    {(item.comments || []).map((cmt, index) => (
                        <Text key={index} style={styles.comment}>• {cmt}</Text>
                    ))}
                    <View style={styles.commentInputRow}>
                        <TextInput
                            style={styles.input}
                            placeholder="New comment"
                            placeholderTextColor="#666"
                            value={commentText[item.id] || ''}
                            onChangeText={(text) =>
                                setCommentText(prev => ({ ...prev, [item.id]: text }))
                            }
                        />
                        <TouchableOpacity
                            style={styles.postBtn}
                            onPress={() => handleComment(item.id, commentText[item.id] || '')}
                        >
                            <Text style={{ color: '#007BFF' }}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={polls}
                inverted
                keyExtractor={(item) => item.id}
                renderItem={renderPoll}
                contentContainerStyle={styles.list}
            />
            <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
                <Ionicons name="add-circle" size={64} color="#007BFF" />
            </TouchableOpacity>

            {/* Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Create New Poll</Text>
                        <TextInput placeholder="Title" style={styles.input} value={title} onChangeText={setTitle} />
                        <TouchableOpacity onPress={handlePickImage} style={styles.imagePicker}>
                            {image ? (
                                <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
                            ) : (
                                <Text>Pick an Image</Text>
                            )}
                        </TouchableOpacity>
                        <TextInput placeholder="Description" style={styles.input} value={description} onChangeText={setDescription} />
                        <TextInput placeholder="Option 1" style={styles.input} value={option1} onChangeText={setOption1} />
                        <TextInput placeholder="Option 2" style={styles.input} value={option2} onChangeText={setOption2} />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.button, styles.cancelBtn]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.createBtn]} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f4f4f4' },
    list: { padding: 16, paddingBottom: 80 },
    card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, elevation: 3 },
    title: { fontWeight: 'bold', fontSize: 16 },
    bannerImage: { width: '100%', height: 180, borderRadius: 12, marginVertical: 10 },
    description: { fontSize: 14, color: '#666', marginBottom: 10 },
    optionsRow: { flexDirection: 'row', justifyContent: 'space-around' },
    option: { backgroundColor: '#e0f0ff', padding: 10, borderRadius: 8, flex: 1, margin: 5, alignItems: 'center' },
    disabledOption: { backgroundColor: '#ccc' },
    optionText: { fontSize: 14 },
    socialRow: { flexDirection: 'row', marginTop: 10, gap: 20, alignItems: 'center' },
    fab: { position: 'absolute', right: 16, bottom: 16, backgroundColor: '#fff', borderRadius: 32, elevation: 5 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { width: '90%', backgroundColor: 'white', borderRadius: 16, padding: 20 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
    button: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
    cancelBtn: { backgroundColor: '#ccc' },
    createBtn: { backgroundColor: '#007BFF' },
    buttonText: { color: 'white', fontWeight: '600' },
    imagePicker: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
    },
    commentSection: {
        backgroundColor: '#f8f9fa',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 10,
        borderRadius: 8,
    },

    comment: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginBottom: 6,
        color: '#333',
        fontSize: 14,
        elevation: 1, // subtle shadow on Android
        shadowColor: '#000', // shadow on iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },

    commentInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
    },

    input: {
        flex: 1,
        fontSize: 14,
        color: '#000',
        paddingVertical: 4,
    },

    postBtn: {
        paddingLeft: 10,
    },


});

export default ChatScreen;

