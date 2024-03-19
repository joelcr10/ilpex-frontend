import React from 'react';
import { render } from '@testing-library/react-native';
import CircularProgress from '../src/components/CircularProgress';

describe("Percentage Display in CircularProgress component", () => {
    it("displays the correct percentage", () => {
        const completeStatus = 75;
        const { getByText } = render(<CircularProgress completeStatus={completeStatus} color="green" />);
        
        expect(getByText(`${completeStatus}%`)).toBeTruthy();
    });
});


describe("Color in CircularProgress component", () => {
    it("applies the correct color", () => {
        const color = 'red';
        const { queryByText } = render(<CircularProgress completeStatus={50} color={color} />);
        
        expect(queryByText('progress-circle'));
    });
});