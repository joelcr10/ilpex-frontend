import { StyleSheet, Text, View } from "react-native";
import AssessmentCard from "../../components/AssessmentCard";
import BarProgress from "../../components/BarProgress";
import QuestionCard from "../../components/QuestionCard";
import { useEffect, useMemo, useState } from "react";
import { getHook } from "../../network/getHook/getHook";
import ilpex from "../../utils/ilpexUI";

const AssessmentScreen = () => {
    const [selectedId,setSelectedId] = useState<string>('');

    const radioButtons = useMemo(() => ([
        {
            id: 'thimna', // acts as primary key, should be unique and non-empty string
            label: 'thimna',
            value: 'thimna',
        },
        {
            id: 'elena',
            label: 'elena',
            value: 'elena',
        },
        {
            id: 'Nigin',
            label: 'Nigin',
            value: 'Nigin',
        },
        {
            id: 'Ashik',
            label: 'Ashik',
            value: 'Ashik',
        },
    ]), []);

    useEffect(() => {
        const percipioReport = async () =>{
            const {responseData} = await getHook("/api/v3/trainee/6/days");
            
            console.log("percipio report ",responseData);
        }

        percipioReport();
      }, []);
    return ( 
        <View style={styles.container}>
            <View style={styles.topPartContainer}>
                <Text style={styles.topPartText}>Assessment</Text> 
            </View> 
            
            <View style={styles.contentContainer}>
                <View style={styles.assessmentNameContainer}>
                    <Text>Assessment Name</Text>
                </View>
                <QuestionCard questionNumber={2} question="What is my name and what is my age please tell me why" radioButtons={radioButtons} selectedId={selectedId} setSelectedId={setSelectedId}  />
                <BarProgress progress={6} total={12}/>
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: ilpex.main,
        height: '100%',
    },

    assessmentNameContainer:{
        backgroundColor: 'red',
        justifyContent: 'center',
        alignContent: 'center'
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