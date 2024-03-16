import { StyleSheet, Text, View } from "react-native";
import RadioGroup from 'react-native-radio-buttons-group';

import ilpex from "../utils/ilpexUI";
import { useMemo } from "react";

type radioButtonType = {id: string, label: string, value: string};
type propTypes = {questionNumber: number, question: string, radioButtons: radioButtonType[] , selectedId: string, setSelectedId : any};

const QuestionCard = (props : any) => {
    const {questionNumber,currentQuestion, selectedId, setSelectedId} = props;

    

    const radioButtons = useMemo(() => ([
        {
            id: currentQuestion.option_a,
            label: currentQuestion.option_a,
            value: currentQuestion.option_a,
        },
        {
            id: currentQuestion.option_b,
            label: currentQuestion.option_b,
            value: currentQuestion.option_b,
        },
        {
            id: currentQuestion.option_c,
            label: currentQuestion.option_c,
            value: currentQuestion.option_c
        },
        {
            id: currentQuestion.option_d,
            label: currentQuestion.option_d,
            value: currentQuestion.option_d
        },
    ]), [currentQuestion]);

    return ( 
        <View style={styles.assessmentContainer}>
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{questionNumber}. {currentQuestion.question}</Text>
            </View>

            <View style={styles.options}>
                <RadioGroup 
                    radioButtons={radioButtons} 
                    onPress={setSelectedId}
                    selectedId={selectedId}
                    layout='column'
                    containerStyle={styles.radioButton}
                    labelStyle={styles.radioLabel}
                />
            </View>

        </View>
     );
}

const styles = StyleSheet.create({
   radioButton:{
    alignItems: 'flex-start', 
    width: '100%'
   },

   radioLabel:{
    fontFamily: ilpex.fontRegular,
    fontSize: 17,
    color: ilpex.black,
   },
   
    questionContainer:{
        backgroundColor: ilpex.lightGrey,
        padding: 15,
        borderRadius: 5,
    },
    questionText:{
        // fontWeight: 'bold',
        fontFamily: ilpex.fontMedium,
        fontSize: 18,
        color: ilpex.black
    },
    assessmentContainer:{
        backgroundColor: ilpex.white,
        borderRadius: 10,
        margin: 15,
        paddingBottom: 20,
        marginTop: '10%',
    },
    
    options:{
        marginLeft: 0,
        paddingRight: 10,
        marginTop: 20,
        
    },

   
})

 
export default QuestionCard;