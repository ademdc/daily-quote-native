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
import MasnicaImageBackground from '../components/MasnicaImageBackground';


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

  if(latestUserFeeling) {
    latestFeeling  = allFeelings.find(feeling => feeling.id == latestUserFeeling.feeling_id)
  }

  if(partnerUserFeeling) {
    partnerFeeling = allFeelings.find(feeling => feeling.id == partnerUserFeeling.feeling_id)
  }

  return (
    <View style={styles.container}>
      <MasnicaImageBackground opacity={0.2} >
        <ScrollView horizontal={false} contentContainerStyle={styles.quoteContainer}>
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
            style={{ padding: 20 }} 
            onPress={goToFeelingDetail}>
            <Text style={styles.feelingText}> {getFeelingButtonText()} </Text>
          </TouchableOpacity>
        </ScrollView>
      </MasnicaImageBackground>
    </View>
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    height: '100%'
  },
  quoteContainer: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
