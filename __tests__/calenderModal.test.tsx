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
