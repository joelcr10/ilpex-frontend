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
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  headingStyle: {
      fontFamily:ilpex.fontRegular,
      fontWeight:'700',
      fontSize:40,
      color:ilpex.black,
      // top:200
    },
  });


  export default BlackHeading;