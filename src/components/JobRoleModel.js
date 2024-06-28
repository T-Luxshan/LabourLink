import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Modal, Portal, PaperProvider, Headline, Chip, Card } from 'react-native-paper';
import { getLabourJobRoles } from '../services/AuthService';

const JobRoleModel = ({onMStateChange, onJobRolesChange, mState}) => {
  const [visible, setVisible] = useState(false);
  const [jobList, setJoblist] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const showModal = () => {
    setVisible(true);
    onMStateChange(true);
  };
  const hideModal = () => {
    setVisible(false);
    onMStateChange(false);
    onJobRolesChange(selectedJobs);
  };
  let availableJobRoles = ["CARPENTER", "ELECTRICIAN", "PLUMBER", "PAINTER", "MASON", "WELDER", "DRIVER"];

  useEffect(() => {
    setJoblist(availableJobRoles);
  }, []);
  // useEffect(() => {
  //   getLabourJobRoles()
  //     .then(response => {
  //       setJoblist(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching job roles:', error);
  //     });
  // }, []); 

  const toggleChipSelection = (job) => {
    setSelectedJobs((prevSelectedJobs) =>
      prevSelectedJobs.includes(job)
        ? prevSelectedJobs.filter((selectedJob) => selectedJob !== job)
        : [...prevSelectedJobs, job]
    );
  };

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} style={{ backgroundColor: '#797979' }}
        // <Modal visible={visible} onDismiss={hideModal}  
                contentContainerStyle={styles.modelContainer} >
          <Headline style={styles.headline}>Select the job/jobs you prefer</Headline>
          <Card mode='contained' style={styles.cardContainer}>
            <Card.Content>
              <View style={styles.chipContainer}>
                {jobList.map((job, index) => (
                  <Chip
                    key={index}
                    selected={selectedJobs.includes(job)}
                    onPress={() => toggleChipSelection(job)}                    
                    showSelectedCheck={false}
                    style={[
                      styles.chipMargin,
                      selectedJobs.includes(job) ? styles.selectedChip : styles.deselectedChip
                    ]}
                    textStyle={selectedJobs.includes(job) ? styles.selectedChipText : styles.deselectedChipText}
                  >
                    {job}
                  </Chip>
                ))}
              </View>
            </Card.Content>
          </Card>
          <Text>{'\n\n'}</Text>        
          <Button mode="outlined" textColor="#F97300" onPress={hideModal} style={{ borderColor: '#F97300' }}>
            Continue
          </Button>
        </Modal>
      </Portal>
      <View style={styles.jobButtonContainer}>
        <Button style={styles.jobButton} mode="contained" onPress={showModal} buttonColor= {mState ? '#797979' : '#EDEDEC'} textColor='black'>
          {selectedJobs.length == 0 ? "Select prefered job" : "Edit selected job"}
        </Button>
      </View>
    </PaperProvider>
  );
};

export default JobRoleModel;

const styles = StyleSheet.create({
  modelContainer: {
    backgroundColor: 'white',
    padding: 10,
    height: 300,
    width: '110%',
    marginBottom: 250,
    borderRadius: 10,
    alignSelf: 'center',
  },
  headline: {
    color: 'black',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginVertical:10
  },
  jobButton:{
    width:'100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  cardContainer: {
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  chipMargin: {
    margin: 2,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  selectedChip: {
    backgroundColor: '#01214A',    
  },
  deselectedChip:{
    backgroundColor:'#EDEDEC',

  },
  selectedChipText: {
    color: 'white',
    
  },
  deselectedChipText: {
    color: 'black',
  },
});
