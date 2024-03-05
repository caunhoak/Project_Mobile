import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import { getAllUsers, createUser, updateUser, deleteUser } from '../api/usersApi';

export default function HomeScreen() {
  const [users, setUsers] = useState([]);
  const [newUserData, setNewUserData] = useState({
    username: '',
    password: '',
    email: '',
    phone: ''
  });

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
      const newUser = await createUser(newUserData);
      console.log('New user created:', newUser);
      setNewUserData({ // Reset input fields after creating user
        username: '',
        password: '',
        email: '',
        phone: ''
      });
      fetchData(); // Refresh user list
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (userId, updatedData) => {
    try {
      const updatedUser = await updateUser(userId, updatedData);
      console.log('User updated:', updatedUser);
      fetchData(); // Refresh user list
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await deleteUser(userId);
      console.log(response.message);
      fetchData(); // Refresh user list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Users:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text>{item.username}</Text>
            <Button title="Update" onPress={() => handleUpdateUser(item._id, { username: 'new_username' })} />
            <Button title="Delete" onPress={() => handleDeleteUser(item._id)} />
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setNewUserData({ ...newUserData, username: text })}
        value={newUserData.username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setNewUserData({ ...newUserData, password: text })}
        value={newUserData.password}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setNewUserData({ ...newUserData, email: text })}
        value={newUserData.email}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={(text) => setNewUserData({ ...newUserData, phone: text })}
        value={newUserData.phone}
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
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
});
