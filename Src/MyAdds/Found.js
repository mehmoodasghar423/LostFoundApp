import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";



const things = [
  {
    image: require("../../assets/LostApp/GlassesBg.png"),
    name: 'Glasses',
    date: '12 April 2023 , 2:14 Am',
    Locationpng: require('../../assets/LostApp/Location.png'),
    Location: 'Lahore, Pakistan',
  },
  {
    image: require("../../assets/LostApp/GlassesBg.png"),
    name: 'Glasses',
    date: '12 April 2023 , 2:14 Am',
    Locationpng: require('../../assets/LostApp/Location.png'),
    Location: 'Lahore, Pakistan',
  },
  {
    image: require("../../assets/LostApp/GlassesBg.png"),
    name: 'Glasses',
    date: '12 April 2023 , 2:14 Am',
    Locationpng: require('../../assets/LostApp/Location.png'),
    Location: 'Lahore, Pakistan',
  },
  {
    image: require("../../assets/LostApp/GlassesBg.png"),
    name: 'Glasses',
    date: '12 April 2023 , 2:14 Am',
    Locationpng: require('../../assets/LostApp/Location.png'),
    Location: 'Lahore, Pakistan',
  },
  {
    image: require("../../assets/LostApp/GlassesBg.png"),
    name: 'Glasses',
    date: '12 April 2023 , 2:14 Am',
    Locationpng: require('../../assets/LostApp/Location.png'),
    Location: 'Lahore, Pakistan',
  },
  {
    image: require("../../assets/LostApp/GlassesBg.png"),
    name: 'Glasses',
    date: '12 April 2023 , 2:14 Am',
    Locationpng: require('../../assets/LostApp/Location.png'),
    Location: 'Lahore, Pakistan',
  },
 
];

const Found = () => {
  const screenWidth = Dimensions.get('window').width;
  const box_Width = (screenWidth * 0.95);
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
    <View style={{backgroundColor:"white"}}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>

        {things.map((item, index) => (
          <View style={{
            position: "relative",
            width: box_Width,
            height: screenHeight * 0.106,
            borderRadius: 8,
            backgroundColor: "white",
            elevation: 3,
            marginTop: 9,
            // borderWidth:1


          }}
            key={index} >

            <Image
              style={{
                width: screenWidth * 0.175,
                height: screenHeight * 0.086,
                borderRadius: 10,
                position: "absolute",
                marginLeft:"1.7%",
                marginTop:"1%"
              }}
              source={item.image} />


            <Text
              style={{
                fontFamily: "Urbanist_500Medium",
                fontSize: RFValue(14),
                // lineHeight: 16.8,
                position: "absolute",
                // left: 79,
                marginLeft:"25%",
                top: screenHeight*0.015,
                color: "black",
              }}
            >{item.name}</Text>


            <Text
              style={{
                fontFamily: "Urbanist_400Regular",
                // fontFamily: 'Montserrat_500Medium',
                fontSize: RFValue(8),
                // lineHeight: 9.6,
                position: "absolute",
                marginLeft:"25.3%",
                top: screenHeight*0.046,
                color: "#1E1F4B",
              }}
            >{item.date}</Text>


            <Image
              style={{
                width: 6.87,
                width:screenWidth*0.018,
                height: 8.25,
                height:screenHeight*0.025,

              resizeMode:"contain",
                position: "absolute",
                left:screenWidth*0.244,
                top: screenHeight*0.063,


              }}
              source={item.Locationpng} />

            <Text
              style={{
                fontFamily: "Urbanist_400Regular",
                // fontFamily: 'Montserrat_500Medium',
                fontSize: RFValue(8),
                // lineHeight: 9.6,
                position: "absolute",
                left:screenWidth*0.274,
                top: screenHeight*0.067,
                color: "#8391A1",

              }}
            >{item.Location}</Text>



            <TouchableOpacity
              onPress={() => navigation.navigate("Details")}

              style={{

                position: "absolute",
                right:screenWidth*0.09,
                top: screenHeight*0.018,
                justifyContent: "center"

              }}>

              <Image
                style={{
                  tintColor: "#7689D6",
                  alignSelf: "center",
                  width: screenWidth*0.031,
                  height:screenHeight*0.015,
                  resizeMode:"contain"


                }}
                source={require('../../assets/LostApp/Editt.png')}
              />

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Details")}

              style={{

                position: "absolute",
                right:screenWidth*0.03,
                top: screenHeight*0.016,
                justifyContent: "center"

              }}>

              <Image
                style={{

                  alignSelf: "center",
                  width: screenWidth*0.036,
                  height:screenHeight*0.018,
                  resizeMode:"contain"


                }}
                source={require('../../assets/LostApp/Delete.png')}
              />

            </TouchableOpacity>
          </View>
        ))}
      </View>




    </View>
  )
}

export default Found

const styles = StyleSheet.create({})