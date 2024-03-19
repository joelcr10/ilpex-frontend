import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ModalComponent from '../src/components/ModalComponent';

describe("Testing ModalComponent", () => {
  it("renders correctly when visible", () => {
    const { getByText, queryByText } = render(
      <ModalComponent
        isVisible={true}
        closeModal={() => {}}
        successText="Success message"
        failureText="Failure message"
        setMessageVisible={() => {}}
      />
    );

    expect(getByText("Success message")).toBeTruthy();
    expect(queryByText("Failure message")).toBeNull();
    expect(getByText("Close")).toBeTruthy();
  });

  it("renders failure message correctly", () => {
    const { getByText, queryByText } = render(
      <ModalComponent
        isVisible={true}
        closeModal={() => {}}
        successText=""
        failureText="Failure message"
        setMessageVisible={() => {}}
      />
    );

    expect(queryByText("Success message")).toBeNull();
    expect(getByText("Failure message")).toBeTruthy();
    expect(getByText("Close")).toBeTruthy();
  });

  it("closes modal when Close button is pressed", () => {
    const closeModalMock = jest.fn();
    const { getByText } = render(
      <ModalComponent
        isVisible={true}
        closeModal={closeModalMock}
        successText=""
        failureText="Failure message"
        setMessageVisible={() => {}}
      />
    );

    fireEvent.press(getByText("Close"));
    expect(closeModalMock).toHaveBeenCalledTimes(1);
  });
 
});
