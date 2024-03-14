import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ilpex from '../utils/ilpexUI';


type Props = {
  onChangeText: () => void;
  value:string
};


const SearchComponent= ({onChangeText,value}:Props) => {


 
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search here"
        value={value}
        onChangeText={onChangeText}
      />
      <Icon name="search" size={20} color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor:ilpex.searchBg,
    marginHorizontal:20,
    borderRadius:10,
    margin:20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
});

export default SearchComponent;
