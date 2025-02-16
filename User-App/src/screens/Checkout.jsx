import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { CartContext, useCart } from '../services/CartProvider'; // Import CartContext
import { useUser } from '../services/UserContext';

const CheckoutScreen = ({ navigation }) => {
  const { cart, clearCart } = useCart();
  const { user_id } = useUser();
  console.log(user_id);
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Calculate total price of items in the cart
  const totalPrice = cart.reduce(
    (sum, item) => sum + (parseFloat(item.price || 0) * (item.quantity || 1)),
    0
  );

  // Handle payment logic
  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      Alert.alert("Error", "Please select a payment method");
      return;
    }
  
    // Ensure bookId and userId are valid
    const bookId = cart[0]?.id;

    if (!id || !bookId) {
      Alert.alert("Error", "Invalid user or book ID");
      return;
    }
  
    try {
      const response = await fetch("http://10.0.2.2:4444/user/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: id,
          bookId: bookId,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
  
      const result = await response.json();
  
      if (result.status === "success") {
        clearCart();
        navigation.navigate("ThankYou", { method: selectedPaymentMethod, total: totalPrice });
      } else {
        Alert.alert("Error", result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Error", error.message || "Failed to process payment. Please try again.");
    }
  };
  

  // If cart is empty, show a message
  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your cart is empty!</Text>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Text style={styles.totalText}>Total: ₹{(totalPrice || 0).toFixed(2)}</Text>
      <Text style={styles.paymentTitle}>Select Payment Method</Text>

      {/* Payment Options */}
      {['Credit Card', 'UPI', 'Cash on Delivery'].map((method, index) => (
        <TouchableOpacity
          key={index}
          style={styles.radioButtonContainer}
          onPress={() => setSelectedPaymentMethod(method)}
        >
          <View style={styles.radioButton}>
            {selectedPaymentMethod === method && <View style={styles.selectedCircle} />}
          </View>
          <Image
            source={{
              uri:
                method === 'Credit Card'
                  ? 'https://upload.wikimedia.org/wikipedia/commons/4/41/MasterCard-logo.png'
                  : method === 'UPI'
                  ? 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Unified_Payments_Interface_logo.png'
                  : 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Cash_on_delivery_logo.png',
            }}
            style={styles.paymentIcon}
          />
          <Text style={styles.radioButtonText}>{method}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.buttonText}>Proceed with Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495E',
    textAlign: 'center',
    marginVertical: 15,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginVertical: 15,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3498db',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3498db',
  },
  radioButtonText: {
    fontSize: 18,
    color: '#34495E',
  },
  paymentIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  paymentButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CheckoutScreen;
