// Importing necessary modules from React and React Native
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Importing custom components
import AppBar from "../components/AppBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LabourProfileComponent from "../components/LabourProfileComponent";
import ServiceBoxBar from "../components/ServiceBoxBar";
import ScrollReviewer from "../components/ScrollReviewer";
import PageButton from "../components/PageButton";

// LabourInfo component definition
const LabourInfo = () => {
  // Rendering JSX
  return (
    // Wrapping the entire component with SafeAreaProvider to handle safe areas for different devices
    <SafeAreaProvider>
      {/* Main container view */}
      <View style={styles.container}>
        {/* AppBar component with title */}
        <AppBar Title="         Willeam smith"/>

        {/* Labour profile component */}
        <LabourProfileComponent
          profileImage={require("../assets/Images/profile_photo3.png")} // Profile image
          name="Williem Smith" // Name of the labour
          jobTitle="Electrician" // Job title
          rating={4} // Rating
        />
        
        {/* Container for displaying service information */}
        <View style={styles.infoContainer}>
         
          <ServiceBoxBar Cardtext="Total Services" Cardno="210" /> 
          <ServiceBoxBar Cardtext="Experience" Cardno="10Y+" /> 
          <ServiceBoxBar Cardtext="Rating" Cardno="4.8" /> 
        </View>  

        {/* Container for labour information */}
        <View style={styles.labor}>
          {/* Title for labour information section */}
          <Text style={styles.title}>Labor Information</Text>
          {/* Displaying various information about the labour */}
          <Text style={styles.info}>Full Name: John Doe</Text>
          <Text style={styles.info}>Age: 24</Text>
          <Text style={styles.info}>Gender: Male</Text> 
          {/* Container for displaying about information */}
          <View style={styles.about}>
            {/* Title for about section */}
            <Text style={styles.info}>About:</Text>
            {/* Description about the labour */}
            <Text style={styles.indentedText}>
              Committed to providing top-notch transportation solutions with a focus on efficiency and customer satisfaction. Continuously updating skills to adapt to the evolving demands of the transportation industry. View More
            </Text>
          </View>
        </View>

        {/* Container for displaying scroll reviewer and page button */}
        <View>
          {/* ScrollReviewer component for displaying reviews */}
          <ScrollReviewer />
          {/* PageButton component for navigating to different pages */}
          <PageButton />
        </View>
      </View>
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  
  container: {
    flex: 1, // Take up entire space
    marginTop: 10, 
    paddingHorizontal: 20, 
  },
  
  infoContainer: {
    flexDirection: "row", // Arrange items in a row
    justifyContent: "space-between", // Align items with space between them
    paddingVertical: 16, 
  },
 
  labor: {
    marginTop: 20, 
  },
 
  title: {
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 10, 
  },
 
  info: {
    fontSize: 16, 
    marginBottom: 5, 
  },
  
  about: {
    flexDirection: "row", 
    marginTop: 8, 
  },
 
  indentedText: {
    marginLeft: 10, 
    fontSize: 16, 
  },
});

// Exporting LabourInfo component
export default LabourInfo;
