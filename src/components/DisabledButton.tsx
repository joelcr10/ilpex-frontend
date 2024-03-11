import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons";
import ilpex from "../utils/ilpexUI";
import React from "react";

type ButtonProps = {name:string};

const DisabledButton=({name}:ButtonProps)=>{
    return(<View>
        <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>{name}</Text>
            </TouchableOpacity> 
        </View>)

}

const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor:'#83A4BC',
      borderRadius: 15,
      paddingHorizontal:20,
      paddingVertical:5,
      marginHorizontal:10,
    },
    buttonText: {
      color:ilpex.white,
      textAlign: 'center',
      fontFamily:ilpex.fontSemiBold,
      fontSize: 14,
    },
  });

  export default DisabledButton;
  