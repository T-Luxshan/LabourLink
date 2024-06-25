// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { getLabourById, updateLabour } from "../services/LabourService";
// import {
//   getLabourProfileById,
//   updateLabourProfile,
// } from "../services/LabourProfileService";
// import { ScrollView } from "react-native-gesture-handler";
// import { Checkbox } from "react-native-paper";


// const Edit = ({ navigation }) => {
//   const [aboutMe, setAboutMe] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [gender, setGender] = useState("");
//   const [languages, setLanguages] = useState({
//     Tamil: false,
//     English: false,
//     Sinhala: false,
//   });

//   const email = "Vanaiyan@example.com";
//    const labourEmail = "Vanaiyan@example.com";

//   useEffect(() => {
//     // Fetch existing Labour data when component mounts
//     fetchLabourData();
//   }, []);

//   const fetchLabourData = async () => {
//     try {
//       // Fetch data from LabourProfileService for aboutMe, gender, and languages
//       const profileResponse = await getLabourProfileById(labourEmail);
//       if (profileResponse.data) {
//       const { aboutMe, gender, languages } = profileResponse.data;
//       setAboutMe(aboutMe);
//       setGender(gender);

//       // Convert languages array to object for checkbox handling
//       const languagesObject = {};
//       languages.forEach((lang) => {
//         if (lang === "Tamil" || lang === "English" || lang === "Sinhala") {
//           languagesObject[lang] = true;
//         }
//       });
//       setLanguages(languagesObject);
//     }

//       // Fetch data from LabourService for mobileNumber
//       const serviceResponse = await getLabourById(email);
//        if (serviceResponse.data) {
//       const { mobileNumber } = serviceResponse.data;
//       setMobileNumber(mobileNumber);
//        }
//     } catch (error) {
//       console.error("Error fetching Labour data:", error);
//       Alert.alert("Error", "Failed to fetch Labour details.");
//     }
//   };

//  const handleSave = async () => {
//    try {
//      // Prepare languages as an array of selected languages
//      const selectedLanguages = Object.keys(languages).filter(
//        (lang) => languages[lang]
//      );

//      // Update data in LabourProfileService for aboutMe, gender, and languages
//      await updateLabourProfile(aboutMe, gender, selectedLanguages, labourEmail);

//      console.log("Labour details updated successfully.");

//      // Navigate to desired screen after successful update
//      navigation.navigate("Labour_page");
//    } catch (error) {
//      console.error("Error updating labour data:", error);
//      if (error.response) {
//        console.error("Response data:", error.response.data);
//      }
//      Alert.alert("Error", "Failed to update labour details.");
//    }
//  };


//   const handleCheckboxChange = (name) => {
//     setLanguages((prevLanguages) => ({
//       ...prevLanguages,
//       [name]: !prevLanguages[name],
//     }));
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <View style={styles.card}>
//           <Text style={styles.label}>About Me</Text>
//           <TextInput
//             style={[styles.input, styles.aboutMeInput]}
//             value={aboutMe}
//             onChangeText={setAboutMe}
//             placeholder="Enter About Me"
//             multiline={true}
//             textAlignVertical="top"
//             autoFocus={true} // Optional: Autofocus on this input
//           />
//           <Text style={styles.label}>Contact Details</Text>
//           <TextInput
//             style={styles.input}
//             value={mobileNumber}
//             onChangeText={setMobileNumber}
//             placeholder="Enter Mobile Number"
//             keyboardType="phone-pad"
//           />
//           <Text style={styles.label}>Gender</Text>
//           <View style={styles.checkboxContainer}>
//             <Checkbox.Item
//               label="Male"
//               status={gender === "male" ? "checked" : "unchecked"}
//               onPress={() => setGender("male")}
//               color="#007bff"
//               style={styles.checkbox}
//             />
//             <Checkbox.Item
//               label="Female"
//               status={gender === "female" ? "checked" : "unchecked"}
//               onPress={() => setGender("female")}
//               color="#007bff"
//               style={styles.checkbox}
//             />
//           </View>

