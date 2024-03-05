import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { getAllUsers, createUser } from '../api/usersApi';

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const newUser = await createUser({
        username: 'example',
        password: 'example',
        email: 'example@example.com',
        phone: '123456789'
      });
      console.log('New user created:', newUser);
      // Update state or perform any other action
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Users:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text>{item.username}</Text>
        )}
      />
      <Button title="Create User" onPress={handleCreateUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
