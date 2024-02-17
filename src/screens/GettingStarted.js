import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
 

const GettingStarted = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleGetStartPress = () => {
    navigation.navigate('Login');
    console.log("get start button pressed")
  };

  return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Appbar.Header>
            <Appbar.Content
            title={<Image source={require('../assets/Images/app-logo3.png')} style={styles.logo} />}
            
            />
            </Appbar.Header>
        </View>
      <View style={styles.homeContainer}>
        <Text style={styles.homeTitle}>Hello, Waiting for you!</Text>
        <Text style={styles.homeText}>Join us, find your fit, and feel appreciated!</Text>
      </View>
         
      


{/* 
      <View style={styles.getStartButtonContainer}>
        <Button style={styles.getStartButton} buttonColor="#01214A" mode="contained"  onPress={() => console.log('Pressed') }>
            Get Start
            <MaterialCommunityIcons name="arrow-right-bold-circle-outline" size={20} color="white" style={{ padding: 60 ,}} />
        </Button>
      </View>
       */}


        {/*  */}

            <View style={styles.getStartButtonContainer}>
            <Button
                style={styles.getStartButton}
                mode="contained"
                onPress={handleGetStartPress}>
                <Text style={styles.buttonText}>Get Start</Text> {/* Text */}
                <MaterialCommunityIcons
                name="arrow-right-bold-circle-outline"
                size={20}
                color="white"
                style={styles.icon} // Icon styling
                />
            </Button>
            </View>


            <View style={styles.bgImgContainer}>
                <Image
                    source={require('../assets/Images/bg-home-ellipse.png')}
                    style={styles.bottomImage}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.bgImgOverlayContainer}>
                <Image
                    source={require('../assets/Images/bg-home-people.png')}
                    style={styles.bottomOverlayImage}
                    resizeMode="cover"
                />
            </View>


        {/*  */}

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor:'white',
      flex: 1,
      paddingTop: 120,
        // marginRight:20
    },
    logo: {
      width: 120,
      height: 120,
    },
    logoContainer: {
        paddingLeft: 120,
    },
    homeContainer:{
        marginRight:10,
       

        marginVertical: 40,
    },
    homeTitle:{
        fontSize: 18,
        fontWeight: '600',

        textAlign: 'center',
    },
    homeText:{
        marginVertical: 10,
        fontSize: 17,
        fontWeight: '200',
        textAlign: 'center',
    },
  
        getStartButtonContainer: {
        marginTop:-20,
        alignItems: 'center', // Center button horizontally
      },
      getStartButton: {
        backgroundColor: '#01214A',
        borderRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row', // Align items horizontally
        justifyContent: 'center', // Align items vertically
      },
      buttonText: {
        color: 'white',
      },
      icon: {
        marginLeft: 10, // Add margin for spacing between text and icon
        alignSelf: 'center', // Align icon vertically within the button
      },
      bgImgContainer:{
        
      },
      bottomImage:{
          marginTop: 90,
          marginRight: 10,
          width: '100%', // Adjust the width as needed
    height: 500,
        

      },
      bottomImage: {
        position: 'absolute', // Position the image absolutely
        top: 70, // Align the image to the bottom of its container
        left: 0, // Align the image to the left of its container
        width: '100%', // Take up the full width of its container
        height: 500, // Set the height as needed
      },
      bottomOverlayImage: {
        position: 'absolute', // Position the image absolutely
        top: 10, // Align the image to the bottom of its container
        left: 20, // Align the image to the left of its container
        // width: '100%', // Take up the full width of its container
        height: 500, // Set the height as needed
        zIndex: 1, // Place the overlay image above the base image
      },
  });
  
export default GettingStarted;
