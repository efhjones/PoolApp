import AsyncStorage from 'AsyncStorage';
import { STORAGE_AUTH_TOKEN } from './constants';

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_AUTH_TOKEN);
  } catch (err) {
    return err;
  }
};

export default getToken;
