// Importing necessary modules from React and React Native
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,ScrollView } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useNavigation hook
import AppBar from "../components/AppBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LabourProfileComponent from "../components/LabourProfileComponent";
import ServiceBoxBar from "../components/ServiceBoxBar";
import ScrollReviewer from "../components/ScrollReviewer";
// import PageButton from "../components/PageButton";
import { getLabourByEmail } from "../services/LabourDetailsService";
import {getLabourByAbout} from "../services/LabourDetailsService";
import {getLabourByRating} from "../services/LabourDetailsService";
import { getLabourByTotalservice } from "../services/LabourDetailsService";
import { Button } from 'react-native-paper';




// LabourInfo component definition
const LabourInfo = () => {
  // console.props(props);
   const navigation = useNavigation(); // Get navigation object using useNavigation hook
   const route = useRoute();
   const {email, JobRole, ProfileImage } = route.params;
   const jobRole = JobRole.toUpperCase();
   
   

   
   
  

  


  

     useEffect(() => {
     fetchLabour(email);
      },[email])

     useEffect(() => {
        fetchAbout(email);
         },[email])

  const [labour, setLabour] = useState('');
  const [Labourfrofile, setAbout] = useState('');
  const [labourrating, setrating] = useState('');
  const [labourTotalservice, setTotalServices] = useState('');
  const [labourcard, setLabourCard] = useState([]);

  // const [labourId, setEmail] = useState(labourEmail);

  const fetchLabour = (email) =>{
    getLabourByEmail(email)
      .then(respose=>{
        // console.log(respose);
        setLabour(respose.data);
      })
      .catch(error=>{
        console.log("Error in fetching labour", error);
      })
  }
  const fetchAbout = (email) =>{
    getLabourByAbout(email)
      .then(respose=>{
        // console.log(respose);
        setAbout(respose.data);
      })
      .catch(error=>{
        console.log("Error in fetching About", error);
      })
  }
  useEffect(() => {
    fetchrating(email);
     },[email])

     const fetchrating = (email) =>{
      getLabourByRating(email)
        .then(respose=>{
          // console.log(respose);
          setrating(respose.data);
        })
        .catch(error=>{
          console.log("Error in fetching About", error);
        })
    }

    useEffect(() => {
    fetchTotalServices(email, "COMPLETED");  // Fetch total services with a specific stage
  }, [email]);


    const fetchTotalServices = (email, stage) => {
      getLabourByTotalservice(email, stage)
        .then(response => {
          console.log(response.data);
          setTotalServices(response.data.length);  // Assuming response.data is an array of services
        })
        .catch(error => {
          console.log("Error in fetching total services", error);
        });
    };
  
  
  

  const handlePress = () => {
    // Navigate to 'BookAppointment' screen
    navigation.navigate("BookAppointment",{
      labourId: email,
      jobRole: jobRole,
      labourCard: {},
      labourName: labour.name,
      labourJobTitle: labour.jobRole.join(" | "),
      labourRating: labourrating,
      profileImage:ProfileImage,
    });
  };


  return (
    // Wrapping the entire component with SafeAreaProvider to handle safe areas for different devices
     <SafeAreaProvider>
      {/* Main container view */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* AppBar component with title */}
        {/* <AppBar Title={labour.name}/> */}


        {/* Labour profile component */}
        <LabourProfileComponent
          profileImage= {{ uri : ProfileImage }} style={styles.profileImage}// Profile image
          name = { labour ? labour.name : "Name not found" }  // Name of the labour
          jobTitle={labour ? labour.jobRole.join(" | ") : "Role not found"} // Job title
          rating={labourrating} // Rating
        />
        
        {/* Container for displaying service information */}
        
        <View style={styles.infoContainer}>
          <ServiceBoxBar Cardtext="Total Services" Cardno={labourTotalservice} />  
          <ServiceBoxBar  Cardtext="Rating" Cardno ={labourrating} /> 
        </View>  

        {/* Container for labour information */}
        <View style={styles.labor}>
          {/* Title for labour information section */}
          <Text style={styles.title}>Labor Information</Text>
          {/* Displaying various information about the labour */}
              <Text style={styles.info}>Name: {labour ? labour.name : "Name not found"}</Text> 

          <Text style={styles.info}>Gender: {Labourfrofile ? Labourfrofile.gender : "Name not found"}</Text> 
          {Labourfrofile.languages ?
            <Text style={styles.info}>language: {Labourfrofile ? Labourfrofile.languages.join(", ") : "languages not found"}</Text> 
          :
          <Text style={styles.info}>language: languages not found</Text> 
          }
          {/* Container for displaying about information */}
          <View style={styles.about}>
            {/* Title for about section */}
            <Text style={styles.info}>About:</Text>
            {/* Description about the labour */}
            <Text style={styles.indentedText}>
              
                {Labourfrofile ? Labourfrofile.aboutMe : "text not found"}

            </Text>
          </View>
        </View>

        {/* Container for displaying scroll reviewer and page button */}
        <View>
          {/* ScrollReviewer component for displaying reviews */}
          <ScrollReviewer email={email} jobRole={jobRole}/>
          {/* PageButton component for navigating to different pages */}
          {/* <PageButton screen="BookAppointment"/> */}
          <Button
            mode="contained"
            onPress={handlePress}
            style={styles.button}
          >
            Book Now
          </Button>
        </View>

        {/* Button to navigate to BookAppointment screen */}
        
    </ScrollView>
     </SafeAreaProvider>
    
  );
};


const styles = StyleSheet.create({
  
  container: {
    flexGrow: 1, // Take up entire space
    marginTop: 80, 
    paddingHorizontal: 20, 
    backgroundColor: "white",
  
   
  },
  
  infoContainer: {
     flexDirection: "row", 
     paddingHorizontal: 1,
      alignItems: 'center',
      gap:0,
    // marginVertical:10,
    
     
  },
 
  labor: {
    marginTop: 0, 
  },
 
  title: {
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 10, 
  },
 
  info: {
    fontSize: 16, 
    marginBottom: 5, 
  },
  
  about: {
    flexDirection: "row", 
    marginTop: 8, 
  },
 
  indentedText: {
    marginLeft: 10, 
    fontSize: 16, 
    marginRight:40,
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

// Exporting LabourInfo component
export default LabourInfo;
