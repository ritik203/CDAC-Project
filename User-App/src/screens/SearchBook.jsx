import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext, useCart } from '../services/CartProvider';

const SearchBookScreen = ({ route, navigation }) => {
  const { book } = route.params; 
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({type : "cart/add", payload : book});
    alert(`${book.title} has been added to your cart!`);
  };

  return (
    <View style={styles.container}>
          <Text style={styles.name}>{book.title}</Text>
          <Text style={styles.details}>Author: {book.author}</Text>
          <Text style={styles.price}>Price: ₹{book.price}</Text>
          <Text style={styles.details}>Stock Quantity: {book.stock_quantity}</Text>

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.backButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#007bff',
  },
});

export default SearchBookScreen;
