import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Modal, Portal, Provider as PaperProvider } from 'react-native-paper';
import { PieChart, LineChart } from "react-native-gifted-charts";
import DropDown from 'react-native-paper-dropdown';

import BookingData from './BookingDetails.json';
import RatingData from './ReviewDetails.json';


const LabourPerformanceModel = ({ onMStateChange, marginTop, Password }) => {
  const [visible, setVisible] = React.useState(false);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [ratingDetails, setRatingDetails] = useState([]);
  const [selectedRole, setSelectedRole] = React.useState('all');
  const allBookingStagePieData = [];

  useEffect(() => {
    setBookingDetails(BookingData);
    setRatingDetails(RatingData);
  }, []); // Ensure this effect runs only once

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const jobRoles = [...new Set(bookingDetails.map((item) => item.jobRole))];

  const jobRoleCounts = {};

  // Loop through each job role
  jobRoles.forEach((role) => {
    // Initialize counts for each booking stage
    const counts = {
      PENDING: 0,
      ACCEPTED: 0,
      DECLINED: 0,
      COMPLETED: 0,
    };

    // Count occurrences of each booking stage for the current job role
    bookingDetails.forEach((item) => {
      if (item.jobRole === role) {
        counts[item.bookingStage]++;
      }
    });

    // Store counts for the current job role
    jobRoleCounts[role] = counts;

    allBookingStagePieData[role] = [
      { id: 0, value: counts.PENDING, label: 'Pending' },
      { id: 1, value: counts.ACCEPTED, label: 'Accepted' },
      { id: 2, value: counts.COMPLETED, label: 'Completed' },
      { id: 3, value: counts.DECLINED, label: 'Declined' },
    ];
  });

  const totalBookingStagePieData = {
    Pending: Object.keys(allBookingStagePieData).reduce(
      (total, role) => total + allBookingStagePieData[role][0].value,
      0
    ),
    Accepted: Object.keys(allBookingStagePieData).reduce(
      (total, role) => total + allBookingStagePieData[role][1].value,
      0
    ),
    Completed: Object.keys(allBookingStagePieData).reduce(
      (total, role) => total + allBookingStagePieData[role][2].value,
      0
    ),
    Declined: Object.keys(allBookingStagePieData).reduce(
      (total, role) => total + allBookingStagePieData[role][3].value,
      0
    ),
  };

  const data = [
    { value: 50, text: 'Label 1', color: '#73CDFF' },
    { value: 80, text: 'Label 2', color: '#DB01FF' },
    { value: 90, text: 'Label 3', color: '#9100CB' },
    { value: 70, text: 'Label 4', color: '#2F97FF' }
  ];

  const getChartData = () => {
    if (selectedRole === 'all') {
      // Display total data for all roles
      return Object.keys(totalBookingStagePieData).map((label, index) => ({
        id: index,
        value: totalBookingStagePieData[label],
        label: label,
      }));
    } else {
      // Display data for selected role
      return allBookingStagePieData[selectedRole];
    }
  };

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* <Text style={{ marginTop: 10 }}>Please select the job role you hired for..</Text> */}
          <DropDown
            label="Job Role"
            mode="outlined"
            value={selectedRole}
            setValue={setSelectedRole}
            list={jobRoles}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            inputProps={{
              right: <TextInput.Icon name="menu-down" />,
            }}
            activeColor="#FB9741"
            theme={theme}
          />
            <PieChart data={data} focusOnPress={true} />
            <View style={styles.legendContainer}>
              {data.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                  <Text style={styles.legendText}>{item.text}</Text>
                </View>
              ))}
            </View>
            <LineChart data={data} areaChart />
          </ScrollView>
        </Modal>
      </Portal>
      <Button style={{ marginTop: 150 }} onPress={showModal}>
        Show
      </Button>
    </PaperProvider>
  );
};

export default LabourPerformanceModel;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    maxHeight: '100%',
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  legendContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
  },
});
