import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {haze, rainy, snow, sunny} from '../images/index';
import SearchBar from './SearchBar';

interface WeatherProps {
  weatherData: {
    weather: {
      main: string;
    }[];
    name: string;
    main: {
      temp: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
  };
  fetchWeatherData: () => void;
}

const Weather: React.FC<WeatherProps> = ({weatherData, fetchWeatherData}) => {
  const [backgroundImage, setBackgroundImage] = useState<any>(null);

  const {weather, name, main, wind} = weatherData;
  const [{main: weatherMain}] = weather;

  useEffect(() => {
    setBackgroundImage(getBackgroundImg(weatherMain));
  }, [weatherData]);

  function getBackgroundImg(weather: string) {
    if (weather === 'Snow') return snow;
    if (weather === 'Clear') return sunny;
    if (weather === 'Rain') return rainy;
    if (weather === 'Haze') return haze;
    return haze;
  }

  let textColor = backgroundImage !== sunny ? 'white' : 'black';

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="darkgray" />
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImg}
        resizeMode="cover">
          
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
            {weatherMain}
          </Text>
          <Text style={{...styles.headerText, color: textColor}}>
            {main.temp} °C
          </Text>
        </View>

        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Text style={{fontSize: 22, color: 'white'}}>Humidity</Text>
            <Text style={{fontSize: 22, color: 'white'}}>
              {main.humidity} %
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={{fontSize: 22, color: 'white'}}>Wind Speed</Text>
            <Text style={{fontSize: 22, color: 'white'}}>{wind.speed} m/s</Text>
          </View>
        </View>

        <View style={{alignSelf: 'center'}}>
          <SearchBar fetchWeatherData={fetchWeatherData} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  backgroundImg: {
    flex: 1,
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
    backgroundColor: 'rgba(0,0,0, 0.7)',
    marginHorizontal: '5%',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
});

export default Weather;
