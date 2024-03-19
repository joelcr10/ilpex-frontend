import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import QuestionCard from '../src/components/QuestionCard';

describe("Testing QuestionCard component", () => {
    it("renders correctly with given props", () => {
        const questionNumber = 1;
        const currentQuestion = {
            question: "Sample question",
            option_a: "Option A",
            option_b: "Option B",
            option_c: "Option C",
            option_d: "Option D"
        };
        const selectedId = "";
        const setSelectedId = jest.fn();

        const { getByText, getByTestId } = render(
            <QuestionCard 
                questionNumber={questionNumber}
                currentQuestion={currentQuestion}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
            />
        );

        // Check if question number and text are rendered
        expect(getByText("1. Sample question")).toBeTruthy();

        // Check if radio buttons for options are rendered
        expect(getByText("Option A")).toBeTruthy();
        expect(getByText("Option B")).toBeTruthy();
        expect(getByText("Option C")).toBeTruthy();
        expect(getByText("Option D")).toBeTruthy();
    });

    
});
