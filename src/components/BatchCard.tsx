import React from "react";
import { FlatList, SafeAreaView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import ilpex from "../utils/ilpexUI";
// import CircularProgress from "./CircularProgress";

type BatchComponentProps = {batchName : string, traineeNo : string, date : string,progress : number};

const BatchCard=({batchName,traineeNo,date,progress} : BatchComponentProps)=>{
    return(
        <TouchableOpacity>
        <View style={styles.container}>
            <View style={{
                marginStart:10
            }}>
            <Text style={styles.batchName}>{batchName}</Text>
            <View style = {{
                flexDirection : 'row'
            }}>
            <Text style={styles.traineeText}>Trainees</Text>
            <View style={styles.traineeBox}>
                <Text style={styles.traineeNo}>{traineeNo}</Text>
            </View>
            </View>
            <Text style={styles.date}>{date}</Text>
            </View>
            <View style={styles.circularProgress}>
                {/* <CircularProgress progress={progress}></CircularProgress> */}
            </View>
        </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FAFAFA',
        borderRadius:10,
        // width:'80%',
        height:95,
        width : 300,
        marginBottom : '8%',
        // margin:'10%',
        elevation:5,
        shadowColor: '#000',
        shadowOffset:{ width: 0, height: 0 },
        flexDirection:'row',
        alignSelf:'center'
    },
    batchName:{
        margin:10,
        marginBottom:1,
        color : 'black',
        fontSize:18,
        fontFamily:ilpex.fontMedium
    },
    traineeText:{
        marginLeft:10,
        fontSize:15,
        fontFamily:ilpex.fontMedium
    },
    traineeNo :{
        color:'#8F00FF',
        fontSize:11,
    },
    date : {
        marginLeft:10,
        color:ilpex.secondary,
        fontSize:14,
        fontFamily:ilpex.fontMedium
    },
    traineeBox : {
        width:23.13,
        height:17.33,
        backgroundColor : '#D9D9D9',
        marginStart: 5,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:5,
        alignSelf :'center'
    },
    circularProgress : {
        marginStart:40,
        marginTop:10
    }
})

export default BatchCard;