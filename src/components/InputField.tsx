import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import ilpex from '../utils/ilpexUI'

type Props = {
  label: string;
  keyboardType: string;
  isPassword: boolean;
  value: string;
  onChangeText: (text: string) => void;
};

const InputField: React.FC<Props> = ({label, isPassword, value, onChangeText}) => {
  const [isVisible, setIsVisible] = useState(!isPassword);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={isPassword && !isVisible}
          value={value}
          onChangeText={onChangeText}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsVisible(!isVisible)}
          >
            <Image
              source={isVisible ? require('../../assets/icons/view.png') : require('../../assets/icons/hidden.png')}
              style={styles.eyeIconImage}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    color: '#868686',
    fontWeight:'500',
    fontFamily:ilpex.fontMedium,

    alignSelf: 'flex-start',
    marginLeft: 50,
    marginBottom: 5,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
    fontSize: 17,
    color: '#000000',
    fontWeight: '500',
  },
  eyeIcon: {
    padding: 10,
    marginLeft: 10,
  },
  eyeIconImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    
  },
});

export default InputField;
