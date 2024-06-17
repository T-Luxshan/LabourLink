import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Modal, Portal, Provider as PaperProvider, Headline, IconButton } from 'react-native-paper';

const LabourPerfomanceModel = ({onMStateChange, marginTop, Password}) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modelContainer}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
          
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button>
    </PaperProvider>
  );
};

export default LabourPerfomanceModel;

const styles = StyleSheet.create({
  modelContainer: {
    // flex:1,
    backgroundColor: 'white',
    // padding: 90,
    height:500,
    // width: '100%',
    margin: 20,
    borderRadius: 10,
    // zIndex: 9999
    alignItems: 'center',
    justifyContent: 'center',
  },
  // headline: {
  //   color: 'black',
  //   marginBottom: 10,
  // },
  // modelText: {
  //   color: 'black',
  // },
  // infoContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // infoIcon: {
  //   margin: 150,
  //   elevation: 0, // for Android
  //   shadowOpacity: 0, // for iOS
  // },
  // promptText: {
  //   color: 'black',
  // },
  // uploadContainer: {
  //   marginTop: -15,
  //   // marginBottom: -15,
  // },
});

