import axios from 'axios';
import { Alert } from 'react-native';

//Delete API
export const DeleteApi = async id => {
  try {
    const response = await axios.delete(
      `https://69afc347c63dd197feba11b5.mockapi.io/users/${id}`,
    );
    Alert.alert('user deleted');
    console.log(response.data);
  } catch (error) {
    console.log('Error deleting user', error);
  }
};

//Get API
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

//Post API
export const PostApi = async userData => {
  try {
    const response = await axios.post(
      'https://69afc347c63dd197feba11b5.mockapi.io/users',
      userData,
    );

    return response.data;
  } catch (error) {
    console.log('POST API ERROR:', error);
  }
};

//Put API
export const PutApi = async (id, data) => {
  try {
    const response = await axios.put(
      `https://69afc347c63dd197feba11b5.mockapi.io/users/${id}`,
      data,
    );

    Alert.alert('User Updated');

    return response.data;
  } catch (error) {
    Alert.alert('Error updating user');
  }
};
