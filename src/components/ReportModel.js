import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Modal, Portal, Provider as PaperProvider, Headline, IconButton, TextInput, MD3LightTheme } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';
import DropDown from 'react-native-paper-dropdown';
import { reportUser, editUserReport } from '../services/ReportService';
import { useLogin } from '../context/LoginProvider';


const ReportModel = ({ navigation, route }) => {
  const { completedBookings, reportTo } = route.params;
  const [issue, setIssue] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [saveError, setSaveError] = useState('');
  const { userRole } = useLogin();

  
  
  const handleCancel = () => {
    if(userRole == "CUSTOMER"){
      navigation.navigate("Work_History", {
        completedBookings: completedBookings,
      });
    }
    else{
      navigation.navigate("Previous_Work_History", {
        completedBookings: completedBookings,
      });
    }
  };


  const handleSave =()=>{   
    if(issue){
      setError('');  
      console.log( issue, description, reportTo );
      // if(reportId){
      //   editUserReport(reportId, issue, description, labour.email)
      //     .then(res=>{
      //       console.log(res);
            
      //     })
      //   .catch(err=>{
      //     console.log(err)
      //     setSaveError("Something went wrong, try again later.");
      //   })
      
      // }else{
        reportUser(issue, description, reportTo)
        .then(res=>{
          console.log(res);
          if(userRole == "CUSTOMER"){
            navigation.navigate("Work_History", {
              completedBookings: completedBookings,
            });
          }
          else{
            navigation.navigate("Previous_Work_History", {
              completedBookings: completedBookings,
            });
          }
          
        })
        .catch(err=>{
          console.log(err)
          setSaveError("Something went wrong, try again later.");
        })
    // }
    }else{
      setError("Please mention the the issue.")
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
          visible={true}
          // onDismiss={hideModal}
          overlayOpacity={0}
          contentContainerStyle={[styles.modelContainer, { marginBottom: 80 }]}
        >
          <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null} // Adjust behavior for iOS and Android
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust vertical offset for iOS
      >
      <ScrollView>
          <Headline style={styles.headline}>Please mention and describe the issue, 
          so we can take action against that person.</Headline>
          <TextInput
            label="Issue"
            value={issue}
            onChangeText={setIssue}
            mode="outlined"
            outlineColor="grey"
            // multiline
            // numberOfLines={3}
            theme={{
              colors: {
                primary: 'black',
              },
            }}
            style={{marginTop:40, marginBottom:20}}
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
            <Button mode="text" textColor="#F97300" onPress={handleCancel} style={{ borderColor: '#F97300' }}>
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
          
        </View>
      </View>
    </PaperProvider>
  );
};

export default ReportModel;

const styles = StyleSheet.create({
  modelContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin:10,
    height: 450,
    // width: '100%',
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
