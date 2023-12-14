import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native'
// import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons,MaterialIcons,AntDesign } from '@expo/vector-icons';
// import Slider from "react-native-a11y-slider";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-async-storage/async-storage';



const Filters = ({ route }) => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const handleGoBack = () => {
    navigation.goBack();
  };




  
 
 
 
 
   const locationHandler=()=>{
     navigation.navigate("FilterLocation")
   }
// console.log(setSliderValues);

  const [selectedType, setselectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [categoryselectedButton, setcategoryselectedButton] = useState('');

  const [sliderValues, setSliderValues] = useState([1, 365]);

  const [leftMarkerValue, setLeftMarkerValue] = useState(1);
  const [rightMarkerValue, setRightMarkerValue] = useState(365);
  const [leftMarkerDate, setLeftMarkerDate] = useState(new Date()); // Initialize with current date
  const [rightMarkerDate, setRightMarkerDate] = useState(new Date()); // Initialize with current date
  

   // Update the selected city state when received from route.params
  useEffect(() => {
    if (route.params && route.params.selectedCity) {
      setSelectedLocation(route.params.selectedCity);
    }
  }, [route.params]);


////



useEffect(() => {
  // Load previously selected button state from AsyncStorage
  loadSelectedButton();
  loadcategoryselectedButton();
  loadselectedLocation();
}, []);

useEffect(() => {
  // Save selected button state to AsyncStorage when changed
  AsyncStorage.setItem('selectedButton', selectedType);
  AsyncStorage.setItem('selectedcategory', categoryselectedButton);
  AsyncStorage.setItem('locationstore', selectedLocation);
}, [selectedType,categoryselectedButton,selectedLocation]);



const loadSelectedButton = async () => {
  try {
    const selectedButton = await AsyncStorage.getItem('selectedButton');
    if (selectedButton !== null) {
      // Set the previously selected button from AsyncStorage
      setselectedType(selectedButton);
    }
  } catch (error) {
    console.error('Error loading selected button:', error);
  }
};



const loadcategoryselectedButton = async () => {
  try {
    const selectedcategory = await AsyncStorage.getItem('selectedcategory');
    if (selectedcategory !== null) {
      // Set the previously selected button from AsyncStorage
      setcategoryselectedButton(selectedcategory);
    }
  } catch (error) {
    console.error('Error loading selected button:', error);
  }
};

const loadselectedLocation = async () => {
  try {
    const locationstore = await AsyncStorage.getItem('locationstore');
    if (locationstore !== null) {
      // Set the previously selected button from AsyncStorage
      setSelectedLocation(locationstore);
    }
  } catch (error) {
    console.error('Error loading selected button:', error);
  }
};


///

useEffect(() => {
  // Initialize dates for left and right markers
  const currentDate = new Date(); // Current date
  const oneYearAgo = new Date(); // One year ago
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1); // Subtract one year

  // Set the left marker to one year ago and the right marker to the current date
  setLeftMarkerDate(oneYearAgo);
  setRightMarkerDate(currentDate);
}, []); // Run this effect only once on mount





