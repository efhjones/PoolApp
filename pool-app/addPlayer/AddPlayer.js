import React from 'react';

import { StyleSheet, View, Button, Text } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

const AddPlayer = () => (
  <View style={styles.container}>
    <Text>I&rsquo;m the add player screen!</Text>
  </View>
);

export default AddPlayer;
