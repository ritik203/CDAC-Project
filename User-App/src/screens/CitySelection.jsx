import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert 
} from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { useCity } from '../services/CityContext';
import { API_URL } from '../helpers/default';

const CitySelection = ({ navigation }) => {
  const [cities, setCities] = useState([]);  // Ensure cities is an array
  const [loading, setLoading] = useState(true);
  const { dispatch: cityDispatch } = useCity();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${API_URL.base}/city`); // Replace with your actual backend URL
        if (response.data && Array.isArray(response.data.data)) {
          setCities(response.data.data); // Assuming the cities are inside 'data' array
        } else {
          Alert.alert('Error', 'Invalid city data received.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch cities.');
      }
      setLoading(false);
    };

    fetchCities();
  }, []);

  const handleCitySelect = (city) => {
    console.log(city);
    cityDispatch({ type: "city/save", payload: city });
    navigation.navigate("Home"); 
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.label}>Select Your City</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#e50914" />
      ) : (
        <View style={styles.cityListContainer}>
          {cities.length > 0 ? (
            cities.map((city) => (
              <TouchableOpacity
                key={city.city_id} // Using city_id as the key
                style={styles.cityItem}
                onPress={() => handleCitySelect(city)} // Passing city name as selected city
              >
                <Text style={styles.cityName}>{city.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noCities}>No cities available</Text> // Handle empty city list
          )}
        </View>
      )}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cityListContainer: {
    marginTop: 20,
  },
  cityItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 5,
  },
  cityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noCities: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default CitySelection;
