import { StyleSheet, Text, View } from "react-native";
import BarProgress from "../../../components/BarProgress";
import QuestionCard from "../../../components/QuestionCard";
import { useEffect, useMemo, useState } from "react";
import { getHook } from "../../../network/getHook/getHook";
import ilpex from "../../../utils/ilpexUI";
import SmallButton from "../../../components/SmallButton";
import TraineeCardShimmer from "../../../components/loading/TraineeCardShimmer";
import QuestionCardShimmer from "../../../components/loading/QuestionCardShimmer";
import { updateScoreAPI } from "./updateScoreAPI";
import { useRoute } from "@react-navigation/native";

type questionType = {
    question_id: number,
    question: string,
    option_a: string,
    option_b: string,
    option_c: string,
    option_d: string,
    correct_answer: string
}

const initialQuestionList: questionType[] = [];

const AssessmentScreen = () => {
    const route: any = useRoute()
    // const assessment_id:number = route.params["assessment_id"];
    const assessment_id: number = 2;
    // const assessment_name: string = route.params["assessment_name"];
    const assessment_name: string = "Assessment name";

    console.log("assessment_name",assessment_name, "assessment_id",assessment_id);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedId,setSelectedId] = useState<string>('');
    const [questionList,setQuestionList] = useState<questionType[]>(initialQuestionList);
    const [index, setIndex] = useState<number>(0);
    const [submitResult, setSubmitResult] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [invalid, setinvalid] = useState<boolean>(false);

    useEffect(() => {
        const assessmentQuestion = async () =>{
            const {success,responseData} = await getHook(`/api/v3/assessment/${assessment_id}`);
            if(success){
                console.log("got the questions");
                setQuestionList(responseData.questions);
                setIndex(0);
                setIsLoading(false);
            }
        }

        assessmentQuestion();
      }, []);

    

    const checkAnswer =() =>{
        console.log(selectedId,questionList[index].correct_answer);
        if(selectedId===questionList[index].correct_answer){
            console.log("correct answer")
            setScore(score+1);
        }

        if(index===questionList.length-2){
            setIndex(index+1);
            setSubmitResult(true);
        }else{
            setIndex(index+1);
        }  

        console.log("result",score);
    }

    const updateScore = async () =>{
        if(selectedId===questionList[index].correct_answer){
            setScore(score+1);
        }
        const {success, responseData} = await updateScoreAPI(assessment_id,6,score);
        if(success){
            console.log("updated score");
            console.log(responseData);
        }
        setShowResult(true);
        
    }

    
    return ( 
        <View style={styles.container}>
            <View style={styles.topPartContainer}>
                <Text style={styles.topPartText}>Assessment</Text> 
            </View> 
            
            <View style={styles.contentContainer}>
                <View style={styles.assessmentNameContainer}>
                    <Text style={styles.assessmentName}>Assessment Name</Text>
                </View>
                <View style={styles.questionContainer}>
                    {isLoading && <QuestionCardShimmer />}
                    {!isLoading && <View>
                            <QuestionCard questionNumber={index+1} currentQuestion={questionList[index]} selectedId={selectedId} setSelectedId={setSelectedId} />
                            <BarProgress progress={index+1} total={questionList.length}/>
                            {!submitResult && <SmallButton name="Submit Answer" onPress={checkAnswer}/>}
                            {submitResult && <SmallButton name="Finish" onPress={updateScore}/>}
                        </View>}

                        
                </View>
            </View>

           
        </View>
     );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: ilpex.main,
        height: '100%',
    },

    questionContainer:{
        height: '60%',
        justifyContent: 'center',
    },
    assessmentNameContainer:{
        margin: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignContent: 'center'
    },

    assessmentName:{
        textAlign: 'center',
        color: 'black',
        fontFamily: ilpex.fontSemiBold,
        fontSize: 20
    },

    topPartContainer:{
        height: 100,
        justifyContent: 'center',
    },

    contentContainer:{
        backgroundColor: ilpex.white,
        height: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },

    topPartText:{
        textAlign: 'center',
        color: ilpex.white,
        fontFamily: ilpex.mainFont,
        fontSize: 25
    }
})
 
export default AssessmentScreen;