import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import Icons from '../enums/Icons';
import Colors from '../enums/Colors';

type DisplayErrorProps = {
  message: string;
};

const DisplayError = ({ message = "Une erreur c'est produite" } : DisplayErrorProps) => (
  <View style={styles.container}>
    <Image source={Icons.error} style={styles.icon} />
    <Text style={styles.errorText}>
      {message}
    </Text>
  </View>
);

export default DisplayError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    tintColor: Colors.mainGreen,
  },
  errorText: {
    fontSize: 16,
  },
});