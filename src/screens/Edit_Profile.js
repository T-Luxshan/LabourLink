import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storage } from '../firebase.config';
import { getDownloadURL, uploadBytes, ref, deleteObject } from 'firebase/storage';
import { addProfilePicture, deleteProfilePicture, getProfilePicture } from "../services/ProfilePhotoService";

const Edit_Profile = ({ navigation, route }) => {
  const { userEmail } = route.params;
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Load saved profile data on component mount
    loadSavedProfile();
  }, []);

  const loadSavedProfile =  () => {
    getProfilePicture()
      .then(res=>setImage(res.data.profileUri))
      .catch(err=>console.log("Failed to fetch profile photo"));
    // try {
    //   const savedName = await AsyncStorage.getItem(`${userEmail}-name`);
    //   const savedImage = await AsyncStorage.getItem(`${userEmail}-image`);
    //   if (savedName) setName(savedName);
    //   if (savedImage) setImage(savedImage);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const EditProfileImage = async () => {
    // Delete the current profile image if it exists
    if (image) {
      const deleteRef = ref(storage, image);
      deleteFromDB(image);
      try {
        await deleteObject(deleteRef);
        setImage(null);
        await AsyncStorage.removeItem(`${userEmail}-image`);
      } catch (error) {
        console.log("Error deleting current image: ", error);
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uploadURL = await handleSave(result.assets[0].uri);
      if (uploadURL) {
        setImage(uploadURL);
        saveTODB(uploadURL);
        // await AsyncStorage.setItem(`${userEmail}-image`, uploadURL);
      }
    }
  };

  const handleSave = async (uri) => {
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
      const storageRef = ref(storage, `ProfilePhoto/profile-${userEmail}-${Date.now()}`);
      const result = await uploadBytes(storageRef, blob);

      // Close the blob
      blob.close();
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const saveProfile = async () => {
    // try {
    //   await AsyncStorage.setItem(`${userEmail}-name`, name);
    //   alert("Profile saved!");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const saveTODB = (uri) => {
    addProfilePicture(uri)
    .then(res=>console.log("Profile saved to DB"))
    .catch(err=>console.log("Faild to save to db"))
  }

  const deleteFromDB = (uri) => {
    deleteProfilePicture(uri)
    .then(res=>console.log("Profile deleted from DB"))
    .catch(err=>console.log("Faild to delete from db"))
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={EditProfileImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <Image
            source={require("../assets/Images/boy.png")}
            style={styles.avatar}
          />
        )}
        <Text style={styles.changeText}>Change Profile Picture</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      {/* <Button title="Save" onPress={saveProfile} /> */}
    </View>
  );
};

export default Edit_Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 30,
  },
  changeText: {
    marginTop: 10,
    color: "darkblue",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
});
