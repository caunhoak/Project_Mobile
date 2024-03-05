import axios from 'axios';

const BASE_URL = 'http://192.168.126.1:3000/api/orders';

// Lấy tất cả đơn hàng
export const getAllOrders = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    throw error;
  }
};

// Tạo một đơn hàng mới
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(BASE_URL, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error.message);
    throw error;
  }
};
