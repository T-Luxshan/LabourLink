import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-paper';

const LabourProfileComponent = (props) => {
  const fullStars = Math.floor(props.rating);
  const hasHalfStar = props.rating - fullStars >= 0.5;

  return (
    <View style={[styles.boxBar, {backgroundColor:"#ECECEC"}]}>
      <Avatar.Image size={48} source={props.profileImage }/>
       {/* <Image
        source={{uri:props.profileImage}}
        style={styles.profilePhoto}
      />  */}
      {/* {profileImage && (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      )} */}

      <View style={styles.profileDetails}>
        <Text style={styles.detailsContent}>{props.name}</Text>
        <Text style={styles.detailsContent}>{props.jobTitle}</Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.star}>
            {[...Array(fullStars)].map((_, index) => (
              <Icon key={index} name="star" size={20} color="#FFD700" />
            ))}
            {hasHalfStar && <Icon name="star-half" size={20} color="#FFD700" />}
            {props.rating % 1 !== 0 && !hasHalfStar && (
              <Icon name="star" size={20} color="#FFD700" />
            )}
            <Text style={styles.ratingText}> {props.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxBar: {
    marginLeft:9,
    alignItems: "center",
    width: "95%",
    padding: 12,
    // backgroundColor: "#F6F9Fd",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  profileDetails: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContent: {
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    flexDirection: "row",
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 5,
  },
});

export default LabourProfileComponent;
