import {Provider} from 'react-redux';
import { store } from './src/context/store';
import Main from './src/Main.tsx';
import React from 'react';
import { Text, View } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    
    </Provider>
  );
};
 
export default App;