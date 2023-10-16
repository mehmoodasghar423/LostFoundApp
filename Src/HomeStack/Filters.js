import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput,Dimensions } from 'react-native'
// import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
// import Slider from "react-native-a11y-slider";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";




const Filters = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handler = () => {
    navigation.navigate("Homee")
  }

  const [selectedButton, setSelectedButton] = useState('');

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };


  const [categoryselectedButton, setcategoryselectedButton] = useState('');

  const CategoryhandleButtonPress = (button) => {
    setcategoryselectedButton(button);
  };


  const handleSliderValuesChange = (values) => {
    // Handle slider values change
    // console.log(values);
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


      <View style={{ flexDirection: "row", position: "relative", alignItems: "center",    marginTop:"5%",  }}>

 
      <TouchableOpacity onPress={handleGoBack}>
        <Image style={{
          width: 41,
          width:screenWidth*0.11,
          height: 41,
          height: screenHeight*0.057,
          // top: 20,
          left: "40%"

        }}
          source={require("../../assets/LostApp/back.png")} />
      </TouchableOpacity>

      <Text
        style={{
           fontSize: RFValue(18),
              fontFamily:"Urbanist_600SemiBold",
             
            marginLeft:"10%",
          

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
            top: screenWidth*0.07,
           

          }}
        >
          Search Type
        </Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[{
              paddingVertical:screenHeight*0.0045,
              backgroundColor: '#F7F7F7',
              width: "26%",
              height: screenHeight*0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#8391A1",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth*0.021,
            }, selectedButton === 'button1' && styles.selectedButton]}
            onPress={() => handleButtonPress('button1')}
          >
            <Text style={selectedButton === 'button1' ? styles.selectedButtonText : styles.buttonText}>Lost</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[{
                paddingVertical:screenHeight*0.0045,
                backgroundColor: '#F7F7F7',
                width: "26%",
                height: screenHeight*0.035,
                borderWidth: (screenWidth, screenHeight) * 0.0014,
                borderColor: "#8391A1",
                borderRadius: (screenWidth, screenHeight) * 0.01,  
            }, selectedButton === 'button2' && styles.selectedButton]}
            onPress={() => handleButtonPress('button2')}
          >
            <Text style={selectedButton === 'button2' ? styles.selectedButtonText : styles.buttonText}>Found</Text>
          </TouchableOpacity>
        </View>


        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            left: "6%",
            position: "relative",
            top: screenHeight*0.03,
          }}
        >
          Date
        </Text>

        <View style={{ alignItems: "center", position: "relative", top:screenHeight*0.03, }}>
          <MultiSlider
            values={[0, 100]} // Initial values of the sliders
            sliderLength={screenWidth*0.85} // Length of the slider track
            onValuesChange={handleSliderValuesChange} // Event handler for slider values change
            min={0} // Minimum value of the slider
            max={100} // Maximum value of the slider
            markerStyle={{ backgroundColor: "#7689D6", width: screenWidth*0.044, height: screenHeight*0.023, top: screenHeight*0.0055}}
            selectedStyle={{ backgroundColor: '#E5E5E5', }}
            unselectedStyle={{ background: "#E5E5E5" }}
            allowOverlap
            pressedMarkerStyle={{ backgroundColor: 'green' ,width: screenWidth*0.047, height: screenHeight*0.024,}}
            trackStyle={{ height: screenHeight*0.012 }}
          />
        </View>


        <View style={{ marginTop:"4%", position: "relative", width: "98%", alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginLeft: "6%" }}>
          <Text style={styles.dates}>today</Text>
          <Text style={styles.dates}>1 week</Text>
          <Text style={styles.dates}>1 month</Text>
          <Text style={styles.dates}>3 month</Text>
          <Text style={styles.dates}>6 month</Text>
          <Text style={styles.dates}>1 year</Text>
        </View>




        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            left: "6%",
            position: "relative",
            marginTop:"4%"
            // position: "absolute",
            // top: 226,

          }}
        >
          Category
        </Text>


        <View style={styles.Category_Buttons_Conatiner}>
          <TouchableOpacity
            style={[{
              paddingVertical:screenHeight*0.0045,
              backgroundColor: '#F7F7F7',
              width: "16.2%",
              height: screenHeight*0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#8391A1",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight:  screenWidth*0.012,
            }, categoryselectedButton === 'button1' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('button1')}
          >
            <Text style={categoryselectedButton === 'button1' ? styles.selectedButtonText : styles.buttonText}>All</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[{
              paddingVertical:screenHeight*0.0045,
              backgroundColor: '#F7F7F7',
              width: "24.8%",
              height: screenHeight*0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#8391A1",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight:  screenWidth*0.012,
            }, categoryselectedButton === 'button2' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('button2')}
          >
            <Text style={categoryselectedButton === 'button2' ? styles.selectedButtonText : styles.buttonText}>bag</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{
              paddingVertical:screenHeight*0.0045,
              backgroundColor: '#F7F7F7',
              width: "24.8%",
              height: screenHeight*0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#8391A1",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth*0.012,
            }, categoryselectedButton === 'button3' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('button3')}
          >
            <Text style={categoryselectedButton === 'button3' ? styles.selectedButtonText : styles.buttonText}>wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{
              paddingVertical:screenHeight*0.0045,
              backgroundColor: '#F7F7F7',
              width: "24.8%",
              height: screenHeight*0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#8391A1",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth*0.016,
            }, categoryselectedButton === 'button4' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('button4')}
          >
            <Text style={categoryselectedButton === 'button4' ? styles.selectedButtonText : styles.buttonText}>Mobile</Text>
          </TouchableOpacity>
        </View>




        <View style={styles.Category_Buttons_Conatiner_2}>



          <TouchableOpacity
            style={[{
              paddingVertical:screenHeight*0.0045,
              backgroundColor: '#F7F7F7',
              width: "24.8%",
              height: screenHeight*0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#8391A1",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth*0.016,
            }, categoryselectedButton === 'button5' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('button5')}
          >
            <Text style={categoryselectedButton === 'button5' ? styles.selectedButtonText : styles.buttonText}>Pet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{
              paddingVertical:screenHeight*0.0045,
              backgroundColor: '#F7F7F7',
              width: "24.8%",
              height: screenHeight*0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderColor: "#8391A1",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth*0.016,
            }, categoryselectedButton === 'button6' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('button6')}
          >
            <Text style={categoryselectedButton === 'button6' ? styles.selectedButtonText : styles.buttonText}>makeup</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{
              paddingVertical:screenHeight*0.0045,
              backgroundColor: '#F7F7F7',
              width: "24.8%",
              height: screenHeight*0.035,
              borderWidth: (screenWidth, screenHeight) * 0.0014,
              borderRadius: (screenWidth, screenHeight) * 0.007,
              borderColor: "#8391A1",
              marginRight: screenWidth*0.016,
            }, categoryselectedButton === 'button7' && styles.selectedButton]}
            onPress={() => CategoryhandleButtonPress('button7')}
          >
            <Text style={categoryselectedButton === 'button7' ? styles.selectedButtonText : styles.buttonText}>laptop</Text>
          </TouchableOpacity>
        </View>




        <Text
          style={{
            fontSize:RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            left: "6%",
            position: "relative",
            marginTop:"5%",
            // position: "absolute",
            // top: 325,

          }}
        >
          Location
        </Text>

        <View style={{
          position: 'relative',
          marginTop:"2%",
          // position: 'absolute',
          // top: 350,
          flexDirection: "row",
          alignItems: "center"
        }}>



          <TextInput style={{
            backgroundColor: "#EDEEEF",
            borderWidth: 1,
            borderColor: "#EDEEEF",
            width: "89%",
            // width:321,
            height: 37,
            height: screenHeight*0.0515,
            borderRadius: 8,
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 22,
            position: "relative",
            paddingLeft: screenWidth*0.12,
            letterSpacing: 0.1,
            color: "#8C9199",
            marginLeft: "6%"
          }}
            placeholder='Search something here' />
          <Ionicons
            name="search"
            size={RFValue(17)}
            color="#888888"

            style={{
              position: "absolute",
              left: "11%",
              alignSelf:"center"

            }}
          />
        </View>


        <TouchableOpacity
          onPress={handler}
          style={{
            // position: "absolute",
            // top: 427,
            position: 'relative',
            marginTop:"4%",
            borderRadius: 8,
            backgroundColor: '#7689D6',
            // padding: 10,
            // width: 320,
            width: "90%",
            height: screenHeight * 0.059,
            alignSelf: "center",

            justifyContent: "center"
          }}><Text style={{
            fontSize: RFValue(15),
            fontFamily: "Urbanist_600SemiBold",
            // lineHeight: 18,
            alignSelf: "center",
            color: '#F9F9F9',


          }}
          >Apply </Text>
        </TouchableOpacity>


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
    marginTop:"9%"
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
    backgroundColor: '#7689D6',
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
    color:"#8391A1"
  }
,


  Category_Buttons_Conatiner: {
    flexDirection: "row",
    marginLeft: "6%",
   position: "relative",
   marginTop:"3%"
  },
  Category_button: {
   
  },
  Category_Bagbutton: {
   
  },
  Category_Buttons_Conatiner_2: {
    flexDirection: "row",
    marginLeft: "6%",
    position: "relative",
    marginTop:"1.3%"
  },
 
})