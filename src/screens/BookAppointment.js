import React, { useState , useEffect} from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, KeyboardAvoidingView, Alert } from 'react-native'; 
import { Calendar } from 'react-native-calendars'; 
import LabourProfileComponent from '../components/LabourProfileComponent'; 
import AppBar from '../components/AppBar';  
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';  
import * as Yup from 'yup';  
import { useNavigation, useRoute } from '@react-navigation/native';
import { BookingLabour } from '../services/LabourDetailsService';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveNotifications } from '../services/NoificationSevice';

// Define Yup validation schema
const bookingSchema = Yup.object().shape({
  date: Yup.string()
    .required('Date is required')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'Date must be in the format YYYY-MM-DD'
    ),
  startTime: Yup.string()
    .required('Start time is required')
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'Start time must be in the format HH:MM'
    ),
  jobDescription: Yup.string()
    .required('Job description is required')
    // .min(10, 'Job description must be at least 10 characters long')
});

const BookAppointment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { labourId, jobRole, labourName, labourJobTitle, labourRating, profileImage } = route.params;


  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePicked, setTimePicked] = useState(false);
  const tempProfile = "https://firebasestorage.googleapis.com/v0/b/labourlink-e7ecf.appspot.com/o/ProfilePhoto%2Fboy.png?alt=media&token=b9013246-c51f-4bb8-b68b-1465e24e8583"
  const[customerId, setCustomerId] = useState(""); 
  const [notifications, setNotifications] = useState([]);
  
  // const labourId = "thana@example.com";
  // const customerId = "aruran@example.com";
  const bookingStage = "PENDING";
  // const jobRole = "ELECTRICIAN";


  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const customerId = await AsyncStorage.getItem("userEmail");
        if (customerId) {
          setCustomerId(customerId.toLowerCase());
        } else {
          console.log("No email found in AsyncStorage");
        }
      } catch (error) {
        console.log("Error fetching email from AsyncStorage:");
      }
    };

    fetchEmail();
  }, []);

  const handleDateSelect = (day) => {
    if (day.dateString) {
      setSelectedDate(day.dateString); // Set the selected date
    }
  };

  const handleTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedTime;
    setShowTimePicker(Platform.OS === 'ios');
    setSelectedTime(currentDate);
    setTimePicked(true);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const handleSubmit = async (values, { resetForm }) => {
    // const bookingData = {
    //   labourId,
    //   customerId,
    //   date: values.date,
    //   startTime: values.startTime,
    //   bookingStage,
    //   jobDescription: values.jobDescription,
    //   jobRole
    // };

    console.log("Submitting booking data: ",  values); // Log the booking data
    console.log(jobRole.toUpperCase(), labourId)
    console.log(customerId)

    try {
      const response = await BookingLabour( labourId,customerId,values.date, values.startTime, "PENDING", values.jobDescription,jobRole.toUpperCase());
      Alert.alert('Success', 'Booking has been made successfully.');
      console.log("Booking response: ", response.data);
      handleNotification();
      resetForm();  // Reset the form after successful submission
    } catch (error) {
      Alert.alert('Error', 'Failed to make the booking. Please try again.');
      console.error("Booking error: ", error);
    }
  };

  const handleNotification = async () => {
    const notification = {
      title: `Hiring Request sent to ${labourName}`,
      message: `You have successfully hired ${labourName} for ${jobRole}`,
      recipient: customerId,
      createdAt: new Date().toISOString(),
    };

    await fetch('https://app.nativenotify.com/api/indie/notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer dwb6dAoCmrQD8faaLyciTU`,
      },
      body: JSON.stringify({
        appId: 21639,
        appToken: 'dwb6dAoCmrQD8faaLyciTU',
        title: notification.title,
        message: notification.message,
        // userId: notification.recipient,
        subID:customerId,
        date: notification.createdAt,
      }),
    });

    try {
      await saveNotifications(notification);
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    } catch (error) {
      console.error('Error saving notification', error);
    }
  };

  return (
    <Formik
      initialValues={{ date: '', startTime: '', jobDescription: '' }}
      validationSchema={bookingSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView style={styles.container}>
            <AppBar Title="BookAppointment" /> 

            <View style={styles.Labourprofile}>
              <LabourProfileComponent 
                profileImage={{uri:profileImage ? profileImage : tempProfile  }}
                name={labourName}
                jobTitle= {labourJobTitle}
                rating={labourRating} 
              /> 
            </View>

            <Text style={styles.label}>Select Date:</Text>
            <Calendar
              onDayPress={(day) => {
                handleDateSelect(day);
                setFieldValue('date', day.dateString);  // Set Formik field value
              }}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: 'blue' },
              }}
            />
            {/* {selectedDate && (
              <Text style={styles.selectedDateText}>
                 Selected Date: {selectedDate} 
              </Text>
            )} */}
<View style={styles.Time}>
             <TouchableOpacity onPress={showTimePickerModal}>
              
              <Text style={styles.label2}>Select Time:</Text>
             </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                style={styles.Timepicker}
                value={selectedTime}
                mode="time"
                is24Hour={false}
                // display="default"
                 onChange={(event, date) => {
                  handleTimeChange(event, date);
                   setFieldValue('startTime', date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));  // Set Formik field value
                  
                }}
              />
            
              
            )}
            </View>
              
            
            {/* {timePicked && (
              <Text style={styles.selectedTimeText}>
                Selected Time: {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            )} */}

            <View style={styles.jobDetailsContainer}>
              <Text style={styles.jobDetailsHeader}>Job Detail :</Text>
              <View style={styles.jobDetailRow}>
                <TextInput 
                  style={styles.jobDescriptionInput}
                  placeholder="Type job description here..."
                  multiline
                  value={values.jobDescription}
                  onChangeText={handleChange('jobDescription')}
                  onBlur={handleBlur('jobDescription')}
                />
                
              </View>
              {errors.jobDescription && touched.jobDescription && (
                  <Text style={styles.errorText}>{errors.jobDescription}</Text>
                )}
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Booking</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default BookAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 0,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18,
    marginBottom: 3,
  },
  label2: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 15,
    color: 'blue',
  },
  Labourprofile: {
    marginBottom: 20,
  },
  jobDetailsContainer: {
    marginTop: 50,
    marginVertical: 20,
    padding: 10,
    // Styling can be adjusted as needed
  },
  jobDetailsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  jobDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jobDescriptionInput: {
    flex: 1,
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedTimeText: {
    fontSize: 18,
    marginTop: 10,
  },
  selectedDateText: {
    fontSize: 18,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  Timepicker:{
    marginRight:170,
  
  },
  Time:{
    flexDirection:"row"
  }
});
