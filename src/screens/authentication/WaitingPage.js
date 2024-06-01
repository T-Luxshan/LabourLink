import React from 'react'
import { View, StyleSheet, Image, Text, Linking } from 'react-native';
import { Button } from 'react-native-paper';
// import { Linking } from 'expo';

const sendMail = () => {
    Linking.openURL('mailto:labourlink@gmail.com');
}

const handleCall = () => {
    Linking.openURL('tel:++94764541332');
}

const WaitingPage = () => {
  return (
    <View style={styles.waitingPageContainer}>
        
        <Image
            source={require('../../assets/Images/Ellipse3.png')}
            resizeMode="contain"
            style={styles.topImage}
            />
        <Text style={styles.head}> Hello Friend!</Text>
        <Text style={styles.body}>Your registration is under process, We will get back at you within 2 weeks.
            {'\n\n'}For any inquiries contact us
        </Text>
        <View style={styles.contactus}>
            <Button labelStyle={{fontSize:16, fontWeight:550}} style={styles.btn} textColor="#FB9741" mode="text" onPress={sendMail}>
              labourlink@gmail.com 
            </Button>
            <Button labelStyle={{fontSize:16, fontWeight:550}} textColor="#FB9741" mode="text" onPress={handleCall}>
              +94 76 4541 332 
            </Button>
        </View>
        <Image
            source={require('../../assets/Images/processing2.gif')}
            resizeMode="contain"
            style={styles.gifImage}
        />
    </View>
  )
}

export default WaitingPage

const styles = StyleSheet.create({
    waitingPageContainer:{
        backgroundColor: 'white',
        flex:1
    },
    topImage: {
        marginRight: 10,
        width: 450, 
        height: 410,
        position: 'absolute', 
        top: -150, 
        left: 0,  
        zIndex: 0,
        transform: [{ rotate: '-2deg' }]
    },
    head:{
        marginTop: 150,
        marginLeft:10,
        fontSize:32,
        fontWeight: 'bold'
    },
    body: {
        marginTop: 10,
        marginLeft:20,
        marginRight:20,
        fontSize:20,
        fontWeight: 550
    },
    btn:{
        // marginHorizontal: 10,
    },
    contactus:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20, 
    },
    gifImage: {
        width: 400,
        height: 400,
        // alignSelf: 'center',
        marginVertical: 20,
    },
});