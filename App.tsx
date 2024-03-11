import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import { store } from './src/context/store';
import Main from './src/Main';
import React from 'react';
import { RootSiblingParent } from "react-native-root-siblings";



const App = () => {
  return (
    <Provider store={store}>
      <RootSiblingParent>
      <Main />
      </RootSiblingParent>
    </Provider>
    );
};
 
export default App;




