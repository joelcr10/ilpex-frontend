import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons";
import ilpex from "../utils/ilpexUI";
import React from "react";

type ButtonProps = {
  onPress: () => void;
  icon:string
};

const IconOnlyButton=({onPress,icon}:ButtonProps)=>{
    return(<View>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
                <View style={styles.label}>
                    <Icon name={icon} style={styles.icon}/>
                </View>            
            </TouchableOpacity> 
        </View>)

}

const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor:ilpex.primary,
      borderRadius: 30,
      paddingVertical:'10%',
      width:'100%',
      paddingStart:'5%',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5, 
      zIndex:5,
    },
    buttonText: {
      color:ilpex.white,
      textAlign: 'center',
      fontFamily:ilpex.fontRegular,
      fontSize: 24,
      marginHorizontal:1,
      textAlignVertical:'center',
    },
    label:{
        flexDirection:'row',
        alignSelf:'center',
    },
    icon:{
        color:ilpex.white,
        fontSize:20,
        marginRight:10,
        textAlignVertical:'center',
        alignSelf:'center'
    }
  });

  export default IconOnlyButton;
  