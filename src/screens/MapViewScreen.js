// MapViewScreen.js

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import LabourProfileComponent from "../components/LabourProfileComponent";
import { useNavigation } from '@react-navigation/native'; 
import { getLabourByJobRole, getLocationsByJobRole } from "../services/LabourDetailsService";
// import {ProfileImageByEmail} from "../services/LabourDetailsService"

const MapViewScreen = () => {
  const initialRegion = {
    latitude: 6.79503,
    longitude: 79.90168,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [region, setRegion] = useState(initialRegion);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [LabourLocation, setLabourLocation] = useState([]);
  const navigation = useNavigation();
  const [labourcard, setLabourCard] = useState([]);
  // const [ProfileImage, setProfileImage] =useState([]);

 

  let jobRole = "PAINTER";
  


  useEffect(() => {
    fetchLabour(jobRole);
  }, [jobRole]);

  const fetchLabour = (jobRole) => {
    getLabourByJobRole(jobRole)
      .then(response => {
        // console.log(response.data);
        setLabourCard(response.data);
       
  
      })
      .catch(error => {
        console.log("Error in fetching labour", error);
      });
  };

  useEffect(() => {
    fetchLocation(jobRole);
  }, [jobRole]);

  const fetchLocation = (jobRole) => {
    getLocationsByJobRole(jobRole)
      .then(response => {
        // console.log(response.data);
        setLabourLocation(response.data);
      })
      .catch(error => {
        console.log("Error in fetching locations", error);
      });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const handleProfileClick = (labourEmail,profileUri) => {
    navigation.navigate('LabourInfo', {
      email: labourEmail,
      JobRole:jobRole ,
      ProfileImage:profileUri,

    });
  };
  
  


  return (
    <View style={styles.Mapcomponentcontainer}>
      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : (
        <View style={styles.mapViewContainer}>
          <MapView
            style={styles.mapStyle}
            showsUserLocation={true}
            zoomEnabled={true}
            zoomControlEnabled={true}
            initialRegion={region}
          >
            {location && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Your Location"
                pinColor="blue"
              />
            )}
            {LabourLocation.length > 0 &&
              LabourLocation.map((labourLocation, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: labourLocation.latitude,
                    longitude: labourLocation.longitude,
                  }}
                >
                  <Image
                    source={require('../assets/Labour.png')}
                    style={styles.markerImage}
                  />
                    <Callout onPress={() => handleProfileClick(labourLocation.labourId,labourLocation.profileUri)}>
                    <View style={styles.calloutContainer}>
                     
                      <Text style={styles.labourName}>{labourLocation.labourName}</Text>
                       <Text style={styles.labourJobRole}>Rating:{labourLocation.rating}</Text> 
                      {/* <TouchableOpacity onPress={() => handleProfileClick(labourLocation.labourEmail)}>
                        <Text style={styles.viewProfileText}>View Profile</Text>
                      </TouchableOpacity> */}
                    </View>
                  </Callout>
                 

                 
                </Marker>
              ))}
        
          </MapView>
          <ScrollView>
            {labourcard.length > 0 ? (
              labourcard.map((labour, index) => (
                <TouchableOpacity key={index} onPress={() => handleProfileClick(labour.labourEmail,labour.profileUri)}>
                  <LabourProfileComponent
                    profileImage={{
                      uri: labour.profileUri,
                    }}
                    name={labour.labourName}
                    jobTitle={labour.jobRole.join(" | ")}
                    rating={labour.rating}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noLabourText}>There is no Labour</Text>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Mapcomponentcontainer: {
    flex: 1,
    backgroundColor: "white",
  },
  mapStyle: {
    width: "100%",
    height: 300,
    marginTop: 0,
  },
  mapViewContainer: {
    flex: 1,
  },
  noLabourText: {
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
  markerImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  calloutContainer: {
    width: 150,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  labourName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  labourJobRole: {
    fontSize: 14,
  },
});

export default MapViewScreen;
