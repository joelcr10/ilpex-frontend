import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import ilpex from "../../utils/ilpexUI";
import AssessmentCard from "../../components/AssessmentCard";
import ThreeDots from "../../components/ThreeDots";
import { useEffect, useState } from "react";
import { getHook } from "../../network/getHook/getHook";
import DayWiseProgressBarProgress from "../../components/DayWiseProgressBarProgress";
import React from "react";
import { getItem } from "../../utils/utils";
import Constants from "../../utils/Constants";

const TraineeHomeScreen = () => {

    return ( 
        <ScrollView>
            <View style={styles.homeContainer}>
            <ThreeDots color='white'></ThreeDots>
                <View style={styles.topPart}>
                   
                    <View>
                        <Text style={styles.whiteText}>Welcome back</Text>
                        <Text style={styles.textSize}>Elena Maria</Text> 
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View>
                        <Text style={styles.heading}>Assessment</Text>
                        <AssessmentDisplay></AssessmentDisplay>
                    </View>

                    <View>
                        <Text style={styles.heading}>Learning Days</Text>
                        <DaysDisplay></DaysDisplay>
                    </View>
                </View> 
            </View>
        </ScrollView>
     );
}
const DaysDisplay =()=>{
    const [dayCardList, setDayCardList] = useState<any[]>([]);

    useEffect(() => {
      const getDayCards= async () => {
        try {
          const {responseData} = await getHook(
            'api/v3/trainee/7/days',
          );
          setDayCardList(responseData);
        
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getDayCards();
    }, []);
    return (
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            data={dayCardList.data}
            renderItem={({ item }) => <DayWiseProgressBarProgress dayNumber={item.day_number} percentage={item.progress} />}
            keyExtractor={item => item.id}
          />
        </View>
      );
}

const AssessmentDisplay =()=>{
    const [assessmentList, setAssessmentList] = useState<any[]>([]);

    useEffect(() => {
      const getAssessments= async () => {
        try {
          const {responseData} = await getHook(
            'api/v3/9/assessment',
          );
          setAssessmentList(responseData);
        
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getAssessments();
    }, []);
    return (
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            data={assessmentList.assessments}
            renderItem={({ item }) => <AssessmentCard assessment_id={item.assessment_id} batchName={assessmentList.Batch} assessmentName={item.assessment_name} dueDate={item.end_date} status={true}/>}
            keyExtractor={item => item.id}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    homeContainer:{
        backgroundColor:'#8518FF',
        flex: 1
    },

    topPart:{
        margin: 30,
        display: 'flex',
        flexDirection: 'row'
    },

    whiteText:{
        color: ilpex.white,
        fontSize: 20,
        fontFamily:ilpex.fontMedium,

    },

    textSize:{
        color: ilpex.white,
        fontFamily:ilpex.fontSemiBold,
        fontSize: 30,
        marginTop:-8
    },

    contentContainer:{
        height: '100%',
        backgroundColor: ilpex.white,
        borderTopEndRadius: 40,
        borderTopLeftRadius: 40,
        marginTop: 10,
        padding: 20
    },

    heading:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        margin: 10

    }
})
 
export default TraineeHomeScreen;