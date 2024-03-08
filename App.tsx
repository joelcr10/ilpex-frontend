import {Provider} from 'react-redux';
import { store } from './src/context/store';
import Main from './src/Main';
import React from 'react';
import ManageUserScreen from './src/screens/admin/ManageUserScreen';
import { ForgotPasswordScreen } from './src/screens/authentication/ForgotPasswordScreen';

const App = () => {
  return (
    // <Provider store={store}>
    //   <Main />
    // </Provider>
    <ForgotPasswordScreen/>
    );
};
 
export default App;




