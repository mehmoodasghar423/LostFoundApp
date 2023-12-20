import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions,ActivityIndicator,TouchableWithoutFeedback } from 'react-native'

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





export default function AccountDeatils({ route }) {
const { selectedImage,profilname } = route.params;
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [userData, setUserData] = useState(null);
  const handleGoBack = () => {
    navigation.goBack();
  };


  const [modalVisible, setmodalVisible] = useState(false);

  // Fetch the user's own data from Firestore when the component mounts

  useEffect(() => {
    // Ensure the user is authenticated (you may want to add additional checks)
    if (firebase.auth().currentUser) {
      const userId = firebase.auth().currentUser.uid;

      // Fetch user data from Firestore
      firebase
        .firestore()
        .collection('UserData')
        .doc(userId)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            const userData = snapshot.data();
            setUserData(userData);
          } else {
            console.log('User data not found in Firestore.');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);


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
      Account Detail
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

        <Text
        style={{
          fontSize: RFValue(14),
          fontFamily: "Urbanist_500Medium",
          // lineHeight: 24,
          // left: "6%",
          // position: "relative",
          // top: 94,
          top: screenHeight * 0.03,
          alignSelf: "center",
          color: "#8391A1",

        }}
      >
        Your Account Details is Given Below
      </Text>


        <Image
        style={{
          width: screenWidth * 0.31,
              height: screenHeight * 0.15,
              alignSelf: "center",
              backgroundColor: "red",
              borderRadius: 100,
              borderWidth: (screenWidth, screenHeight) * 0.007,
              borderColor: "white",
              marginTop:"14%"
        }}
        source={
          selectedImage
            ? { uri: selectedImage }
            : require('../../assets/Dpp.png')
        }
      />


      <View style={{
        backgroundColor:"#0F2944",
         paddingVertical:screenHeight* 0.001,
         justifyContent:"center",alignItems:"center", 
           position: "relative",marginTop:"3%",width:"auto",
           alignSelf:"center",borderRadius:(screenWidth, screenHeight) * 0.07,     
           borderWidth: (screenWidth, screenHeight) * 0.004,borderColor:"white",paddingHorizontal:screenWidth*0.03
          //  paddingHorizontal:20
          }}>
      <Text
      style={{
        fontSize: RFValue(16),
        fontFamily: "Urbanist_600SemiBold",
        color: "white",
        
      }}
    >
    {profilname}
    </Text>

    </View>


        {userData ? (
          <View style={{  marginTop: "5%",}}>
           
            <Text style={{
              fontFamily: "Urbanist_500Medium",
        fontSize: RFValue(14),
         
              alignItems: "center",
              alignSelf: "center"
            }}>Username: {userData.username}</Text>
            <Text style={{
              fontFamily: "Urbanist_500Medium",
              alignSelf: "center",
        fontSize: RFValue(14),


            }}>Email: {userData.email}</Text>

          </View>
        ) : (
          <ActivityIndicator size="large" color="#0F2944" /> // Loading indicator while data loads
        )}


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
  );
}
