import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import { haze, rainy, snow, sunny } from '../images/index';
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
  fetchWeatherData: (cityName: string) => void;
}

const Weather: React.FC<WeatherProps> = ({ weatherData, fetchWeatherData }) => {
  const { weather, name, main, wind } = weatherData;
  const [{ main: weatherMain }] = weather;
  const [backgroundImage, setBackgroundImage] = useState<any>(null);

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
      {backgroundImage && (
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImg}
          resizeMode="cover">
          <View style={styles.contentContainer}>
            <View style={styles.weatherInfo}>
              <Text style={[styles.headerText, { color: textColor, fontWeight: '800', fontSize: Dimensions.get('screen').width / 10 }]}>
                {name}
              </Text>
              <Text style={[styles.headerText, { color: textColor, fontWeight: 'bold', fontSize: 20 }]}>
                {weatherMain}
              </Text>
              <Text style={[styles.headerText, { color: textColor, fontSize: Dimensions.get('screen').width / 10 }]}>
                {main.temp} °C
              </Text>
            </View>

            <View style={styles.extraInfo}>
              <View style={styles.info}>
                <Text style={styles.infoText}>Humidity</Text>
                <Text style={styles.infoText}>{main.humidity} %</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.infoText}>Wind Speed</Text>
                <Text style={styles.infoText}>{wind.speed} m/s</Text>
              </View>
            </View>

            <View style={styles.searchBarContainer}>
              <SearchBar fetchWeatherData={fetchWeatherData} />
            </View>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImg: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    marginTop: 10,
  },
  weatherInfo: {
    alignItems: 'center',
  },
  extraInfo: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '95%'
  },
  info: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
  },
  infoText: {
    fontSize: 16,
    color: 'white',
  },
  searchBarContainer: {
    position: 'absolute',
    bottom: 20,
  },
});

export default Weather;