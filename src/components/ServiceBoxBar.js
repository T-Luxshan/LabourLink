import * as React from 'react';
import { Card, Text } from 'react-native-paper';
// const ratingText = props.rating ? props.rating.toFixed(1) : 'N/A';

const ServiceBoxBar = (props) => (
  <Card style={styles.card}>
    <Card.Content style={styles.cardContent}>
    <Text style={styles.titleText}>{props.Cardno}</Text>
      <Text style={styles.bodyText}>{props.Cardtext}</Text>
    </Card.Content>
  </Card>
);

const styles = {
  card: {
    width: 120, // Adjust the width as needed
    height: 75, // Adjust the height as needed
    margin:27,
    marginTop:0.5,// Add any other styling properties as necessary
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 7,
      
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#F6F9Fd",
  
     
  
    
  },
  cardContent: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: '100',
    fontsize:''
   },
  centerText: {
    textAlign: 'center',
    color: 'orange',
    
    // padding: ,
    
  },
  titleText: {
    fontSize: 15, // Adjust the font size for title
    textAlign:'center',// fontWeight: 'bold', // Add any other styling properties as needed
    color:'orange',
  },

  bodyText: {
    fontSize: 13, // Adjust the font size for body
    textAlign:'center'// Add any other styling properties as needed
  },

};

export default ServiceBoxBar;

