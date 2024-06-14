import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Checkbox, Surface } from "react-native-paper"; // Assuming you use Paper for checkboxes

const Languages = () => {
  const [checked, setChecked] = useState({
    // State to manage checked languages
    english: false,
    tamil: false,
    sinhala: false,
  });

  const handleCheckboxChange = (language) => {
    setChecked((prevState) => ({
      ...prevState,
      [language]: !prevState[language], // Toggle the checked state
    }));
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
    height: 250,
    width: 345,
    alignItems: "center",
    justifyContent: "flexStart",
  },
});

export default Languages;
