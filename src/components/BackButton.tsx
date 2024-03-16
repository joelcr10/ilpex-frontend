import React from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"

type PropsType = {color : string};
const BackButton = (props : PropsType) => {
   
    const navigation = useNavigation();
    const {color} = props;
    if(color === 'white')
        return(
            <View style = {styles.backButtonContainer}>
                <TouchableOpacity onPress = {navigation.goBack}>
                    <Image 
                    style = {styles.backButton}
                    source = {require('../../assets/icons/backWhite.png')}
                    />
                </TouchableOpacity>
            </View>
        )
    else
        return(
            <View style = {styles.backButtonContainer}>
                <TouchableOpacity onPress = {navigation.goBack}>
                    <Image 
                    style = {styles.backButton}
                    source = {require('../../assets/icons/backBlack.png')}
                    />
                </TouchableOpacity>
            </View>
    );
}

const styles = StyleSheet.create({
    backButton : {
        width : 20,
        height : 20,
    },
    backButtonContainer : {
        zIndex : 5,
        position : 'absolute',
        top : 35,
        left : 25,
        width : 25,
        height : 25,
    }
})

export default BackButton;