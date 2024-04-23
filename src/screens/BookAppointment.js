import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; 
import { Calendar } from 'react-native-calendars'; 
import LabourProfileComponent from '../components/LabourProfileComponent'; 
import AppBar from '../components/AppBar'; 
//import CardContainer from '../components/CardContainer'; 

// BookAppointment component definition
const BookAppointment = () => {
  // State variable for storing selected date
  const [selectedDate, setSelectedDate] = useState('');

  // Function to handle date selection
  const handleDateSelect = (day) => {
    // Ensure that day.dateString is defined before setting the state
    if (day.dateString) {
      setSelectedDate(day.dateString); // Set the selected date
    }
  };

  // JSX rendering
  return (
    <View style={styles.container}>
      {/* AppBar component */}
       <AppBar Title="       BookAppointment" /> 
      {/* LabourProfileComponent */}
      <View style={styles.Labourprofile}>
        <LabourProfileComponent 
          profileImage={require('../assets/Images/profile_photo2.png')}
          name="Thanakaran"
          jobTitle="Plumber"
          rating={4} 
        /> 
      </View>
      {/* Label for selecting date */}
      <Text style={styles.label}>Select Date:</Text>
      {/* Calendar component for date selection */}
      <Calendar
        onDayPress={handleDateSelect} // Pass the function to handle date selection
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'blue' }, // Mark selected date with blue color
        }}
      />
      {/* Text for selecting hour */}
      <Text style={styles.lebel2}>Select Hour:</Text>
      {/* Text for selecting 'From' hour */}
      <Text style={styles.lebel3}>From:</Text>
      {/* CardContainer component for displaying hour selection */}
      {/* <CardContainer content="10.30"/> */}
      {/* Text for selecting 'To' hour */}
      <Text style={styles.lebel3}>To</Text>
    </View>
  );
};


export default BookAppointment;


const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up entire space
    margin: 10, 
    marginTop: 10, 
  },
  label: {
    fontSize: 18, 
    marginBottom: 10, 
  },
  button: {
    backgroundColor: 'blue', 
    padding: 10, 
    borderRadius: 5, 
    marginTop: 20, 
  },
  buttonText: {
    color: 'white', 
    fontWeight: 'bold', 
  },
});

