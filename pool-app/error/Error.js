import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E12800'
  },
  message: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
});

const Error = ({ error }) => {
  console.log('Error rendering: ', error);
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{error}</Text>
    </View>
  );
};

Error.propTypes = {
  error: PropTypes.string.isRequired
};

export default Error;
