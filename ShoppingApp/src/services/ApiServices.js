import axios from 'axios';
import { Alert } from 'react-native';

//Get API
export const GetApi = async () => {
  try {
    const response = await axios.get(
      'https://69d691551c120e733cce6a0f.mockapi.io/users',
    );
    return response.data;
  } catch (error) {
    console.log('API Error:', error);
    return [];
  }
};