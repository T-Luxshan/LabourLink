import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Modal, Portal, Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { PieChart, LineChart } from "react-native-gifted-charts";
import DropDown from 'react-native-paper-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BookingData from './BookingDetails.json';
import RatingData from './ReviewDetails.json';
import { getBookingDetailsByLabourId } from '../services/HiringService';

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

  const [visible, setVisible] = useState(false);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [ratingDetails, setRatingDetails] = useState([]);
  const [selectedRole, setSelectedRole] = useState('all');
  const [showDropDown, setShowDropDown] = useState(false);
  const allBookingStagePieData = [];
  let email = "lehaan@example.com";

  useEffect(() => {
    fetchbookingDetails(email);

    // setBookingDetails(BookingData);
    setRatingDetails(RatingData);
  }, [email]);

  const fetchbookingDetails = (email) => {
      getBookingDetailsByLabourId(email)
        .then(res=>setBookingDetails(res.data))
        .catch(err=>console.log(err))
  }

  const fetchRatingDetails = (email) => {
    
  }

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
        color: ['#FFD700', '#4682B4', '#32CD32', '#FF6347'][index],
      }));
    } else {
      return allBookingStagePieData[selectedRole];
    }
  };

  const getLineChartData = () => {
    if (selectedRole === 'all') {
      return jobRoles.map((roleObj) => {
        const role = roleObj.value;
        const ratings = ratingDetails
          .filter((item) => item.jobRole === role)
          .map((item) => item.rating);
        return { name: role, ratings: ratings };
      });
    } else {
      const selectedRatings = ratingDetails
        .filter((item) => item.jobRole === selectedRole)
        .map((item) => item.rating);
      return [{ name: selectedRole, ratings: selectedRatings }];
    }
  };
  

  const lineChartData = getLineChartData();

  const formatLineData = (lineChartData) => {
    const formattedData = lineChartData.map((data) => {
      const lineData = data.ratings.map((rating, index) => ({
        value: rating,
        label: `${index + 1}`,
      }));
      return {
        seriesName: data.name,
        data: lineData,
        color: getColorForSeries(data.name),
      };
    });
    return formattedData;
  };

  const getColorForSeries = (seriesName) => {
    const colors = {
      'Role 1': '#3498db',
      'Role 2': '#f1c40f',
      // Add more colors for other roles as needed
    };
    const defaultColor = '#' + Math.floor(Math.random()*16777215).toString(16); // random color
    return colors[seriesName] || defaultColor;
  };

  const formattedLineData = formatLineData(lineChartData);

  return (
    <PaperProvider theme={theme}>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconContainer} onPress={hideModal}>
              <MaterialCommunityIcons name="close-circle-outline" size={30} color="red" />
            </TouchableOpacity>
            </View>
            <DropDown
              label="Job Role"
              mode="outlined"
              value={selectedRole}
              setValue={setSelectedRole}
              list={[{ label: 'All', value: 'all' }, ...jobRoles]}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              activeColor="#FB9741"
              theme={theme}
            />
            <PieChart
              data={getChartData()}
              focusOnPress={true}
              donut
              innerCircleColor="white"
              radius={100}
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
            <View>
              <Text style={[styles.seriesTitle, {textAlign:'center', fontSize:20}]}>Rating trend</Text>
              {formattedLineData.map((series, index) => (
                <View key={index}>
                  <Text style={styles.seriesTitle}>{series.seriesName}</Text>
                  <LineChart
                  data={series.data}
                  spacing={30}
                  textColor1="black"
                  textShiftY={-8}
                  textShiftX={-10}
                  textFontSize={13}
                  thickness={5}
                  yAxisColor="#0BA5A4"
                  showVerticalLines
                  // hideYAxisText
                  verticalLinesColor="rgba(14,164,164,0.5)"
                  xAxisColor="#0BA5A4"
                  // color={series.color}
                  // color1="skyblue"
                  color1="orange"
                  isAnimated
                  yAxisLabelTexts={['1', '2', '3', '4', '5']}
                  yAxisTextNumberOfLines={5}
                />

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
  iconContainer: {
    position: 'absolute',
    top: 15,
    right: 10,
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
  seriesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
