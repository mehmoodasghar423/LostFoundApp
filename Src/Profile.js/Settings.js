import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config';
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";




const Settings = () => {

  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const handleGoBack = () => {
    navigation.goBack();
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
        marginLeft: "20%",


      }}
    >
    Settings
    </Text>

    
    
    </View>
    
    </View>
    </SafeAreaView>
  )
}


export default Settings;
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