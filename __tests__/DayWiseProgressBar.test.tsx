import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DayWiseProgressBar from '../src/components/DayWiseProgressBar';

describe('DayWiseProgressBar', () => {
  const onPressMock = jest.fn();
  const dayNumber = 1;
  const percentage = 50;

  test('renders correctly with given props', () => {
    const { getByText, getByTestId } = render(
      <DayWiseProgressBar dayNumber={dayNumber} percentage={percentage} onPress={onPressMock} />
    );

    expect(getByText(`Day ${dayNumber}`)).toBeTruthy();
    expect(getByTestId('progress-bar')).toBeTruthy();
  });

  test('onPress function is called when clicked', () => {
    const { getByTestId } = render(
      <DayWiseProgressBar dayNumber={dayNumber} percentage={percentage} onPress={onPressMock} />
    );

    fireEvent.press(getByTestId('progress-bar'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  
});
