import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DropdownComponent from '../src/components/Dropdown';

describe("Testing Dropdown component", () => {
    it("renders dropdown with placeholder", () => {
        const placeholder = "Select Batch"
        const mockFunction = jest.fn();
        const mockData = [
            { label: '1', value: 'ILP 2023-24 B2' },
            { label: '2', value: 'ILP 2023-24 B3' },
        ];

        const { getByText } = render(
            <DropdownComponent
                placeholder={placeholder}
                data={mockData}
                setBatch={mockFunction}
            />
        );

        expect(getByText("Select Batch")).toBeTruthy();
    });

    it("selects an option from dropdown", () => {
        const mockFunction = jest.fn();
        const mockData = [
            { label: '1', value: 'ILP 2023-24 B2' },
            { label: '2', value: 'ILP 2023-24 B3' },
        ];

        const { getByText} = render(
            <DropdownComponent
                placeholder="Select Batch"
                data={mockData}
                setBatch={mockFunction}
            />
        );
        
        const dropdown = getByText('Select Batch');

        fireEvent.press(dropdown);

        const change = fireEvent.changeText(dropdown, 'ILP 2023-24 B2');
    });
});
