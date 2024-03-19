import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DropdownComponent from '../src/components/Dropdown';

describe("Testing Dropdown component", () => {
    it("renders dropdown with placeholder 'Select Batch'", () => {
        const placeholder = "Select Batch"
        const mockFunction = jest.fn();
        const mockData = [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
        ];

        const { getByPlaceholderText } = render(
            <DropdownComponent
                placeholder={"Select Batch"}
                data={mockData}
                setBatch={mockFunction}
            />
        );

        expect(getByPlaceholderText("Select Batch")).toBeTruthy();
    });

    it("selects an option from dropdown", () => {
        const mockFunction = jest.fn();
        const mockData = [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
        ];

        const { getByPlaceholderText, debug } = render(
            <DropdownComponent
                placeholder="Select Batch"
                data={mockData}
                setBatch={mockFunction}
            />
        );
        
        // Debugging statement to log the rendered component
        debug();
        const dropdown = getByPlaceholderText('Select Batch');

        // Simulate opening dropdown
        fireEvent.press(dropdown);

        // Select an option from the dropdown
        fireEvent.changeText(dropdown, 'Option 1');

        // Check if the setBatch function is called with the correct value
        expect(mockFunction).toHaveBeenCalledWith('option1');
    });
});