const handleSliderValuesChange = (values) => {
  const [leftValue, rightValue] = values;

  // Calculate dates for left and right markers based on the selected range
  const currentDate = new Date();
  const leftDate = new Date(currentDate);
  leftDate.setDate(leftDate.getDate() - (365 - leftValue)); // Subtract days from the current date
  const rightDate = new Date(currentDate);
  rightDate.setDate(rightDate.getDate() - (365 - rightValue)); // Subtract days from the current date

  // Update state with both values and dates
    setSliderValues(values);
    setLeftMarkerValue(leftValue);
    setRightMarkerValue(rightValue);
    setLeftMarkerDate(leftDate);
    setRightMarkerDate(rightDate);
  };
  




  const handleButtonPress = (button) => {
    setselectedType(button);
  };


  const CategoryhandleButtonPress = (button) => {
    setcategoryselectedButton(button);
  };




  const handler = () => {
    // Count the number of applied filters
    const appliedFiltersCount =
      (selectedType !== '' ? 1 : 0) +
      (selectedLocation !== '' ? 1 : 0) +
      (categoryselectedButton !== '' ? 1 : 0) +
      (sliderValues[0] !== 1 || sliderValues[1] !== 365 ? 1 : 0);
  
    // Check if the slider values are default (1 and 365)
    const isDefaultValues = sliderValues[0] === 1 && sliderValues[1] === 365;
  
    // Prepare the parameters to send
    const params = {
      selectedType,
      selectedLocation,
      categoryselectedButton,
      appliedFiltersCount, // Pass the count of applied filters
    };
  
    // Add leftMarkerDate and rightMarkerDate only if they are not the default values
    if (!isDefaultValues) {
      params.leftMarkerDate = leftMarkerDate;
      params.rightMarkerDate = rightMarkerDate;
    }
  
    navigation.navigate('Home', params);
  };
  

  const resetHandler = () => {
    // Reset all selected state values to default or null
    setselectedType('');
    setSelectedLocation('');
    setcategoryselectedButton('');
    setSliderValues([1, 365]);
    setLeftMarkerValue(1);
    setRightMarkerValue(365);
  
    // Reset marker dates to default or null
    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    setLeftMarkerDate(oneYearAgo);
    setRightMarkerDate(currentDate);
    navigation.navigate('Home');

  };
  

  let [fontsLoaded] = useFonts({
    Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
  });
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View>


        <View style={{ flexDirection: "row", position: "relative", alignItems: "center", marginTop: "5%", }}>


          <TouchableOpacity onPress={handleGoBack}>
            <Image style={{
              width: 41,
              width: screenWidth * 0.11,
              height: 41,
              height: screenHeight * 0.057,
              // top: 20,
              left: "40%"

            }}
              source={require("../../assets/LostApp/back.png")} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: RFValue(18),
              fontFamily: "Urbanist_600SemiBold",
color:"#0F2944",
              marginLeft: "10%",


            }}
          >
            Filters
          </Text>
        </View>


        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            left: "6%",
            position: "relative",
            top: screenWidth * 0.07,
            color:"#0F2944",


          }}
        >
          Search Type
        </Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[{
              paddingVertical: screenHeight * 0.0045,
              backgroundColor: '#F7F7F7',
              width: "26%",
              height: screenHeight * 0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#8391A1",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth * 0.021,
            }, selectedType === 'Lost' && styles.selectedButton]}
            onPress={() => handleButtonPress('Lost')}
          >
            <Text style={selectedType === 'Lost' ? styles.selectedButtonText : styles.buttonText}>Lost</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[{
              paddingVertical: screenHeight * 0.0045,
              backgroundColor: '#F7F7F7',
              width: "26%",
              height: screenHeight * 0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#8391A1",
              borderRadius: (screenWidth, screenHeight) * 0.01,
            }, selectedType === 'Found' && styles.selectedButton]}
            onPress={() => handleButtonPress('Found')}
          >
            <Text style={selectedType === 'Found' ? styles.selectedButtonText : styles.buttonText}>Found</Text>
          </TouchableOpacity>
        </View>


        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            left: "6%",
            position: "relative",
            top: screenHeight * 0.03,
