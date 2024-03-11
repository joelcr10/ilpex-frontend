import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons";
import ilpex from "../utils/ilpexUI";
import React from "react";

type ButtonProps = {name:string};

const DisabledBigButton=({name}:ButtonProps)=>{
    return(<View>
        <TouchableOpacity style={styles.buttonContainer} disabled={true}>
              <Text style={styles.buttonText}>{name}</Text>
            </TouchableOpacity>
        </View>)

}

const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor: '#9C82BA',
      borderRadius: 15,
      padding: 15,
      margin: 30,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5, 
      marginHorizontal:80,
      width: 250,
    },
    buttonText: {
      color: ilpex.white,
      textAlign: 'center',
      fontFamily:'Poppins-SemiBold',
      fontSize: 20,
      fontWeight:"600",
    },
  });

  export default DisabledBigButton;
  