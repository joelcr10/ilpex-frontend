import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ilpex from "../../utils/ilpexUI";
import BackButton from "../../components/BackButton";
import ThreeDots from "../../components/ThreeDots";
import BarGraph from "../../components/BarChart";
import { getHook } from "../../network/getHook/getHook";
import { getItem } from "../../utils/utils";
import Constants from "../../utils/Constants";
import TraineeProfileShimmer from "../../components/loading/TraineeProfileShimmer";
import { List } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

const TraineeProfileScreen = () => {

    const [traineeName, setTraineeName] = useState<any[]>([]);
    const [traineeBatch, setTraineeBatch] = useState<any[]>([]);
    const [currentDay, setCurrentDay] = useState(2);
    const [averageAssessmentScore, setAverageAssessmentScore] = useState<any[]>([]);
    const [marksIndicatorColor, setMarkIndicatorColor] = useState('black');
    const [resultID, setResultID] = useState<any[]>([]);
    const [highScore, setHighScore] = useState<any[]>([]);
    const [isLoadingCurrentDay, setLoadingCurrentDay] = useState(false);
    const [roleId, setRoleId] = useState('roleid');
    const [currentTraineeDay, setCurrentTraineeDay] = useState(3);
    const [traineeProgress, setTraineeProgress] = useState('PENDING');
    const [incompleteCourseList, setIncompleteCourseList] = useState<string[]>([]);
    const [finalLoading, setFinalLoading] = useState(false);
    const [traineeCurrentDay, setTraineeCurrentDay] = useState(false);
    const [expandedAccordion, setExpandedAccordion] = useState(true);
    const [traineeProgressStatus, setTraineeProgressStatus] = useState(false);
    const [assessmentName,setAssessmentName] = useState<any[]>([]);
    
    const changeExpand=()=>{
        setExpandedAccordion(!expandedAccordion)
        console.log('entered')
    }

    let batchId : number = 0; 

    useFocusEffect(
        React.useCallback(() => {

        const traineeProfileLoader = async () =>{
            await getTraineeScores();
            await getTraineeProfile();
            await getCurrentDay();
            await getTraineeProgress();
        }
        traineeProfileLoader();        
    }, [])
    );

    useFocusEffect(
        React.useCallback(() => {

        const traineeProfileLoading = async () =>{
            await getTraineeProgress();
            setFinalLoading(true);
        }
        
        traineeProfileLoading();
    }, [traineeCurrentDay])
    )
    
    const getTraineeProfile = async() => {
        try {
            
            const role_id = await getItem(Constants.ROLE_ID);
            if(role_id)
                setRoleId(role_id);
            console.log("Profile Role ID : ", role_id);
            const user_id = await getItem(Constants.USER_ID);
            const {responseData, errorMessage} = await getHook(`/api/v3/profile/${user_id}`);
            if(responseData)
            {
                if(role_id === '103')
                {
                    setTraineeName(responseData.data.user_name);
                    setTraineeBatch(responseData.data.trainee.batch.batch_name);
                    batchId = responseData.data.trainee.batch_id;
                }
                else
                {
                    setTraineeName(responseData.data.user_name);
                }
            }
        } catch(error) {
            console.log('Error', error);
        }
    };

    const getTraineeScores = async() => {
        try {
            setTraineeProgress('PENDING');
            const role_id = await getItem(Constants.ROLE_ID);
            if(role_id)
                setRoleId(role_id);
            console.log("Score Role ID : ", role_id);
            if(role_id === '103')
            {
                const trainee_id = await getItem(Constants.TRAINEE_ID);
                const {responseData, errorMessage} = await getHook(`/api/v2/trainee/${trainee_id}/scores`);
                console.log('Trainee ID ------', trainee_id)
                if(responseData)
                {
                    console.log("Marks = ", responseData);
                    const averageScore = responseData.scoreDetails.scoreAverage;
                    setAverageAssessmentScore(averageScore);
                    const resultIds: string[] = [];
                    const highScores: string[] = [];
                    const assessmentNames:string[] = [];
                    const scores = responseData.scoreDetails.scores;
                    scores.forEach((score: any, index: number) => {
                        resultIds.push(`A${index + 1}`);
                        highScores.push(score.high_score);
                        console.log(`RESULT ID : A${index + 1}, HIGH SCORE : ${score.high_score}`);
                        const assessments = score.assessmentName.assessments
                    assessments.forEach((assessment: any, index: number) => {
                        assessmentNames.push(assessment.assessment_name);
                    })
                    });
                    
                    setResultID(resultIds);
                    setHighScore(highScores);
                    setAssessmentName(assessmentNames);
                
                if(averageScore >= 90)
                    setMarkIndicatorColor('green')
                else if (averageScore >= 70)
                    setMarkIndicatorColor('orange');
                else if(averageScore >= 50)
                    setMarkIndicatorColor('yellow');
                else
                    setMarkIndicatorColor('red');
                }
            }
        } catch(error) {
            console.log('Error', error);
        }
    };

    const getCurrentDay = async() => {
        try {
            const role_id = await getItem(Constants.ROLE_ID);
            if(role_id)
                setRoleId(role_id);
            console.log("Day Role ID : ", role_id);
            if(role_id === '103')
            {
                const currentDate = new Date();
                currentDate.setHours(currentDate.getHours() + 5);
                currentDate.setMinutes(currentDate.getMinutes() + 30);
                console.log("Current DATE --------------", currentDate);
                const isoString = currentDate.toISOString();
                const dateString = isoString.substring(0, isoString.indexOf('T'));
                const {responseData, errorMessage} = await getHook(`/api/v3/batch/${batchId}/day/${dateString}`);
                if(responseData)
                {
                    setCurrentDay(responseData.current_day);
                    setLoadingCurrentDay(true);
                }
            }
            else 
            {
                setLoadingCurrentDay(true);
            }
        } catch(error) {
            console.log('Error', error);
        }
    };

    const getTraineeProgress = async() => {
        try {
            let trainee_id = await getItem(Constants.TRAINEE_ID);
            if(trainee_id)
            {
                let trainee_id_int = parseInt(trainee_id)
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
                    setCurrentTraineeDay(largestDayNumber);
                    console.log("Current Day Progress Number: ", largestDayNumber);
                    setTraineeCurrentDay(true);

                    if(largestDayNumber >= currentDay)
                        setTraineeProgress('ON TRACK');
                    else
                        setTraineeProgress('BEHIND');
                    
                    setTraineeProgressStatus(true);
                    await courseListFromDatabase(largestDayNumber, trainee_id_int)
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
                console.log("Yooo")
            }
        }catch(error)
        {
            console.log("Error", error);
        }
    }

    const colorArray = [
        '#FF6347', '#FF7F50', '#FFA07A', '#FFD700', '#FF69B4', '#FF1493', '#FFC0CB', '#87CEEB', '#4682B4', '#40E0D0', '#00FF7F', '#7FFF00', '#32CD32', '#ADFF2F', '#00FF00', '#6B8E23', '#228B22', '#7CFC00', '#98FB98', '#008000', '#556B2F', '#20B2AA', '#00CED1', '#1E90FF', '#4169E1', '#0000FF', '#000080', '#8A2BE2', '#4B0082', '#800080', '#9932CC', '#9400D3', '#8B008B', '#A52A2A', '#D2691E', '#B22222', '#800000'
      ];
      
    const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorArray.length);
    return colorArray[randomIndex];
    };

    const [circleBackgroundColor, setCircleBackgroundColor] = useState(getRandomColor());

    if (roleId === '103')
    {
        return(
            <ScrollView>
            {
                (!isLoadingCurrentDay) ? (
                    <TraineeProfileShimmer/>
                ) : (
                    <View style = {styles.pageContainer}>
                        <BackButton color = 'black'/>
                        <ThreeDots color = 'black'/>
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
                                    <Text style = {styles.statsKeyLabel}>Current Day of The Batch</Text>
                                </View>
                                <View style = {styles.statsValue}>
                                <Text style = {styles.statsValueLabel}>Day {currentDay}</Text>
                                </View>
                            </View>
                            <View style = {styles.statsRow}>
                            <View style = {styles.statsKey}>
                                <Text style = {styles.statsKeyLabel}>Your Current Day</Text>
                            </View>
                            <View style = {styles.statsValue}>
                            <Text style = {styles.statsValueLabel}>Day {currentTraineeDay}</Text>
                            </View>
                        </View>
                            <View style = {styles.statsRow}>
                            <View style = {styles.statsKey}>
                                <Text style = {styles.statsKeyLabel}>Your Current Progress</Text>
                            </View>
                            <View style = {styles.statsValue}>
                            {traineeProgressStatus === false ? (
                                <Text style={[styles.statsValueLabel, { color: 'yellow', fontFamily: ilpex.fontSemiBold }]}>
                                    {traineeProgress}
                                </Text>
                            ) : (
                                traineeProgress === 'ON TRACK' ? (
                                    <Text style={[styles.statsValueLabel, { color: 'green', fontFamily: ilpex.fontSemiBold }]}>
                                        {traineeProgress}
                                    </Text>
                                ) : (
                                    <Text style={[styles.statsValueLabel, { color: 'red', fontFamily: ilpex.fontSemiBold }]}>
                                        {traineeProgress}
                                    </Text>
                                )
                            )}                          
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

                        <View style={{
                            marginBottom : '10%',
                            marginTop : '5%',
                            flex:1,
                            marginLeft : '1%',
                            marginRight : '1%'
                        }}>
                            <List.Accordion
                            title="Courses left for the day"
                            left={props => <List.Icon {...props} icon="book" />}
                            expanded={!expandedAccordion}
                            onPress={changeExpand}
                            style={styles.accordion}
                            titleStyle={styles.accordionTitle}
                            >
                                <View style={styles.accordionView}>
                            
                                    <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={incompleteCourseList}
                                    renderItem={({ item,index }) => (
                                    <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                        <Text style={styles.accordionText}>
                                        {index + 1} .  {item}</Text>
                                        </View>
                                    )}
                                    keyExtractor={item => item}
                                    />
                                
                                </View>
                            </List.Accordion>
                        </View>
                        <View  style={{
                        flexDirection:'column'
                        }}> 
                            <View style={{
                                flex:1
                            }}>
                                <BarGraph data={highScore} labels={resultID} names={assessmentName} ></BarGraph>
                            </View>
                        </View>  
                    </View>
                )
            }
            </ScrollView>
        );
    }
    else 
    {
        return(
            <ScrollView>
            {
                (!isLoadingCurrentDay) ? (
                    <TraineeProfileShimmer/>
                ) : (
                    <View style = {styles.adminContainer}>
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
                        </View>
                        <View style = {styles.statsContainer}>
                            <View style = {styles.statsRow}>
                                <View style = {styles.statsKey}>
                                    <Text style = {styles.statsKeyLabel}>Role ID</Text>
                                </View>
                                <View style = {styles.statsValue}>
                                <Text style = {styles.statsValueLabel}>{roleId}</Text>
                                </View>
                            </View>
                            <View style = {styles.statsRow}>
                                <View style = {styles.statsKey}>
                                    <Text style = {styles.statsKeyLabel}>Employee Status</Text>
                                </View>
                                <View style = {styles.statsValue}>
                                <Text style = {styles.statsValueLabel}>Trainer</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer : {
        backgroundColor : ilpex.white,
        minHeight : "100%",
        position:'relative',
        zIndex:0
    },
    adminContainer : {
        backgroundColor : ilpex.white,
        minHeight : 1000,
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
    },
    accordionText:{
        paddingTop : '4%',
        fontFamily : ilpex.fontMedium,
        fontSize : 16,
        color : 'black',
      },
    accordion:{
        borderTopLeftRadius : 10, 
        borderTopRightRadius : 10,
        backgroundColor:'white',
        elevation:5,
        marginLeft : '3%',
        marginRight : '3%',
        },
    accordionView:{
        borderBottomLeftRadius : 10,
        borderBottomRightRadius : 10,
        backgroundColor:'white',
        elevation:5,
        paddingBottom : 30,
        marginLeft : '3%',
        marginRight : '3%',
        paddingLeft : '8%',
        paddingRight : '8%',
    },
    accordionTitle:{
        fontFamily : ilpex.fontRegular,
        fontSize: 17
    },

})
export default TraineeProfileScreen;