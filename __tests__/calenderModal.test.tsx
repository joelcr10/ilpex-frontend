import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CalenderModal from '../src/components/CalenderModal';

describe('CalenderModal', () => {
  const minDate = new Date('2024-03-01T00:00:00.000Z');
  const maxDate = new Date('2024-04-01T00:00:00.000Z');
  const setStartDate = jest.fn();
  const setEndDate = jest.fn();
  const closeModal = jest.fn();

  test('renders correctly with visible modal', () => {
    const { getByText } = render(
      <CalenderModal
        minDate={minDate}
        maxDate={maxDate}
        isVisible={true}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        closeModal={closeModal}
      />
    );

    expect(getByText('Select')).toBeTruthy();
  });

  it('calls setStartDate and setEndDate when date is selected', async () => {
    // Render the component
    const { getByText } = render(<CalenderModal minDate={new Date(2024, 0, 1)} maxDate={new Date(2024, 11, 31)} isVisible={true} setStartDate={jest.fn()} setEndDate={jest.fn()} closeModal={jest.fn()} />);
  
    // Simulate selecting a date. Here assuming '2024-01-15' is the date you want to select
    fireEvent(getByText('2024-03-21T18:30:00.000Z'), 'press');

  // Simulate pressing the "Select" button
  fireEvent.press(getByText('Select'));

  // Add your assertions to verify that setStartDate and setEndDate are called with the correct parameters
  // For example:
  expect(setStartDate).toHaveBeenCalledWith(new Date('2024-03-21T18:30:00.000Z')); // Verify setStartDate is called with the selected date
  expect(setEndDate).not.toHaveBeenCalled(); // Ensure setEndDate is not called since it's not the end date
});
  
  
  test('calls closeModal when select button is pressed', () => {
    const { getByText } = render(
      <CalenderModal
        minDate={minDate}
        maxDate={maxDate}
        isVisible={true}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        closeModal={closeModal}
      />
    );

    // Simulate pressing the select button
    fireEvent.press(getByText('Select'));

    // Check if closeModal is called
    expect(closeModal).toHaveBeenCalled();
  });
});
