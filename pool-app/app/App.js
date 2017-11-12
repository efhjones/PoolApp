import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

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

const App = ({ text, onChangeText }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      {text}
    </Text>
    <Button
      title="Hi!"
      onPress={() => onChangeText('Hi!')}
    />
  </View>
);

App.propTypes = {
  text: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired
};

export default App;
