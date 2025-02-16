import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, SafeAreaView } from 'react-native';
import { useUser } from '../services/UserContext';
import { API_URL } from '../helpers/default';

const BookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { user_id } = useUser();

  // Fetch past bookings from API
  const fetchBookings = async () => {
    try {
      console.log("Fetching from:", `${API_URL.base}/booking/bookings/past/${user_id}`);
  
      const response = await fetch(`${API_URL.base}/booking/bookings/past/${user_id}`);
      console.log("Response Status:", response.status);
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (data?.success && Array.isArray(data.pastBookings)) {
        setBookings(data.pastBookings);
      } else {
        console.log("No bookings found");
        setBookings([]);
      }
    } catch (error) {
      console.error("Error fetching past bookings:", error.message);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  useEffect(() => {
    fetchBookings();
  }, [user_id]);

  // Refresh function for pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBookings();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={fetchBookings} />
      </View>
    );
  }
  console.log("Bookings State:", bookings);

  const renderItem = ({ item }) => {
    console.log("Bookings State:", bookings);

    console.log("Booking Item: ", item); // Debugging
  
    return (
      <View style={styles.bookingItem}>
        <Text style={styles.bookingText}>Movie: {item.movie_name || "N/A"}</Text>
        <Text style={styles.bookingText}>
          Show Date: {item.show_date ? new Date(item.show_date).toLocaleString() : "N/A"}
        </Text>
        <Text style={styles.bookingText}>Number of Seats: {item.no_of_seats ?? "N/A"}</Text>
        <Text style={styles.bookingText}>Amount Paid: ₹{item.payment_amount ?? "N/A"}</Text>
        <Text style={styles.bookingText}>Payment Method: {item.payment_method || "N/A"}</Text>
        <Text style={styles.bookingText}>Transaction ID: {item.transaction_id || "N/A"}</Text>
        <Text style={styles.bookingText}>
          Booking Time: {item.booking_time ? new Date(item.booking_time).toLocaleString() : "N/A"}
        </Text>
        <Text style={styles.bookingText}>Theatre: {item.theatre_name || "N/A"}</Text>
        <View style={styles.separator}></View>
      </View>
    );
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Bookings</Text>
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(item) => item.booking_id}
        onRefresh={onRefresh}
        refreshing={refreshing}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No past bookings found.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  listContent: {
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  bookingItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  bookingText: {
    fontSize: 16,
    marginVertical: 5,
  },
  separator: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
  },
});

export default BookingsScreen;
