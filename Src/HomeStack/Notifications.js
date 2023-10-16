import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";




const NotificationData = [
  {
    ProfileImage: require("../../assets/LostApp/Profile2.png"),
    NotificationLine: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    Time: "1m ago."
  },
  {
    ProfileImage: require("../../assets/LostApp/Profile2.png"),
    NotificationLine: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    Time: "1m ago."
  },
  {
    ProfileImage: require("../../assets/LostApp/Profile2.png"),
    NotificationLine: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    Time: "1m ago."
  },
  {
    ProfileImage: require("../../assets/LostApp/Profile2.png"),
    NotificationLine: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    Time: "1m ago."
  },
  {
    ProfileImage: require("../../assets/LostApp/Profile2.png"),
    NotificationLine: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    Time: "1m ago."
  },
  {
    ProfileImage: require("../../assets/LostApp/Profile2.png"),
    NotificationLine: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    Time: "1m ago."
  },
  {
    ProfileImage: require("../../assets/LostApp/Profile2.png"),
    NotificationLine: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    Time: "1m ago."
  },
  {
    ProfileImage: require("../../assets/LostApp/Profile2.png"),
    NotificationLine: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    Time: "1m ago."
  },
  {
    ProfileImage: require("../../assets/LostApp/Profile2.png"),
    NotificationLine: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    Time: "1m ago."
  },



]





const Notifications = () => {


  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

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
              // lineHeight: 20,
              // width: 280,
              // left: 18,
              // top: 1,
              marginLeft: "30%",


            }}
          >
            Notifications
          </Text>
        </View>


        <View style={{ justifyContent: "center", alignItems: "center", }}>

          {NotificationData.map((item, index) => (
            <View style={{
              position: "relative",
              top: screenHeight * 0.02,
              width: screenWidth * 0.92,
              height: screenHeight * 0.062,
              backgroundColor: "#F7F8F9",
              marginTop: screenHeight * 0.007,
              borderRadius: 5,

              alignSelf: "center"


            }}
              key={index} >

              <Image
                style={{
                  height: screenHeight * 0.08,
                  width: screenWidth * 0.09,
                  resizeMode: "contain",
                  bottom: screenHeight * -0.01,
                  position: "absolute",
                }}
                source={item.ProfileImage} />


              <Text
                style={{
                  fontFamily: "Urbanist_400Regular",
                  position: "absolute",
                  left:screenWidth*0.12,
                  top:screenHeight*0.013,
                  color: "#1E232C",
                  fontSize: RFValue(10),
                }}
              >{item.NotificationLine}</Text>



              <Text
                style={{
                  fontFamily: "Urbanist_500Medium",
                  // fontFamily: 'Montserrat_500Medium',
                  fontSize: RFValue(8),
                  // lineHeight: 9.6,
                  position: "absolute",
                  left:screenWidth*0.12,
                  bottom:screenHeight*0.012,
                  color: "#6C6C6C",

                }}
              >{item.Time}</Text>





            </View>
          ))}
        </View>

      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({})
export default Notifications;