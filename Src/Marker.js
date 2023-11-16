import React from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { View } from 'react-native';

const MyMultiSlider = () => {
  const handleSliderValuesChange = (values) => {
    // Handle slider values change
    console.log(values);
  };

  const screenWidth = Dimensions.get('window').width;
  const sliderLengthPercentage = 70;

  return (
    <View style={{ alignItems: "center", position: "relative", top: 86, }}>
    <MultiSlider
      values={[0, 100]} // Initial values of the sliders
      sliderLength={300} // Length of the slider track
      onValuesChange={handleSliderValuesChange} // Event handler for slider values change
      min={0} // Minimum value of the slider
      max={100} // Maximum value of the slider
      markerStyle={{ backgroundColor: "#7689D6", width: 16, height: 16, top: 3 }}
      selectedStyle={{ backgroundColor: '#E5E5E5' }}
      unselectedStyle={{ background: "#E5E5E5" }}
      allowOverlap
      pressedMarkerStyle={{ backgroundColor: 'green' }}
      trackStyle={{ height: 8 }}
    />
  </View>

  https://firebasestorage.googleapis.com/v0/b/infinity-scroll-firebase.appspot.com/o/images%2Fimg-1697798337890.jpg?alt=media&token=83af84f9-ad0a-4f1f-a3c3-32a8fbcee8fb
  );
};

export default MyMultiSlider;

// <View style={{
//   width:"100%",
//   height:"100%",
//   position:"relative",
//   bottom:0
// }}>
// <BottomTabs/>
// </View>