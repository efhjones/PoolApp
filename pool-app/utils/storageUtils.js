import AsyncStorage from 'AsyncStorage';
import { STORAGE_AUTH_TOKEN, CURRENT_GAME_TOKEN } from './constants';

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_AUTH_TOKEN);
  } catch (err) {
    return err;
  }
};

export const saveGameToken = async (gameId) => {
  try {
    return await AsyncStorage.setItem(CURRENT_GAME_TOKEN, gameId);
  } catch (err) {
    return err;
  }
};

export default getToken;
