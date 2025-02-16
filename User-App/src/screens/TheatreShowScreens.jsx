import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useCity } from '../services/CityContext';
import { API_URL } from '../helpers/default';


const TheatreShowsScreen = ({ route, navigation }) => {
    const { movie } = route.params;
    const [selectedShow, setSelectedShow] = useState(null);
    const [theatres, setTheatres] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useCity();

    useEffect(() => {
        fetchTheatresAndShowtimes();
    }, []);

    const fetchTheatresAndShowtimes = async () => {
        setLoading(true);
        try {
            const theatresResponse = await axios.get(`${API_URL.base}/movie/theatre/${id}`);
            const theatreList = theatresResponse.data.data;

            const showtimeRequests = theatreList.map(theatre =>
                axios.get(`${API_URL.base}/movie/show`, {
                    params: {
                        movieName: movie.title,
                        theatreName: theatre.theatre_name,
                        showDate: getCurrentDate(),
                    },
                })
                .then(response => ({
                    ...theatre,
                    showtimes: filterFutureShows(response.data.data),
                }))
                .catch(error => {
                    console.error(`Error fetching shows for ${theatre.theatre_name}:`, error);
                    return { ...theatre, showtimes: [] };
                })
            );

            const theatresWithShows = await Promise.all(showtimeRequests);

            // Filter out theatres that have no available shows
            setTheatres(theatresWithShows.filter(theatre => theatre.showtimes.length > 0));
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Could not load theatres and showtimes.");
        } finally {
            setLoading(false);
        }
    };

    const getCurrentDate = () => new Date().toISOString().split('T')[0];

    const filterFutureShows = (shows) => {
        const currentTime = new Date();
        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();

        return shows
            .map(show => ({
                showId: show.show_id,
                startTime: show.start_time,
                endTime: show.end_time,
            }))
            .filter(show => {
                const [showHours, showMinutes] = show.startTime.split(':').map(Number);
                return showHours > currentHours || (showHours === currentHours && showMinutes > currentMinutes);
            });
    };

    const handleConfirmSelection = () => {
        if (selectedShow) {
            navigation.navigate('SeatMap', {
                movieTitle: movie.title,
                theatreName: selectedShow.theatreName,
                showTime: selectedShow.startTime,
                theatreId: selectedShow.theatreId,
                showId: selectedShow.showId,
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.subtitle}>Select Theatre and Show:</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#FF4500" />
            ) : (
                <ScrollView style={styles.showList}>
                    {theatres.length > 0 ? (
                        theatres.map((theatre, index) => (
                            <View key={index} style={styles.theatreRow}>
                                <Text style={styles.theatreName}>{theatre.theatre_name}</Text>

                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.showtimeScroll}>
                                    {theatre.showtimes.map((show, idx) => (
                                        <TouchableOpacity
                                            key={idx}
                                            style={[styles.timeButton, selectedShow?.showId === show.showId && styles.selectedTime]}
                                            onPress={() => setSelectedShow({ ...show, theatreName: theatre.theatre_name, theatreId: theatre.theatre_id })}
                                        >
                                            <Text style={styles.timeText}>{show.startTime} - {show.endTime}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noDataText}>No theatres with available shows.</Text>
                    )}
                </ScrollView>
            )}

            <TouchableOpacity
                style={[styles.confirmButton, !selectedShow && styles.disabledButton]}
                onPress={handleConfirmSelection}
                disabled={!selectedShow}
            >
                <Text style={styles.confirmButtonText}>Confirm Selection</Text>
            </TouchableOpacity>
        </View>
    );
};

// 🎨 Styles
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#FFFFFF' },
    title: { fontSize: 22, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 10 },
    subtitle: { fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 15 },
    showList: { flex: 1 },
    theatreRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    theatreName: { fontSize: 18, fontWeight: 'bold', color: '#000', marginRight: 10, width: 150 },
    showtimeScroll: { flex: 1 },
    timeButton: { padding: 10, borderWidth: 1, borderRadius: 5, marginRight: 10 },
    selectedTime: { backgroundColor: '#FFA07A' },
    timeText: { fontSize: 16, color: '#000' },
    confirmButton: { marginTop: 20, padding: 15, backgroundColor: '#FF4500', borderRadius: 5 },
    disabledButton: { backgroundColor: '#CCC' },
    confirmButtonText: { color: '#FFF', textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
});

export default TheatreShowsScreen;
