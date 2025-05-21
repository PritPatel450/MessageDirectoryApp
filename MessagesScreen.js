import React, { useState } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet
} from 'react-native';

export default function MessagesScreen({ route }) {
  const { inbox } = route.params;
  const [messages, setMessages] = useState(inbox.messages);
  const [newMessage, setNewMessage] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAdd = () => {
    if (!newMessage.trim()) return;

    if (editingIndex !== null) {
      const updated = [...messages];
      updated[editingIndex] = newMessage;
      setMessages(updated);
      setEditingIndex(null);
    } else {
      setMessages([...messages, newMessage]);
    }
    setNewMessage('');
  };

  const handleEdit = (index) => {
    setNewMessage(messages[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const confirm = window.confirm("Delete this message?");
    if (confirm) {
      const updated = messages.filter((_, i) => i !== index);
      setMessages(updated);
    }
  };

  return (
    <View style={styles.messageContainer}>
      <Text style={styles.heading}>{inbox.name} Messages</Text>

      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.message}>{item}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => handleEdit(index)} style={styles.smallButton}>
                <Text style={styles.smallButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(index)} style={styles.smallButton}>
                <Text style={styles.smallButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
          <Text style={styles.addButtonText}>{editingIndex !== null ? "Update" : "Add"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#f0f4ff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  message: {
    fontSize: 16,
    color: '#555',
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginLeft: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  smallButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginLeft: 8,
  },
  smallButtonText: {
    fontSize: 14,
    color: '#333',
  },
});
