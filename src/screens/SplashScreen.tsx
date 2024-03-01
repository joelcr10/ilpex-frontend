import React from "react";
import { View, Text, StyleSheet } from "react-native";


const SplashScreen = () =>{
    return(
        <View style={styles.splashContainer}>
            <Text style={styles.splashText}>ILPex</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    splashContainer:{
        height: '100%',
        backgroundColor: '#8518ff',
        justifyContent: 'center',
        alignItems: 'center'
    },

    splashText:{
        fontWeight: 'bold',
        fontSize: 30,
        color: '#ffff'
    }
})


export default SplashScreen;