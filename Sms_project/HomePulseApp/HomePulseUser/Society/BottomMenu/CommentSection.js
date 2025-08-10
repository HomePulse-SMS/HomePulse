// CommentSection.js
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

export default function CommentSection({ comments, onAddComment }) {
    const [newComment, setNewComment] = useState('');

    const handleAdd = () => {
        if (!newComment.trim()) return;
        onAddComment(newComment.trim());
        setNewComment('');
    };

    return (
        <View style={styles.container}>
            {
                comments!==[]?
                    <FlatList
                        data={comments}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <Text style={styles.comment}>{item}</Text>}
                    />
                    :
                    null
            }
            <View style={styles.inputRow}>
                <TextInput
                    placeholder="Add a comment..."
                    value={newComment}
                    onChangeText={setNewComment}
                    style={styles.input}
                />
                <Button title="Post" onPress={handleAdd} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    input: {
        flex: 10,
        borderWidth: 5,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginRight: 8,
        width: '100%',
    },
    comment: {
        backgroundColor: '#f1f1f1',
        padding: 8,
        borderRadius: 6,
        marginVertical: 2,
        fontSize: 13,
    },
});
