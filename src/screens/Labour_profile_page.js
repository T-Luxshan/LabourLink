import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Button, Surface, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { getLabourProfileById } from "../services/LabourProfileService";
import { getLabourById, deleteLabour } from "../services/LabourService";
import { useLogin } from "../context/LoginProvider";
import { getProfilePicture } from "../services/ProfilePhotoService";
import { registerIndieID, unregisterIndieDevice } from 'native-notify';

const Labour_profile_page = ({ navigation, route }) => {
  // Function to handle press event for the "Languages" section
 const [labour, setLabour] = useState({ name: "" });
 const [labourProfile, setLabourProfile] = useState("");
 const [image, setImage] = useState(null);
 const [name, setName] = useState("");
 const { setIsLoggedIn } = useLogin();
 const [userEmail, setUserEmail] = useState('');

  //  const email = AsyncStorage.getItem('userEmail');
  // const email = "lehaan@example.com";

  // const labourEmail = "aruran@example.com"; // Replace with dynamic value if needed

  // getLabourProfileById(email)
  //   .then((response) => {
  //     const data = response.data;
  //     setLabourProfile(data);
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching labourProfile name data:", error);
  //   });

  useEffect(() => {
    getEmail();
  }, []);

  const getEmail = async () => {
    

  try {
    const email = await AsyncStorage.getItem('userEmail');
    console.log("This is the email", email)
    setUserEmail(email.toLowerCase());
    fetchLabourByEmail(email);
    fetchProfilePhoto(email);


      return email;
    } catch (error) {
      console.log("Error retrieving email from AsyncStorage:");
    }
  };

  const fetchLabourByEmail = (userEmail) => {
    // alert(userEmail);

    getLabourById(userEmail)
      .then((response) => {
        const data = response.data;
        setLabour(data);
        // setJobRole(data.jobRole);
        // console.log(response.data);
      })
      .catch((error) => {
        // console.error("Error fetching labour by id data:");
      });
  };

  const fetchProfilePhoto = (userEmail) => {
    getProfilePicture()
      .then((res) => setImage(res.data.profileUri))
      .catch((err) => console.log("failed to fetch profile pic"));
  };
  // useEffect(() => {
  //   if (route.params?.name) {
  //     setName(route.params.name);
  //   }
  //   if (route.params?.image) {
  //     setImage(route.params.image);
  //   }
  // }, [route.params?.name, route.params?.image]);

  const handleEditProfile = () => {
    navigation.navigate("Edit_Profile", { userEmail: userEmail });
  };

  const handleSelectLanguages = () => {
    navigation.navigate("Languages");
  };

  const handleAboutUs = () => {
    navigation.navigate("About_Us");
  };

  const handleLogout = async () => {
    try {
      // Log current AsyncStorage values
      const tokenValue = await AsyncStorage.getItem("token");
      const refreshTokenValue = await AsyncStorage.getItem("refreshToken");
      console.log(
        "Before logout - token:",
        tokenValue,
        "refreshToken:",
        refreshTokenValue
      );

      unregisterIndieDevice(userEmail, 21639, "dwb6dAoCmrQD8faaLyciTU");
      unregisterIndieDevice(userEmail, 22199, 'emBddOfJLNr511DDJxUMcI');

      // Clear tokens from AsyncStorage
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("userEmail");

      // Log to confirm removal
      console.log("After logout - tokens removed");

      setIsLoggedIn(false);
      // Navigate to Login screen
      // navigation.navigate("Login");
    } catch (error) {
      // console.error("Error logging out:");
      // Handle error gracefully
    }
  };


  const handlePersonalDetails = () => {
    navigation.navigate("Personal_Details");
  };

  // const handlePassword = () => {
  //   navigation.navigate("Labour_Change_Password");
  // };

  // const deleteAccountConfirmed = async () => {
  //   try {
  //     // Delete account using service function
  //     await deleteLabour(email);

  //     const tokenValue = await AsyncStorage.getItem("token");
  //     const refreshTokenValue = await AsyncStorage.getItem("refreshToken");
  //     console.log(
  //       "Before logout - token:",
  //       tokenValue,
  //       "refreshToken:",
  //       refreshTokenValue
  //     );

  //     // Clear tokens from AsyncStorage
  //     await AsyncStorage.removeItem("token");
  //     await AsyncStorage.removeItem("refreshToken");

  //     // Log to confirm removal
  //     console.log("After logout - tokens removed");

  //     setIsLoggedIn(false);
  //     // Navigate to Login screen
  //     // navigation.navigate("Login");
  //   } catch (error) {
  //     console.error("Error deleting account:", error);
  //     // Handle error gracefully
  //     // You can add specific error handling based on different error scenarios here
  //     // For example, displaying an alert to the user or logging more details
  //     Alert.alert("Error", "Failed to delete account. Please try again.");
  //   }
  // };

  // const handleDeleteAccount = () => {
  //   Alert.alert(
  //     "Delete Account",
  //     "Are you sure you want to delete your account?",
  //     [
  //       {
  //         text: "No",
  //         style: "cancel",
  //       },
  //       {
  //         text: "Yes",
  //         onPress: deleteAccountConfirmed,
  //       },
  //     ]
  //   );
  // };

const handlePassword = () => {
  navigation.navigate("Labour_Change_Password");
};

    const deleteAccountConfirmed = async () => {
      try {
        // Delete account using service function
        await deleteLabour(email);

          const tokenValue = await AsyncStorage.getItem("token");
          const refreshTokenValue = await AsyncStorage.getItem("refreshToken");
          console.log(
            "Before logout - token:",
            tokenValue,
            "refreshToken:",
            refreshTokenValue
          );

          // Clear tokens from AsyncStorage
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("refreshToken");

          // Log to confirm removal
          console.log("After logout - tokens removed");

        setIsLoggedIn(false);
        // Navigate to Login screen
        // navigation.navigate("Login");
      } catch (error) {
        console.error("Error deleting account:", error);
        // Handle error gracefully
        // You can add specific error handling based on different error scenarios here
        // For example, displaying an alert to the user or logging more details
        Alert.alert("Error", "Failed to delete account. Please try again.");
      }
    };

    const handleDeleteAccount = () => {
      Alert.alert(
        "Delete Account",
        "Are you sure you want to delete your account?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: deleteAccountConfirmed,
          },
        ]
      );
    };
   
     const renderName = () => {
       if (labour.name.length > 15) {
         const splitName = labour.name.split(" ");
         return (
           <View>
             <Text style={styles.longNameText}>{splitName[0]}</Text>
             <Text style={styles.longNameText}>{splitName[1]}</Text>
           </View>
         );
       }
       return <Text style={styles.nameText}>{labour.name}</Text>;
     };

  return (
    <View>
      <ScrollView>
        {/* Profile section */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Profile title */}
          <Text
            style={{
              width: 320,
              height: 44,
              marginLeft: 15,
              marginTop: 28,
              fontWeight: "bold",
              fontSize: 24,
              color: "#101828",
            }}
          >
            My Profile
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 15,
            paddingHorizontal: 15,
          }}
        >
          {/* User avatar */}
          <Avatar.Image
            size={60}
            source={
              image ? { uri: image } : require("../assets/Images/boy.png")
            }
            style={{ marginRight: 15 }}
          />
          {/* User details */}
          <View style={{ flex: 1, justifyContent: "center" }}>
            {renderName()}
          </View>
          {/* Button to edit profile */}
          <TouchableOpacity
            onPress={handleEditProfile}
            style={{ alignSelf: "center" }}
          >
            <Button
              mode="contained"
              style={{
                backgroundColor: "#0066CC",
              }}
            >
              Edit
            </Button>
          </TouchableOpacity>
        </View>

        <Surface style={styles.surface} elevation={1}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 10,
            }}
          >
            <Icon
              name="user"
              size={20}
              color="#505151"
              style={{ marginRight: 10 }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                padding: 10,
                color: "#222222",
              }}
            >
              Personal Details
            </Text>
            <TouchableOpacity onPress={handlePersonalDetails}>
              {/* Button to navigate to language settings */}
              {/* <View style={{ flex: 1, alignItems: "flex-end" }}> */}
              <FontAwesomeIcon
                icon={faChevronRight}
                size={18}
                style={{ marginLeft: 102 }}
              />
            </TouchableOpacity>
          </View>
        </Surface>

        {/* Surface for settings */}
        <Surface style={styles.surface} elevation={1}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 10,
            }}
          >
            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
              }}
            > */}
            <Icon
              name="lock"
              size={20}
              color="#505151"
              style={{ marginRight: 10 }}
            />
            <Text
              style={{
                fontSize: 18,
                padding: 10,
                color: "#222222",
                fontWeight: "400",
              }}
            >
              Change Password
            </Text>
            {/* </View> */}
            <TouchableOpacity onPress={handlePassword}>
              {/* Button to navigate to language settings */}
              {/* <View style={{ flex: 1, alignItems: "flex-end" }}> */}
              <FontAwesomeIcon
                icon={faChevronRight}
                size={18}
                style={{ marginLeft: 88 }}
              />
            </TouchableOpacity>
            {/* </View> */}
          </View>
        </Surface>

        {/* Surface for other settings */}
        <Surface style={styles.thirdSurface} elevation={1}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              padding: 10,
              color: "#222222",
            }}
          >
            Others
          </Text>
          {/* About Us option */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 10,
            }}
          >
            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
              }}
            > */}
            <Icon
              name="info-circle"
              size={20}
              color="#505151"
              style={{ marginRight: 10 }}
            />
            <Text
              style={{
                fontSize: 18,
                padding: 10,
                color: "#222222",
                fontWeight: "400",
              }}
            >
              About Us
            </Text>
            {/* </View> */}
            <TouchableOpacity onPress={handleAboutUs}>
              {/* Button to navigate to About Us section */}
              {/* <View style={{ flex: 1, alignItems: "flex-end" }}> */}
              <FontAwesomeIcon
                icon={faChevronRight}
                size={18}
                style={{ marginLeft: 154 }}
              />
            </TouchableOpacity>
            {/* </View> */}
          </View>

          {/* Logout option */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 10,
            }}
          >
            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
              }}
            > */}
            <Icon
              name="sign-out"
              size={20}
              color="#F15C5C"
              style={{ marginRight: 10 }}
            />
            <TouchableOpacity onPress={handleLogout}>
              <Text
                style={{
                  fontSize: 18,
                  padding: 10,
                  color: "#222222",
                  fontWeight: "400",
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
            {/* </View> */}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 10,
            }}
          >
            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
              }}
            > */}
            <Icon
              name="trash"
              size={20}
              color="#F15C5C"
              style={{ marginRight: 10 }}
            />
            <TouchableOpacity onPress={handleDeleteAccount}>
              <Text
                style={{
                  fontSize: 18,
                  padding: 10,
                  color: "#222222",
                  fontWeight: "400",
                }}
              >
                Delete Account
              </Text>
            </TouchableOpacity>
            {/* </View> */}
          </View>
        </Surface>
      </ScrollView>
    </View>
  );
};

export default Labour_profile_page;

// Styles for different surfaces
const styles = StyleSheet.create({
  surface: {
    borderRadius: 20,
    marginLeft: 15,
    marginTop: 30,
    padding: 5,
    height: "auto",
    width: 345,
    alignItems: "",
    justifyContent: "flexStart",
    backgroundColor: "#fff",
  },

  thirdSurface: {
    borderRadius: 20,
    marginLeft: 15,
    marginTop: 25,
    padding: 5,
    height: "auto",
    width: 345,
    alignItems: "",
    justifyContent: "flexStart",
    marginBottom: 30,
    backgroundColor: "#fff",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222222",
  },
  longNameText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222222",
    lineHeight: 20,
  },
});
