import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

const App = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
    Hi! &apos;m the New Game page!
    </Text>
  </View>
);

export default App;
