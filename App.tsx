import {Provider} from 'react-redux';
import { store } from './src/context/store';
import Main from './src/Main';
import React from 'react';
import { Text, View } from 'react-native';
import Daywise from './src/components/DaywiseCard';

const App = () => {
  return (
    // <Provider store={store}>
    //   <Main />
    // </Provider>
    <Daywise Day={1} status={true} progressValue={100} duration='2h 33min' />
  );
};
 
export default App;