import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

const App = ({ text, onChangeText, navigation }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      {text}
    </Text>
    <Button
      title="Hi!"
      onPress={() => onChangeText('Hi!')}
    />
    <Button
      onPress={() => navigation.navigate('NewGame')}
      title="Create a new game"
    />
  </View>
);

App.propTypes = {
  text: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired
};

export default App;
