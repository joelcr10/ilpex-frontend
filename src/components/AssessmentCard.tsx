import React from "react";
import { StyleSheet, Text,View } from "react-native";
// import SmallButtonComponent from "./SmallButton";
import { useNavigation } from "@react-navigation/native";
import ilpex from "../utils/ilpexUI";

type propsType = {assessment_id: number,assessmentName: string, batchName: string, dueDate: string, status: boolean}

type MonthsType = {
    [key: number]: string;
};

const months: MonthsType = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
};

const formatDate = (end_date: string): string =>{
    const justDate = end_date.split("T")[0].split("-");
    const day = justDate[2];
    const year = justDate[0];
    const month = months[parseInt(justDate[1])]; //find the month from the months object
    return day+" "+month+" "+year;
}

const AssessmentCard = (props: propsType) =>{
    const navigation = useNavigation();

    const {assessment_id,assessmentName,batchName,dueDate,status} = props;

    // const goToAssessment = () =>{
    //     console.log('assessment buttom')
    //     navigation.navigate("Assessment",{assessment_id:assessment_id, assessment_name: assessmentName});
    // }


    return(
        <View style={styles.assessmentCard}>
            <Text style={styles.mainText}>{assessmentName}</Text>
            <Text style={styles.subText}>{batchName}</Text>
            <View style={styles.bottomContainer}>
                <Text style={styles.date}>{formatDate(dueDate)}</Text>
               
                {/* <SmallButtonComponent buttonText="Take Test" apiFunction={goToAssessment}/> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    assessmentCard:{
        backgroundColor: 'white',
        borderRadius: 15,
        elevation: 4,
        padding: 20,
        marginTop: 10,
        margin: 10

    },

    mainText:{
        fontSize: 20,
        fontFamily: ilpex.fontMedium,
        color: 'black'

    },

    subText:{
        fontSize: 18,
        marginTop: 5
    },

    bottomContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },

    date:{
        color: '#8F00FF',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15
    }
})


export default AssessmentCard;