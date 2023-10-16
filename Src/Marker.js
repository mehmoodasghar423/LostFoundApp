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