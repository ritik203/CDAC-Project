import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useUser } from '../services/UserContext';

const ProfileScreen = () => {
  const { user_id, last_email, first_name } = useUser();
  const [error, setError] = useState(null); 
  
  // if (!user_id || !last_email) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.errorText}>User not logged in!</Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: 'https://i.pinimg.com/236x/4a/cd/01/4acd0124f5c5b29fd25e69cf41c16fe3.jpg' }} 
          style={styles.profilePicture}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <TextInput style={styles.infoText} value={first_name || 'No Name'} editable={false} />
        </View>
        <View style={styles.infoRow}>
          <TextInput style={styles.infoText} value={last_email || 'No Email'} editable={false} />
        </View>
        <View style={styles.infoRow}>
          <TextInput style={styles.infoText} value={user_id || 'No Mobile'} editable={false} />
        </View>

      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#3c99ff',
  },
  infoContainer: {
    marginVertical: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  editButton: {
    fontSize: 16,
    color: '#007BFF',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProfileScreen;
