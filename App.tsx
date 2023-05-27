import React from 'react';
import {SafeAreaView} from 'react-native';
import WeatherScreen from './src/weather';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WeatherScreen />
    </SafeAreaView>
  );
};

export default App;