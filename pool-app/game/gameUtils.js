import _ from 'lodash';

export const everyTeamHasAPlayer = teams => _.every(teams, team => (
  _.get(team, ['players', 'length'], 0) >= 1));

export default everyTeamHasAPlayer;
