import React from "react";
import {StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import ilpex from "../utils/ilpexUI";
import  Icon  from "react-native-vector-icons/FontAwesome";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

type CreateButtonProps= {onPress:()=>any}
const CreateButton = ({onPress} : CreateButtonProps)=>{
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.box}>
                    <Icon name="plus" color={ilpex.white} size={30}></Icon>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height : 58,
        width : 58
    },
    box:{
        height:54,
        width:54,
        backgroundColor:ilpex.main,
        borderRadius:5,
        zIndex:10,
        elevation:5,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default CreateButton;