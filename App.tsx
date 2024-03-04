import React from 'react';
import { Text, View } from 'react-native';
import {Provider} from 'react-redux';

// import { ilpexColor,ilpexFont } from './src/utils/ilpexUI';
import { store } from './src/context/store';
import Main from './src/main.tsx';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};
 
export default App;