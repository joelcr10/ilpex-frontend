import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BatchesScreen from '../src/screens/admin/BatchesScreen';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe("Testing BatchesScreen", () => {
  // Mock navigation function
  const mockNavigate = jest.fn();
  useNavigation.mockReturnValue({ navigate: mockNavigate });

  it("renders BatchesScreen correctly", () => {
    render(<BatchesScreen />);
  });

  it("renders batch cards correctly", () => {
    const { getByText } = render(<BatchesScreen />);
    expect(getByText("Batches")).toBeTruthy(); // Check if the header text is rendered
    // You can add more assertions here to check the rendering of batch cards
  });

  it("navigates to BatchDetails screen when a batch card is pressed", () => {
    const { getByText } = render(<BatchesScreen />);
    // Replace 'Batch Name' with the actual text of a batch card
    const batchCard = getByText("Batch Name"); 
    fireEvent.press(batchCard);
    // Assert that the navigate function is called with the correct parameters
    expect(mockNavigate).toHaveBeenCalledWith("BatchDetails", { batch_id: "batch_id" }); // Replace 'batch_id' with the expected batch ID
  });
});
