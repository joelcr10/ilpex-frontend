import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AssesmentListScreen from '../src/screens/admin/AssesmentListForBatch';

const Stack = createNativeStackNavigator();

describe('AssesmentListScreen component', () => {
  test('renders assessment list correctly', async () => {
    const { getByTestId, getByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AssesmentListScreen" component={AssesmentListScreen} />
          {/* Add other screens and navigators if needed */}
        </Stack.Navigator>
      </NavigationContainer>
    );

    // Wait for assessments to load
    await waitFor(() => expect(getByTestId('assessment-list')).toBeTruthy());

    // Assert that the assessment list is rendered correctly
    expect(getByText('Assessment 1')).toBeTruthy();
    expect(getByText('Assessment 2')).toBeTruthy();
    // Add more assertions as needed for other assessments

    // Example of simulating a button press
    fireEvent.press(getByText('Assessment 1'));
    // Add more tests to assert navigation behavior, etc.
  });
});
