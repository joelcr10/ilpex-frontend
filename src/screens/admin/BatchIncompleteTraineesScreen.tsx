import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ilpex from "../../utils/ilpexUI";
import { getHook } from "../../network/getHook/getHook";
import { sendMail } from "../../network/EmailApiHook";
import { useRoute } from "@react-navigation/native";
import BackButton from "../../components/BackButton";
import IconButtonComponent from "../../components/IconButton";
import BatchIncompleteTraineeCard from "../../components/BatchIncompleteTraineeCard";
import ShimmerBatchIncompleteTraineeCard from "../../components/loading/ShimmerBatchIncompleteTraineeCard";
import ToastDemo from "../../components/ToastComponent";
import CheckBox from 'react-native-check-box';
import Toast from "react-native-root-toast";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconOnlyButton from "../../components/IconOnlyButton";

const IncompleteTraineesScreen = () => {
    
    const [isLoading, setLoading] = useState(false);
    const [toastVisibility, setToastVisibility] = useState(false);
    const route: any = useRoute();
    const day = route.params.day;
    const batch = route.params.batch_id;
    const [traineeList, setTraineeList] = useState<any>([]);
    const [selectedTrainees, setSelectedTrainees] = useState<number[]>([]);
       
    
    
    //handle long press
       const [isLongPress, setIsLongPress] = useState(false);
      
       const handleLongPress = () => {
         setIsLongPress(true);
       };

       const handlePress = () => {
           if(isLongPress){
                setSelectedTrainees([]);
                setIsLongPress(false);
           }
           
         };

         const onPressSelectAll = () => {
                const allUserIds = traineeList.IncompleteTraineeList.map((trainee: any) => trainee.user_id);
                setSelectedTrainees(allUserIds);
        };


    const toggleTraineeSelection = (user_id: number) => {
        if (selectedTrainees.includes(user_id)) {
          setSelectedTrainees(selectedTrainees.filter(item => item !== user_id));
        } else {
          setSelectedTrainees([...selectedTrainees, user_id]);
        }
      };

    useEffect(() => {
        const getDayCards = async () => {
            try {
                const { responseData } = await getHook(
                    `/api/v2/batch/${batch}/incompleteTrainees/${day}`,

                );
                if (responseData) {
                    setTraineeList(responseData);
                    setLoading(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getDayCards();
    }, []);

    const sendMailToTrainees = async () => {
        try {
            let filteredTraineeList = traineeList.IncompleteTraineeList;
                    if (isLongPress) {
                        filteredTraineeList = traineeList.IncompleteTraineeList.filter((trainee: any) => selectedTrainees.includes(trainee.user_id));
                    }
            const { success } = await sendMail({
                incompleteTraineeList: filteredTraineeList,
                day_number: day,
            });
            if (success) {

                Toast.show("Mail Send Sucessfully", {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    backgroundColor: ilpex.success,
                    textColor:ilpex.white,
                    hideOnPress: true,
                    shadow: true,
                    animation: true,
                    delay: 0,
                    opacity:1,
                    shadowColor:'black'
                  });
                // setToastVisibility(true);

            }
        } catch (error) {
            console.error('Error while sending mail:', error);
        }
    };

    const onPress = () => {
        sendMailToTrainees();
    };

 

    return (
        <View>
            
            <ScrollView>
                <View style={styles.pageContainer}>
                    <BackButton color={"white"}></BackButton>
                    <View style={styles.innerContainer}>
                        <Text style={styles.incompleteText}>Incomplete</Text>

                        <View style={styles.dayCard}>
                            {!isLoading ? (
                               <View>
                                    <ShimmerBatchIncompleteTraineeCard></ShimmerBatchIncompleteTraineeCard>
                                </View> 
                            ) : (
                                <View>
                                        <IconButtonComponent name={"Send Mail"} onPress={onPress} icon={"mail"} buttonPressed={false}></IconButtonComponent>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.traineeText}>Trainees</Text>
                                    {isLongPress &&
                                    <IconOnlyButton icon="done-all" onPress={onPressSelectAll}/>
                                    }
                                </View>

                                <TouchableOpacity onLongPress={handleLongPress} onPress={handlePress} activeOpacity={1}>
                                <FlatList
                                    scrollEnabled={false}
                                    showsVerticalScrollIndicator={false}
                                    data={traineeList.IncompleteTraineeList}
                                    renderItem={({ item }) => (
                                        <View key={item.user_id}>
                                            {isLongPress && <CheckBox
                                                    isChecked={selectedTrainees.includes(item.user_id)}
                                                    onClick={() => toggleTraineeSelection(item.user_id)}
                                                    checkedImage={<Image source={require('../../../assets/icons/Check_fill.png')} />} 
                                                    unCheckedImage={<Image source={require('../../../assets/icons/Check_ring.png')} />} 
                                                    style={styles.checkbox}
                                                />}
                                        <BatchIncompleteTraineeCard
                                            trainee_name={item.user_name}
                                            batch_name={item.Batch} courses_left={item.incomplete_courses_count} total_number_of_courses={item.total_courses} course_list={item.incomplete_courses} currentDay={item.day} />
                                        </View>
                                    )}
                                    keyExtractor={item => item.id}
                                />
                            </TouchableOpacity>
                            </View>   
                            )}
                        </View>
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
    sendStyle: {
        color: 'white',
    },

    dayCard: {
        paddingLeft: '-10%',
        paddingRight: '-10%',

    },
    box: {
        flexDirection: 'row',
        height: 44,
        width: 84,
        backgroundColor: ilpex.main,
        borderRadius: 5,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        backgroundColor: 'white',
        height: '100%',
        marginTop: '25%',
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        paddingTop: '10%',

        flex: 1,
        minHeight: 800
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
    checkbox:{
        marginStart:'5%',
        padding:'5%'
    }
})


export default IncompleteTraineesScreen;