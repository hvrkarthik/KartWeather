import React, {useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

interface SearchBarProps {
  fetchWeatherData: (cityName: string) => void;
}

export default function SearchBar({fetchWeatherData}: SearchBarProps) {
  const [cityName, setCityName] = useState<string>('');

  return (
    <KeyboardAvoidingView style={styles.searchBar} behavior="padding">
      <TextInput
        placeholder="Enter City name"
        value={cityName}
        onChangeText={text => setCityName(text)}
        style={styles.textInput}
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => fetchWeatherData(cityName)}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width - 20,
    borderWidth: 1.5,
    paddingVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: '00bfff',
    borderColor: '00bfff',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  searchButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0, 0.7)',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
