import axios from 'axios';

// const BASE_URL = 'http://localhost:3000/api/users';
const BASE_URL = 'http://192.168.126.1:3000/api/users';


// Lấy tất cả người dùng
export const getAllUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Tạo một người dùng mới
export const createUser = async (userData) => {
  try {
    const response = await axios.post(BASE_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
