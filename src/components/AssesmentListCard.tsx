import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import ilpex from "../utils/ilpexUI";
import CircularProgress from "./CircularProgress";
import { assets } from "../../react-native.config";

type BatchComponentProps = {assesmentName : string};

const AssesmentListCard=(props: any)=>{
    const {assessment_name} = props;
    console.log("asseement list card: ",assessment_name);
    return(
        <TouchableOpacity >
            <View style={styles.container}>
                <View style={{
                    marginStart:10
                }}>
                    <Text style={styles.batchName}>{assessment_name}</Text>
                    
                    </View>
                    
                </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:ilpex.card,
        borderRadius:20,
        height:50,
        width : 330,
        marginBottom : '8%',
        elevation:5,
        flexDirection:'row',
        alignSelf:'center'
    },
    batchName:{
        marginTop:10,
        marginStart:20,
        color : 'black',
        fontSize:21,
        fontFamily:ilpex.fontMedium
    },
    
})

export default AssesmentListCard;