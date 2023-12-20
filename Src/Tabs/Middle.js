import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback } from 'react-native'
// import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Entypo, Ionicons } from '@expo/vector-icons';




const Middle = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [modalVisible, setmodalVisible] = useState(false);

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
          color: "#0F2944",
          marginLeft: "23%",


        }}
      >
      Add Post
      </Text>


    


    </View>

        <Text
          style={{
            fontSize: RFValue(16),
            fontFamily: "Urbanist_600SemiBold",
            lineHeight: 24,
            // left: "6%",
            position: "relative",
            // top: 94,
            top: screenHeight * 0.13,
            alignSelf: "center",
            color: "#0F2944",

          }}
        >
          What kind of Post you want to Add ? 
        </Text>


        <View style={styles.buttons}>
          <TouchableOpacity
            style={[{
              // padding: 9,

              // backgroundColor: '#6A707C',
              // width:137.25,
              width: "38%",
              height: screenHeight * 0.058,
              borderRadius: (screenWidth, screenHeight) * 0.01,
              borderWidth: (screenWidth, screenHeight) * 0.002,
              borderColor: "#6A707C",
              marginRight: screenWidth*0.032,
              justifyContent:"center",
              alignItems:"center"
            }, selectedButton === 'button1' && styles.selectedButton]}
            onPress={() => LostButtonPress('button1')}
          >
            <Text style={selectedButton === 'button1' ? styles.selectedButtonText : styles.buttonText}>Lost</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[{
            
              backgroundColor: '#F7F7F7',
              // width:137.25,
              width: "38%",
              height: screenHeight * 0.058,
              borderRadius: (screenWidth, screenHeight) * 0.01,
              borderWidth: (screenWidth, screenHeight) * 0.002,
              borderColor: "#8391A1",
              marginRight: screenWidth*0.03,
              justifyContent:"center",
              alignItems:"center"
            }, selectedButton === 'button2' && styles.selectedButton]}
            onPress={() => FoundButtonPress('button2')}
          >
            <Text style={selectedButton === 'button2' ? styles.selectedButtonText : styles.buttonText}>Found</Text>
          </TouchableOpacity>
        </View>



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
                  >Your Will Lost Your Post Data !</Text>
                  <Text
                    style={{
                      fontSize: RFValue(16),
                      fontFamily: "Urbanist_600SemiBold",
                      color: "black", marginTop: "1%"

                    }}
                  >Do You Want to Continue ?</Text>

                  <View style={{ flexDirection: 'row', marginTop: screenHeight * 0.02, marginLeft: "7%", }}>
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


const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    position: "relative",
    // top: 118,
    marginTop: "32%",
    alignItems: "center",
    justifyContent: "center"
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
    marginRight: 13,
  },
  buttonText: {
    fontSize: RFValue(19.3),
    fontFamily: "Urbanist_500Medium",
    // lineHeight: 23.26,
    color: "#6A707C",
    textAlign: "center"

  },
  selectedButton: {
    backgroundColor: '#0F2944',
    shadowColor: "#363B64",
    borderWidth: 0

  },
  selectedButtonText: {
    fontSize: RFValue(19.3),
    fontFamily: "Urbanist_500Medium",
    // lineHeight: 23.26,
    color: "#FFFFFF",
    textAlign: "center"
  },
})
export default Middle