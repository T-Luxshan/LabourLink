import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Button } from 'react-native';
import { useNavigation , useRoute } from '@react-navigation/native';
import { getLabourByReview } from "../services/LabourDetailsService";


// Directly import the JSON data
import reviewsData from '../services/Reviews.json';



const ScrollReviewer = ({email,jobRole}) => {
  const [reviews, setReviews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);


  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
 

  useEffect(() => {
    fetchLabourReview(email,jobRole);
     },[email, jobRole])

  const fetchLabourReview = (email,jobRole) =>{
    getLabourByReview(email, jobRole)
      .then(respose=>{
         console.log(respose.data);
        setReviews(respose.data);
      })
      .catch(error=>{
        console.log("Error in fetching Review", error);
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
      {reviews.length > 0 ? (
        reviews.map((review, index) => ( // Show only first 2 reviews
          <View key={index} style={styles.reviewItemContainer}>
            <View style={styles.reviewDetailsContainer}>
              <Text style={styles.reviewerName}>Name{review.customerName ? review.customerName : "Name not found"}</Text>
              <Text style={styles.reviewText}>{review.description ? review.description : "description not found"}</Text>
              <Text style={styles.reviewRating}>Rating: {review.rating ? review.rating : "rating not found"}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text>No reviews found.</Text>
      )}

        
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
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <View key={index} style={styles.modalReviewItemContainer}>
                  <View style={styles.modalReviewDetailsContainer}>
                    <Text style={styles.modalReviewerName}>{review.customerName ? review.customerName :"Reviews not found" }</Text>
                    <Text style={styles.modalReviewText}>{review.description ? review.description : "Decription not found"}</Text>
                    <Text style={styles.modalReviewRating}>Rating: {review.rating ?  review.rating  : "Rating not found"}</Text>
                  </View>
                </View>
              ))
            ) : (
                <Text>No reviews found.</Text>
              )}
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
    height: 130,
  },
  reviewItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
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
