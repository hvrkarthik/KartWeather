import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

interface SearchBarProps {
  fetchWeatherData: (cityName: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ fetchWeatherData }) => {
  const [cityName, setCityName] = useState<string>('');

  return (
    <KeyboardAvoidingView style={styles.searchBar} behavior="padding">
      <TextInput
        placeholder="Enter City name"
        value={cityName}
        onChangeText={text => setCityName(text)}
        style={styles.textInput}
        placeholderTextColor="#666"
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => fetchWeatherData(cityName)}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width - 40,
    borderWidth: 1,
    marginHorizontal: 20,
    backgroundColor: '#f0fff0',
    borderColor: '#000000',
    borderRadius: 10,
    height: 70,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 10,
  },
  searchButton: {
    height: '80%',
    width: '30%',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SearchBar;