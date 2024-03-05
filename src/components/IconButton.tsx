import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons";
import ilpex from "../utils/ilpexUI";
import React from "react";

type ButtonProps = {name:string ;
  onPress: () => void;
  buttonPressed:boolean,
  icon:string
};

const IconButtonComponent=({name,onPress,buttonPressed,icon}:ButtonProps)=>{
    return(<View>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
              {buttonPressed ? (
              <ActivityIndicator color="white" size={25}/>
            ) : (
                <View style={styles.label}>
                    <Icon name={icon} style={styles.icon}/>
                    <Text style={styles.buttonText}>{name}</Text>
                </View>
                
            )}
              
            </TouchableOpacity> 
        </View>)

}

const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor:ilpex.main,
      borderRadius: 15,
      padding: 10,
      margin: 30,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5, 
      marginHorizontal:80,
    },
    buttonText: {
      color:ilpex.white,
      textAlign: 'center',
      fontFamily:ilpex.fontRegular,
      fontSize: 24,
      marginHorizontal:20,
      textAlignVertical:'center',
    },
    label:{
        flexDirection:'row',
    },
    icon:{
        color:ilpex.white,
        fontSize:30,
        marginHorizontal:20,
        textAlignVertical:'center',
    }
  });

  export default IconButtonComponent;
  