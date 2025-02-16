import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';
import { API_URL } from '../helpers/default';

// Change to your backend IP
const socket = io(API_URL.socket);

const SeatMapScreen = ({ route, navigation }) => {
  const { movieTitle, theatreName, showTime, theatreId, showId } = route.params;
  
  const rows = 6;
  const cols = 6;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]); // Store booked seats

  useEffect(() => {
    // Fetch initially booked seats
    axios.get(`${API_URL.socket}/seats/booked/${showId}`)
      .then(response => {
        if (response.data.bookedSeats) {
          setBookedSeats(response.data.bookedSeats.map(seat => seat.trim())); // Clean any whitespace
        }
      })
      .catch(error => console.error("Error fetching booked seats:", error));

    // Listen for real-time seat updates
    socket.on("updateSeats", ({ showId: updatedShowId, bookedSeats }) => {
      if (updatedShowId === showId) {
        setBookedSeats(bookedSeats.map(seat => seat.trim())); // Clean whitespace
      }
    });

    return () => socket.off("updateSeats"); // Cleanup on unmount
  }, [showId]);

  // Handle seat selection
  const toggleSeatSelection = (seat) => {
    if (bookedSeats.includes(seat)) {
      Alert.alert("Seat Unavailable", "This seat is already booked.");
      return;
    }

    setSelectedSeats(prevSelectedSeats =>
      prevSelectedSeats.includes(seat)
        ? prevSelectedSeats.filter(s => s !== seat)
        : [...prevSelectedSeats, seat]
    );
  };

  // Confirm Booking
  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      Alert.alert('No Seats Selected', 'Please select at least one seat.');
      return;
    }

    const seatPrice = 200;
    const amount = selectedSeats.length * seatPrice;

    navigation.navigate('Payment', {
      movieTitle,
      showTime,
      showId,
      selectedSeats,
      amount,
      theatreId,
      theatreName
    });
  };

  // Render seat button
  const renderSeat = (row, col) => {
    const seatNumber = `${String.fromCharCode(65 + row)}${col + 1}`;
    const isSelected = selectedSeats.includes(seatNumber);
    const isBooked = bookedSeats.includes(seatNumber);

    return (
      <TouchableOpacity
        key={seatNumber}
        style={[styles.seat, isSelected && styles.selectedSeat, isBooked && styles.bookedSeat]}
        onPress={() => toggleSeatSelection(seatNumber)}
        disabled={isBooked} // Disable booked seats
      >
        <Text style={styles.seatText}>{seatNumber}</Text>
      </TouchableOpacity> 
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movieTitle}</Text>
      <Text style={styles.subtitle}>{theatreName} - {showTime}</Text>

      <View style={styles.screenContainer}>
        <Text style={styles.screenText}>SCREEN</Text>
      </View>

      <FlatList
        data={Array.from({ length: rows }, (_, row) => row)}
        keyExtractor={row => row.toString()}
        renderItem={({ item: row }) => (
          <View style={styles.row}>
            {Array.from({ length: cols }, (_, col) => renderSeat(row, col))}
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.confirmButton, selectedSeats.length === 0 && styles.disabledButton]}
        onPress={handleConfirmBooking}
        disabled={selectedSeats.length === 0}
      >
        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFFFFF' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 15 },
  screenContainer: { alignItems: 'center', marginBottom: 20, padding: 10, backgroundColor: '#dcdcdc', borderRadius: 5 },
  screenText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  row: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  seat: { width: 40, height: 40, margin: 5, backgroundColor: '#32CD32', alignItems: 'center', justifyContent: 'center', borderRadius: 5 },
  selectedSeat: { backgroundColor: '#FF4500' },
  bookedSeat: { backgroundColor: '#808080' }, // Grey color for booked seats
  seatText: { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' },
  confirmButton: { backgroundColor: '#FF4500', paddingVertical: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  disabledButton: { backgroundColor: '#CCCCCC' },
  confirmButtonText: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
});

export default SeatMapScreen;
