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

const Edit_Profile = ({ navigation }) => {

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

   useEffect(() => {
     // Load saved profile data on component mount
     loadSavedProfile();
   }, []);

   const loadSavedProfile = async () => {
     try {
       const savedName = await AsyncStorage.getItem("name");
       const savedImage = await AsyncStorage.getItem("image");

       if (savedName !== null) {
         setName(savedName);
       }
       if (savedImage !== null) {
         setImage(savedImage);
       }
     } catch (error) {
       console.error("Error loading profile:", error);
     }
   };

  const EditProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      // Save name and image to AsyncStorage
      await AsyncStorage.setItem("name", name);
      if (image) {
        await AsyncStorage.setItem("image", image);
      } else {
        await AsyncStorage.removeItem("image");
      }
       console.log("Profile saved successfully:", { name, image });
       

      // Navigate back to profile page
      navigation.navigate("Labour_profile_page", { name, image });
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

    

 


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

      <Button title="Save" onPress={handleSave} />
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
