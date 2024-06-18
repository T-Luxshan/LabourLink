import React , { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { storage } from '../firebase.config';
import { getDownloadURL, uploadBytes, ref, deleteObject } from 'firebase/storage';
import { async } from '@firebase/util';
import { isNICExist } from '../services/AuthService';


const UploadDocument = ({ nic, onFileUpload, mState }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [nicExist, setNicExist] = useState(null);


  useEffect(() => {
    isNICExist(nic)
      .then(response => {
        setNicExist(response.data);
        console.log(nicExist);
      })
      .catch(error => {
        console.log('NIC fetching failed:', error);
      });
  }, [nic]);

  const pickDocument = async () =>{

    setIsLoading(true);
   
    let doc = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf', 
    });
    
    if (!doc.canceled) {
      console.log("document selected");
      const uploadURL = await uploadDocumentAsync(doc.assets[0].uri);
      setFile(uploadURL);
      onFileUpload(uploadURL);
      console.log(doc);
      console.log("thisis uploadURL", uploadURL);
      
    }
    else{
      console.log("file is not selected.");
      console.log(doc);
      setFile(null);
      
    }
    setInterval(() => {
      setIsLoading(false);
    }, 1000)
  };



  const uploadDocumentAsync =  async (uri) => {
    
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    try {
      const storageRef = ref(storage, `LabourDocuments/document-${nic}-${Date.now()}`);
      const result = await uploadBytes(storageRef, blob);

      // blob.close();
      return await getDownloadURL(storageRef);

    } catch (error) {
      console.log(error);
    }
    

  }

  const deleteDocument = async () => {
    setIsLoading(true);
    const deleteRef = ref(storage, file);
    try {
      deleteObject(deleteRef).then(() => {
        setFile(null);
        setInterval(() => {
          setIsLoading(false);
        }, 2000)
      })
    } catch (error) {
      setIsLoading(true);
      setFile(null);setInterval(() => {
        setIsLoading(false);
      }, 2000)
      console.log(error)
    }
    
  }

  return (
    <View>
        {nicExist && <Text style={styles.error}>This NIC already exist</Text>}
        <View style={[styles.uploadContainer, mState && { borderColor: '#6D6D6D' }]}>
          {!file ? (
            isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={'#F97300'} animating size={"large"} />
              </View>
            ) : (
              <Button disabled={nicExist} icon="file-document-outline" textColor={mState ? '#6D6D6D' : "#F97300"} mode="text" onPress={pickDocument}>
                Select Document
              </Button>
            )
          ) : (
            <View>
              {/* <Text sx={{mt: 20}}>Document uploded sucessfully.</Text> */}
              <Button icon="delete" textColor={mState ? '#9C9C9C' : "#F97300"} mode="text" onPress={deleteDocument}>
                  Delete Document
              </Button>
            </View>     
          )}
        </View>
    </View>
  );
}

export default UploadDocument;


const styles = StyleSheet.create({
  loadingContainer: {
    marginTop: 20,
  },
  uploadContainer:{
    width: '100%',
    height: 50,
    marginVertical: 0,
    borderColor: '#EDEDEC',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20,
    justifyContent: 'center', 
    alignItems:'center',
  },
  error: {
    color: 'red',
  },
  });

