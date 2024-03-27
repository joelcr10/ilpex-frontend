import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import TraineeCard from "../../components/TraineeCard";
import TraineeCardShimmer from "../../components/loading/TraineeCardShimmer";
import ilpex from "../../utils/ilpexUI";
import { getHook } from "../../network/getHook/getHook";
import { useRoute } from "@react-navigation/native";
import BackButton from "../../components/BackButton";

const PercipioAssessmentTraineeList = () => {

    const route: any = useRoute();
    const trainee_list = route.params.trainee_list;
    const batch_name=route.params.batch_name;
    const title=route.params.title;

        return (
        <ScrollView>
            <View style={styles.pageContainer}>
                <View>
                    <Text style={styles.headerText}>Percipio Assessment</Text>
                </View>
                
                <BackButton color={"white"}></BackButton>
                <View style={styles.innerContainer}>
                    <Text style={styles.incompleteText}>Trainees who scored {title} score</Text>

            { (trainee_list.length==0)?(
                <View>
                    <Text style={styles.emptyText}>Empty Trainee List</Text>
                </View>
            ):(
                <View>
                    <FlatList
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    data={trainee_list}
                    renderItem={({ item }) => (
                        <TraineeCard
                        traineeName={item.user_name}
                        batchName={batch_name} traineeId={item.trainee_id} userId={item.user_id} />
                    )}
                    keyExtractor={item => item.id}
                    />
                </View>
            )
            }
                   
                        
                </View>
            </View>
        </ScrollView>
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
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
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
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 25,
  },
  shimmer: {
    height: 90,
    borderRadius: 17,
    width: 350,
    marginBottom: 25,
    elevation: 4,
  },
  emptyText:{
    fontFamily: ilpex.fontRegular,
    color: ilpex.darkGrey,
    fontSize: 16,
    textAlign: 'center',
  },
  headerText: {
    color: ilpex.white,
    fontSize: 32,
    textAlign: 'center',
    fontFamily: ilpex.fontSemiBold,
    marginVertical:'15%'
},
})

export default PercipioAssessmentTraineeList;