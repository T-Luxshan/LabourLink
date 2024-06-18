import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Modal, Portal, Provider as PaperProvider, Headline, TextInput, MD3LightTheme } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';
import DropDown from 'react-native-paper-dropdown';
import { addReview, editReview } from '../services/ReviewService';
import { getLabourJobRoles } from '../services/AuthService';

const ReviewModel = () => {
  const [visible, setVisible] = useState(true);
  const [showDropDown, setShowDropDown] = useState(true);
  const [jobRole, setJobRole] = useState('');
  const [jobList, setJobList] = useState([]);
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(3);
  const [error, setError] = useState('');
  const [reviewId, setReviewId] = useState(null);
  const [saveError, setSaveError] = useState('');

  const labour = {
    "name":"Luxshan",
    "email": "lucky@gmail.com"
  }
  useEffect(() => {
    fetchAvailableJobs();
  }, []);

  const fetchAvailableJobs = () => {
    
    getLabourJobRoles()
      .then(response => {
        setJobList(response.data.map(job => ({ label: job, value: job })));
      })
      .catch(error => {
        console.log('Error fetching job roles:');
      });
    // const availableJobs = ['Electrician', 'Plumber', 'Carpenter', 'Painter']; // Temporary data
    
    // const formattedJobList = availableJobs.map(job => ({ label: job, value: job }));
    // setJobList(formattedJobList);
  };

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };
  

  const ratingCompleted = (rating) => {
    setRating(rating)
    console.log('Rating is: ' + rating);
  };

  const handleSave =()=>{   
    if(jobRole){
      setError('');  
      console.log(jobRole, description, rating );
      if(reviewId){
        editReview(reviewId, jobRole, description, rating, labour.email)
          .then(res=>{
            console.log(res);
            setReviewId(res.data.id);
            setVisible(false);
          })
        .catch(err=>{
          console.log(err)
          setSaveError("Something went wrong, try again later.");
        })
      
      }else{
      addReview(jobRole, description, rating, labour.email)
        .then(res=>{
          console.log(res);
          setReviewId(res.data.id);
          setVisible(false);
        })
        .catch(err=>{
          console.log(err)
          setSaveError("Something went wrong, try again later.");
        })
    }
    }else{
      setError("Please select the job role.")
    }
  }

  const theme = {
    // ...MD3LightTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#3498db',
      secondary: '#f1c40f',
      tertiary: '#a1b2c3',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          overlayOpacity={0}
          contentContainerStyle={[styles.modelContainer, { marginBottom: 80 }]}
        >
          <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null} // Adjust behavior for iOS and Android
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust vertical offset for iOS
      >
      <ScrollView>
          <Headline style={styles.headline}>Rate his performance</Headline>
          <AirbnbRating 
            onChangeRating={ratingCompleted}
            size={24}
          />
          <Text style={{ marginTop: 10 }}>Please select the job role you hired for..</Text>
          <DropDown
            label="Job Role"
            mode="outlined"
            value={jobRole}
            setValue={setJobRole}
            list={jobList}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            // inputProps={{
            //   right: <TextInput.Icon name="menu-down" />,
            // }}
            activeColor="#FB9741"
            theme={theme}
          />
          {error && <Text style={{color:'red'}} > {error} </Text>}
          <TextInput
            label="Description"
            value={description}
            onChangeText={text => setDescription(text)}
            mode="outlined"
            outlineColor="grey"
            // multiline
            // numberOfLines={3}
            theme={{
              colors: {
                primary: 'black',
              },
            }}
            style={styles.textInput}
          />
          {saveError && <Text style={{color:'red'}} > {saveError} </Text>}
          <View style={styles.btnContainer}>
            <Button mode="text" textColor="#F97300" onPress={hideModal} style={{ borderColor: '#F97300' }}>
              Cancel
            </Button>
            <Button mode="text" textColor="#F97300" onPress={handleSave} style={{ borderColor: '#F97300' }}>
              Save
            </Button>
          </View>
          
          </ScrollView>
          </KeyboardAvoidingView>
        </Modal>
      </Portal>
      <View style={styles.uploadContainer}>
        <View style={styles.infoContainer}>
            <Button mode="text" textColor="#F97300" onPress={showModal} style={styles.infoIcon}>
              Add review 
            </Button>
          
        </View>
      </View>
    </PaperProvider>
  );
};

export default ReviewModel;

const styles = StyleSheet.create({
  modelContainer: {
    backgroundColor: 'white',
    padding: 20,
    height: 450,
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    zIndex: 9999,
  },
  headline: {
    color: 'black',
    marginBottom: 10,
  },
  modelText: {
    color: 'black',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginTop:300
    // margin: 150,
    // elevation: 0, // for Android
    // shadowOpacity: 0, // for iOS
  },
  promptText: {
    color: 'black',
  },
  uploadContainer: {
    marginTop: -15,
    marginBottom: -15,
  },
  dropDown: {
    backgroundColor: 'white',
  },
  textInput: {
    backgroundColor: 'white',
    marginVertical: 10,
    minHeight: 100, // Adjust the height for the multiline TextInput
    textAlignVertical:'top'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});
