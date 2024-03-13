import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Dimensions, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const API_ENDPOINT_RESET = 'https://077f-39-37-159-76.ngrok-free.app/api/v1/resetpassword'


const CreateNewPassword = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;



  const handleGoBack = () => {
    navigation.goBack();
  };


  const [newpassword, setnewpassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');


  const resetPassword = async () => {
    try {
      if (newpassword !== confirmpassword) {
        throw new Error('Passwords do not match');
      }

      const response = await fetch(API_ENDPOINT_RESET, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pass1: newpassword,
          pass2: confirmpassword
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      // Handle success
      Alert.alert('Success', 'Password reset successfully!');
      // Navigate the user to a screen after password reset
      navigation.navigate('Login'); // Replace 'Login' with the appropriate screen
    } catch (error) {
      console.error('Error resetting password:', error);
      Alert.alert('Error', error.message || 'Failed to reset password');
    }
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
        <TouchableOpacity onPress={handleGoBack}>
          <Image style={{
            width: 41,
            width: screenWidth * 0.11,
            height: 41,
            height: screenHeight * 0.057,
            // top: 20,
            marginTop: "6%",
            left: "5%"

          }}
            source={require("../../assets/LostApp/back.png")} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: RFValue(20),
            fontFamily: "Urbanist_600SemiBold",
            // lineHeight: 20,
            // left: "6%",
            letterSpacing: -1,
            position: "relative",
            marginTop: "10%",

            // width: 210,
            alignSelf: "center"
          }}
        >
          Create New Password
        </Text>

        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 18,
            // left: "6%",
            position: "relative",
            marginTop: "2%",
            alignSelf: "center",
            color: "#8391A1",
            // width:240
          }}
        >
          Your new password must be unique from those  {'\n'}                             previously used.
        </Text>

        <TextInput style={{
          backgroundColor: "#F7F8F9",
          borderWidth: 1,
          borderColor: "#E8ECF4",
          // width: 335,
          width: "90%",
          height: screenHeight * 0.06,
          alignSelf: "center",
          borderRadius: 8,
          fontSize: RFValue(12),
          fontFamily: "Urbanist_500Medium",
          // lineHeight: 15,
          // position: "absolute",
          // top: 156,
          position: "relative",
          marginTop: "9%",
          padding: 15,

        }}
          placeholder='New Password'
          placeholderTextColor="#8391A1"
          value={newpassword}
          onChangeText={text => setnewpassword(text)}
        />

        <TextInput style={{
          backgroundColor: "#F7F8F9",
          borderWidth: 1,
          borderColor: "#E8ECF4",
          // width: 335,
          width: "90%",
          height: screenHeight * 0.06,
          alignSelf: "center",
          borderRadius: 8,
          fontSize: RFValue(12),
          fontFamily: "Urbanist_500Medium",
      
          // lineHeight: 15,
          // position: "absolute",
          // top: 156,
          position: "relative",
          marginTop: "2%",
          padding: 10
        }}
          placeholder='Confirm Password'
          placeholderTextColor="#8391A1"
          value={confirmpassword}
          onChangeText={text => setConfirmPassword(text)}
        />

        <TouchableOpacity
          onPress={resetPassword}
          style={{
            position: "relative",
            borderRadius: 8,
            backgroundColor: '#0F2944',
            // padding: 10,
            // width: 320,

            width: "90%",
            height: screenHeight * 0.06,
            alignSelf: "center",
            marginTop: "3%",
            justifyContent: "center"
          }}><Text style={{
            fontSize: RFValue(15),
            fontFamily: "Urbanist_600SemiBold",
            // lineHeight: 18,
            alignSelf: "center",
            color: '#F9F9F9',


          }}
          >Reset Password </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({})
export default CreateNewPassword;