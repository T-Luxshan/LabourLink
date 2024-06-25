import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox, Surface, Button } from "react-native-paper";
import * as LabourProfileService from "../services/LabourProfileService";

const Languages = ({ navigation }) => {
  const [checked, setChecked] = useState({
    english: false,
    tamil: false,
    sinhala: false,
  });

  useEffect(() => {
    loadSavedLanguages();
  }, []);

  const loadSavedLanguages = async () => {
    try {
      const savedLanguages = await AsyncStorage.getItem("selectedLanguages");
      if (savedLanguages !== null) {
        setChecked(JSON.parse(savedLanguages));
      }
    } catch (error) {
      console.error("Error loading languages:", error);
    }
  };

  const handleCheckboxChange = (language) => {
    setChecked((prevState) => ({
      ...prevState,
      [language]: !prevState[language],
    }));
  };

  const handleSaveLanguages = async () => {
    try {
      await AsyncStorage.setItem("selectedLanguages", JSON.stringify(checked));

      // Prepare an array of selected languages
      const selectedLanguages = Object.keys(checked).filter(
        (language) => checked[language]
      );

      // Replace with actual email or fetch dynamically
      const labourEmail = "lehaan@example.com";

      // Call updateLabourProfile function from LabourProfileService
      await LabourProfileService.updateLabourProfile(
        "", // aboutMe, if not updating
        "", // gender, if not updating
        selectedLanguages,
        labourEmail
      );

      console.log("Languages updated successfully in backend");

      // Navigate to Labour_profile_page with selectedLanguages
      navigation.navigate("Labour_profile_page", {
        selectedLanguages: checked,
      });
    } catch (error) {
      console.error("Error saving languages:", error);
    }
  };

  return (
    <Surface style={styles.surface} elevation={1}>
      <View style={styles.container}>
        <Text style={styles.title}>Select Languages</Text>
        <View style={styles.checkboxContainer}>
          <Checkbox.Item
            label="English"
            status={checked.english ? "checked" : "unchecked"}
            onPress={() => handleCheckboxChange("english")}
          />
          <Checkbox.Item
            label="Tamil"
            status={checked.tamil ? "checked" : "unchecked"}
            onPress={() => handleCheckboxChange("tamil")}
          />
          <Checkbox.Item
            label="Sinhala"
            status={checked.sinhala ? "checked" : "unchecked"}
            onPress={() => handleCheckboxChange("sinhala")}
          />
        </View>
        <Button
          mode="contained"
          onPress={handleSaveLanguages}
          style={styles.saveButton}
        >
          Save
        </Button>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  checkboxContainer: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  surface: {
    borderRadius: 20,
    marginLeft: 15,
    marginTop: 70,
    padding: 5,
    height: 300,
    width: 345,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  saveButton: {
    marginTop: 20,
    width: "50%",
  },
});

export default Languages;
