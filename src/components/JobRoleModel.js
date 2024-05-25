import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Modal, Portal, PaperProvider, Headline, Chip, Card } from 'react-native-paper';

const JobRoleModel = () => {
  const [visible, setVisible] = useState(true);
  const [jobList, setJoblist] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  let availableJobRoles = ["CARPENTER", "ELECTRICIAN", "PLUMBER", "PAINTER", "MASON", "WELDER", "DRIVER"];

  useEffect(() => {
    setJoblist(availableJobRoles);
  }, []);

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
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modelContainer}>
          <Headline style={styles.headline}>Select the job/jobs you prefer</Headline>
          <Card style={styles.cardContainer}>
            <Card.Content>
              <View style={styles.chipContainer}>
                {jobList.map((job, index) => (
                  <Chip
                    key={index}
                    selected={selectedJobs.includes(job)}
                    onPress={() => toggleChipSelection(job)}
                    mode={selectedJobs.includes(job) ? "flat" : "outlined"}
                    style={[
                      styles.chipMargin,
                      selectedJobs.includes(job) && styles.selectedChip
                    ]}
                    textStyle={selectedJobs.includes(job) && styles.selectedChipText}
                  >
                    {job}
                  </Chip>
                ))}
              </View>
            </Card.Content>
          </Card>
          <Text>{'\n\n'}</Text>
          <Chip mode='outlined' onPress={() => console.log('Pressed')}>Example Chip</Chip>
          <Button mode="outlined" textColor="#F97300" onPress={hideModal} style={{ borderColor: '#F97300' }}>
            Continue
          </Button>
        </Modal>
      </Portal>
      <View style={styles.infoContainer}>
        <Button mode="contained" onPress={showModal}>
          Press me
        </Button>
      </View>
    </PaperProvider>
  );
};

export default JobRoleModel;

const styles = StyleSheet.create({
  modelContainer: {
    backgroundColor: 'white',
    padding: 20,
    height: 400,
    width: '90%',
    marginBottom: 100,
    borderRadius: 10,
    alignSelf: 'center',
  },
  headline: {
    color: 'black',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cardContainer: {
    backgroundColor: 'white',
    elevation: 0,
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
    backgroundColor: '#F97300',
  },
  selectedChipText: {
    color: 'white',
  },
});
