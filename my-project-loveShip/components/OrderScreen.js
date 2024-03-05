import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { getAllOrders, createOrder } from '../api/ordersApi';
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker

const OrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleCreateOrder = async () => {
    try {
      const newOrder = await createOrder({
        item: selectedItem,
      });
      setOrders([...orders, newOrder]);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedItem}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedItem(itemValue)}
        >
          <Picker.Item label="Item 1" value="item1" />
          <Picker.Item label="Item 2" value="item2" />
          <Picker.Item label="Item 3" value="item3" />
        </Picker>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text>{item.status}</Text>
          </View>
        )}
      />
      <Button title="Create Order" onPress={handleCreateOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    marginTop: 50,
  },
  picker: {
    height: 50,
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  orderItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default OrderScreen;
