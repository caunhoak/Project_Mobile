import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { getAllOrders, createOrder } from '../api/ordersApi';

const OrderScreen = () => {
  const [orders, setOrders] = useState([]);

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
        // Thông tin của đơn hàng mới
      });
      setOrders([...orders, newOrder]);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text>{item.status}</Text>
            {/* Hiển thị các thông tin khác của đơn hàng */}
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
  orderItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default OrderScreen;
