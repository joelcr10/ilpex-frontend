import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ilpex from "../utils/ilpexUI";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";


type PropsType = {traineeName : string,user_id:number};

const TraineeNameCard = ({traineeName,user_id}:PropsType )=> {

    const navigation: any = useNavigation();
    const goToTrainee = (id: number) =>{
        navigation.navigate("ManageTrainee",{user_id});
  }


    return(
        <View style={styles.container}>
          <Text style={styles.nameText}>{traineeName}</Text>
            <TouchableOpacity onPress={()=>goToTrainee(user_id)}>
                <Icon name='settings' color={ilpex.white} size={28}/>
            </TouchableOpacity>
          
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:10,
        backgroundColor:ilpex.traineeList,
        paddingHorizontal:50,
        paddingVertical:10,
        marginHorizontal:10,
        marginVertical:8,
    },
    nameText:{
        textAlign:'left',
        fontFamily:ilpex.fontSemiBold,
        color:ilpex.white,
        fontSize:18,
    }
})

export default TraineeNameCard;