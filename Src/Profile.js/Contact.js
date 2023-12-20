import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions,Linking,TouchableWithoutFeedback } from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config';
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Entypo, Ionicons } from '@expo/vector-icons';




const Contact = () => {

  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [modalVisible, setmodalVisible] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleWebsitePress = () => {
    Linking.openURL('https://www.dextersol.com');
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
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
    <View>
   
    <View style={{ flexDirection: "row", position: "relative", alignItems: "center", marginTop: "3%", justifyContent: "space-between" }}>


    <TouchableOpacity
      style={{
        marginLeft: "4%",
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
      <Ionicons name="ios-chevron-back-sharp"
        size={screenWidth * 0.08}
        color="#6A707C"
        style={{
        }} />
    </TouchableOpacity>


    <Text
      style={{
        fontSize: RFValue(20),
        fontFamily: "Urbanist_600SemiBold",
        color: "#0F2944"
        // marginLeft: "30%",


      }}
    >
    Contact 
    </Text>


    <TouchableOpacity 
    style={{
      marginRight: "4%",
    }}
    onPress={() => setmodalVisible(true)}>
    <Image style={{
      width: screenWidth * 0.1,
      height: screenHeight * 0.047,
      resizeMode: "contain",
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",

    }}
      source={require("../../assets/HomeBack.png")} />
  </TouchableOpacity>


 


  </View>
    

    <Text style={{
      fontFamily: "Urbanist_500Medium",
      marginTop: "12%",
      alignItems: "center",
      alignSelf: "center",
      fontSize: RFValue(14),



    }}>You can visit our website</Text> 
    <TouchableOpacity onPress={handleWebsitePress}>
    <Text style={{
      fontFamily: "Urbanist_500Medium",
      marginTop: "2%",
      alignItems: "center",
      alignSelf: "center",
      color: "green",
      fontSize: RFValue(14),

    }}>www.dextersol.com</Text>
  </TouchableOpacity>


  {modalVisible && (
    <TouchableWithoutFeedback onPress={() => setmodalVisible(false)}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          height: screenHeight * 1,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      >
        <TouchableWithoutFeedback>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: (screenWidth, screenHeight) * 0.03,
              paddingVertical: screenHeight * 0.03,
              paddingHorizontal: screenWidth * 0.07,
              alignItems: 'center',

              // position:"absolute"
            }}
          >
            <TouchableOpacity
              onPress={() => setmodalVisible(false)}
              style={{ position: 'absolute', top: screenHeight * 0.007, right: screenWidth * 0.021 }}>

              <Entypo name="cross"
                size={screenWidth * 0.065}
                color="black" />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: RFValue(12),
                fontFamily: "Urbanist_600SemiBold",
                color: "#778899"

              }}
              >You Are Going to Home Page !</Text>
            <Text
              style={{
                fontSize: RFValue(16),
                fontFamily: "Urbanist_600SemiBold",
                color: "black", marginTop: "1%"

              }}
            >Do You Want to Continue ?</Text>

            <View style={{ flexDirection: 'row', marginTop: screenHeight*0.02 ,marginLeft:"7%",}}>
              <TouchableOpacity
                onPress={() => setmodalVisible(false)}
                style={{
                  marginRight: screenWidth * 0.05,
                  width: "25%",
                  height: screenHeight * 0.032,
                  backgroundColor: "#3cb371",
                  borderRadius: (screenWidth, screenHeight) * 0.03,
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                <Text
                  style={{
                    fontSize: RFValue(15),
                    fontFamily: "Urbanist_600SemiBold",
                    color: "white",
                    // left: "6%",
                  }}
                >Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  marginRight: screenWidth * 0.05,
                  width: "40%",
                  height: screenHeight * 0.032,
                  backgroundColor: "#0F2944",
                  borderRadius: (screenWidth, screenHeight) * 0.03,
                  alignItems: "center",
                  justifyContent: "center",
                  
                }}
                onPress={() => navigation.navigate("Home")}>
                <Text
                  style={{
                    fontSize: RFValue(15),
                    fontFamily: "Urbanist_600SemiBold",
                    color: "white",
                    // left: "6%",
                  }}>Go To Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )}

    </View>
    </SafeAreaView>
  )
}


export default Contact;
const styles = StyleSheet.create({

    container: {
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
        },
})