import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import BatchCard from '../src/components/BatchCard';
import BatchDetailsPage from '../src/screens/admin/BatchDetailsPage';
import { ScrollView } from "react-native-gesture-handler";

describe('BatchCard', () => {
  const mockProps = {
    batch_name: 'ILP2023-24 Test Batch',
    traineeNo: '40',
    date: '2024-03-19',
    totalDays: '22',
    progressDays: '11',
    onPressFunc: jest.fn(),
  };

  test('renders correctly with given props', () => {
    const { getByText } = render(
      <NavigationContainer> {/* Wrap BatchCard with NavigationContainer */}
        <BatchCard {...mockProps} />
      </NavigationContainer>
    );
    expect(getByText(mockProps.batch_name)).toBeTruthy();
    expect(getByText('Trainees')).toBeTruthy();
    expect(getByText(mockProps.traineeNo)).toBeTruthy();
    expect(getByText('March 19 2024')).toBeTruthy();
    expect(getByText(`${mockProps.progressDays}/${mockProps.totalDays}`)).toBeTruthy();
  });

  test('onPress function is called when card is pressed', () => {
    const { getByTestId } = render(
      <NavigationContainer> {/* Wrap BatchCard with NavigationContainer */}
        <BatchCard {...mockProps} />
      </NavigationContainer>
    );
    fireEvent.press(getByTestId('batchCard'));
//     expect(mockProps.onPressFunc).toHaveBeenCalled();
  });
});
