import { Text, View } from "react-native";
import AssessmentCard from "../../components/AssessmentCard";
import BarProgress from "../../components/BarProgress";
import QuestionCard from "../../components/QuestionCard";
import { useMemo, useState } from "react";
import React from "react";

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
    return ( 
        <View>
            <Text>Assessment screen</Text>  
            <AssessmentCard assessment_id={1} assessmentName="Node and React" dueDate="2024-05-11T002311" batchName="ILP 2023-24 Batch" status={false}/>
            <BarProgress progress={6} total={12}/>
            <QuestionCard questionNumber={2} question="What is my name and what is my age please tell me why" radioButtons={radioButtons} selectedId={selectedId} setSelectedId={setSelectedId}  />
        </View>
     );
}
 
export default AssessmentScreen;