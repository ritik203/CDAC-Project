import React, { useState, useEffect } from 'react';
import { 
  View, Text, ScrollView, FlatList, TouchableOpacity, Image, 
  StyleSheet, ActivityIndicator, Alert 
} from 'react-native';
import axios from 'axios';
import { useCity } from '../services/CityContext';

const HomeScreen = ({ route, navigation }) => {
  
  // const { selectedCity } = route?.params || {};  // Access selected city from route.params
  const [movies, setMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const { name } = useCity();


  const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTA5MWRiMWU5NDBiMWQ3ZDY2MWU3NDA4NWQ5ZjgxNiIsIm5iZiI6MTczODU0ODk5MS40MTIsInN1YiI6IjY3YTAyNmZmMDRjYjZmNDFiOWNiN2Y1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n1odaliRZ4kGKlWfCdwXQgOVGs6yG1QTfGjlveAUa9s";
  const API_BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchAndSortMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/movie/now_playing`, {
          params: { language: 'en-US', page: '1' },
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        const nowPlayingMovies = response.data.results;
        setMovies(nowPlayingMovies);
        setTopRated([...nowPlayingMovies].sort((a, b) => b.vote_average - a.vote_average));
        setPopular([...nowPlayingMovies].sort((a, b) => b.popularity - a.popularity));
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch movies.');
      }
      setLoading(false);
    };

    fetchAndSortMovies();  // Fetch movies only once when the component mounts
  }, []);  // Empty dependency array to avoid re-fetching movies when city changes

  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { movie: item })}
    >
      <Image
        source={{ uri: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/120x180' }}
        style={styles.image}
      />
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.rating}>⭐ {item.vote_average.toFixed(1)}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Ensure this Text component wraps selectedCity */}
      <Text style={styles.label}>Selected City: {name ? name : "Not Selected"}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#e50914" style={{ marginVertical: 20 }} />
      ) : (
        <>
          <Text style={styles.header}>Now Playing 🎬</Text>
          <FlatList 
            data={movies} 
            keyExtractor={(item) => item.id.toString()} 
            renderItem={renderMovie} 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.listContainer} 
          />
          
          <Text style={styles.header}>Top Rated ⭐</Text>
          <FlatList 
            data={topRated} 
            keyExtractor={(item) => item.id.toString()} 
            renderItem={renderMovie} 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.listContainer} 
          />
          
          <Text style={styles.header}>Popular 📈</Text>
          <FlatList 
            data={popular} 
            keyExtractor={(item) => item.id.toString()} 
            renderItem={renderMovie} 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.listContainer} 
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 5,
  },
  listContainer: {
    paddingHorizontal: 5,
  },
  card: {
    width: 140,
    marginRight: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  rating: {
    fontSize: 13,
    color: '#444',
    marginTop: 3,
  },
});

export default HomeScreen;
