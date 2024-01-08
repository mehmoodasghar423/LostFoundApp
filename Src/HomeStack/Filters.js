import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native'
// import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
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









  const locationHandler = () => {
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
  }, [selectedType, categoryselectedButton, selectedLocation]);



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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

      <View>


        <View style={{ 
          flexDirection: "row",
           position: "relative",
            alignItems: "center", 
        marginTop:13,
        marginTop: "3.6%",
        marginLeft:18,
              marginLeft: "5%",

       }}>


          <TouchableOpacity
            style={{
              // marginLeft: "4%",
              // marginTop:screenHeight*0.003,
              // backgroundColor: "red",
              height: screenHeight * 0.055,
              width: "11.4%",
              borderRadius: (screenWidth, screenHeight) * 0.016,
              borderWidth: (screenWidth, screenHeight) * 0.0013,
              borderColor: "#E0E0E0",
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",

            }}
            onPress={handleGoBack}>


            <Image style={{
              width: 10,
              height: 16,
              width: screenWidth * 0.0285,
              height: screenHeight * 0.021,
              resizeMode: "contain",
              tintColor:"#6A707C",
              // backgroundColor:"red",
              // marginLeft: screenWidth*0.73,
              // position:"absolute",
              // marginTop:screenHeight*-0.023


            }}
              source={require("../../assets/back.png")} />


          </TouchableOpacity>

          <Text
            style={{
              fontSize: RFValue(18),
              fontFamily: "Urbanist_600SemiBold",
              color: "#0F2944",
              marginLeft: "4%",

              // lineHeight: 21.6,

            }}
          >
            Filters
          </Text>
        </View>


        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            lineHeight:  RFValue(14),
            left: "5%",
            position: "relative",
            top: screenWidth * 0.074,
            // top:27,
            color: "#0F2944",


          }}
        >
          Search Type
        </Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[{
              paddingVertical: screenHeight * 0.0045,
             
              width: "24.6%",
              height: screenHeight * 0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#6A707C",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: 5,
              marginRight: screenWidth * 0.015,
            }, selectedType === 'Lost' && styles.selectedButton]}
            onPress={() => handleButtonPress('Lost')}
          >
            <Text style={selectedType === 'Lost' ? styles.selectedButtonText : styles.buttonText}>Lost</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[{
              paddingVertical: screenHeight * 0.0045,
              width: "24.6%",
              height: screenHeight * 0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#6A707C",
              borderRadius: (screenWidth, screenHeight) * 0.007,
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
            marginLeft: "5%",
            position: "relative",
            top: screenHeight * 0.037,
            // top:28,
            color: "#0F2944",

          }}
        >
          Select Your Date Range
        </Text>



        <View style={{
      
          position: "relative",
          top: screenHeight * 0.0478,
          // top:36,
          flexDirection: "row",
          justifyContent: "space-between",
          // width: "92%",
          // width:32,
          // backgroundColor:"red"
        }}>


          <TouchableOpacity style={{
            paddingVertical: screenHeight * 0.0045,
            // borderRadius: (screenWidth, screenHeight) * 0.01,
            borderWidth: (screenWidth, screenHeight) * 0.0012,
            borderColor:'#E0E0E0',
            // elevation:3,
            width: "41%",
            height: screenHeight * 0.051,
            // borderWidth: (screenWidth, screenHeight) * 0.0014,
            // borderColor: "#6A707C",
            borderRadius: (screenWidth, screenHeight) * 0.007,
            justifyContent: "center", alignItems: "center",
            marginLeft: "5%",
          }}>

            <Text style={{
              fontSize: RFValue(12),
              fontFamily: "Urbanist_500Medium",
              color: "#6A707C",
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
            fontSize: RFValue(21),
            fontFamily: "Urbanist_500Medium",
            color: "#6A707C",
            textAlign: "center",
            top: screenHeight * 0.0035,
          }}>-</Text>


          <TouchableOpacity style={{
            paddingVertical: screenHeight * 0.0045,
            borderWidth: (screenWidth, screenHeight) * 0.0012,
            borderColor:'#E0E0E0',
            // elevation:3,
            width: "41%",
            height: screenHeight * 0.051,
            // borderWidth: (screenWidth, screenHeight) * 0.0014,
            // borderColor: "#6A707C",
            borderRadius: (screenWidth, screenHeight) * 0.007,
            justifyContent: "center", alignItems: "center",    marginRight: "5%",
          }}>

            <Text style={{
              fontSize: RFValue(12),
              fontFamily: "Urbanist_500Medium",
              color: "#6A707C",
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


        <View style={{ alignItems: "center", position: "relative", top: screenHeight * 0.041, }}>
          <MultiSlider
            values={sliderValues} // Initial values of the sliders
            sliderLength={screenWidth * 0.86} // Length of the slider track
            onValuesChange={handleSliderValuesChange} // Event handler for slider values change
            min={1} // Minimum value of the slider
            max={365} // Maximum value of the slider
            markerStyle={{ backgroundColor: "#0F2944", width: screenWidth * 0.044, height: screenHeight * 0.023, top: screenHeight * 0.0055 }}
            selectedStyle={{ backgroundColor: '#E5E5E5', }}
            unselectedStyle={{ background: "#E0E0E0" }}
            allowOverlap
            pressedMarkerStyle={{ backgroundColor: '#FE9003', width: screenWidth * 0.047, height: screenHeight * 0.024, }}
            trackStyle={{ height: screenHeight * 0.012 }}
          />
        </View>







        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            marginLeft: "5%",
            position: "relative",
            marginTop: "11%",
            // marginTop:38,
            marginTop: screenHeight * 0.051,

            // position: "absolute",
            // top: 226,
            color: "#0F2944",

          }}
        >
          Category
        </Text>


        <View style={styles.Category_Buttons_Conatiner}>
          <TouchableOpacity
            style={[{
              paddingVertical: screenHeight * 0.0045,
              width: "17.2%",
              height: screenHeight * 0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#6A707C",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: 7.5,
              marginRight: screenWidth * 0.021,
              marginLeft:"5%"
            }, categoryselectedButton === 'All' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('All')}
          >
            <Text style={categoryselectedButton === 'All' ? styles.selectedButtonText : styles.buttonText}>All</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[{
              paddingVertical: screenHeight * 0.0045,
              width: "23.5%",
              height: screenHeight * 0.0345,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#6A707C",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth * 0.021,
            }, categoryselectedButton === 'Electronics' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('Electronics')}
          >
            <Text style={categoryselectedButton === 'Electronics' ? styles.selectedButtonText : styles.buttonText}>Electronics</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{
              paddingVertical: screenHeight * 0.0045,
              width: "23.5%",
              height: screenHeight * 0.0345,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#6A707C",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth * 0.021,
            }, categoryselectedButton === 'Jewelry' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('Jewelry')}
          >
            <Text style={categoryselectedButton === 'Jewelry' ? styles.selectedButtonText : styles.buttonText}>Jewelry</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{
              paddingVertical: screenHeight * 0.0045,
              width: "23.5%",
              height: screenHeight * 0.0345,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#6A707C",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              // marginRight: screenWidth * 0.016,
             
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
              width: "23.5%",
              height: screenHeight * 0.0345,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#6A707C",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth * 0.021,
            }, categoryselectedButton === 'Wallet' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('Wallet')}
          >
            <Text style={categoryselectedButton === 'Wallet' ? styles.selectedButtonText : styles.buttonText}>Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{
              paddingVertical: screenHeight * 0.0045,
              width: "23.5%",
              height: screenHeight * 0.0345,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#6A707C",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth * 0.021,
            }, categoryselectedButton === 'Glasses' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('Glasses')}
          >
            <Text style={categoryselectedButton === 'Glasses' ? styles.selectedButtonText : styles.buttonText}>Glasses</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{
              paddingVertical: screenHeight * 0.0045,
              width: "23.5%",
              height: screenHeight * 0.0345,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderRadius: (screenWidth, screenHeight) * 0.007,
              borderColor: "#6A707C",
              marginRight: screenWidth * 0.021,
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
            left: "5%",
            position: "relative",
            marginTop: "7.7%",
            // marginTop: 28,
            // position: "absolute",
            // top: 325,
            color: "#0F2944",

          }}
        >
          Location
        </Text>

        <TouchableOpacity
          onPress={locationHandler}
          style={{
            position: "relative",
            // marginTop:8,
            top: screenHeight * 0.0105,
            // position:"absolute",
            // top:187,
            borderWidth: 1,
            borderColor: '#E0E0E0',
            width:321,
            width: "90%",
            height: 38,
            height: screenHeight * 0.052,
            borderRadius: 8,
            fontSize: RFValue(12),
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center", 
            // justifyContent: "center",
          }}>


          <Image
          style={{
            width: screenWidth * 0.05,
            height: screenHeight * 0.035,
            width: 14,
            height: 14,
            alignSelf: "center",
            // backgroundColor: "red",
            // marginRight: screenWidth * 0.005,
            // marginTop:"14%"
            // backgroundColor:"red",
            marginLeft:11

          }}

          source={require('../../assets/location.png')} />


          
          <Text style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            color: "#6A707C", marginLeft: 3
          }}>
            {selectedLocation || '  Please Select Your Specific Location here '}
          </Text>
          <Image
          style={{
            width: screenWidth * 0.05,
            height: screenHeight * 0.035,
            width: 13,
            height: 13,
            alignSelf: "center",
            resizeMode: "contain", position: "absolute", right: 17
          }}

          source={require('../../assets/selector.png')} />

        </TouchableOpacity>

        <View style={{ flexDirection: "row", position: 'relative',
        //  marginTop: "10%",
        marginTop:36,
          width: "90%", alignSelf: "center", justifyContent: "space-between" }}>



          <TouchableOpacity
            onPress={resetHandler}
            style={{
              // borderRadius: 4,
              // backgroundColor: '#0F2944',
              height: screenHeight * 0.059,
              alignSelf: "center",
              justifyContent: "center",
              width: "35.3%",
              borderRadius: (screenWidth, screenHeight) * 0.006,
              borderRadius: 7,
              borderColor: "#0F2944",
              borderWidth: (screenWidth, screenHeight) * 0.0012,
              // borderWidth: 1,

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
              width: "63%",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              borderRadius: 8,

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
    marginLeft: "5%",
    position: "relative",
    marginTop:35,
    marginTop: "9.5%",
  },
  button: {

  },
  buttonText: {
    fontSize: RFValue(12),
    fontFamily: "Urbanist_500Medium",
    color: "#6A707C",
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
    color: "#6A707C"
  }
  ,


Category_Buttons_Conatiner: {
    flexDirection: "row",
    // marginLeft: "5%",
    position: "relative",
    marginTop: "2.3%",
    // marginTop:8
    width:"100%",
    paddingRight:"5%",
    // backgroundColor:"red"
  },
  Category_Buttons_Conatiner_2: {
    flexDirection: "row",
    marginLeft: "5%",
    position: "relative",
    marginTop: "1.45%",
    // marginTop: 5,
  },

})