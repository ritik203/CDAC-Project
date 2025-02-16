import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const TicketScreen = ({ route, navigation }) => {
  const { movieTitle, theatreName, showTime, selectedSeats } = route.params;
  const [ticketData, setTicketData] = useState({
    movieTitle: 'N/A',
    selectedTheatre: 'N/A',
    selectedTime: 'N/A',
    selectedSeats: [],
  });
  const getCurrentDate = () => new Date().toISOString().split('T')[0];

  
  
  

  useEffect(() => {
    if (route.params) {
      console.log("Updated Route Params:", route.params);
      setTicketData({
        movieTitle,
        theatreName,
        showTime,
        selectedSeats: Array.isArray(selectedSeats) ? selectedSeats : [],
      });
    }
  }, [route.params]);
  console.log(route.params)

  const pricePerSeat = 200;
  const totalPrice = ticketData.selectedSeats.length * pricePerSeat;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.ticketContainer}>
        <Text style={styles.ticketHeader}>🎟️ Your Ticket</Text>

        {/* Movie Name */}
        <View style={styles.ticketInfoContainer}>
          <Text style={styles.ticketLabel}>Movie:</Text>
          <Text style={styles.ticketValue}>{ticketData.movieTitle}</Text>
        </View>

        {/* Theatre Name */}
        <View style={styles.ticketInfoContainer}>
          <Text style={styles.ticketLabel}>Theatre:</Text>
          <Text style={styles.ticketValue}>{ticketData.theatreName}</Text>
        </View>

        {/* Showtime */}
        <View style={styles.ticketInfoContainer}>
          <Text style={styles.ticketLabel}>Showtime:</Text>
          <Text style={styles.ticketValue}>{getCurrentDate()}</Text>
          <Text style={styles.ticketValue}>{ticketData.showTime}</Text>
        </View>

        {/* Selected Seats */}
        <View style={styles.ticketInfoContainer}>
          <Text style={styles.ticketLabel}>Selected Seats:</Text>
          <Text style={styles.ticketValue}>
            {ticketData.selectedSeats.length > 0 ? ticketData.selectedSeats.join(', ') : 'N/A'}
          </Text>
        </View>

        {/* Total Price */}
        <View style={styles.ticketInfoContainer}>
          <Text style={styles.ticketLabel}>Total Price:</Text>
          <Text style={styles.ticketValue}>Rs {totalPrice}.00</Text>
        </View>

        {/* Confirm Ticket Button */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.confirmButtonText}>Confirm Ticket</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  ticketContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  ticketHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
  },
  ticketInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  ticketLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ticketValue: {
    fontSize: 18,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TicketScreen;
