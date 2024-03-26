import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ilpex from '../utils/ilpexUI';
import Icon from "react-native-vector-icons/MaterialIcons";

type ButtonProps = {
  name: string;
  onPress: () => void;
  buttonPressed: boolean;
};

const LoginButton = ({ name, onPress, buttonPressed }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#8116F9', '#C06FF1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}>
        {buttonPressed ? (
          <ActivityIndicator color="white" size={25} />
        ) : (
          <Text style={styles.buttonText}>{name}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginButton;
