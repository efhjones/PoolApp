import React from 'react';
import PropTypes from 'prop-types';
import { lifecycle, compose, withStateHandlers } from 'recompose';
import _ from 'lodash';
import { StyleSheet, View, Button, Text, TextInput, Modal, ScrollView } from 'react-native';
import Error from '../../error/Error';
import {
  ONYX,
  MIDNIGHT_BLUE,
  PLATINUM
} from '../../styles/constants';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: PLATINUM,
    padding: 20,
    height: '100%'
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
  teamCard: {
    backgroundColor: 'white',
    margin: 10,
    minHeight: 200,
    borderRadius: 10
  },
  teamHeader: {
    color: MIDNIGHT_BLUE,
    fontSize: 25,
    padding: 10
  },
  userBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  deleteButtonContainer: {
    alignSelf: 'flex-start',
    paddingTop: 20,
    height: 100
  },
  searchContainer: {
    padding: 40,
    height: '100%',
    position: 'absolute',
    top: '20%'
  },
  searchField: {
    height: 40,
    borderColor: ONYX,
    borderWidth: 1,
    width: 300,
    marginBottom: 10,
    padding: 10,
    color: PLATINUM,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  cancelButtonContainer: {
    display: 'flex',
    alignSelf: 'flex-start',
    paddingTop: 40,
    paddingLeft: 25
  },
  addCustomPlayerContainer: {
    marginTop: 20
  },
  addCustomPlayerText: {
    fontSize: 20,
    color: MIDNIGHT_BLUE
  }
});

// enter search field for user
// if no user found, add player button is shown
// enter user email/name and click add player
const NewGame = props => (
  <View style={styles.container}>
    <View style={styles.deleteButtonContainer}>
      <Button
        onPress={() => props.onDeleteGame()}
        title="Delete Game"
        color="red"
      />
    </View>
    <ScrollView>
      {props.isErrored ? <Error error={props.errorMessage} /> : null}
      {props.teams.map((team, i) => (
        <View style={styles.teamCard} key={team.id}>
          <Text style={styles.teamHeader}>Team {i + 1}</Text>
          {team.players.map(player => (
            <View key={player.email} style={styles.userBar}>
              <Button
                onPress={() =>
                  props.onRemovePlayer({ teamId: team.id, userId: player.id })
                }
                title="X"
                color="red"
              />
              <Text style={styles.playerInGame}>{player.email}</Text>
            </View>
          ))}
          <Button
            onPress={() => props.onAddPlayerToTeam(team.id)}
            title="+ Add Player"
          />
          {i > 1 && (
            <Button
              onPress={() => props.onRemoveTeam({ teamId: team.id, gameId: props.gameId })}
              title="Remove Team"
            />
          )}
        </View>
      ))}
      <Button onPress={() => props.onAddTeam(props.gameId)} title="Add Team" />
      <Button onPress={() => props.onStartGame(props.gameId, props.teams)} title="Start Game" />
      <Modal
        visible={props.isSearchModalOpen}
        animationType="slide"
        onRequestClose={() => props.onCloseSearchModal()}
        style={styles.container}
      >
        <View style={styles.cancelButtonContainer}>
          <Button
            key="cancel"
            onPress={() => props.onCloseSearchModal()}
            title="Cancel"
          />
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.innerContainer}>
            <TextInput
              onChangeText={props.onSearchEmail}
              value={props.email}
              style={styles.searchField}
              autoCapitalize="none"
              placeholder="Search for Existing Player Email"
              color={ONYX}
              placeholderTextColor={MIDNIGHT_BLUE}
            />
            {props.email.length > 0 && props.filteredUsers.map(user => (
              <Button
                key={user.email}
                onPress={() => {
                  props.onAddPlayer({
                    gameId: props.gameId,
                    userId: user.id,
                    teamId: props.addingToTeamId
                  });
                  props.onCloseSearchModal();
                }}
                title={user.email}
              />
            ))}
            <View style={styles.addCustomPlayerContainer}>
              <Text style={styles.addCustomPlayerText}>
                Is this player not in our system yet?
              </Text>
              <Button
                key="add-custom-player"
                onPress={props.onToggleCustomPlayerFields}
                title="Create a Custom Player"
              />
              {
                props.isViewingCustomPlayerFields && (
                  <View style={styles.addCustomPlayerContainer}>
                    <TextInput
                      onChangeText={props.onUpdateCustomPlayerEmail}
                      value={props.customPlayerEmail}
                      style={styles.searchField}
                      autoCapitalize="none"
                      placeholder="email"
                      color={ONYX}
                      placeholderTextColor={MIDNIGHT_BLUE}
                    />
                    <Button
                      onPress={() => {
                        props.onAddCustomPlayer({
                          email: props.customPlayerEmail,
                          teamId: props.addingToTeamId
                        });
                        props.onCloseSearchModal();
                      }}
                      title="Add Player by Email"
                    />
                  </View>
                )
              }
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
  errorMessage: PropTypes.string,
  onAddCustomPlayer: PropTypes.func.isRequired,
  customPlayerEmail: PropTypes.string.isRequired,
  isViewingCustomPlayerFields: PropTypes.bool.isRequired,
  onToggleCustomPlayerFields: PropTypes.func.isRequired,
  onUpdateCustomPlayerEmail: PropTypes.func.isRequired
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
  addingToTeamId: null,
  customPlayerEmail: '',
  isViewingCustomPlayerFields: false
};

const handlers = {
  onAddPlayerToTeam: ({ isSearchModalOpen }) => teamId => ({
    isSearchModalOpen: !isSearchModalOpen,
    addingToTeamId: teamId
  }),
  onCloseSearchModal: () => () => ({
    isSearchModalOpen: false,
    addingToTeamId: null
  }),
  onSearchEmail: (state, { getAllUsers }) => (searchEmail) => {
    const { allUsers } = getAllUsers;
    const lowerCaseEmail = searchEmail.toLowerCase();
    const filteredUsers = (allUsers || []).filter(({ email }) =>
      email.toLowerCase().includes(lowerCaseEmail));

    return {
      filteredUsers,
      email: searchEmail
    };
  },
  onToggleCustomPlayerFields: ({ isViewingCustomPlayerFields }) => () => ({
    isViewingCustomPlayerFields: !isViewingCustomPlayerFields
  }),
  onUpdateCustomPlayerEmail: () => email => ({
    customPlayerEmail: email
  })
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
  withStateHandlers(initialState, handlers)
)(NewGame);
