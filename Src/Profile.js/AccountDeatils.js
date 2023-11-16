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





export default function AccountDeatils() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [userData, setUserData] = useState(null);
  const handleGoBack = () => {
    navigation.goBack();
  };
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
            Account Deatils
          </Text>
        </View>
        {userData ? (
          <View>
            <Text
              style={{
                fontSize: RFValue(14),
                fontFamily: "Urbanist_500Medium",
                // lineHeight: 24,
                // left: "6%",
                position: "relative",
                // top: 94,
                top: screenHeight * 0.13,
                alignSelf: "center",
                color: "#8391A1",

              }}
            >
              Your Account Details is Given Below
            </Text>
            <Text style={{
              fontFamily: "Urbanist_500Medium",
              marginTop: "32%",
              alignItems: "center",
              alignSelf: "center"
            }}>Username: {userData.username}</Text>
            <Text style={{
              fontFamily: "Urbanist_500Medium",
              alignSelf: "center"

            }}>Email: {userData.email}</Text>

          </View>
        ) : (
          <Text>Loading user data...</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
