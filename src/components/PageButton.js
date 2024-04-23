import * as React from 'react';
import { Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const PageButton = () => (
  <View style={styles.container}>
    <Button
      mode="contained"
      onPress={() => console.log('Pressed')}
      style={styles.button}
      
    >
      Book Now
    </Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'flex-end',
    padding: 16,
    marginTop: 1,
    margin:-20
     // This will push the button to the bottom
  },
  button: {
    marginBottom: 100,
    backgroundColor: 'orange',
    width:350,
    height:50,
    marginLeft:10,
    borderRadius:50
    // Adjust the marginTop for spacing
  },
});

export default PageButton;

