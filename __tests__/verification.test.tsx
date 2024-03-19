import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import  VerificationScreen  from '../src/screens/authentication/VerificationScreen';


jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  useRoute: () => ({
    params: { email: 'test@example.com' },
  }),
}));

jest.mock('../src/screens/authentication/VerificationHook', () => ({
  verification: jest.fn().mockReturnValue({
    success: true,
    statusCode: 200,
    verificationResp: 'verification successful',
    errorMessage: '',
  }),
}));

describe("Testing VerificationScreen component", () => {
  it("renders without crashing", () => {
    render(<VerificationScreen />);
  });

  it("displays OTP input field", () => {
    const { getByPlaceholderText } = render(<VerificationScreen />);
    const otpInput = getByPlaceholderText("Enter OTP");
    expect(otpInput).toBeTruthy();
  });

  it("handles user input in OTP field", () => {
    const { getByPlaceholderText } = render(<VerificationScreen />);
    const otpInput = getByPlaceholderText("Enter OTP");
    fireEvent.changeText(otpInput, "1234");
    expect(otpInput.props.value).toBe("1234");
  });

});
