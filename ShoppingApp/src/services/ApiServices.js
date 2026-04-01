import axios from 'axios';
import { Alert } from 'react-native';


export const GetApi = async () => {
  try {
    const response = await axios.get(
      'https://69afc347c63dd197feba11b5.mockapi.io/users',
    );
    return response.data;
  } catch (error) {
    console.log('API Error:', error);
    return [];
  }
};