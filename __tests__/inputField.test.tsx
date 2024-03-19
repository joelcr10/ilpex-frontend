import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import InputField from '../src/components/InputField';


describe("Testing Input field component", () =>{
    it("checking the components exists or not", () =>{
        const mockFunction = jest.fn();
        const loginEmail = "joel.raju@experionglobal.com";
        const {getByTestId} = render(<InputField label='Email' 
            isPassword={true} 
            value={loginEmail}
            onChangeText={mockFunction}
         />);

         expect(getByTestId('input')).toBeTruthy();
        expect(getByTestId("input").props.value).toBe("joel.raju@experionglobal.com");
       
        expect(getByTestId('label')).toBeTruthy();
        expect(getByTestId('touchableOpacity')).toBeTruthy();
        
    })
})