import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Modal, Portal, Provider as PaperProvider, Headline, IconButton, Colors } from 'react-native-paper';


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
          
          <Button mode="outlined"  textColor="#F97300" onPress={hideModal} >
            Dismiss
          </Button>
        </Modal>
      </Portal>
      <View style={styles.uploadContainer}>
      <View style={styles.infoContainer}>
          <Text>Upload your resume.
          <IconButton
            icon="information-outline"
            size={18}
            onPress={showModal}
            iconColor ='red'
            style={styles.infoIcon}
            
          />
          </Text>
        </View>
      </View>
   
    </PaperProvider> 
  );
};

export default DocumentModel;

const styles = StyleSheet.create({
    modelContainer: {
    backgroundColor: 'white', // Ensure background is not transparent
    padding: 20,
    width:'100%',
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
    // alignItems: 'center',
  },
  infoIcon:{
    //   marginTop:10,
    //   marginRight:30,
      marginLeft:-5,
      
  },
  uploadContainer: {
    // width: '100%',
    // height: 50,
    // marginVertical: 5,
    // borderColor: '#EDEDEC',
    // borderWidth: 2,
    // borderStyle: 'dashed',
    // borderRadius: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
