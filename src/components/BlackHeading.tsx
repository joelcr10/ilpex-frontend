import React from "react";
import { Text,View,StyleSheet } from "react-native";
import ilpex from "../utils/ilpexUI";


type PropsType = {heading:string}


const BlackHeading = (props:PropsType) => {


 const {heading} = props;

return(
    <View style= {styles.background}>
        <Text style={styles.headingStyle}>{heading}</Text>
     </View>
)

}


const styles = StyleSheet.create({


    background:{
      position:'absolute'
    },
    headingStyle: {
      position:'relative',
      fontFamily: ilpex.fontRegular,
      justifyContent: 'center',
      color: ilpex.black,
      fontWeight: 'bold',
      fontSize: 40,
      textAlign: 'center',
      marginTop: 160,
      marginBottom:50,
      left:140,
    },
  });


  export default BlackHeading;