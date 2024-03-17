import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import ilpex from "../utils/ilpexUI";
import Icon from 'react-native-vector-icons/FontAwesome';
import CircularProgress from "./CircularProgress";
import { assets } from "../../react-native.config";

type BatchComponentProps = {assessment_name : string,onPressButton:()=>void};

const AssesmentListCard=(props: BatchComponentProps)=>{
    const {assessment_name,onPressButton} = props;
    console.log("asseement list card: ",assessment_name);
    return(
        <TouchableOpacity onPress={onPressButton} activeOpacity={1}>
            <View style={styles.container}>
                <View style={{
                    marginStart:10,
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center'
                }}>
                    <Icon name="edit" size={28}/>
                    <Text style={styles.batchName}>{assessment_name}</Text>
                    
                    </View>
                    
                </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container:{
        height:50,
        backgroundColor:ilpex.card,
        borderRadius:20,
        shadowColor:ilpex.black,
        width : 330,
        marginBottom : '7%',
        shadowOpacity: 0.4,
        elevation: 5,
        flexDirection:'row',
        alignSelf:'center'
    },
    batchName:{
        marginTop:10,
        marginStart:20,
        color : 'black',
        fontSize:18,
        fontFamily:ilpex.fontMedium
    },
    
})

export default AssesmentListCard;