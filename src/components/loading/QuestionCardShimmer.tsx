import React from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import ilpex from '../../utils/ilpexUI';


const QuestionCardShimmer = () =>{
    return(
        <View style={styles.assessmentContainer} testID="assessment-container">
            <View style={styles.questionContainer} testID="question-text-shimmer">
                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.questionText}
                    visible={false}

                />
            </View>

            <View style={styles.options} testID="option-shimmer">
                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.radioLabel}
                    visible={false}
                />
                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.radioLabel}
                    visible={false}
                />
                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.radioLabel}
                    visible={false}
                />
                <ShimmerPlaceholder
                    LinearGradient={LinearGradient}
                    style={styles.radioLabel}
                    visible={false}
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
    fontSize: 17,
    marginTop: 20,
    width: "80%"
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
        margin: 20,
        paddingBottom: 20,
        height: 250
    },
    
    options:{
        marginLeft: 20
    },

   
})

 

export default QuestionCardShimmer;