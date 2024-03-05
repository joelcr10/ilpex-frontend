import React from "react"
import { Image, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

const BackButton = () => {
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress = {navigation.goBack}>
            <Image 
            style = {styles.backButton}
            source = {require('../../assets/icons/back.png')}
            />
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backButton : {
        width : 25,
        height : 25,
        position : 'absolute',
        top : 30,
        left : 25,
    },
})

export default BackButton;