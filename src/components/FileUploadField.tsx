import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import ilpex from '../utils/ilpexUI';
import Icon from 'react-native-vector-icons/MaterialIcons';


type FileUploadProps = {
  onSelect: () => void;
  selectedFile:string
};
const FileUploadField = ({onSelect,selectedFile}:FileUploadProps) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={onSelect}>
        <View style={{flexDirection:'row'}}>
        <Icon name='upload-file' color={ilpex.darkGrey} size={28}></Icon>
            <Text style={styles.buttonText} ellipsizeMode="tail">
                {selectedFile ?`${selectedFile[0].name.slice(0,10)+'...'}` : 'Choose File'}
            </Text> 
        </View>
             
      </TouchableOpacity>
      <Text style={styles.text}>Provide a file in the .csv format.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'transparent',
        borderRadius: 15,
        padding: 15,
        borderColor:ilpex.lightGrey,
        borderWidth:1,
        marginHorizontal:80,
      },
      buttonText: {
        color: '#000000',
        textAlign: 'center',
        fontFamily:ilpex.fontRegular,
        fontSize: 16,
        marginLeft:20,
      },
      text:{
        textAlign:'center',
        fontSize:18,
        fontFamily:ilpex.fontLightItalic,
      },
      container:{
        margin:20,
      }
});

export default FileUploadField;
