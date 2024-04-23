import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const ScrollReviewer = () => {
  const [reviews, setReviews] = useState([
    { text: 'Their expertise behind the wheel was commendable. I felt safe and comfortable throughout the journey, both to and from Colombo.', reviewerPhoto: require('../assets/Images/profile_photo1.png') },
    { text: 'Their expertise behind the wheel was commendable. I felt safe and comfortable throughout the journey, both to and from Colombo.', reviewerPhoto: require('../assets/Images/profile_photo2.png') },
    { text: 'Another great experience with this labor. Punctual and professional. Highly recommended!', reviewerPhoto: require('../assets/Images/profile_photo3.png') },
    // Add more sample reviews as needed
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Reviews</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllButtonText}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.reviewsContainer}>
        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewItemContainer}>
            <Image source={review.reviewerPhoto} style={styles.reviewerPhoto} />
            <View style={styles.reviewDetailsContainer}>
              <Text style={styles.reviewerName}>{review.text}</Text>
              {/* Add more details if needed */}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  reviewsContainer: {
    marginBottom: 10,
    height:70,
  },
  reviewItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  reviewerPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  reviewDetailsContainer: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 15,
  },
  seeAllButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  seeAllButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default ScrollReviewer;

