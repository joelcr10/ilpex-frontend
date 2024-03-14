import React from "react";
import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, DrawerActions } from "@react-navigation/native";

const DrawerNavigationHamburger = () => {

    const navigation = useNavigation();
      
    const toggleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    };

    return(
        <TouchableOpacity onPress = {toggleDrawer}>
            <Image 
            style = {styles.hamburgerStyle}
            source = {require('../../assets/icons/hamburger-white.png')}
            >
            </Image>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    hamburgerStyle : {
        position : 'absolute',
        top : 20,
        left : 20,
        width : 40,
        height : 40
    }
})

export default DrawerNavigationHamburger;