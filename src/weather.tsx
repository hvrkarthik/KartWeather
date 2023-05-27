import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import axios, {AxiosError} from 'axios';

interface WeatherData {
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
  };
}

const WeatherScreen: React.FC = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get<WeatherData>(
        'https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=fc68cc47a4514e5b98bb8666f6ead1b6&include=minutely',
      );
      console.log('Weather API response:', response.data);
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      console.log('Error fetching weather data:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          setError(axiosError.response.data.error.message);
        } else {
          setError('Request failed. Please try again.');
        }
      } else {
        setError('Failed to fetch weather data.');
      }
      setWeatherData(null);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Get Weather" onPress={fetchWeatherData} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {weatherData ? (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>
            Temperature: {weatherData.current?.temp_c}°C
          </Text>
          <Text style={styles.weatherText}>
            Weather: {weatherData.current?.condition?.text}
          </Text>
          {/* Display any other relevant weather information */}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default WeatherScreen;
