import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import ilpex from "../utils/ilpexUI";
import CircularProgress from "./CircularProgress";
import { useNavigation } from "@react-navigation/native";

type BatchComponentProps = {batch_name : string, traineeNo : string, date : string,progress : number};

const BatchCard=({batch_name,traineeNo,date,progress} : BatchComponentProps)=>{

    const buttonPress = ()=>{
        const navigation : any= useNavigation();
        console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
        // console.log("Passing here ", batch_id);
        // navigation.navigate("BatchDetails", {
        //     batch_id: batch_id,
        //   });
        }

    const getMonthName=(month : number)=> {
        const months = [
          'Jan',
          'Feb',
          'March',
          'April',
          'May',
          'June',
          'July',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        return months[month]; // month numbers are zero-based, so subtract 1
      }
    const newDate = new Date(date);
    // Extract day, month, and year from the current date
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1; // Note: month is zero-based, so we add 1
    const year = newDate.getFullYear();
    const monthName = getMonthName(month);
    const formattedDate = `${monthName} ${day} ${year}`;

    return(
        <TouchableOpacity onPress={buttonPress}>
            <View style={styles.container}>
                <View style={styles.dataContainer}>
                    <Text style={styles.batch_name}>{batch_name}</Text>
                    <View style = {{
                        flexDirection : 'row'
                    }}>
                        <Text style={styles.traineeText}>Trainees</Text>
                        <View style={styles.traineeBox}>
                            <Text style={styles.traineeNo}>{traineeNo}</Text>
                        </View>
                    </View>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
                <View style={styles.circularProgress}>
                    <CircularProgress completeStatus={progress} color={ilpex.main}></CircularProgress>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:ilpex.card,
        borderRadius:20,
        height:105,
        width : 330,
        marginBottom : '8%',
        elevation:5,
        flexDirection:'row',
        alignSelf:'center'
    },
    dataContainer : {
        marginStart:10,
        width : 230
    },
    batch_name:{
        marginTop:10,
        marginStart:20,
        color : 'black',
        fontSize:21,
        fontFamily:ilpex.fontMedium
    },
    traineeText:{
        marginStart:20,
        fontSize:18,
        fontFamily:ilpex.fontMedium
    },
    traineeNo :{
        color:ilpex.secondary,
        fontSize:15,
        alignSelf:'center',
    },
    date : {
        marginStart:20,
        color:ilpex.secondary,
        fontSize:15,
        fontFamily:ilpex.fontMedium
    },
    traineeBox : {
        marginBottom:4,
        width:24,
        height:20,
        backgroundColor : ilpex.lightGrey,
        marginStart: 5,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:5,
        alignSelf :'center'
    },
    circularProgress : {
        marginTop:20
    }
})

export default BatchCard;