import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Chevron = () => {
    return (
        <View>
            <Image 
            style = {styles.chevron}
            source = {require('../../assets/icons/chevron.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    chevron : {
        width : 25,
        height : 25
    }
})

export default Chevron;