import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';

export default function SearchBar({ fetchWeatherData }) {
  const [cityName, setCityName] = useState('');

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
    borderRadius: 25,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: 'lightgray',
    borderColor: 'lightgray',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  searchButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 25,
    backgroundColor: 'gray',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});