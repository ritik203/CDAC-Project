import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useUser } from '../services/UserContext';
import { API_URL } from '../helpers/default';


const PaymentScreen = ({ route, navigation }) => {
  const { movieTitle, theatreName, showTime, selectedSeats, amount, theatreId, showId } = route.params;
  const { user_id } = useUser();
  console.log(selectedSeats);
  
  console.log(route.params);
  console.log("show id : ",showId);
  

  const [isChecked, setIsChecked] = useState(false);


  const handleConfirmBooking = async () => {
    try {
      const transactionId = `txn_${Date.now()}`;
      const method = "Pay at Entry";
      const noOfSeats = selectedSeats.length;
  
      // ✅ 1️⃣ Payment API Call
      const paymentResponse = await fetch(`${API_URL.base}/booking/payment/${user_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, method, transactionId }),
      });
  
      const paymentData = await paymentResponse.json();
      console.log("Payment Response:", paymentData);
  
      if (!paymentResponse.ok || !paymentData.paymentId) {
        throw new Error(paymentData.error || "Payment failed");
      }
  
      const paymentId = paymentData.paymentId;
  
      // ✅ 2️⃣ Booking API Call
      const bookingResponse = await fetch(`${API_URL.base}/booking/seats/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noOfSeats,
          theatreId,
          showId,
          paymentId,
          userId: user_id,
          selectedSeats,  // ✅ Ensure correct key
        }),
      });
  
      const bookingData = await bookingResponse.json();
      console.log("Booking Response:", bookingData);
  
      if (!bookingResponse.ok || !bookingData.bookingId) {
        throw new Error(bookingData.error || "Booking failed");
      }
  
      Alert.alert("Success", "Booking confirmed!", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("Ticket", {
              bookingId: bookingData.bookingId,
              movieTitle,
              theatreName,
              showTime,
              theatreId,
              selectedSeats,
            }),
        },
      ]);
    } catch (error) {
      console.error("Booking Error:", error);
      Alert.alert("Error", error.message);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>

      {/* Theatre Name and Show Time Display */}
      <Text style={styles.detailsText}>Theatre: {theatreName}</Text>
      <Text style={styles.detailsText}>Show Time: {showTime}</Text>

      {/* Custom Radio Button */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => setIsChecked(!isChecked)}
      >
        <View style={styles.radioCircle}>
          {isChecked && <View style={styles.checkedCircle} />}
        </View>
        <Text style={styles.optionText}>Pay at the Time of Entry</Text>
      </TouchableOpacity>

      {/* Confirm Button (Disabled if not checked) */}
      <TouchableOpacity
        style={[styles.payButton, !isChecked && styles.disabledButton]}
        onPress={handleConfirmBooking} // ✅ Calls function without missing params
        disabled={!isChecked}
      >
        <Text style={styles.payButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E74C3C',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#E74C3C',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  payButton: {
    backgroundColor: '#E74C3C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default PaymentScreen;
