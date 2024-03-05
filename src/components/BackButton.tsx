import React from "react"
import { Image, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

type PropsType = {color : string};
const BackButton = (props : PropsType) => {
   
    const navigation = useNavigation();
    const {color} = props;
    if(color === 'white')
        return(
            <TouchableOpacity onPress = {navigation.goBack}>
                <Image 
                style = {styles.backButton}
                source = {require('../../assets/icons/backWhite.png')}
                />
        </TouchableOpacity>
        )
    else
        return(
            <TouchableOpacity onPress = {navigation.goBack}>
                <Image 
                style = {styles.backButton}
                source = {require('../../assets/icons/backBlack.png')}
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