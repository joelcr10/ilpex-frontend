import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ilpex from "../../utils/ilpexUI";
import BackButton from "../../components/BackButton";
import ThreeDots from "../../components/ThreeDots";
import { getHook } from "../../network/getHook/getHook";

const TraineeProfile = () => {

    const [traineeName, setTraineeName] = useState<any[]>([]);
    const [traineeBatch, setTraineeBatch] = useState<any[]>([]);
    const [currentDay, setCurrentDay] = useState(2);
    const [averageAssessmentScore, setAverageAssessmentScore] = useState<any[]>([]);
    const [marksIndicatorColor, setMarkIndicatorColor] = useState('black');
    const [marksFeedback, setMarksFeedBack] = useState('placeholder');
    useEffect(() => {
        const getTraineeProfile = async() => {
            try {
                const {responseData, errorMessage} = await getHook('/api/v3/profile/4');
                if(responseData)
                {
                    setTraineeName(responseData.profileDetails.user.user_name);
                    setTraineeBatch(responseData.profileDetails.batch.batch_name);
                }
            } catch(error) {
                console.log('Error', error);
            }
        };

        const getTraineeScores = async() => {
            try {
                const {responseData, errorMessage} = await getHook('/api/v2/trainee/4/scores');
                if(responseData)
                {
                    console.log("Marks = ", responseData);
                    setAverageAssessmentScore(responseData.scoreDetails.ScoreAverage)
                    
                    if(responseData.scoreDetails.ScoreAverage >= 90)
                    {
                        setMarkIndicatorColor('green')
                        setMarksFeedBack('Excellent');
                    }
                    else if (responseData.scoreDetails.ScoreAverage >= 70)
                    {
                        setMarkIndicatorColor('orange');
                        setMarksFeedBack('Above Average');
                    }
                    else if(responseData.scoreDetails.ScoreAverage >= 50)
                    {
                        setMarkIndicatorColor('yellow');
                        setMarksFeedBack('Below Average');
                    }
                    else
                    {
                        setMarkIndicatorColor('red');
                        setMarksFeedBack('Danger Zone');
                    }        
                }
            } catch(error) {
                console.log('Error', error);
            }
        };

        const getCurrentDay = async() => {
            try {
                const currentDate = new Date();
                const isoString = currentDate.toISOString(); // Get ISO 8601 formatted date string
                const dateString = isoString.substring(0, isoString.indexOf('T'));
                console.log("CurrentDate = ", dateString);

                const {responseData, errorMessage} = await getHook(`/api/v3/batch/1/day/${dateString}`);
                if(responseData)
                {
                    setCurrentDay(responseData.current_day);
                    // console.log(responseData)
                }
            } catch(error) {
                console.log('Error', error);
            }
        };

        getTraineeProfile();
        getTraineeScores();
        getCurrentDay();
    }, []);

    const getRandomColor = () => {
        const generatedColor =  '#' + Math.floor(Math.random()*16777215).toString(16);
    if(generatedColor === '#bdd8c' || generatedColor === '#6de5b')
        getRandomColor();
    else
    console.log(generatedColor);
    return generatedColor;
}

    const [circleBackgroundColor, setCircleBackgroundColor] = useState(getRandomColor());

    return(
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
                        <Text style = {styles.statsKeyLabel}>Current Status</Text>
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
                    {/* <View style = {styles.statsValueLabel}>Day 3</Text> */}
                        <View style = {styles.percentageAndColorContainer}>
                            <View style = {[styles.colorDot, {backgroundColor : marksIndicatorColor}]}></View>
                            <Text style ={styles.percentageLabel}>
                            {averageAssessmentScore}%
                            </Text>
                        </View>
                        <Text style ={styles.remarksLabel}>
                            {marksFeedback}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer : {
        backgroundColor : ilpex.white,
        height : '100%',
    },
    profilePictureContainer : {
        height : 150,
        marginTop : 70,
        justifyContent : 'center'
    },
    profilePictureCircle : {
        width : 140,
        height : 140,
        alignSelf : 'center',
        borderRadius : 70
    },
    profileImageStyle : {
        width : 107,
        height : 107,
        marginLeft : 16,
        marginTop : 15,
    },
    nameLabel : {
        textAlign : 'center',
        fontFamily : ilpex.fontSemiBold,
        color : 'black',
        fontSize : 30,
        height : 40
    },
    batchLabel : {
        textAlign : 'center',
        fontFamily : ilpex.fontSemiBold,
        color : '#737373',
        fontSize : 22,
    }, 
    statsRow : {
        flexDirection : 'row',
        marginBottom : 20
    },
    statsKey : {
        alignSelf : 'flex-start',
        marginLeft : 25,
        width : 280,
    },
    statsValue : {
        width : 80,
    },
    statsContainer : {
        marginTop : 60,
    },
    statsKeyLabel : {
        fontFamily : ilpex.fontMedium,
        color : 'black',
        fontSize : 17,
    },
    statsValueLabel : {
        fontFamily : ilpex.fontMedium,
        color : 'black',
        fontSize : 17,
        textAlign :'center'
    }, 
    percentageLabel : {
        fontFamily : ilpex.fontMedium,
        color : 'black',
        fontSize : 20,
        textAlign :'center',
    },
    remarksLabel : {
        fontFamily : ilpex.fontMedium,
        color : 'black',
        fontSize : 17,
        textAlign : 'center'
    },
    colorDot : {
        width : 13,
        height : 13,
        marginTop : 6,
        marginRight : 10,
        borderRadius : 6.5,
        backgroundColor : 'lime',
        // color : 'black'
    },
    percentageAndColorContainer : {
        flexDirection : 'row'
    }
})
export default TraineeProfile;