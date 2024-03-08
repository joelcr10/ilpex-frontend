import { Dimensions, ImageBackground, StyleSheet, Text, View } from "react-native"
import ilpex from "../utils/ilpexUI";

const SpalshScreen=()=>{
    return(
        <View style={styles.container}>
           <ImageBackground style={styles.bg} source={require('../../assets/images/splash.png')}>
            <View>
                    <Text style={styles.text}>ILPex</Text>
            </View>  
           </ImageBackground>
        </View>
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
   }
})

export default SpalshScreen;