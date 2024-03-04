import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons";
import ilpex from "../utils/ilpexUI";

type ButtonProps = {name:string ;
  onPress: () => void;
};

const SmallButton=({name,onPress}:ButtonProps)=>{
    return(<View>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
              <Text style={styles.buttonText}>{name}</Text>
            </TouchableOpacity> 
        </View>)

}

const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor:ilpex.primary,
      borderRadius: 15,
      paddingHorizontal:30,
      paddingVertical:5,
      margin: 30,
      marginHorizontal:80,
    },
    buttonText: {
      color:ilpex.white,
      textAlign: 'center',
      fontFamily:'Poppins-SemiBold',
      fontSize: 14,
      fontWeight:"600",
    },
  });

  export default SmallButton;
  