import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../src/components/Button';

 describe('Button component', () => {
//   test('renders button with name when buttonPressed is false', () => {
//     const onPressMock = jest.fn();
//     const { getByText } = render(<Button name="Test Button" onPress={onPressMock} buttonPressed={false} />);
//     const buttonElement = getByText('Test Button');
//     expect(buttonElement).toBeTruthy();
//   });

 

  test('calls onPress function when button is pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button name="Test Button" onPress={onPressMock} buttonPressed={false} />);
    const buttonElement = getByText('Test Button');
    fireEvent.press(buttonElement);
    expect(onPressMock).toHaveBeenCalled();
  });
});





