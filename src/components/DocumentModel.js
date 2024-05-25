import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Modal, Portal, Provider as PaperProvider, Headline, IconButton } from 'react-native-paper';

const DocumentModel = () => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modelContainer}>
          <Headline style={styles.headline}>Hello Friend!!</Headline>
          <Text style={styles.modelText}>
            To finish the sign-up process, you are required to submit a document regarding your job preferences.
            Please submit one of these documents:
            {'\n\n'}• Your resume, or
            {'\n\n'}• Verified documents from the company you worked/currently working for, or
            {'\n\n'}• A certificate from the Grama Niladhari.
            {'\n\n'}Note: Submit as a PDF file.
            {'\n\n'}
          </Text>
          <Button mode="outlined" textColor="#F97300" onPress={hideModal} style={{ borderColor: '#F97300' }} >
            Dismiss
          </Button>
        </Modal>
      </Portal>
      <View style={styles.uploadContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.promptText}>Upload your resume.</Text>
          <IconButton
            icon="information-outline"
            size={18}
            onPress={showModal}
            iconColor="red" 
            style={styles.infoIcon}
          />
        </View>
      </View>
    </PaperProvider>
  );
};

export default DocumentModel;

const styles = StyleSheet.create({
  modelContainer: {
    backgroundColor: 'white',
    padding: 20,
    height:400,
    width: '100%',
    marginBottom: 500,
    borderRadius: 10,
  },
  headline: {
    color: 'black',
    marginBottom: 10,
  },
  modelText: {
    color: 'black',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginLeft: 5,
    elevation: 0, // for Android
    shadowOpacity: 0, // for iOS
  },
  promptText: {
    color: 'black',
  },
  uploadContainer: {
    // marginVertical: 5,
  },
});
