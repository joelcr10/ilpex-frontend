import { StyleSheet, Text, View } from "react-native";
import RadioGroup from 'react-native-radio-buttons-group';

import ilpex from "../utils/ilpexUI";

type radioButtonType = {id: string, label: string, value: string};
type propTypes = {questionNumber: number, question: string, radioButtons: radioButtonType[] , selectedId: string, setSelectedId : any};

const QuestionCard = (props : propTypes) => {
    const {questionNumber, question, radioButtons, selectedId, setSelectedId} = props;
    return ( 
        <View style={styles.assessmentContainer}>
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{questionNumber}. {question}</Text>
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
    fontFamily: ilpex.mainFont,
    fontSize: 17
   },
   
    questionContainer:{
        backgroundColor: ilpex.lightGrey,
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    questionText:{
        fontWeight: 'bold',
        fontSize: 18
    },
    assessmentContainer:{
        backgroundColor: ilpex.white,
        borderRadius: 10,
        // padding: 20,
        elevation: 5,
        margin: 10,
        paddingBottom: 20
    },
    
    options:{
        marginLeft: 20
    },

   
})

 
export default QuestionCard;