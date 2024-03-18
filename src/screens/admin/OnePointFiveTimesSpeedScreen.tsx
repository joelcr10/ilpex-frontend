import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TraineeCard from "../../components/TraineeCard";
import TraineeCardShimmer from "../../components/loading/TraineeCardShimmer";
import ilpex from "../../utils/ilpexUI";
import { getHook } from "../../network/getHook/getHook";
import { useRoute } from "@react-navigation/native";
import BackButton from "../../components/BackButton";

const OnePointFiveTimesSpeed = () => {

    const [isLoading, setLoading] = useState(false);
    const [batchName, setBatchName] = useState('BATCH NAME');
    const [onePointFiveWatchSpeedTraineesList, setOnePointFiveWatchSpeedTraineesList] = useState<any[]>([]);
    const route: any = useRoute();
    const batch_id = route.params.batch_id;

    useEffect(() => {
        const getNotWatchedList = async () => {
            try {
                const { responseData } = await getHook(`/api/v2/batch/${batch_id}/watchtime`,
                );
                if (responseData) {
                    const batch_name = responseData.data.batch_name;
                    setBatchName(batch_name);
                    setOnePointFiveWatchSpeedTraineesList(responseData.data.onePointFiveWatchSpeedTraineesList);
                    setLoading(true);
                }
            } catch (error) {
            console.error('Error:', error);
            }
        };

        getNotWatchedList();
        }, []);

        return (
        <ScrollView>
            <View style={styles.pageContainer}>
                <BackButton color={"white"}></BackButton>
                <View style={styles.innerContainer}>
                    <Text style={styles.incompleteText}>Trainees attending Courses at 1.5x Speed</Text>
                    { (!isLoading) ? (
                    <View>
                        <TraineeCardShimmer/>
                    </View>
                    ) : (
                    <>
                        <View>
                            <FlatList
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            data={onePointFiveWatchSpeedTraineesList}
                            renderItem={({ item }) => (
                                <TraineeCard
                                traineeName={item.user_name}
                                batchName={batchName} traineeId={item.trainee_id} userId={item.user_id} />
                            )}
                            keyExtractor={item => item.id}
                            />
                        </View>
                    </>
                    )}
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
    marginTop: '36.5%',
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
})


export default OnePointFiveTimesSpeed;