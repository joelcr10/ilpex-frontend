import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TraineeCard from "../../components/TraineeCard";
import TraineeCardShimmer from "../../components/loading/TraineeCardShimmer";
import ilpex from "../../utils/ilpexUI";
import { useSelector } from "react-redux";
import { getHook } from "../../network/getHook/getHook";
import IconButtonComponent from "../../components/IconButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { sendMail } from "../../network/EmailApiHook";

interface Trainee {
  trainee_id: number;
  Batch: string;
  user_name: string;
  email: string;
};



const IncompleteTraineesScreen = () => {
  const [isLoading, setLoading] = useState(true);


  const TraineesDisplay = () => {
    const trainee_id = useSelector((state: any) => state.userDetailsReducer.trainee_id);
    const [traineeList, setTraineeList] = useState<Trainee[]>([]);

    const sendMailToTrainees = async () => {
      try {
        const { success } = await sendMail({
          incompleteTraineeList: traineeList,
          day_number: 1,
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
            `/api/v2/batch/1/pending/day/1`,
          );
          if (responseData) {
            setLoading(true);
            setTraineeList(responseData);

          }


        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      getDayCards();
    

    }, []);
    return (
      <ScrollView>

        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={traineeList.IncompleteTraineeList}
          renderItem={({ item }) => (
            <TraineeCard
              traineeName={item.user_name}
              batchName={item.Batch} traineeId={0} userId={0} />
          )}
          keyExtractor={item => item.id}
        />

        <TouchableOpacity onPress={onPress} style={styles.fixedButton}>
          <View style={styles.box}>
            <Icon name="send" color={ilpex.white} size={30}></Icon>
          </View>
        </TouchableOpacity>


      </ScrollView>

    );
  }





  return (
    <View>
      <ScrollView>
        <View style={styles.pageContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.incompleteText}>Incomplete</Text>
            <Text style={styles.traineeText}>Trainees</Text>

            {!isLoading ? (
              <TraineeCardShimmer />
            ) : (<View><TraineesDisplay></TraineesDisplay>

            </View>

            )}



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
    // height:54,
    // width:54,
    // backgroundColor:ilpex.main,
    // borderRadius:5,
    // zIndex:10,
    // elevation:5,
    // alignItems:'center',
    // justifyContent:'center',
    // marginLeft:280,
    // marginBottom:5,
    // position:'absolute',
    // bottom:100,
  },
  fixedButton: {
    position: 'absolute',
    bottom: 40, // Adjust the bottom spacing as needed
    right: 20, // Adjust the right spacing as needed
    zIndex: 10, // Ensure the button appears above other elements
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