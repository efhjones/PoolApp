import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 60,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
});

const NewGame = () => (
  <View style={styles.container}>
    <Text>I&rsquo;m the new game screen! Hooray!</Text>
  </View>
);


export default NewGame;
