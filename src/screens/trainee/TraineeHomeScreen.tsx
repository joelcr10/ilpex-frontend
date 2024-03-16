import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import ilpex from "../../utils/ilpexUI";
import AssessmentCard from "../../components/AssessmentCard";
import ThreeDots from "../../components/ThreeDots";
import { useEffect, useState } from "react";
import { getHook } from "../../network/getHook/getHook";
import React from "react"; 
import Daywise from "../../components/DaywiseCard";
import { useDispatch, useSelector } from "react-redux";
import { percipioReportAPI } from "./percipioReportAPI";
import ShimmerDaywise from "../../components/loading/DayWiseCardShimmer";
import ShimmerAssessmentCard from "../../components/loading/AssessmentCardShimmer";
import { userNames } from "../../context/userNameSlice";

const TraineeHomeScreen = () => {
  const user_id = useSelector((state: any) => state.userDetailsReducer.user_id);


  useEffect(() => {
    const percipioReport = async () => {
      const { success, responseData } = await percipioReportAPI(Number(user_id));
      if (success) {
        console.log("percipio learning activity updated");
      }
    }

    percipioReport();
  }, []);

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
            <Text style={styles.heading}>Assessments</Text>

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
const UserName = () => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState<any[]>([]);
  const user_id = useSelector((state: any) => state.userDetailsReducer.user_id);
  useEffect(() => {
    const getUserName = async () => {
      try {
        const { responseData } = await getHook(
          `/api/v3/profile/${user_id}`,
        );

        setUserName(responseData.data.user_name);
        dispatch(userNames(responseData.data.user_name));


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
const DaysDisplay = () => {
  const trainee_id = useSelector((state: any) => state.userDetailsReducer.trainee_id);
  const [dayCardList, setDayCardList] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);


    useEffect(() => {
      const getDayCards= async () => {
        try {
          const {responseData} = await getHook(
            `/api/v3/trainee/${trainee_id}/days`,
          );
          if(responseData)
          {
            setLoading(true);
          }
          setDayCardList(responseData.data);
          
        
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getDayCards();
    }, []);
    return (
      <ScrollView>
        {!(isLoading)?
        (<View>
          <ShimmerDaywise></ShimmerDaywise>
          <ShimmerDaywise></ShimmerDaywise>
          <ShimmerDaywise></ShimmerDaywise>
          <ShimmerDaywise></ShimmerDaywise>

        </View>) :
        (<View>
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
        </View>)
      }
    </ScrollView>

  );
}

const AssessmentDisplay = () => {
  const [assessmentList, setAssessmentList] = useState<any>([]);
  const user_id = useSelector((state: any) => state.userDetailsReducer.user_id);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getAssessments = async () => {
      try {
        const { responseData } = await getHook(
          `/api/v3/${user_id}/assessment`,
        );
        if (responseData) {
          setLoading(true);
        }
        setAssessmentList(responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getAssessments();
  }, []);

  return (
    <View>
      {!isLoading ? (
        <View>
          <ShimmerAssessmentCard />
          <ShimmerAssessmentCard />
        </View>
      ) : (
        <View>
          {!assessmentList || !assessmentList.assessments || assessmentList.assessments.length === 0 ? (
            <Text style={styles.noAssessmentsText}>You have no assessments</Text>
          ) : (
            <FlatList
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              horizontal={false}
              data={assessmentList.assessments}
              renderItem={({ item }) => (
                <AssessmentCard
                  assessment_id={item.assessment_id}
                  batchName={assessmentList.Batch}
                  assessmentName={item.assessment_name}
                  dueDate={item.end_date}
                  status={true}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: '#8518FF',
    flex: 1
  },

  topPart: {
    margin: 30,
    display: 'flex',
    flexDirection: 'row'
  },
  noAssessmentsText:{
    color:'black',
    textAlign:'center',
  },

  whiteText: {
    marginTop: 10,
    color: ilpex.white,
    fontSize: 20,
    fontFamily: ilpex.fontMedium,

  },
  textSize: {
    color: ilpex.white,
    fontFamily: ilpex.fontSemiBold,
    fontSize: 28,
    marginTop: -8
  },

  contentContainer: {
    backgroundColor: ilpex.white,
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: 10,
    padding: 20,
    flex: 1
  },

  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    margin: 10

  }
})

export default TraineeHomeScreen;