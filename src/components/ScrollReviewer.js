import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getLabourByReview } from "../services/LabourDetailsService";


// Directly import the JSON data
import reviewsData from '../services/Reviews.json';

const imageMapping = {
  "profile_photo1.png": require('../assets/Images/profile_photo1.png'),
  "profile_photo2.png": require('../assets/Images/profile_photo2.png'),
  "profile_photo3.png": require('../assets/Images/profile_photo3.png'),
  "profile_photo4.png": require('../assets/Images/profile_photo1.png'),
  "profile_photo5.png": require('../assets/Images/profile_photo2.png'),
};

const ScrollReviewer = () => {
  const [reviews, setReviews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   // Directly set the imported JSON data to state
   
  // }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const navigation = useNavigation(); // Get navigation object using useNavigation hook
  let email = "thana@example.com";
  let jobRole = "Electrician";

  // const [LabourReview, setReview] =useState('')

  useEffect(() => {
    fetchLabourReview(email,jobRole);
     },[email, jobRole])

  const fetchLabourReview = (email,jobRole) =>{
    getLabourByReview(email, jobRole)
      .then(respose=>{
        console.log(respose);
        setReviews(respose.data);
      })
      .catch(error=>{
        console.log("Error in fetching About", error);
      })
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Reviews</Text>
        <TouchableOpacity style={styles.seeAllButton} onPress={toggleModal}>
          <Text style={styles.seeAllButtonText}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.reviewsContainer}>
        {reviews.map((review, index) => ( // Show only first 2 reviews
          <View key={index} style={styles.reviewItemContainer}>
            {/* <Image source={imageMapping[review.reviewerPhoto]} style={styles.reviewerPhoto} /> */}
            <View style={styles.reviewDetailsContainer}>
              <Text style={styles.reviewerName}>{review.customerName}</Text>
              <Text style={styles.reviewText}>{review.description}</Text>
              <Text style={styles.reviewRating}>Rating: {review.rating}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal for displaying all reviews */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>All Reviews</Text>
            <ScrollView style={styles.modalReviewsContainer}>
              {reviews.map((review, index) => (
                <View key={index} style={styles.modalReviewItemContainer}>
                  <Image source={imageMapping[review.reviewerPhoto]} style={styles.modalReviewerPhoto} />
                  <View style={styles.modalReviewDetailsContainer}>
                    <Text style={styles.modalReviewerName}>{review.customerName}</Text>
                    <Text style={styles.modalReviewText}>{review.description}</Text>
                    <Text style={styles.modalReviewRating}>Rating: {review.rating}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <Button title="Close" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    paddingLeft: 5,
    paddingRight: 5,
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
    height: 110,
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
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
  },
  reviewRating: {
    fontSize: 14,
    color: '#888',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalReviewsContainer: {
    width: '100%',
    maxHeight: 400,
  },
  modalReviewItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  modalReviewerPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  modalReviewDetailsContainer: {
    flex: 1,
  },
  modalReviewerName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalReviewText: {
    fontSize: 14,
    color: '#666',
  },
  modalReviewRating: {
    fontSize: 14,
    color: '#888',
  },
});

export default ScrollReviewer;
