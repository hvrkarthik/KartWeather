import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native';
import SearchBar from './src/screens/SearchBar';
import Weather from './src/screens/Weather';

const API_KEY = '207747207310538a4e209c54ba715d68';

interface WeatherData {
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
}

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loaded, setLoaded] = useState<boolean>(true);

  async function fetchWeatherData(cityName: string) {
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
    try {
      const response = await fetch(API);
      if (response.status === 200) {
        const data: WeatherData = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWeatherData('Mumbai');
  }, []);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="gray" size={36} />
      </View>
    );
  } else if (weatherData === null) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="darkgray" />
        <SearchBar fetchWeatherData={fetchWeatherData} />
        <Text style={styles.primaryText}>
          City Not Found! Try Different City
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    marginVertical: 20,
    fontSize: 28,
    textAlign: 'center',
  },
});

export default App;