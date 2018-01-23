import React from 'react';
import PropTypes from 'prop-types';
import { lifecycle, compose, withStateHandlers } from 'recompose';
import _ from 'lodash';
import { StyleSheet, View, Button, Text, TextInput, Modal } from 'react-native';
import Error from '../../error/Error';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    paddingTop: 100
  },
  field: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    width: 200,
    marginBottom: 10,
    padding: 10
  },
  playersInGameContainer: {
    width: '80%'
  },
  searchHeader: {

  },
  playersHeader: {
    fontSize: 20
  },
  playerInGame: {
    color: '#E8E9EB',
    backgroundColor: '#202B4C',
    alignSelf: 'flex-start',
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: '600'
  },
  userBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

// enter search field for user
// if no user found, add player button is shown
// enter user email/name and click add player
const NewGame = ({
  onAddPlayer,
  onSearchEmail,
  onCloseSearchModal,
  isSearchModalOpen,
  email,
  gameId,
  filteredUsers,
  onRemovePlayer,
  onAddPlayerToTeam,
  teams,
  addingToTeamId,
  onRemoveTeam,
  onAddTeam,
  onDeleteGame,
  onStartGame,
  isErrored,
  errorMessage
}) => (
  <View style={styles.container}>
    {
      isErrored
      ? <Error error={errorMessage} />
      : null
    }
    <Button
      onPress={() => onDeleteGame()}
      title="Delete game"
    />
    {
      teams.map((team, i) => (
        <View key={team.id}>
          <Text style={styles.searchHeader}>Team {i + 1}</Text>
          {
            team.players.map(player => (
              <View key={player.email} style={styles.userBar}>
                <Button
                  onPress={() => onRemovePlayer({ teamId: team.id, userId: player.id })}
                  title="X"
                  color="red"
                />
                <Text style={styles.playerInGame}>{player.email}</Text>
              </View>
            ))
          }
          <Button
            onPress={() => onAddPlayerToTeam(team.id)}
            title="+ Add Player"
          />
          { i > 1 && <Button
            onPress={() => onRemoveTeam({ teamId: team.id, gameId })}
            title="Remove Team"
          />}
        </View>
      ))
    }
    <Button
      onPress={() => onAddTeam(gameId)}
      title="Add Team"
    />
    <Button
      onPress={() => onStartGame(gameId, teams)}
      title="Start Game"
    />
    <Modal
      visible={isSearchModalOpen}
      animationType="slide"
      onRequestClose={() => onCloseSearchModal()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <TextInput
            onChangeText={onSearchEmail}
            value={email}
            style={styles.field}
            autoCapitalize="none"
            placeholder="Player Email"
          />
          {
              filteredUsers.map(user => (
                <Button
                  key={user.email}
                  onPress={() => {
                    onAddPlayer({ gameId, userId: user.id, teamId: addingToTeamId });
                    onCloseSearchModal();
                  }}
                  title={user.email}
                />
              ))
            }
        </View>
      </View>
    </Modal>
  </View>
);


NewGame.propTypes = {
  onAddPlayer: PropTypes.func.isRequired,
  onRemovePlayer: PropTypes.func.isRequired,
  onRemoveTeam: PropTypes.func.isRequired,
  onAddTeam: PropTypes.func.isRequired,
  onDeleteGame: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  filteredUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSearchModalOpen: PropTypes.bool.isRequired,
  addingToTeamId: PropTypes.string,
  onAddPlayerToTeam: PropTypes.func.isRequired,
  onCloseSearchModal: PropTypes.func.isRequired,
  onSearchEmail: PropTypes.func.isRequired,
  gameId: PropTypes.string,
  teams: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    })).isRequired
  })).isRequired,
  onStartGame: PropTypes.func.isRequired,
  isErrored: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

NewGame.defaultProps = {
  gameId: null,
  addingToTeamId: null,
  errorMessage: ''
};

const pathToGame = ['getGame', 'Game'];

const initialState = {
  email: '',
  filteredUsers: [],
  isSearchModalOpen: false,
  addingToTeamId: null
};

const handlers = {
  onAddPlayerToTeam: ({ isSearchModalOpen }) => teamId => (
    { isSearchModalOpen: !isSearchModalOpen, addingToTeamId: teamId }
  ),
  onCloseSearchModal: () => () => ({
    isSearchModalOpen: false,
    addingToTeamId: null
  }),
  onSearchEmail: (state, { getAllUsers }) => (searchEmail) => {
    const { allUsers } = getAllUsers;
    const lowerCaseEmail = searchEmail.toLowerCase();
    const filteredUsers = (allUsers || [])
      .filter(({ email }) => email.toLowerCase().includes(lowerCaseEmail));
    return {
      filteredUsers,
      email: searchEmail
    };
  }
};

export default compose(
  lifecycle({
    componentWillMount() {
      const isGameLoading = _.get(this.props, ['getGame', 'loading'], false);
      const hasGameId = _.get(this.props, [...pathToGame, 'id'], false);
      const game = _.get(this.props, pathToGame, null);
      if (hasGameId && !isGameLoading) {
        this.props.updateGame(game);
      } else {
        const { userId } = this.props;
        if (userId) {
          this.props.createOrResumeGame(userId);
        }
      }
    },
    componentWillReceiveProps(nextProps) {
      const { userId, gameId } = nextProps;
      if (userId && !gameId) {
        this.props.createOrResumeGame(userId);
      }
    }
  }),
  withStateHandlers(initialState, handlers),
)(NewGame);

