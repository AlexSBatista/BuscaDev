import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Rootes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundcolor="#7D40E7" />
      <Rootes />  
    </>
  );
}
