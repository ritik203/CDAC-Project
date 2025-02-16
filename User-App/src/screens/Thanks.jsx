import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ThankYouScreen = ({ route, navigation }) => {
  const { total } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thank You!</Text>
      <Text style={styles.message}>Your order has been placed successfully.</Text>
      <Text style={styles.details}>
        Total: ₹{total.toFixed(2)}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BookStore')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#34495E',
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ThankYouScreen;
