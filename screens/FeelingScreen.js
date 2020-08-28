import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert
} from 'react-native';

import { useSelector } from 'react-redux';
import { showMessage } from "react-native-flash-message";

import HeaderIcon from '../navigation/components/HeaderIcon';
import FeelingContainer from '../components/FeelingContainer';
import LoadingScreen from '../components/LoadingScreen';

const FeelingScreen = props => {
  const userId = useSelector(state => state.auth.userId)
  const partnerUserFeeling = useSelector(state => state.feeling.partnerFeeling)
  const latestUserFeeling = useSelector(state => state.feeling.latestFeeling)
  const allFeelings = useSelector(state => state.feeling.allFeelings)
  const partner = useSelector(state => state.auth.partner)
  const loading = useSelector(state => state.feeling.loading)
  

  let latestFeeling = null;
  let partnerFeeling = null;

  const goToFeelingDetail = () => {
    props.navigation.navigate({
      routeName: 'FeelingDetail',
    });
  }

  const getFeelingButtonText = () => {
    let nicknames = ['Shatzi', 'Ljubi', 'Masnice', 'Dragana'];
    const random = Math.floor(Math.random() * nicknames.length);

    return `${nicknames[random]}, how do you feel now?`
  }

  if(loading){
    return <LoadingScreen />
  }

  if(latestUserFeeling && partnerUserFeeling) {
    latestFeeling  = allFeelings.find(feeling => feeling.id == latestUserFeeling.feeling_id)
    partnerFeeling = allFeelings.find(feeling => feeling.id == partnerUserFeeling.feeling_id)
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>    
      <View style={styles.screen}>

        <FeelingContainer 
          userFeeling={latestUserFeeling} 
          feeling={latestFeeling} 
          text='You are feeling'
          userId={userId}
        />
        <FeelingContainer 
          userFeeling={partnerUserFeeling} 
          feeling={partnerFeeling} 
          text={`${partner.first_name} is feeling`}
          userId={partner.id}
        />
          
        <TouchableOpacity  
          style={{padding: 20}} 
          onPress={goToFeelingDetail}>
          <Text style={styles.feelingText}> {getFeelingButtonText()} </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

FeelingScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Feeling Of The Moment',
    headerLeft: () => (
      <HeaderIcon icon='ios-refresh' onPress={()=> showMessage({message: "Refreshed latest feelings", type: "info"})}/>
    ),
    headerRight: () => (
      <HeaderIcon icon='ios-calendar' onPress={()=>navData.navigation.navigate({ routeName: 'PeriodFeeling' })}/>
    )
   }
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  feelingContainer: {
    padding: 20,
    flex: 1,
    width: '100%',
    height: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },
  feelingText: {
    fontSize: 15,
    fontStyle: 'normal',
    fontFamily: 'ibm-plex-light'
  },
  feeling: {
    fontSize: 50,
    fontStyle: 'normal',
    fontFamily: 'ibm-plex-light'
  }
});

export default FeelingScreen;
