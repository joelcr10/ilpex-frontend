import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ilpex from "../../utils/ilpexUI";
import BackButton from "../../components/BackButton";
import BarGraph from "../../components/BarChart";
import { getHook } from "../../network/getHook/getHook";
import TraineeProfileShimmer from "../../components/loading/TraineeProfileShimmer";
import { useRoute } from "@react-navigation/native";

const TraineeProileAnalysisScreen = () => {

    const route:any = useRoute();

    const [traineeName, setTraineeName] = useState<any[]>([]);
    const [traineeBatch, setTraineeBatch] = useState<any[]>([]);
    const [currentDay, setCurrentDay] = useState(2);
    const [averageAssessmentScore, setAverageAssessmentScore] = useState<any[]>([]) ;
    const [marksIndicatorColor, setMarkIndicatorColor] = useState('black');
    const [resultID, setResultID] = useState<any[]>([]);
    const [highScore, setHighScore] = useState<any[]>([]);
    const [isLoadingCurrentDay, setLoadingCurrentDay] = useState(false);
    const [traineeProgress, setTraineeProgress] = useState('placeholder');
    const [incompleteCourseList, setIncompleteCourseList] = useState<string[]>([]);

    let batchId : number = 0; 
    const user_id = route.params.user_id;
    const trainee_id = route.params.trainee_id;
    useEffect(() => {
        const getTraineeProfile = async() => {
            try {
                const {responseData, errorMessage} = await getHook(`/api/v3/profile/${user_id}`);
                if(responseData)
                {
                    setTraineeName(responseData.data.user_name);
                    setTraineeBatch(responseData.data.trainee.batch.batch_name);
                    batchId = responseData.data.trainee.batch_id;
                }
            } catch(error) {
                console.log('Error', error);
            }
        };

        const getTraineeScores = async() => {
            try {
                const {responseData, errorMessage} = await getHook(`/api/v2/trainee/${trainee_id}/scores`);
                console.log('Trainee ID Inside Trainee Scores Function------', trainee_id)
                if(responseData)
                {
                    console.log("Marks = ", responseData);
                    let averageScore;
                    if(responseData.scoreDetails.scoreAverage === null)
                        averageScore =0;
                    else
                        averageScore = responseData.scoreDetails.scoreAverage;
                    setAverageAssessmentScore(averageScore);
                    const resultIds: string[] = [];
                    const highScores: string[] = [];
                    const scores = responseData.scoreDetails.scores;
                    scores.forEach((score: any, index: number) => {
                        resultIds.push(`A${index + 1}`);
                        highScores.push(score.high_score);
                        console.log(`RESULT ID : A${index + 1}, HIGH SCORE : ${score.high_score}`);
                    });
                    
                    setResultID(resultIds);
                    setHighScore(highScores);
                    
                    if(averageScore >= 90)
                        setMarkIndicatorColor('green')
                    else if (averageScore >= 70)
                        setMarkIndicatorColor('orange');
                    else if(averageScore >= 50)
                        setMarkIndicatorColor('yellow');
                    else
                        setMarkIndicatorColor('red');
                }
            } catch(error) {
                console.log('Error', error);
            }
        };

        const getCurrentDay = async() => {
            try {
                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 1);
                const isoString = currentDate.toISOString();
                const dateString = isoString.substring(0, isoString.indexOf('T'));
                console.log("CurrentDate = ", dateString);
                console.log("Batch ID = ", batchId);
                const {responseData, errorMessage} = await getHook(`/api/v3/batch/${batchId}/day/${dateString}`);
                if(responseData)
                {
                    setCurrentDay(responseData.current_day);
                    console.log("Current Day Is ---------->",responseData.current_day )
                    setLoadingCurrentDay(true);
                }
            } catch(error) {
                console.log('Error', error);
            }
        };

        const getTraineeProgress = async() => {
            try {
                const daysList : number[] = [];
                const {responseData, errorMessage} = await getHook(`/api/v3/trainee/${trainee_id}/days`);
                if(responseData)
                {
                    console.log("Trainee Progress : ", responseData.data);
                    for (const object of responseData.data)
                    {
                        if(object.status === true)
                            daysList.push(object.day_number);
                    }
                    console.log("Days List : ", daysList)
                    const largestDayNumber: number = Math.max(...daysList);
                    console.log("Current Day Progress Number: ", largestDayNumber);
                    if(largestDayNumber >= currentDay)
                        setTraineeProgress('OnTrack');
                    else
                    {
                        setTraineeProgress('Lagging');
                        console.log("Ooops")
                        courseListFromDatabase(largestDayNumber, trainee_id);
                    }
                }
            }catch (error)
            {
                console.log("Error", error);
            }
        }

        const courseListFromDatabase = async(largestDayNumber : number, trainee_id : number) => {
            try
            {
                const incompleteCourseList : string [] = [];
                const courseList : string [] = [];
                const {responseData, errorMessage} = await getHook(`/api/v3/trainee/${trainee_id}/course/day/${largestDayNumber}`);
                if(responseData)
                {
                    for(const object of responseData.message)
                    {
                        if(object.status === false)
                            incompleteCourseList.push(object.course_name);
                    }
                    console.log("Incomplete Course List :", incompleteCourseList);
                    setIncompleteCourseList(incompleteCourseList);
                }
            }catch(error)
            {
                console.log("Error", error);
            }
        }

        const traineeProfileLoader = async () =>{
            await getTraineeScores();
            await getTraineeProfile();
            await getTraineeProgress();
            await getCurrentDay();
        }

        traineeProfileLoader();        
    }, []);

    const colorArray = [
        '#FF6347', '#FF7F50', '#FFA07A', '#FFD700', '#FF69B4', '#FF1493', '#FFC0CB', '#87CEEB', '#4682B4', '#40E0D0', '#00FF7F', '#7FFF00', '#32CD32', '#ADFF2F', '#00FF00', '#6B8E23', '#228B22', '#7CFC00', '#98FB98', '#008000', '#556B2F', '#20B2AA', '#00CED1', '#1E90FF', '#4169E1', '#0000FF', '#000080', '#8A2BE2', '#4B0082', '#800080', '#9932CC', '#9400D3', '#8B008B', '#A52A2A', '#D2691E', '#B22222', '#800000'
      ];
      
      const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colorArray.length);
        return colorArray[randomIndex];
      };

    const [circleBackgroundColor, setCircleBackgroundColor] = useState(getRandomColor());

    return(
        <ScrollView>
        {
            (!isLoadingCurrentDay) ? (
                <TraineeProfileShimmer/>
            ) : (
                <View style = {styles.pageContainer}>
                    <BackButton color = 'black'/>
                    <View style = {styles.profilePictureContainer}>
                        <View style = {[styles.profilePictureCircle, {backgroundColor : circleBackgroundColor}]}>
                            <Image
                                style = {styles.profileImageStyle}
                                source = {require('../../../assets/icons/user.png')}/>
                        </View>
                    </View>
                    <View>
                        <Text style = {styles.nameLabel}>
                            {traineeName}
                        </Text>
                        <Text style = {styles.batchLabel}>
                            {traineeBatch}
                        </Text>
                    </View>
                    <View style = {styles.statsContainer}>
                        <View style = {styles.statsRow}>
                            <View style = {styles.statsKey}>
                                <Text style = {styles.statsKeyLabel}>Current Day</Text>
                            </View>
                            <View style = {styles.statsValue}>
                            <Text style = {styles.statsValueLabel}>Day {currentDay}</Text>
                            </View>
                        </View>
                        <View style = {styles.statsRow}>
                            <View style = {styles.statsKey}>
                                <Text style = {styles.statsKeyLabel}>Average Assessment Score</Text>
                            </View>
                            <View style = {styles.statsValue}>
                                <View style = {styles.percentageAndColorContainer}>
                                    <View style = {[styles.colorDot, {backgroundColor : marksIndicatorColor}]}></View>
                                    <Text style ={styles.percentageLabel}>
                                    {averageAssessmentScore}%
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* {traineeProgress === } */}
                    <BarGraph data={highScore} labels={resultID}></BarGraph>
                </View>
            )
        }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageContainer : {
        backgroundColor : ilpex.white,
        height : '100%',
    },
    adminContainer : {
        backgroundColor : ilpex.white,
        height : 1000,
    },
    profilePictureContainer : {
        height : 150,
        marginTop : 40,
        justifyContent : 'center'
    },
    profilePictureCircle : {
        width : 120,
        height : 120,
        alignSelf : 'center',
        borderRadius : 70
    },
    profileImageStyle : {
        width : 107,
        height : 107,
        marginLeft : 7,
        marginTop : 8,
    },
    nameLabel : {
        textAlign : 'center',
        fontFamily : ilpex.fontSemiBold,
        color : 'black',
        fontSize : 23,
        height : 30
    },
    batchLabel : {
        textAlign : 'center',
        fontFamily : ilpex.fontSemiBold,
        color : '#737373',
        fontSize : 18,
    }, 
    statsRow : {
        flexDirection : 'row',
        marginBottom : 20
    },
    statsKey : {
        alignSelf : 'flex-start',
        width : '70%'
    },
    statsValue : {
        width : 80,
    },
    statsContainer : {
        marginTop : 40,
        marginLeft : '8%',
    },
    statsKeyLabel : {
        fontFamily : ilpex.fontMedium,
        color : 'black',
        fontSize : 14,
    },
    statsValueLabel : {
        fontFamily : ilpex.fontMedium,
        color : 'black',
        fontSize : 14,
        textAlign :'center',
        paddingLeft : '5%'
    }, 
    percentageLabel : {
        fontFamily : ilpex.fontMedium,
        color : 'black',
        fontSize : 14,
        textAlign :'center',
    },
    remarksLabel : {
        fontFamily : ilpex.fontMedium,
        color : 'black',
        fontSize : 14,
        textAlign : 'center',
        height : 56
    },
    colorDot : {
        width : 13,
        height : 13,
        marginTop : '4%',
        marginRight : 10,
        borderRadius : 6.5,
        backgroundColor : 'lime',
    },
    percentageAndColorContainer : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignContent : 'center'
    }
})
export default TraineeProileAnalysisScreen;