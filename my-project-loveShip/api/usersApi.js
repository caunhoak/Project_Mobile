import axios from 'axios';

const BASE_URL = 'http://192.168.126.1:3000/api/users';

// Lấy tất cả người dùng
export const getAllUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw error;
  }
};

// Tạo một người dùng mới
export const createUser = async (userData) => {
  try {
    const response = await axios.post(BASE_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }
};

// Cập nhật một người dùng
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.message);
    throw error;
  }
};

export const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(BASE_URL, {
        data: { userId } // Gửi userId trong body của yêu cầu DELETE
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };
