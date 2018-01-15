import { saveGameToken } from '../utils/storageUtils';

const AppActions = {
  onEnterGameFlow(gameId) {
    saveGameToken(gameId);
  }
};

export default AppActions;
