import React from "react";
import { render } from "@testing-library/react-native";
import AssessmentCard from "../src/components/AssessmentCardLandD";


describe("AssessmentCard component", () => {
  it("renders with correct name and batchName", () => {
    const { getByText } = render(
      <AssessmentCard name="Elena Maria Varghese" batchName="ILP 2023-24 Batch 02" />
    );

    expect(getByText("Elena Maria Varghese")).toBeTruthy();
    expect(getByText("ILP 2023-24 Batch 02")).toBeTruthy();
  });

  it("renders with default styling", () => {
    const { getByTestId } = render(
      <AssessmentCard name="Elena Maria Varghese" batchName="ILP 2023-24 Batch 02" />
    );

    const container = getByTestId("assessment-card");
    expect(container.props.style).toEqual(expect.objectContaining({
      alignItems: "center",
      backgroundColor: "#FAFAFA",
      borderRadius: 20,
      height: 90,
      marginBottom: "5%",
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 0 },
      flexDirection: "row",
    }));
  });

  it("renders name and batchName with correct styles", () => {
    const { getByText } = render(
      <AssessmentCard name="Elena Maria Varghese" batchName="ILP 2023-24 Batch 02" />
    );

    const name = getByText("Elena Maria Varghese");
    const batchName = getByText("ILP 2023-24 Batch 02");

    expect(name.props.style).toEqual({
      marginLeft: 10,
      marginBottom: 5,
      color: "black",
      fontWeight: "bold",
      fontSize: 20,
    });

    expect(batchName.props.style).toEqual({
      marginLeft: 10,
      fontWeight: "bold",
      fontSize: 15,
    });
  });
});

