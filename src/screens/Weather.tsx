import React, {useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SearchBar from './SearchBar';

interface WeatherProps {
  weatherData: {
    weather: {main: string}[];
    name: string;
    main: {temp: number; humidity: number};
    wind: {speed: number};
  };
  fetchWeatherData: (cityName: string) => void;
}

export default function Weather({weatherData, fetchWeatherData}: WeatherProps) {
  const [backgroundImage, setBackgroundImage] = useState<any>(null);

  const {
    weather,
    name,
    main: {temp, humidity},
    wind: {speed},
  } = weatherData;
  const [{main}] = weather;

  let textColor = 'black';

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar backgroundColor="#00bfff" />
      <SearchBar fetchWeatherData={fetchWeatherData} />

      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            ...styles.headerText,
            color: textColor,
            fontWeight: 'bold',
            fontSize: 46,
          }}>
          {name}
        </Text>
        <Text
          style={{
            ...styles.headerText,
            color: textColor,
            fontWeight: 'bold',
          }}>
          {main}
        </Text>
        <Text style={{...styles.headerText, color: textColor}}>{temp} °C</Text>
      </View>

      <View style={styles.extraInfo}>
        <View style={styles.info}>
          <Text style={{fontSize: 22, color: 'white'}}>Humidity</Text>
          <Text style={{fontSize: 22, color: 'white'}}>{humidity} %</Text>
        </View>

        <View style={styles.info}>
          <Text style={{fontSize: 22, color: 'white'}}>Wind Speed</Text>
          <Text style={{fontSize: 22, color: 'white'}}>{speed} m/s</Text>
        </View>
      </View>
  
    </KeyboardAvoidingView>
  );
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 36,
    marginTop: 10,
  },
  extraInfo: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    padding: 10,
  },
  info: {
    width: Dimensions.get('screen').width / 2.5,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    marginHorizontal: '5%',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
});
