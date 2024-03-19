import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AssesmentListCard from '../src/components/AssesmentListCard';

describe('AssesmentListCard component', () => {
  test('renders assessment name correctly', () => {
    const assessmentName = 'Test Assessment';
    const onPressMock = jest.fn(); // Mock function for onPressButton

    // Render the component
    const { getByText, getByTestId } = render(
      <AssesmentListCard assessment_name={assessmentName} onPressButton={onPressMock} />
    );

    // Assert that the assessment name is rendered correctly
    expect(getByText(assessmentName)).toBeTruthy();

    // Assert that the onPress function is called when the TouchableOpacity is pressed
    fireEvent.press(getByTestId('touchable-opacity'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
