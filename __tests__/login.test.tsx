import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import LoginScreen from '../src/screens/authentication/LoginScreen';
import { Provider } from 'react-redux'; // Import Provider
import configureStore from 'redux-mock-store'; 

import userReducer from '../src/context/userSlice';
import userDetailsReducer from '../src/context/userDetailsSlice'


const mockStore = configureStore([]);

describe("Login screen testing", () =>{
    it("testing the login buttons", () =>{
        let store = mockStore({
            // You can provide initial state here if needed
            reducer: {
                userReducer,            
                userDetailsReducer,
              },
          });
        const { getByText } = render(
          <Provider store={store}>
            <LoginScreen />
          </Provider>
        );
        expect(getByText('Email')).toBeTruthy();
        expect(getByText('Password')).toBeTruthy();
    })
})