import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Dimensions ,TouchableWithoutFeedback} from 'react-native'
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
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



/////

const MyAds = ({ route }) => {
  const { initialButton } = route.params || {};

  const navigation = useNavigation();


  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = (screenWidth * 0.25);
  const screenHeight = Dimensions.get('window').height;

  const [modalVisible, setmodalVisible] = useState(false);


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


  const handleGoBack = () => {
    navigation.goBack();
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
          flexDirection:"row",
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
          alignItems:"center",
          // justifyContent:"center"
          height:screenHeight*0.073,
          
        }}>

       
          <Text
            style={{
              fontSize: RFValue(20),
              fontFamily:"Urbanist_600SemiBold",
              color: "#0F2944",
              letterSpacing: -1,
              position: "relative",
              marginLeft: screenWidth*0.40,
              marginTop:screenHeight*0.02,
              position:"absolute"
            }}
          >
            My Ads
          </Text>
       
        </View>



        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, { width: buttonWidth }, selectedButton === 'lost' && {
              borderBottomWidth:screenHeight*0.002,
              borderColor: "#FE9003",
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
              borderColor: "#FE9003",
              shadowColor: "#363B64",
              paddingBottom:screenHeight*0.01
            }]}
            onPress={() => handleButtonPress('found')}
          >
            <Text style={selectedButton === 'found' ? styles.selectedButtonText : styles.buttonText}>Found</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.buttonContentContainer}>{renderButtonContent()}</View>

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
    borderColor: "#0F2944",
    shadowColor: "#363B64",
    paddingBottom:10
  },
  selectedButtonText: {
    fontFamily:"Urbanist_500Medium",
    fontSize: RFValue(14),
    color: "#0F2944",
    textAlign: "center"
  },
  buttonContentContainer: {
    marginTop: 20,

  },

})
export default MyAds