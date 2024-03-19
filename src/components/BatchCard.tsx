import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import ilpex from "../utils/ilpexUI";
import { useNavigation } from "@react-navigation/native";

type BatchComponentProps = {batch_name : string, traineeNo : string, date : string,totalDays : string,progressDays : any,onPressFunc:()=>void};

const BatchCard=({batch_name,traineeNo,date,totalDays,progressDays,onPressFunc} : BatchComponentProps)=>{
    const navigation : any= useNavigation();
    const buttonPress = (batch_id:number)=>{
        navigation.navigate("BatchDetails", {
            batch_id: batch_id,
          });
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
        return months[month]; 
      }
    const newDate = new Date(date);
    // Extract day, month, and year from the current date
    const day = newDate.getDate();
    const month = newDate.getMonth(); 
    const year = newDate.getFullYear();
    const monthName = getMonthName(month);
    const formattedDate = `${monthName} ${day} ${year}`;

    return(
        <TouchableOpacity onPress={onPressFunc} activeOpacity={1}>
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
                <View style={styles.dayContainer}>
                    <View style={styles.dayTextContainer}>
                    <Text style={styles.dayText}>Day</Text>
                    <Text style={styles.dayText}>{progressDays}/{totalDays}</Text>
                    {/* <CircularProgress completeStatus={progress} color={ilpex.main}></CircularProgress> */}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:ilpex.card,
        borderRadius:20,
        paddingBottom : '4%',
        marginBottom : '8%',
        elevation:5,
        flexDirection:'row',
        alignSelf:'center',
        shadowColor: ilpex.black,
    },
    dataContainer : {
        marginStart:10,
        width : '75%'
    },
    batch_name:{
        marginTop:10,
        marginStart:20,
        color : 'black',
        fontSize:19,
        fontFamily:ilpex.fontMedium
    },
    traineeText:{
        marginStart:20,
        fontSize:15,
        fontFamily:ilpex.fontMedium,
        color:ilpex.inactive
    },
    traineeNo :{
        color:ilpex.secondary,
        fontSize:14,
        alignSelf:'center',
    },
    date : {
        marginStart:20,
        color:ilpex.secondary,
        fontSize:13,
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
    dayContainer:{
        marginTop:'5%',
        marginEnd : 30,
        backgroundColor:ilpex.active,
        borderRadius:35,
        height:70,
        width : 70,
        alignContent:'center',
        alignItems:'center'
    },
    dayTextContainer : {
        marginTop:'14%',
    },
    dayText : {
        color : ilpex.white,
        fontFamily:ilpex.fontSemiBold,
        textAlign:'center',
        fontSize:14,
    }
})

export default BatchCard;