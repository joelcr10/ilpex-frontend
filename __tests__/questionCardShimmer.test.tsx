import React from "react";
import { render } from "@testing-library/react-native";
import QuestionCardShimmer from "../src/components/loading/QuestionCardShimmer";

describe("QuestionCardShimmer Component", () => {
  test("renders correctly", () => {
    const { getByTestId } = render(<QuestionCardShimmer />);
    const assessmentContainer = getByTestId("assessment-container");

    expect(assessmentContainer).toBeTruthy();
  });

  test("renders shimmer for question text", () => {
    const { getByTestId } = render(<QuestionCardShimmer />);
    const questionTextShimmer = getByTestId("question-text-shimmer");

    expect(questionTextShimmer).toBeTruthy();
  });

  
});
