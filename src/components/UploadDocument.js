import React , { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { storage } from '../firebase.config';
import { getDownloadURL, uploadBytes, ref, deleteObject } from 'firebase/storage';
import { async } from '@firebase/util';

const UploadDocument = ({ nic, onFileUpload }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  const pickDocument = async () =>{

    setIsLoading(true);
   
    let doc = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf', // You can specify the type of documents you want to pick, or use '*/*' for all types
      // copyToCacheDirectory: true // You can set this to true if you want to cache the document
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
      // const storageRef = ref(storage, `LabourDocuments/document-${props.nic}`);
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
      console.log(error)
    }
    
  }

  return (
    <View>
        <Text>Please Upload documents to verify</Text>
        <View style={styles.uploadContainer}>
          {!file ? (
            isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={'#F97300'} animating size={"large"} />
              </View>
            ) : (
              <Button icon="folder" textColor="#F97300" mode="text" onPress={pickDocument}>
                Select Document
              </Button>
            )
          ) : (
            <View>
              {/* <Text sx={{mt: 20}}>Document uploded sucessfully.</Text> */}
              <Button icon="delete" textColor="#F97300" mode="text" onPress={deleteDocument}>
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
    marginVertical: 5,
    borderColor: '#EDEDEC',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20,
    justifyContent: 'center', 
    alignItems:'center',
  }
  });

