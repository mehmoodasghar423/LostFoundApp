import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Dimensions } from 'react-native'
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context'
import Lost from '../MyAdds/Lost'
import Found from '../MyAdds/Found'
import React, { useEffect,useState } from 'react';
import {
  Urbanist_300Light,Urbanist_400Regular,Urbanist_500Medium,Urbanist_600SemiBold,Urbanist_700Bold, 
} from  '@expo-google-fonts/urbanist';
import { useFonts } from  '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";



/////

const MyAds = ({ route }) => {
  const { initialButton } = route.params || {};

  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = (screenWidth * 0.25);
  const screenHeight = Dimensions.get('window').height;

  const [selectedButton, setSelectedButton] = useState(initialButton || 'lost'); // Set the initial value based on initialButton

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);


  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  const renderButtonContent = () => {
    if (selectedButton === 'lost') {
      return <Lost />;
    } else if (selectedButton === 'found') {
      return <Found />;
    }
    return null;
  };

  let [fontsLoaded] = useFonts({
    Urbanist_300Light,Urbanist_400Regular,Urbanist_500Medium,Urbanist_600SemiBold,Urbanist_700Bold,  
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
    <SafeAreaView >
      <View style={{ backgroundColor:"white"}}>

        <View style={{
          paddingBottom:"4%",
          borderBottomWidth:  RFValue(3),
          borderBottomColor: 'rgba(0, 0, 0, 0.1)', // Adjust the shadow color and opacity
          ...Platform.select({
            ios: {
              shadowColor: 'transparent',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0,
              shadowRadius: 0,
            },
            android: {
              elevation: 0,
            },
          }),
        }}>
          <Text
            style={{
              fontSize: RFValue(20),
              fontFamily:"Urbanist_600SemiBold",
              // lineHeight: 20,
              // left: "6%",
              letterSpacing: -1,
              position: "relative",
              // top: 19,
              marginTop:"3.5%",
              color: "#1E232C",
              // width: 210,
              alignSelf: "center",
            }}
          >
            My Ads
          </Text>
        </View>



        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, { width: buttonWidth }, selectedButton === 'lost' && {
              borderBottomWidth:screenHeight*0.002,
              borderColor: "#7689D6",
              shadowColor: "#363B64",
              paddingBottom:screenHeight*0.01
            }]}
            onPress={() => handleButtonPress('lost')}
          >
            <Text style={selectedButton === 'lost' ? styles.selectedButtonText : styles.buttonText}>Lost</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[styles.button, { width: buttonWidth }, selectedButton === 'found' && {
              borderBottomWidth:screenHeight*0.002,
              borderColor: "#7689D6",
              shadowColor: "#363B64",
              paddingBottom:screenHeight*0.01
            }]}
            onPress={() => handleButtonPress('found')}
          >
            <Text style={selectedButton === 'found' ? styles.selectedButtonText : styles.buttonText}>Found</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.buttonContentContainer}>{renderButtonContent()}</View>


      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({

  buttons: {
    flexDirection: "row",
    marginTop: "6%",
    justifyContent: "center"
  },
  button: {
width:57,
  },
  buttonText: {
    fontFamily:"Urbanist_500Medium",
    fontSize: RFValue(14),
    color: "#858585",
    textAlign: "center",
    alignSelf: "center"
  },
  selectedButton: {
    borderBottomWidth:2,
    borderColor: "#7689D6",
    shadowColor: "#363B64",
    paddingBottom:10
  },
  selectedButtonText: {
    fontFamily:"Urbanist_500Medium",
    fontSize: RFValue(14),
    color: "#7689D6",
    textAlign: "center"
  },
  buttonContentContainer: {
    marginTop: 20,

  },

})
export default MyAds