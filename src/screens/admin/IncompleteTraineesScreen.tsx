import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TraineeCard from "../../components/TraineeCard";
import TraineeCardShimmer from "../../components/loading/TraineeCardShimmer";
import ilpex from "../../utils/ilpexUI";
import { useSelector } from "react-redux";
import { getHook } from "../../network/getHook/getHook";
import Icon from "react-native-vector-icons/FontAwesome";
import { sendMail } from "../../network/EmailApiHook";
import { useRoute } from "@react-navigation/native";
import BackButton from "../../components/BackButton";


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
        { (!isLoading)?(<View><TraineeCardShimmer></TraineeCardShimmer></View>):
        (<View>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={traineeList.IncompleteTraineeList}
          renderItem={({ item }) => (
            <TraineeCard
              traineeName={item.user_name}
              batchName={item.Batch} traineeId={item.trainee_id} userId={item.user_id} />
          )}
          keyExtractor={item => item.id}
        />

        <TouchableOpacity onPress={onPress} style={styles.fixedButton}>
          <View style={styles.box}>
            <Icon name="send" color={ilpex.white} size={30}></Icon>
          </View>
        </TouchableOpacity>
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
             <Text style={styles.traineeText}>Trainees</Text>
             <View><TraineesDisplay></TraineesDisplay></View>
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
  box: {
    height: 54,
    width: 54,
    backgroundColor: ilpex.main,
    borderRadius: 5,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixedButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    zIndex: 10,
  },
  innerContainer: {
    backgroundColor: 'white',
    height: '100%',
    marginTop: '25%',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    paddingTop: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
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

  },
  incompleteText: {
    fontFamily: ilpex.fontSemiBold,
    color: ilpex.black,
    fontSize: 27,
    textAlign: 'center',
    marginBottom: 5,


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