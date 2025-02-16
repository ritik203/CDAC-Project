
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DetailsScreen = ({ route, navigation }) => {
  const { movie } = route.params;
  const [interestedCount, setInterestedCount] = useState(216500); // Example count

  const handleBookTicket = () => {
    navigation.navigate('TheatreShows', { movie });
  };

  const handleWatchTrailer = () => {
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${movie.title} trailer`;
    Linking.openURL(youtubeSearchUrl);
  };

  const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  const genreNames = movie.genre_ids.map(id => genres[id] || 'Unknown');

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.detailsContainer}>
        {/* Movie Poster */}
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.image}
          />

        {/* Movie Information */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{movie.title}</Text>
          

          {/* Movie Details */}
          <Text style={styles.details}>2D | {movie.original_language.toUpperCase()}</Text>
          <Text style={styles.details}>{genreNames.join(', ')} • {movie.adult ? '18+' : 'UA16+'}</Text>
          <Text style={styles.details}>Release Date: {movie.release_date}</Text>
          <Text style={styles.details}>Rating: {movie.vote_average} ⭐</Text>



          <TouchableOpacity style={[styles.button, styles.trailerButton]} onPress={handleWatchTrailer}>
            <Ionicons name="logo-youtube" size={18} color="white" />
            <Text style={styles.buttonText}> Watch Trailer</Text>
          </TouchableOpacity>



          
        </View>
      </View>

      {/* Movie Description */}
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>About the movie</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        {/* Book Ticket Button */}
      </View>

      <View style={{ position: "absolute", bottom: 10, width: "100%", marginHorizontal: 20 }}>
      <TouchableOpacity style={styles.button} onPress={handleBookTicket}>
          <Text style={styles.buttonText}>Book Tickets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    height : "100%",
  },

  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 160,
    height: 280,
    resizeMode: 'stretch',
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  interestedContainer: {
    marginBottom: 10,
  },
  interestedButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  interestedText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  button: {
    backgroundColor: '#e50914',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    justifyContent : "center",
    flexDirection : "row"
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  buttonContent: {
    flexDirection: 'row', // Align icon and text side by side
    alignItems: 'center', // Center them vertically
    justifyContent: 'center',
  },  
  aboutContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  overview: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});

export default DetailsScreen;