//           <Text style={styles.label}>Languages</Text>
//           <View style={styles.checkboxContainer}>
//             <Checkbox.Item
//               label="Tamil"
//               status={languages.Tamil ? "checked" : "unchecked"}
//               onPress={() => handleCheckboxChange("Tamil")}
//               color="#007bff"
//               style={styles.checkbox}
//             />
//             <Checkbox.Item
//               label="English"
//               status={languages.English ? "checked" : "unchecked"}
//               onPress={() => handleCheckboxChange("English")}
//               color="#007bff"
//               style={styles.checkbox}
//             />
//             <Checkbox.Item
//               label="Sinhala"
//               status={languages.Sinhala ? "checked" : "unchecked"}
//               onPress={() => handleCheckboxChange("Sinhala")}
//               color="#007bff"
//               style={styles.checkbox}
//             />
//           </View>
//           <TouchableOpacity style={styles.button} onPress={handleSave}>
//             <Text style={styles.buttonText}>Save</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   card: {
//     width: "90%",
//     padding: 20,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   input: {
//     width: "100%",
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//   },
//   aboutMeInput: {
//     minHeight: 80, // Minimum height of the TextInput
//     textAlignVertical: "top",
//     paddingTop: 10, // Padding at the top for better spacing
//   },
//   checkboxContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   checkbox: {
//     paddingHorizontal: 0, // Adjust padding for checkbox items if necessary
//   },
//   button: {
//     backgroundColor: "#007bff",
//     borderRadius: 20,
//     height: 40,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default Edit;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getLabourById, updateLabour } from "../services/LabourService";
import {
  getLabourProfileById,
  updateLabourProfile,
} from "../services/LabourProfileService";

const Edit = ({ navigation }) => {
  const [aboutMe, setAboutMe] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  const [languages, setLanguages] = useState({
    Tamil: false,
    English: false,
    Sinhala: false,
  });
  const [loading, setLoading] = useState(false);
  const labourEmail = "Vanaiyan@example.com";

  useEffect(() => {
    fetchLabourData();
  }, []);

  const fetchLabourData = async () => {
    setLoading(true);
    try {
      // Fetch data from LabourProfileService for aboutMe, gender, and languages
      const profileResponse = await getLabourProfileById(labourEmail);
      if (profileResponse.data) {
        const { aboutMe, gender, languages } = profileResponse.data;

        // Set existing values if not null
        if (aboutMe) setAboutMe(aboutMe);
        if (gender) setGender(gender);

        // Convert languages array to object for checkbox handling
        const languagesObject = {};
        languages.forEach((lang) => {
          if (lang === "Tamil" || lang === "English" || lang === "Sinhala") {
            languagesObject[lang] = true;
          }
        });
        setLanguages(languagesObject);
      }

      // Fetch data from LabourService for mobileNumber
      const serviceResponse = await getLabourById(labourEmail);
      if (serviceResponse.data) {
        const { mobileNumber } = serviceResponse.data;
        setMobileNumber(mobileNumber);
      }
    } catch (error) {
      console.error("Error fetching Labour data:", error);
      Alert.alert("Error", "Failed to fetch Labour details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const selectedLanguages = Object.keys(languages).filter(
        (lang) => languages[lang]
      );

      const labourEmail = "Vanaiyan@example.com"; 

      // Update data in LabourProfileService for aboutMe, gender, and languages
      await updateLabourProfile({
        aboutMe,
        gender,
        languages: selectedLanguages,
        labourEmail, // Make sure labourEmail is included in the update payload
      });

      console.log("Labour details updated successfully.");

      // Navigate to desired screen after successful update
      navigation.navigate("Labour_page");
    } catch (error) {
      console.error("Error updating labour data:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      Alert.alert("Error", "Failed to update labour details.");
    } finally {
      setLoading(false);
    }
  };


  const handleCheckboxChange = (name) => {
    setLanguages((prevLanguages) => ({
      ...prevLanguages,
      [name]: !prevLanguages[name],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>About Me</Text>
      <TextInput
        style={styles.input}
        value={aboutMe}
        onChangeText={setAboutMe}
        placeholder="Enter About Me"
      />
      <Text style={styles.label}>Contact Details</Text>
      <TextInput
        style={styles.input}
        value={mobileNumber}
        onChangeText={setMobileNumber}
        placeholder="Enter Mobile Number"
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>Gender</Text>
      <TextInput
        style={styles.input}
        value={gender}
        onChangeText={setGender}
        placeholder="Enter Gender"
      />
      <Text style={styles.label}>Languages</Text>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleCheckboxChange("Tamil")}
        >
          <Text>Tamil</Text>
          {languages.Tamil && <Text> ✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleCheckboxChange("English")}
        >
          <Text>English</Text>
          {languages.English && <Text> ✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleCheckboxChange("Sinhala")}
        >
          <Text>Sinhala</Text>
          {languages.Sinhala && <Text> ✓</Text>}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Edit;
