import { StyleSheet, Text, View,TouchableOpacity,Image,Dimensions } from 'react-native'
// import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import React, { useEffect,useState } from 'react';
import {
  Urbanist_300Light,Urbanist_400Regular,Urbanist_500Medium,Urbanist_600SemiBold,Urbanist_700Bold, 
} from  '@expo-google-fonts/urbanist';
import { useFonts } from  '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";




const Middle = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;


  const handleGoBack = () => {
    navigation.goBack();
  };

  const [selectedButton, setSelectedButton] = useState('button2');

  const LostButtonPress = (button) => {
    setSelectedButton(button);
    navigation.navigate('LostPost');
  };

  const FoundButtonPress = (button) => {
    setSelectedButton(button);
    navigation.navigate('FoundPost');
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
    <SafeAreaView>
    
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
              // lineHeight: 20,
              // width: 280,
              // left: 18,
              // top: 1,
            marginLeft:"30%",
          

        }}
      >
      Add Post
      </Text>
    </View>

    <Text
    style={{
      fontSize: RFValue(16),
     fontFamily:"Urbanist_500Medium",
      // lineHeight: 24,
      // left: "6%",
      position: "relative",
      // top: 94,
     top:screenHeight*0.13,
      alignSelf:"center",
      color:"#8391A1",
      
    }}
  >
  What kind of Post you want to Add?
  </Text>


  <View style={styles.buttons}>
  <TouchableOpacity
    style={[{
      padding: 9,
      backgroundColor: '#F7F7F7',
      // width:137.25,
      width: "38%",
      height:screenHeight*0.058,
      borderWidth: 2,
      borderColor: "#8391A1",
      borderRadius: 8,
      marginRight: 11,
    }, selectedButton === 'button1' && styles.selectedButton]}
    onPress={() => LostButtonPress('button1')}
  >
    <Text style={selectedButton === 'button1' ? styles.selectedButtonText : styles.buttonText}>Lost</Text>
  </TouchableOpacity>


  <TouchableOpacity
    style={[{
      padding: 9,
      backgroundColor: '#F7F7F7',
      // width:137.25,
      width: "38%",
      height:screenHeight*0.058,
      borderWidth: 2,
      borderColor: "#8391A1",
      borderRadius: 8,
      marginRight: 11,
    }, selectedButton === 'button2' && styles.selectedButton]}
    onPress={() => FoundButtonPress('button2')}
  >
    <Text style={selectedButton === 'button2' ? styles.selectedButtonText : styles.buttonText}>Found</Text>
  </TouchableOpacity>
</View>

    </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    position: "relative",
    // top: 118,
    marginTop:"32%",
    alignItems:"center",
    justifyContent:"center"
  },
  button: {
    padding: 9,
    backgroundColor: '#F7F7F7',
    // width:137.25,
    width: "38%",
    height: 42,
    borderWidth: 2,
    borderColor: "#8391A1",
    borderRadius: 8,
    marginRight: 11,
  },
  buttonText: {
    fontSize: RFValue(19.3),
    fontFamily:"Urbanist_500Medium",
    // lineHeight: 23.26,
    color: "#8391A1",
    textAlign: "center"

  },
  selectedButton: {
    backgroundColor: '#7689D6',
    shadowColor: "#363B64",
    borderWidth:0

  },
  selectedButtonText: {
    fontSize: RFValue(19.3),
   fontFamily:"Urbanist_500Medium",
    // lineHeight: 23.26,
    color: "#FFFFFF",
    textAlign: "center"
  },
})
export default Middle