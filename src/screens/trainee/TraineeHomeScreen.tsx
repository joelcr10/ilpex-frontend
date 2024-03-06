import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import ilpex from "../../utils/ilpexUI";
import AssessmentCard from "../../components/AssessmentCard";
import ThreeDots from "../../components/ThreeDots";
import { useEffect, useState } from "react";
import { getHook } from "../../network/getHook/getHook";
import DayWiseProgressBarProgress from "../../components/DayWiseProgressBarProgress";
import React from "react";
import Daywise from "../../components/DaywiseCard";
import { useSelector } from "react-redux";

const TraineeHomeScreen = () => {
    return ( 
        <ScrollView>
            <View style={styles.homeContainer}>
            <ThreeDots color='white'></ThreeDots>
                <View style={styles.topPart}>
                   
                    <View>
                        <Text style={styles.whiteText}>Welcome back</Text>
                        <UserName></UserName>
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
const UserName =()=>{

    const [userName, setUserName] = useState<any[]>([]);
    const user_id = useSelector((state: any) => state.userDetailsReducer.user_id);


    useEffect(() => {
      const getUserName= async () => {
        try {
          const {responseData} = await getHook(
            `/api/v3/profile/${user_id}`,
          );
          console.log(responseData);
          setUserName(responseData.profileDetails.user.user_name);
          
        
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getUserName();
    }, []);
    return (
      <Text style={styles.textSize}>{userName}</Text> 

    );
}
const DaysDisplay =()=>{
  const user_id = useSelector((state: any) => state.userDetailsReducer.user_id);

    const [dayCardList, setDayCardList] = useState<any[]>([]);

    useEffect(() => {
      const getDayCards= async () => {
        try {
          const {responseData} = await getHook(
            `/api/v3/trainee/${user_id}/days`,
          );
          console.log(responseData);
          setDayCardList(responseData.data);
          
        
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
            scrollEnabled={false}
            horizontal={false}
            data={dayCardList}
            renderItem={({ item }) => 
            <Daywise Day={item.day_number} progressValue={item.progress} duration={item.duration} status={item.status} />
          }
            keyExtractor={item => item.day}
          />
        </View>
      );
}

const AssessmentDisplay =()=>{
    const [assessmentList, setAssessmentList] = useState<any>([]);
    const user_id = useSelector((state: any) => state.userDetailsReducer.user_id);


    useEffect(() => {
      const getAssessments= async () => {
        try {
          const {responseData} = await getHook(
            `/api/v3/${user_id}/assessment`,
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
        // height: '100%',
        backgroundColor: ilpex.white,
        borderTopEndRadius: 40,
        borderTopLeftRadius: 40,
        marginTop: 10,
        padding: 20,
        flex:1
    },

    heading:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        margin: 10

    }
})
 
export default TraineeHomeScreen;