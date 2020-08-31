
import React from 'react';

import {
  View,
  Modal,
  Text
} from 'react-native';

import RadioGroup from 'react-native-radio-buttons-group';

const FilterModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
    >
      <View style={styles.modalScreen}>
        <View style={styles.radioButtons}>
          <RadioGroup 
            flexDirection='row' 
            radioButtons={RADIO_BUTTON_PERSON} 
            onPress={(e) => personHandler(e)} 
          />
        </View>
        <View style={styles.radioButtons}>
          <RadioGroup 
            flexDirection='row' 
            radioButtons={RADIO_BUTTON_FEELING_PERIOD} 
            onPress={(e) => periodHandler(e, currentPersonId)} 
          />
        </View>
        <TouchableOpacity  
          style={{ padding: 20 }} 
          onPress={toggleModal}>
          <Text style={styles.feelingText}> Close </Text>
        </TouchableOpacity>
      </View>
    </Modal>
    );

  }
const styles = StyleSheet.create({
  modalScreen: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioButtons: {
    paddingVertical: 15
  },
  feelingText: {
    textAlign: 'center'
  }
});

export default FilterModal;