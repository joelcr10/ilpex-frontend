import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ilpex from "../../utils/ilpexUI";
import { getHook } from "../../network/getHook/getHook";
import { sendMail } from "../../network/EmailApiHook";
import { useRoute } from "@react-navigation/native";
import BackButton from "../../components/BackButton";
import IconButtonComponent from "../../components/IconButton";
import IncompleteTraineeCard from "../../components/IncompleteTraineeCard";
import ShimmerBatchIncompleteTraineeCard from "../../components/loading/ShimmerBatchIncompleteTraineeCard";
import ToastDemo from "../../components/ToastComponent";


const IncompleteTraineesScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const route: any = useRoute();
  const day = route.params.day;
  const batch = route.params.batch;

  const TraineesDisplay = () => {
    const [traineeList, setTraineeList] = useState<any>([]);

    const sendMailToTrainees = async () => {
      try {
        const { success } = await sendMail({
          incompleteTraineeList: traineeList.IncompleteTraineeList,
          day_number: day,
        });
        if (success) {
          <ToastDemo BgColor={"green"} message={"Mail Sent successfully"} textColor={"black"}></ToastDemo> 

          console.log("Mail Sent successfully......................................");
               }
      } catch (error) {
        console.error('Error while sending mail:', error);
      }
    };


    const onPress = () => {
      sendMailToTrainees();
    };

 useEffect(() => {
      const getDayCards = async () => {
        try {
          const { responseData } = await getHook(
            `/api/v2/batch/${batch}/pending/day/${day}`,
          );
          if (responseData) {
            
            setTraineeList(responseData);

          }


        } catch (error) {
          console.error('Error:', error);
        }
        finally{
          setLoading(true);
        }
      };

      getDayCards();


    }, []);

    return (
      <ScrollView>
        { (!isLoading)?(<View><ShimmerBatchIncompleteTraineeCard></ShimmerBatchIncompleteTraineeCard></View>):
        (<View>
 <IconButtonComponent name={"Send"} onPress={onPress} buttonPressed={false} icon={"mail"}></IconButtonComponent>
                            <Text style={styles.traineeText}>Trainees</Text>

               <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={traineeList.IncompleteTraineeList}
          renderItem={({ item }) => (
            <IncompleteTraineeCard
              trainee_name={item.user_name}
              batch_name={item.Batch} courses_left={item.incomplete_courses} total_number_of_courses={item.total_courses} course_list={[item.incomplete_courses_list]}  />
          )}
          keyExtractor={item => item.id}
        />


        </View>)}

      </ScrollView>

    );
  }

return (
    <View>
      <ScrollView>
        <View style={styles.pageContainer}>
          <BackButton color={"white"}></BackButton>
          <View style={styles.innerContainer}>
             <Text style={styles.incompleteText}>Incomplete</Text>

             <View style={styles.dayCard}><TraineesDisplay></TraineesDisplay></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );

}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#8518FF',
    height: '100%',
  },
  sendStyle:{
    color:'white',
  },
  textSendMail:{
    // flexDirection:'row',
  },
  dayCard:{
    paddingLeft: '-10%',
    paddingRight: '-10%',

  },
  box: {
    flexDirection:'row',
    height: 44,
    width: 84,
    backgroundColor: ilpex.main,
    borderRadius: 5,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixedButton: {
    // position: 'absolute',
    // bottom: 40,
    // right: 20,
    // zIndex: 10,
  },
  innerContainer: {
    backgroundColor: 'white',
    height: '100%',
    marginTop: '25%',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    paddingTop: '10%',
 
    flex: 1,
    minHeight:800
  },
  containerHeading: {
    color: 'white',
    textAlign: 'center',
    fontSize: 50,
    marginTop: 80,
    fontFamily: 'Poppins-SemiBold',
  },
  traineeText: {
    fontFamily: ilpex.fontRegular,
    color: ilpex.black,
    fontSize: 17,
    paddingLeft: '10%',
    paddingRight: '10%',

  },
  incompleteText: {
    fontFamily: ilpex.fontSemiBold,
    color: ilpex.black,
    fontSize: 27,
    textAlign: 'center',
    marginBottom: 5,
    paddingLeft: '10%',
    paddingRight: '10%',


  },
  shimmer: {
    height: 90,
    borderRadius: 17,
    width: 350,
    marginBottom: 25,
    elevation: 4,
  },
})


export default IncompleteTraineesScreen;