import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import BarProgress from "../../../components/BarProgress";
import QuestionCard from "../../../components/QuestionCard";
import { useEffect, useState } from "react";
import { getHook } from "../../../network/getHook/getHook";
import ilpex from "../../../utils/ilpexUI";
import SmallButton from "../../../components/SmallButton";
import QuestionCardShimmer from "../../../components/loading/QuestionCardShimmer";
import { updateScoreAPI } from "./updateScoreAPI";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import DisabledButton from "../../../components/DisabledButton";
import ModalComponent from "../../../components/ResultModalComponent";

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
    const navigation: any = useNavigation();

    const user_id = useSelector((state: any) => state.userDetailsReducer.user_id);
    const route: any = useRoute()
    const assessment_id:number = route.params["assessment_id"];
    const assessment_name: string = route.params["assessment_name"];

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
                setQuestionList(responseData.questions);
                setIndex(0);
                setIsLoading(false);
            }

        }

        assessmentQuestion();
      }, []);

      useEffect(() => {

        if(selectedId==''){
            setinvalid(true);
        }else{
            setinvalid(false);
        }
        
      }, [selectedId]);

    

    const checkAnswer =() =>{
        if(selectedId==''){
            setinvalid(true);
        }else{
            setinvalid(false);
            if(selectedId===questionList[index].correct_answer){
                setScore(score+1);
            }
    
            if(index===questionList.length-2){
                setIndex(index+1);
                setSelectedId('');
                setSubmitResult(true);
            }else{
                setIndex(index+1);
                setSelectedId('');
            }  
            
        }
        
    }

    const updateScore = async () =>{

        let testScore : number = score;
        if(selectedId===questionList[index].correct_answer){
            testScore++;
            setScore(score+1);
        }
        const scorePercentage = (testScore/questionList.length)*100;
        console.log(scorePercentage);
        const {success, responseData} = await updateScoreAPI(assessment_id,user_id,scorePercentage);
        if(success){
            
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
                    <Text style={styles.assessmentName}>{assessment_name}</Text>
                </View>
                <View style={styles.questionContainer}>
                    {/* {invalid && <Text style={styles.invalidText}>Select an option</Text>} */}
                    {isLoading && <QuestionCardShimmer />}
                    {!isLoading && <View>

                            <BarProgress progress={index+1} total={questionList.length}/>
                            <QuestionCard questionNumber={index+1} currentQuestion={questionList[index]} selectedId={selectedId} setSelectedId={setSelectedId} />
                           
                            <View style = {styles.OuterButtonContainer}>
                                <View style={styles.buttonContainer}>
                                    {invalid && !submitResult && <DisabledButton name="Submit Answer"/>}
                                    {!submitResult && !invalid && <SmallButton name="Submit Answer" onPress={checkAnswer}/>}
                                    {submitResult && <SmallButton name="Finish" onPress={updateScore}/>}
                                </View>
                            </View>

                             
                        </View>}     
                </View>
            </View>

                    <ModalComponent isVisible={showResult} closeModal={() => navigation.navigate("TraineeHome")} score={(score/questionList.length)*100} setMessageVisible={() =>console.log('yes')}/>

           
        </View>
     );
}

const styles = StyleSheet.create({
    OuterButtonContainer:{
        display: 'flex',
        flexDirection: 'row',

        justifyContent: 'center',
        marginTop: '5%'
    },

    buttonContainer:{
        width: '60%',
        margin: 'auto'
    },
    invalidText:{
        color: ilpex.pink,
        textAlign: 'center',
        fontSize: 20

    },
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
    },

    modalContainer:{
        height: 300,
        backgroundColor: "#eff2ed",
        marginTop: 560,
        elevation: 5,
        borderRadius: 20,
        
        alignItems: 'center',
    },

    modalContent:{
        margin: 30,
        textAlign: 'center',
        alignItems: 'center',
      
        height: '100%'
    },
    progressText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#52be4f'
    },
})
 
export default AssessmentScreen;