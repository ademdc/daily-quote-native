
import React from 'react';

import {
  ImageBackground,
  StyleSheet
} from 'react-native';

import { useSelector } from 'react-redux';

const MasnicaImageBackground = (props) => {
  const quote = useSelector(state => state.quote.quote)

  return (
    <ImageBackground imageStyle= {{opacity: props.opacity}} style={{...styles.imageBg, ...props.customStyle}} source={{uri: quote.image_url}}>
      {props.children}
    </ImageBackground>
    );
  }

const styles = StyleSheet.create({
  imageBg: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  }
});
  
export default MasnicaImageBackground;