import {Provider} from 'react-redux';
import { store } from './src/context/store';
import Main from './src/Main';
import React from 'react';
import ManageUserScreen from './src/screens/admin/ManageUserScreen';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
    );
};
 
export default App;




