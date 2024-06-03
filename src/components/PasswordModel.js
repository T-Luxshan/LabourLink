import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Modal, Portal, Provider as PaperProvider, Headline, IconButton } from 'react-native-paper';

const PasswordModel = ({onMStateChange, marginTop, Password}) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => {
    setVisible(true);
    onMStateChange(true);
  };
  const hideModal = () => {
    setVisible(false);
    onMStateChange(false);
  };

  return (
    <PaperProvider>
      <Portal>
         <Modal visible={visible} onDismiss={hideModal}
          overlayOpacity={0} 
                contentContainerStyle={[styles.modelContainer, {marginTop: marginTop,}]} >
          <Headline style={styles.headline}>Hello Friend!!</Headline>
          <Text style={styles.modelText}>
           Please follow these rules to create your password{'\n\n'}
           Your password must,
            {'\n\n'}• At least 5 characters long.
            {'\n\n'}• Contain at least one uppercase letter
            {'\n\n'}• Contain at least one lowercase letter
            {'\n\n'}• Contain at least one number.
            {'\n\n'}
          </Text>
          <Button mode="outlined" textColor="#F97300" onPress={hideModal} style={{ borderColor: '#F97300' }} >
            Dismiss
          </Button>
        </Modal>
      </Portal>
      <View style={styles.uploadContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.promptText}>{Password}</Text>
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

export default PasswordModel;

const styles = StyleSheet.create({
  modelContainer: {
    backgroundColor: 'white',
    padding: 20,
    height:350,
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    zIndex: 9999
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
    marginTop: -15,
    marginBottom: -15,
  },
});
