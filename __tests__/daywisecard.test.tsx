import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Daywise from '../src/components/DaywiseCard';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer

// Mock useNavigation hook
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  }));
  
  describe("Testing Daywise component", () =>{
      it("renders completed day correctly", () =>{
          const { getByText, queryByText } = render(
              <NavigationContainer>
                  <Daywise 
                      Day={1}
                      duration="30 mins"
                      progressValue={100}
                      status={true}
                  />
              </NavigationContainer>
          );
  
          expect(getByText("Day 1")).toBeTruthy();
          expect(getByText("30 mins")).toBeTruthy();
          expect(queryByText("Completed")).toBeTruthy();
          expect(queryByText("lock")).toBeNull(); // Make sure lock icon is not present
          expect(queryByText("CircularProgress")).toBeNull(); // Make sure circular progress bar is not present
      });
    
      it("navigation doesn't work when progress is not 100", async () => {
        const navigation = { navigate: jest.fn() }; // Mock the navigation object

        const { getByText } = render(
        <NavigationContainer>
            <Daywise
            Day={3}
            duration="30 mins"
            progressValue={40} // Progress is not 100 for day 2, representing an incomplete previous day
            status={true} 
            />
        </NavigationContainer>
        );

        // Simulate navigation click and ensure navigation doesn't occur
        fireEvent.press(getByText("Day 3"));
        expect(navigation.navigate).not.toHaveBeenCalled(); // Expect navigation not to have been called
      });
  
});

