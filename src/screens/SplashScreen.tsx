import { Dimensions, ImageBackground, StyleSheet, Text, View } from "react-native"
import ilpex from "../utils/ilpexUI";
import LinearGradient from "react-native-linear-gradient";

const SpalshScreen=()=>{
    return(
        <LinearGradient colors={['#C318FF', '#9A50EB']} style={{flex:1}}>
        <View style={styles.container}>
            <View>
                    <Text style={styles.text}>ILPex</Text>
            </View>  
        </View>
        </LinearGradient>
    )
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
   text:{
    fontSize:56,
    textAlign:'center',
    color:ilpex.white,
    fontFamily:ilpex.fontSemiBold,
   },
   bg:{
    // flex:1,
    width:screenWidth,
    height:screenHeight,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    
   },
   container:{
    // flex:1,
    width:screenWidth,
    height:screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
   }
})

export default SpalshScreen;