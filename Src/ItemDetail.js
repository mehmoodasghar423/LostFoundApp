import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import Carousel from "pinar";
import ResponsiveImage from "react-native-responsive-image";
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";



const ItemDetail = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;



  const handleGoBack = () => {
    navigation.goBack();
  };

  const [selectedButton, setSelectedButton] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const LostButtonPress = (button) => {
    setSelectedButton(button);
    navigation.navigate('LostPost');
  };

  const FoundButtonPress = (button) => {
    setSelectedButton(button);
    navigation.navigate('FoundPost');
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
    <SafeAreaView>

      <View>

        <View style={{ flexDirection: "row", position: "relative", alignItems: "center", marginTop: "5%",}}>


          <TouchableOpacity onPress={handleGoBack}>
            <Image style={{
              width: 41,
              width: screenWidth * 0.11,
              height: 41,
              height: screenHeight * 0.057,
              // top: 20,
              left: "40%"

            }}
              source={require("../assets/LostApp/back.png")} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: RFValue(18),
              fontFamily: "Urbanist_600SemiBold",

              marginLeft: "30%",


            }}
          >
          Details
          </Text>
          <TouchableOpacity onPress={handleGoBack}>
            <Image style={{
              position:"absolute",
              width: 17,
              height: 15,
              width: screenWidth * 0.053,
              height: screenHeight * 0.03,
              // marginLeft: "48%",
              right:screenWidth*-0.35,
              bottom:screenHeight*-0.017,
              resizeMode:"contain"
            }}
              source={require("../assets/LostApp/ShareIcon.png")} />
          </TouchableOpacity>
        </View>


        <View style={{ 
         height:screenHeight*0.307,
         width:screenWidth*0.64,
          alignSelf: "center",
           marginTop: "7%",
           borderRadius: (screenWidth, screenHeight) * 0.007, }}  >
          <Carousel style={{ alignItems: "center", justifyContent: "center", borderRadius: (screenWidth, screenHeight) * 0.007,}}>
            <View style={styles.slide1}>
              <Image style={{ width: "100%", height: "100%", borderRadius: 10 }}
                source={require('../assets/LostApp/Item.png')}
              />
            </View>

            <View style={styles.slide2}>
              <Image style={{ width: "100%", height: "100%", borderRadius: 10 }}
                source={require('../assets/LostApp/Item.png')}
              />
            </View>

            <View style={styles.slide3}>
              <Image style={{ width: "100%", height: "100%", borderRadius: 10 }}
                source={require('../assets/LostApp/Item.png')}
              />
            </View>
          </Carousel>
        </View>


        <View style={styles.buttons}>

          <TouchableOpacity
            style={[{
              width: "44%",
              height: screenHeight * 0.059,
              borderWidth: (screenWidth, screenHeight) * 0.0018,
              borderColor: "#7689D6",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth*0.016,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"

            }, selectedButton === 'button1' && styles.selectedButton]}
            onPress={() => LostButtonPress('button1')}
          >
            <Image style={selectedButton === 'button1' ? {  
           
              width: screenWidth * 0.035,
              height: screenHeight * 0.03,
              alignSelf: "center",
              marginRight: "3%",
              resizeMode: "contain",
              tintColor: "white",
            } : {  
           
              width: screenWidth * 0.035,
              height: screenHeight * 0.03,
              alignSelf: "center",
              marginRight: "3%",
              resizeMode: "contain"} }
           
              source={require("../assets/LostApp/Message.png")} />
            <Text style={selectedButton === 'button1' ? styles.selectedButtonText : styles.buttonText}>Message</Text>
          </TouchableOpacity>



          <TouchableOpacity
            style={[{
              width: "44%",
              height: screenHeight * 0.059,
              borderWidth: (screenWidth, screenHeight) * 0.0018,
              borderColor: "#7689D6",
              borderRadius: (screenWidth, screenHeight) * 0.007,
              marginRight: screenWidth*0.016,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }, selectedButton === 'button2' && styles.selectedButton]}
            onPress={() => FoundButtonPress('button2')}
          >
            <Image style={selectedButton === 'button2' ? {  
           
              width: screenWidth * 0.035,
              height: screenHeight * 0.03,
              alignSelf: "center",
              marginRight: "3%",
              resizeMode: "contain",
              tintColor: "white",} : {  
           
              width: screenWidth * 0.035,
              height: screenHeight * 0.03,
              alignSelf: "center",
              marginRight: "3%",
              resizeMode: "contain"}}
              source={require("../assets/LostApp/Call.png")} />
            <Text style={selectedButton === 'button2' ? styles.selectedButtonText : styles.buttonText}>Call</Text>
          </TouchableOpacity>
        </View>




        <View style={{ position: "relative", marginTop:"9%", alignSelf: "center", width: "93%", flexDirection: "row", }}>
          <Text style={{ fontFamily: "Urbanist_500Medium", fontSize: RFValue(16), }}
          >Glasses</Text>
          <Text style={{ fontFamily: "Urbanist_400Regular", fontSize: RFValue(12),  letterSpacing: 1, alignSelf: "center", color: "#1E1F4B",position:"absolute",right:screenWidth*0.03, }}
          >12 April 2023 , 2:14 Am</Text>
        </View>

        <View style={{ position: "relative", marginTop:"4%", alignSelf: "center", width: "93%", }}>
          <Text style={{ fontFamily: "Urbanist_500Medium",fontSize: RFValue(12)}}
          >Description</Text>
          <Text style={{ fontFamily: "Urbanist_400Regular", fontSize: RFValue(12), top: screenHeight*0.004, color: "#8391A1" }}
          >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>

          <View style={{ position: "relative", top: screenHeight*0.015, flexDirection: "row",alignItems:"center" }}>
            <Image style={{ 
              width: screenWidth*0.03,
              height:screenHeight*0.017,
              resizeMode: "contain", }}
              source={require("../assets/LostApp/Locatioon.png")} />
            <Text style={{ fontFamily: "Urbanist_400Regular", fontSize: RFValue(12), alignSelf: "center", color: "#8391A1", marginLeft: "1.5%" }}>
              Lahore, Pakistan
            </Text>
          </View>
        </View>


        <TouchableOpacity
          // onPress={handler}
          style={{
            // position: "absolute",
            // top: 427,
            position: 'relative',
          marginTop:screenHeight*0.04,
            borderRadius: 8,
            backgroundColor: '#7689D6',
            // padding: 10,
            // width: 320,
            width: "93%",
            height: screenHeight * 0.059,
            alignSelf: "center",

            justifyContent: "center"
          }}><Text style={{
            fontSize: 15,
            fontFamily: "Urbanist_600SemiBold",
            lineHeight: 18,
            alignSelf: "center",
            color: '#F9F9F9',


          }}
          >View on map </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    position: "relative",
    marginTop:"10%",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
  
 
  },

  Image: {
  
  },
  selectedImage: {
   
  },

  buttonText: {
    fontSize: RFValue(18),
    fontFamily: "Urbanist_500Medium",
    // lineHeight: 18,
    color: "#7689D6",
    textAlign: "center",
    marginLeft: "3%"

  },
  selectedButton: {
    backgroundColor: '#7689D6',
    shadowColor: "#363B64",
    borderWidth: 0

  },
  selectedButtonText: {
    fontSize: RFValue(18),
    fontFamily: "Urbanist_500Medium",
    // lineHeight: 18,
    color: "white",
    textAlign: "center"
  },
})



