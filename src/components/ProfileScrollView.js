import React from "react";
import { ScrollView, View, StyleSheet, Image, Text, Icon } from "react-native";

const ProfileComponent = (props) => {
  return (
    <View style={styles.boxBar}>
      <Image
        source={require('../assets/Images/app-logo2.png')}
        style={styles.profilePhoto}
      />

      <View style={styles.profileDetails}>
        <Text style={styles.detailsContent}>{props.name}</Text>
        <Text style={styles.detailsContent}>{props.role}</Text>

        <View style={styles.ratingContainer}>
          <View style={styles.star}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Icon key={index} name="star" size={20} color="#FFD700" />
            ))}
            <Text> {props.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const ProfileList = () => {
  // Sample data for profiles
  const profilesData = [
    { name: "John Doe", role: "Developer", rating: 4.5 },
    { name: "Jane Smith", role: "Designer", rating: 3.8 },
    // Add more profiles as needed
  ];

  return (
    <ScrollView>
      {profilesData.map((profile, index) => (
        <ProfileComponent key={index} {...profile} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  boxBar: {
    // Your existing styles for boxBar
  },
  profilePhoto: {
    // Your existing styles for profilePhoto
  },
  profileDetails: {
    // Your existing styles for profileDetails
  },
  detailsContent: {
    // Your existing styles for detailsContent
  },
  ratingContainer: {
    // Your existing styles for ratingContainer
  },
  star: {
    // Your existing styles for star
  },
});

export default ProfileList;
