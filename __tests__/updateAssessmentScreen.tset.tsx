import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UpdateAssessmentScreen from '../src/screens/admin/UpdateAssessment/UpdateAssessmentScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

describe('UpdateAssessmentScreen component', () => {
  it('renders correctly', () => {
    const route = {
      params: {
        assessment_id: 'mock-assessment-id',
        assessment_name: 'Mock Assessment Name',
      },
    };

    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="UpdateAssessment" component={UpdateAssessmentScreen} initialParams={route.params} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    expect(getByText('Update Assessment')).toBeTruthy();
    expect(getByPlaceholderText('batch_name')).toBeTruthy();
  });

  
  it('disables button when required fields are empty', () => {
    const { getByText } = render(<NavigationContainer><UpdateAssessmentScreen /></NavigationContainer>);
    
    const saveButton = getByText('Save Changes');
    expect(saveButton).toBeDisabled();
  });

  it('enables button when required fields are filled', () => {
    const { getByText, getByPlaceholderText } = render(<NavigationContainer><UpdateAssessmentScreen /></NavigationContainer>);
    
    const batchDropdown = getByPlaceholderText('batch_name');
    fireEvent.changeText(batchDropdown, 'Batch 1');

    // Similarly, update the startDate and endDate fields

    const saveButton = getByText('Save Changes');
    expect(saveButton).toBeEnabled();
  });

  // Add more test cases as needed...
});
