import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DateSelector from '../src/components/DateSelector';

describe('DateSelector', () => {
  const onPressMock = jest.fn();
  const startDate = new Date('2024-03-15');
  const endDate = new Date('2024-03-20');

  test('renders correctly with no dates selected', () => {
    const { getByText } = render(
      <DateSelector startDate={null} endDate={null} onPress={onPressMock} />
    );

    expect(getByText('Select start and end date')).toBeTruthy();
  });

  test('renders correctly with dates selected', () => {
    const { getByText } = render(
      <DateSelector startDate={startDate} endDate={endDate} onPress={onPressMock} />
    );

    expect(getByText(`Selected Dates`)).toBeTruthy();
    const formattedStartDate = startDate.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
    const formattedEndDate = endDate.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
    expect(getByText(`${formattedStartDate} - ${formattedEndDate}`)).toBeTruthy();
  });

  test('onPress function is called when clicked', () => {
    const { getByText, getByTestId } = render(
      <DateSelector startDate={startDate} endDate={endDate} onPress={onPressMock} />
    );

    fireEvent.press(getByTestId("selectDate"))
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