color:"#0F2944",

          }}
        >
          Select Your Date Range
        </Text>



        <View style={{
          left: "4%",
          position: "relative",
          top: screenHeight * 0.045,
          flexDirection:"row",
          justifyContent:"space-between",
          width:"90%"
        }}>


          <TouchableOpacity style={{
            paddingVertical: screenHeight * 0.0045,
            backgroundColor: '#dcdcdc',
            width: "37%",
            height: screenHeight * 0.035,
            // borderWidth: (screenWidth, screenHeight) * 0.0014,
            // borderColor: "#8391A1",
            borderRadius: (screenWidth, screenHeight) * 0.007,
            justifyContent:"center",alignItems:"center"
          }}>
    
          <Text style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            color: "#8391A1",
            textAlign: "center"
          }}>
          {leftMarkerDate.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
          </Text>
          </TouchableOpacity>


          <Text style={{
            fontSize: RFValue(14),
            fontFamily: "Urbanist_500Medium",
            // color: "#8391A1",
            textAlign: "center",
            top:screenHeight * 0.0035,
          }}>To</Text>


          <TouchableOpacity style={{
            paddingVertical: screenHeight * 0.0045,
            backgroundColor: '#dcdcdc',
            width: "37%",
            height: screenHeight * 0.035,
            // borderWidth: (screenWidth, screenHeight) * 0.0014,
            // borderColor: "#8391A1",
            borderRadius: (screenWidth, screenHeight) * 0.007,
            justifyContent:"center",alignItems:"center"
          }}>
      
          <Text style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            color: "#8391A1",
            textAlign: "center"
          }}>
          {rightMarkerDate.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
          </Text>
          </TouchableOpacity>


        </View>


        <View style={{ alignItems: "center", position: "relative", top: screenHeight * 0.04, }}>
          <MultiSlider
            values={sliderValues} // Initial values of the sliders
            sliderLength={screenWidth * 0.85} // Length of the slider track
            onValuesChange={handleSliderValuesChange} // Event handler for slider values change
            min={1} // Minimum value of the slider
            max={365} // Maximum value of the slider
            markerStyle={{ backgroundColor: "#0F2944", width: screenWidth * 0.044, height: screenHeight * 0.023, top: screenHeight * 0.0055 }}
            selectedStyle={{ backgroundColor: '#E5E5E5', }}
            unselectedStyle={{ background: "#E5E5E5" }}
            allowOverlap
            pressedMarkerStyle={{ backgroundColor: 'green', width: screenWidth * 0.047, height: screenHeight * 0.024, }}
            trackStyle={{ height: screenHeight * 0.012 }}
          />
        </View>


     




        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            left: "6%",
            position: "relative",
            marginTop: "8%",
            // position: "absolute",
            // top: 226,
            color:"#0F2944",

          }}
        >
          Category
        </Text>


        <View style={styles.Category_Buttons_Conatiner}>
          <TouchableOpacity
            style={[{
              paddingVertical: screenHeight * 0.0045,
              backgroundColor: '#F7F7F7',
              width: "16.2%",
              height: screenHeight * 0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#8391A1",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth * 0.012,
            }, categoryselectedButton === 'All' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('All')}
          >
            <Text style={categoryselectedButton === 'All' ? styles.selectedButtonText : styles.buttonText}>All</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[{
              paddingVertical: screenHeight * 0.0045,
              backgroundColor: '#F7F7F7',
              width: "24.8%",
              height: screenHeight * 0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#8391A1",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth * 0.012,
            }, categoryselectedButton === 'Electronics' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('Electronics')}
          >
            <Text style={categoryselectedButton === 'Electronics' ? styles.selectedButtonText : styles.buttonText}>Electronics</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{
              paddingVertical: screenHeight * 0.0045,
              backgroundColor: '#F7F7F7',
              width: "24.8%",
              height: screenHeight * 0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#8391A1",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth * 0.012,
            }, categoryselectedButton === 'Jewelry' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('Jewelry')}
          >
            <Text style={categoryselectedButton === 'Jewelry' ? styles.selectedButtonText : styles.buttonText}>Jewelry</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{
              paddingVertical: screenHeight * 0.0045,
              backgroundColor: '#F7F7F7',
              width: "24.8%",
              height: screenHeight * 0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#8391A1",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth * 0.016,
            }, categoryselectedButton === 'Bag' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('Bag')}
          >
            <Text style={categoryselectedButton === 'Bag' ? styles.selectedButtonText : styles.buttonText}>Bag</Text>
          </TouchableOpacity>
        </View>




        <View style={styles.Category_Buttons_Conatiner_2}>



          <TouchableOpacity
            style={[{
              paddingVertical: screenHeight * 0.0045,
              backgroundColor: '#F7F7F7',
              width: "24.8%",
              height: screenHeight * 0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#8391A1",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth * 0.016,
            }, categoryselectedButton === 'Wallet' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('Wallet')}
          >
            <Text style={categoryselectedButton === 'Wallet' ? styles.selectedButtonText : styles.buttonText}>Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{
              paddingVertical: screenHeight * 0.0045,
              backgroundColor: '#F7F7F7',
              width: "24.8%",
              height: screenHeight * 0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#8391A1",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth * 0.016,
            }, categoryselectedButton === 'Glasses' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('Glasses')}
          >
            <Text style={categoryselectedButton === 'Glasses' ? styles.selectedButtonText : styles.buttonText}>Glasses</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{
              paddingVertical: screenHeight * 0.0045,
              backgroundColor: '#F7F7F7',
              width: "24.8%",
              height: screenHeight * 0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderRadius: (screenWidth, screenHeight) * 0.007,
              borderColor: "#8391A1",
              marginRight: screenWidth * 0.016,
            }, categoryselectedButton === 'Laptop' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('Laptop')}
          >
            <Text style={categoryselectedButton === 'Laptop' ? styles.selectedButtonText : styles.buttonText}>Laptop</Text>
          </TouchableOpacity>
        </View>




        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            left: "6%",
            position: "relative",
            marginTop: "5%",
            // position: "absolute",
            // top: 325,
            color:"#0F2944",

          }}
        >
          Location
        </Text>

        <TouchableOpacity 
        onPress={locationHandler}
        style={{
          position: "relative",
          top: screenHeight * 0.012,
          // position:"absolute",
          // top:187,
          backgroundColor: "#EDEEEF",
          borderWidth: 1,
          borderColor: '#EDEEEF',
          width: "91%",
          // width:279,
          height: 38,
          height: screenHeight * 0.052,
          borderRadius: 8,
          fontSize: RFValue(12),
          alignSelf:"center",
          flexDirection:"row",
          alignItems:"center",justifyContent:"center",
        }}>
         
      
        <MaterialIcons name="location-city"
        size={RFValue(20)}
        color="#8391A1"

        style={{
          // position: "absolute",
          // left: "17%",
          // top: 2,
          marginRight:screenWidth*0.01,
          alignSelf: "center",
   

        }}
      />
            
       <Text style={{ 
        fontSize: RFValue(12),
        fontFamily: "Urbanist_500Medium",
        color:"#8391A1",marginRight:10
      }}>
       {selectedLocation || '  Please Select Your Specific Location here '}
       </Text>
            <AntDesign name="down" 
            size={RFValue(13)}
            color="#8391A1"

            style={{
              // position: "absolute",
              left: "17%",
              top: 2,
              alignSelf: "center",
       

            }}
          />
        </TouchableOpacity>

        <View style={{ flexDirection: "row", position: 'relative', marginTop: "8%", width: "91%", alignSelf: "center", justifyContent: "space-between" }}>



          <TouchableOpacity
            onPress={resetHandler}
            style={{
              // borderRadius: 4,
              // backgroundColor: '#0F2944',
              height: screenHeight * 0.059,
              alignSelf: "center",
              justifyContent: "center",
              width: "33%",
              borderRadius: (screenWidth, screenHeight) * 0.006,
              borderColor: "#0F2944",
              borderWidth: (screenWidth, screenHeight) * 0.002,

            }}><Text style={{
              fontSize: RFValue(15),
              fontFamily: "Urbanist_600SemiBold",
              // lineHeight: 18,
              alignSelf: "center",
              color: '#0F2944',


            }}
            >Reset All </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handler}
            style={{
              // borderRadius: 4,
              backgroundColor: '#0F2944',
              height: screenHeight * 0.059,
              alignSelf: "center",
              justifyContent: "center",
              width: "60%",
              borderRadius: (screenWidth, screenHeight) * 0.007,

            }}><Text style={{
              fontSize: RFValue(15),
              fontFamily: "Urbanist_600SemiBold",
              // lineHeight: 18,
              alignSelf: "center",
              color: '#F9F9F9',


            }}
            >Apply Filters</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Filters

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    marginLeft: "6%",
    position: "relative",
    marginTop: "9%"
  },
  button: {

  },
  buttonText: {
    fontSize: RFValue(12),
    fontFamily: "Urbanist_500Medium",
    color: "#8391A1",
    textAlign: "center"

  },
  selectedButton: {
    backgroundColor: '#0F2944',
    shadowColor: "#363B64"

  },
  selectedButtonText: {
    fontSize: RFValue(12),
    fontFamily: "Urbanist_500Medium",
    // lineHeight: 14.4,
    color: "#FFFFFF",
    textAlign: "center"
  },
  dates: {
    fontSize: RFValue(8),
    fontFamily: "Urbanist_500Medium",
    marginRight: "9.3%",
    color: "#8391A1"
  }
  ,


  Category_Buttons_Conatiner: {
    flexDirection: "row",
    marginLeft: "6%",
    position: "relative",
    marginTop: "3%"
  },
  Category_button: {

  },
  Category_Bagbutton: {

  },
  Category_Buttons_Conatiner_2: {
    flexDirection: "row",
    marginLeft: "6%",
    position: "relative",
    marginTop: "1.3%"
  },

})