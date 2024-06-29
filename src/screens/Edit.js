import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  getLabourProfileById,
  updateLabourProfile,
  createLabourProfile,
} from "../services/LabourProfileService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Edit = ({ navigation }) => {
  const [aboutMe, setAboutMe] = useState("");
  const [gender, setGender] = useState("");
  const [languages, setLanguages] = useState({
    Tamil: false,
    English: false,
    Sinhala: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [labourEmail, setLabourEmail] = useState("");
  // const labourEmail = "Vanaiyan@example.com";

  const [existingProfile, setExistingProfile] = useState(null);

   useEffect(() => {
     const fetchLabourEmail = async () => {
       try {
         const email = await AsyncStorage.getItem("userEmail");
         if (email) {
           setLabourEmail(email.toLowerCase());
         } else {
           console.log("No email found in AsyncStorage");
         }
       } catch (error) {
         console.log("Error fetching email from AsyncStorage:", error);
       }
     };

     fetchLabourEmail();
   }, []);

  useEffect(() => {
    if(labourEmail){
      fetchProfileData();
    }
  }, []);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      console.log(`Fetching profile for email: ${labourEmail}`);
      const response = await getLabourProfileById(labourEmail);
      console.log("Profile:", response.data);
      setExistingProfile(response.data);

      if (response.data) {
        const profileData = response.data;
        // console.log("Fetched Profile Data:", profileData);

        setAboutMe(profileData.aboutMe || "");
        setGender(profileData.gender || "");
        const selectedLanguages = { ...languages };
        Object.keys(selectedLanguages).forEach(
          (lang) =>
            (selectedLanguages[lang] =
              profileData.languages && profileData.languages.includes(lang))
        );
        setLanguages(selectedLanguages);
      } else {
        console.log("Profile data not found for:", labourEmail);
        setError("Profile data not found.");
      }
    } catch (error) {
      console.error("Error fetching labour profile:", error);
      setError("Failed to fetch labour profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      console.log("Saving profile data...");
      const selectedLanguages = getSelectedLanguages();
      const profileData = {
        aboutMe,
        gender,
        languages: selectedLanguages,
        labourEmail, // Ensure labourEmail is passed here
      };

      console.log("Profile Data to Save:", profileData);

      // Check if profile exists and has at least one non-null/undefined field
      // if (aboutMe || gender || selectedLanguages.length > 0) {
      //   const response =
      //     profileData.aboutMe ||
      //     profileData.gender ||
      //     profileData.languages.length > 0
      //       ? await updateLabourProfile(profileData)
      //       : await createLabourProfile(profileData);

      //   console.log(
      //     `Response from ${response ? "update" : "create"}LabourProfile:`,
      //     response
      //   );
      //   setError("");
      if (!existingProfile.aboutMe && !existingProfile.gender) {
        try{
          const response = await createLabourProfile(aboutMe, gender, selectedLanguages, labourEmail);
        } catch(error){
          console.log("Failed to create labour profile")
        }
        }
        else{
          try{
            const response = await updateLabourProfile(aboutMe, gender, selectedLanguages, labourEmail);
          } catch(error){
            console.log("Failed to update labour profile")
          }
      }
  
          
       

      // Reset form and state
      setAboutMe("");
      setGender("");
      setLanguages({
        Tamil: false,
        English: false,
        Sinhala: false,
      });
      navigation.navigate("Labour_page");
    } catch (error) {
      console.error(
        "Error updating labour data:",
        error.response ? error.response.data : error.message
      );
      setError("Failed to update labour details.");
    } finally {
      setIsLoading(false);
    }
  };

  const getSelectedLanguages = () => {
    return Object.keys(languages).filter((lang) => languages[lang]);
  };

  const handleCheckboxChange = (name) => {
    setLanguages((prevLanguages) => ({
      ...prevLanguages,
      [name]: !prevLanguages[name],
    }));
  };

   const handleGenderChange = (selectedGender) => {
     setGender(selectedGender);
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

      <Text style={styles.label}>Gender</Text>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleGenderChange("Male")}
        >
          <Text>Male</Text>
          {gender === "Male" && <Text> ✓</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleGenderChange("Female")}
        >
          <Text>Female</Text>
          {gender === "Female" && <Text> ✓</Text>}
        </TouchableOpacity>
      </View>

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

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        disabled={isLoading}
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
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default Edit;
