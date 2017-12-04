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

const Loading = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Loading...
    </Text>
  </View>
);

export default Loading;
