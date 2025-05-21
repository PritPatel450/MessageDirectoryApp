import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const categories = [
  { id: '1', name: 'You', icon: 'person', color: '#007bff', messages: ["You are stronger than you think.", "Trust your own journey."] },
  { id: '2', name: 'Home', icon: 'home', color: '#28a745', messages: ["Dinner's at 7 PM tonight!","Don’t forget to lock the door."] },
  { id: '3', name: 'Love', icon: 'favorite', color: '#e83e8c', messages: ["Just thinking about you makes me smile.", "You are my favorite person."] },
  { id: '4', name: 'Family', icon: 'group', color: '#fd7e14', messages: ["Mom called. She said good luck!", "Let’s plan a weekend trip together."] },
  { id: '5', name: 'Friends', icon: 'people', color: '#6f42c1', messages: ["Don’t forget our game night Friday!", "You always have my back. Grateful!"] },
  { id: '6', name: 'School', icon: 'school', color: '#20c997', messages: ["Finish the assignment by 10 PM!", "Don't forget the quiz tomorrow."] },
];

export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.circle, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate('Messages', { inbox: item })}
    >
      <MaterialIcons name={item.icon} size={32} color="white" />
      <Text style={styles.circleText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Inbox</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef5ff',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    elevation: 5,
  },
  circleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
