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
      paddingHorizontal:6,
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

  export default SmallButton;
  