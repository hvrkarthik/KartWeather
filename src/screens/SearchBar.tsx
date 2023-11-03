import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';

interface SearchBarProps {
  fetchWeatherData: (cityName: string) => void;
}

export default function SearchBar({ fetchWeatherData }: SearchBarProps) {
  const [cityName, setCityName] = useState<string>('');

  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Enter City name"
        value={cityName}
        onChangeText={(text) => setCityName(text)}
        style={styles.textInput}
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => fetchWeatherData(cityName)}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
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
    backgroundColor: 'gray',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
