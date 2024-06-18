import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Modal, Portal, Provider as PaperProvider, TextInput, MD3LightTheme } from 'react-native-paper';
import { PieChart } from "react-native-gifted-charts";
import DropDown from 'react-native-paper-dropdown';

import BookingData from './BookingDetails.json';
import RatingData from './ReviewDetails.json';

const LabourPerformanceModel = ({ onMStateChange, marginTop, Password }) => {

  const theme = {
    roundness: 2,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#3498db',
      secondary: '#f1c40f',
      tertiary: '#a1b2c3',
    },
  };

  const [visible, setVisible] = React.useState(false);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [ratingDetails, setRatingDetails] = useState([]);
  const [selectedRole, setSelectedRole] = React.useState('all');
  const [showDropDown, setShowDropDown] = useState(false);
  const allBookingStagePieData = [];

  useEffect(() => {
    setBookingDetails(BookingData);
    setRatingDetails(RatingData);
  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const jobRoles = [...new Set(bookingDetails.map((item) => item.jobRole))].map((role) => ({
    label: role,
    value: role,
  }));

  const jobRoleCounts = {};

  jobRoles.forEach((roleObj) => {
    const role = roleObj.value;
    const counts = {
      PENDING: 0,
      ACCEPTED: 0,
      DECLINED: 0,
      COMPLETED: 0,
    };

    bookingDetails.forEach((item) => {
      if (item.jobRole === role) {
        counts[item.bookingStage]++;
      }
    });

    jobRoleCounts[role] = counts;

    allBookingStagePieData[role] = [
      { id: 0, value: counts.PENDING, label: 'Pending', color: '#FFD700' },
      { id: 1, value: counts.ACCEPTED, label: 'Accepted', color: '#4682B4' },
      { id: 2, value: counts.COMPLETED, label: 'Completed', color: '#32CD32' },
      { id: 3, value: counts.DECLINED, label: 'Declined', color: '#FF6347' },
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

  const getChartData = () => {
    if (selectedRole === 'all') {
      return Object.keys(totalBookingStagePieData).map((label, index) => ({
        id: index,
        value: totalBookingStagePieData[label],
        label: label,
        color: ['#FF6347', '#4682B4', '#32CD32', '#FFD700'][index],
      }));
    } else {
      return allBookingStagePieData[selectedRole];
    }
  };

  return (
    <PaperProvider theme={theme}>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <DropDown
              label="Job Role"
              mode="outlined"
              value={selectedRole}
              setValue={setSelectedRole}
              list={[{ label: 'All', value: 'all' }, ...jobRoles]}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              inputProps={{
                right: <TextInput.Icon name="menu-down" />,
              }}
              activeColor="#FB9741"
              theme={theme}
            />
            <PieChart
              data={getChartData()}
              focusOnPress={true}
              donut
              innerCircleColor="white"
              radius={100}
              // renderDecorator={({ item }) => (
              //   <View style={styles.decorator}>
              //     <Text style={styles.decoratorText}>{item.label}: {item.value}</Text>
              //   </View>
              // )}
            />
            <View style={styles.legendContainer}>
              {getChartData().map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                  <Text style={styles.legendText}>{item.label} : {item.value} </Text>
                  <Text>{'\n'}</Text>
                </View>
              ))}
            </View>
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
  decorator: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  decoratorText: {
    fontSize: 12,
    color: 'black',
  },
});
