// MapViewScreen.js

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import LabourProfileComponent from "../components/LabourProfileComponent";
import LabourData from "../services/Labours.json";

const MapViewScreen = ({ navigation }) => {
  const initialRegion = {
    latitude: 6.79503,
    longitude: 79.90168,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [region, setRegion] = useState(initialRegion);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [Labours, setLabours] = useState([]);

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
    setLabours(LabourData);
  }, []);

  const handleProfileClick = (Labour) => {
    navigation.navigate('LabourInfo', {
      Labour,
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
            {Labours.length > 0 &&
              Labours.map((Labour, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: Labour.latitude,
                    longitude: Labour.longitude,
                  }}
                  title={Labour.name}
                  description={Labour.jobRole}
                >
                  <Image
                    source={require('../assets/Labour.png')} // Update the image path as needed
                    style={styles.markerImage}
                  />
                </Marker>
              ))}
          </MapView>
          <ScrollView>
            {Labours.length > 0 ? 
              Labours.map((Labour, index) => (
                <TouchableOpacity key={index} onPress={() => handleProfileClick(Labour)}>
                  <LabourProfileComponent 
                    name={Labour.name}
                    jobTitle={Labour.jobRole}
                    rating={Labour.rating}
                  />
                </TouchableOpacity>
              )) : 
              <Text style={styles.noLabourText}>There is no Labour</Text>
            }
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Mapcomponentcontainer: {
    flex: 1,
    backgroundColor:"white",
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
    width: 30, // Set the width of the image
    height: 30, // Set the height of the image
    resizeMode: 'contain', // Ensure the image is contained within the bounds
  },

});

export default MapViewScreen;
