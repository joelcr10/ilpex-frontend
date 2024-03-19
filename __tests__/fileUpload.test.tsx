import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FileUploadField from '../src/components/FileUploadField';


describe('FileUploadField component', () => {
  

  // test('renders correctly without selected file', () => {
  //   const onSelectMock = jest.fn();
  //   const { getByText } = render(<FileUploadField onSelect={onSelectMock} selectedFile="" />);
  //   const chooseFileText = getByText('Choose File');
  //   expect(chooseFileText).toBeTruthy();
  // });

  test('calls onSelect function when button is pressed', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(<FileUploadField onSelect={onSelectMock} selectedFile="" />);
    const buttonElement = getByText('Choose File');
    fireEvent.press(buttonElement);
    expect(onSelectMock).toHaveBeenCalled();
  });
});
