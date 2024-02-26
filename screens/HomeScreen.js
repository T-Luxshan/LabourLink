import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Surface, Icon, Switch, BottomNavigation } from 'react-native-paper';





const HomeScreen = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);


  const handleLanguagesPress = () => {
    
    console.log('Languages section pressed');
  };


  

  return(
    <View>
     <View style={{ flexDirection: 'row', alignItems: 'center'}}>
      <Text style={{ width: 320, height: 44, marginLeft: 15, marginTop: 28, fontWeight: 'bold', fontSize: 24 }}>My Profile</Text>
      <Icon source="dots-horizontal-circle-outline" size={25} style={{ marginLeft: 'auto' }}/>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../assets/boy.png')} style={{ width: 55, height: 55, borderRadius: 27.5, marginLeft: 15 }} />
        <View style={{ marginLeft: 15 }}>
          <Text style={{ fontSize: 16, fontWeight: '700' }}>Ayshmankura shan</Text>
          <Text style={{ fontSize: 13, fontWeight: '400' }}>Joined since <Text style={{ fontWeight: '600' }}>27 Dec 2020</Text></Text>
        </View>
      <TouchableOpacity onPress={handleLanguagesPress}>
     <Button mode="contained" onPress={() => console.log('Pressed')} style={{ width: 100, marginLeft: 20, backgroundColor: 'darkblue' }}>
        Edit
      </Button>
      </TouchableOpacity>
     </View>








    
       
      <Surface style={styles.surface} elevation={1}>
     <Text style={{ fontSize: 15, fontWeight: '600', padding: 10}}>Settings</Text>
      
     <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
     <Icon source="earth" size={20}/>
     <Text style={{ fontSize: 14, padding: 10}}>Languages</Text>
     <View style={{ flex: 1, alignItems: 'flex-end' }}>
     <TouchableOpacity onPress={handleLanguagesPress}>
     <Icon source="chevron-right" size={20} style={{ paddingLeft: 80 }} />
     </TouchableOpacity>
     </View>
     </View>
     <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
      <Icon source="heart-outline" size={20}/>
     <Text style={{ fontSize: 14, padding: 10}}>Location</Text>
     <View style={{ flex: 1, alignItems: 'flex-end' }}>
     <TouchableOpacity onPress={handleLanguagesPress}>
     <Icon source="chevron-right" size={20} style={{ paddingLeft: 50 }} />
     </TouchableOpacity>
     </View>
     </View>
     </Surface>



     <Surface style={styles.secondSurface} elevation={1}>
     <Text style={{ fontSize: 15, fontWeight: '600', padding: 10}}>Notification</Text>
     <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
      <Icon source="bell-outline" size={20}/>
     <Text style={{ fontSize: 14, padding: 10}}>Pop-up Notification</Text>
     <Switch value={isSwitchOn} onValueChange={onToggleSwitch} style={{marginLeft: 100}} trackColor={{ false: 'gray', true: 'darkblue' }}
            thumbColor={isSwitchOn ? 'white' : 'white'}/>
     </View>
     
     </Surface> 



     <Surface style={styles.thirdSurface} elevation={1}>
     <Text style={{ fontSize: 15, fontWeight: '600', padding: 10}}>Others</Text>
     <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
      <Icon source="alert-circle-outline" size={20}/>
     <Text style={{ fontSize: 14, padding: 10}}>About Us</Text>
     <View style={{ flex: 1, alignItems: 'flex-end' }}>
     <TouchableOpacity onPress={handleLanguagesPress}>
     <Icon source="chevron-right" size={20} style={{ paddingLeft: 50 }} />
     </TouchableOpacity>
     </View>
     </View>
     <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
      <Icon source="headset" size={20}/>
     <Text style={{ fontSize: 14, padding: 10}}>Customer Service</Text>
     <View style={{ flex: 1, alignItems: 'flex-end' }}>
     <TouchableOpacity onPress={handleLanguagesPress}>
     <Icon source="chevron-right" size={20} style={{ paddingLeft: 50 }} />
     </TouchableOpacity>
     </View>
     </View>
     <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
      <Icon source="email-open-outline" size={20}/>
     <Text style={{ fontSize: 14, padding: 10}}>Invite Other</Text>
     <View style={{ flex: 1, alignItems: 'flex-end' }}>
     <TouchableOpacity onPress={handleLanguagesPress}>
     <Icon source="chevron-right" size={20} style={{ paddingLeft: 50 }} />
     </TouchableOpacity>
     </View>
     </View>
     <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
      <Icon source="logout" size={20}/>
      <TouchableOpacity onPress={handleLanguagesPress}>
     <Text style={{ fontSize: 14, padding: 10}}>Logout</Text>
     </TouchableOpacity>
     </View>
     </Surface>  
      







      
    </View>
  );
};









    
export default HomeScreen;



const styles = StyleSheet.create({
  surface: {
    borderRadius: 20,
    marginLeft:15,
    marginTop:25,
    padding: 5,
    height: 120,
    width: 345,
    alignItems: '',
    justifyContent: 'flexStart',
  },

  secondSurface: {
    borderRadius: 20,
    marginLeft:15,
    marginTop:25,
    padding: 5,
    height: 80,
    width: 345,
    alignItems: '',
    justifyContent: 'flexStart',
  },

  thirdSurface: {
    borderRadius: 20,
    marginLeft:15,
    marginTop:25,
    padding: 5,
    height: 190,
    width: 345,
    alignItems: '',
    justifyContent: 'flexStart',
  },
});





