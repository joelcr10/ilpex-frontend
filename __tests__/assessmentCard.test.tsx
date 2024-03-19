import React from "react";
import { render } from "@testing-library/react-native";
import AssessmentCard from "../src/components/AssessmentCard";
import { NavigationContainer } from "@react-navigation/native";


describe("Assessment card testing", () =>{
    it("renders correctly with given props", () => {
        const assessment_id = 1;
        const assessmentName = "Sample Assessment";
        const batchName = "Sample Batch";
        const dueDate = "2024-03-19T00:00:00";
        const status = true;

        const { getByText} = render(
            <NavigationContainer>
                <AssessmentCard 
                    assessment_id={assessment_id}
                    assessmentName={assessmentName}
                    batchName={batchName}
                    dueDate={dueDate}
                    status={status}
                />
            </NavigationContainer>
        );

        // Check if assessment name, batch name, and formatted due date are rendered
        expect(getByText(assessmentName)).toBeTruthy();
        expect(getByText(batchName)).toBeTruthy();

        // Check if the button to take the test is rendered
        expect(getByText("Take test")).toBeTruthy();
    });

    it("formats date correctly", () => {
        const { getByText } = render(
            <NavigationContainer>
                <AssessmentCard 
                    assessment_id={1}
                    assessmentName="Test Assessment"
                    batchName="Batch 1"
                    dueDate="2024-03-20T00:00:00Z"
                    status={false}
                />
            </NavigationContainer>
        );
    
        expect(getByText('20 Mar 2024')).toBeTruthy();
      });
})