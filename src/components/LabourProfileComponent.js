import React from "react";
import { View, StyleSheet, Image, Text, } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
const LabourProfileComponent = (props) => {
  return (
    <View style={styles.boxBar}>
      <Image
        source={props.profileImage}
        style={styles.profilePhoto}
      />

      <View style={styles.profileDetails}>
        <Text style={styles.detailsContent}>{props.name}</Text>
        <Text style={styles.detailsContent}>{props.jobTitle}</Text>
        

        <View style={styles.ratingContainer}>
          <View style={styles.star}>
            {[...Array(props.rating)].map((_, index) => (
              <Icon key={index} name="star" size={20} color="#FFD700" />
            ))}
            <Text> {props.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// Define your styles here if needed




const styles = StyleSheet.create({
  boxBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    padding: 12,
    backgroundColor: "#ffeddd",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 30,
    marginTop: 20,
    margin: 25,
    marginBottom:10,
    marginTop:10,
  },

  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
    

  },

  profileDetails: {
    // Add any additional styling for profile details container
  },

  detailsContent: {
    fontSize: 16,
    // Add any styling for details content
  },

  detailsLabel: {
    fontWeight: "bold",
    // Add any styling for details label
  },
  star: {
    flexDirection: "row",
  },
});

export default LabourProfileComponent;


