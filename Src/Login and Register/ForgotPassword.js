import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Dimensions ,Alert} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { firebase } from '../../config';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;


  const handleGoBack = () => {
    navigation.goBack();
  };

  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email.toLowerCase().includes('@gmail.com')) {
      Alert.alert('Error', 'Please provide a valid Gmail address');
      return;
    }
    if (email) {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          // Password reset email sent successfully
          Alert.alert('Password Reset', 'Password reset email sent. Please check your inbox & Login with NewPaaword');
        })
        .catch((error) => {
          console.error('Error sending password reset email:', error);
          Alert.alert('Error', 'An error occurred while sending the password reset email.');
        });
    } else {
      Alert.alert('Error', 'Please enter your email.');
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
color:"#1E232C",
            // width: 210,
            alignSelf: "center"
          }}
        >
          Forgot Password?
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
            color: "#6A707C",
            // width:240
          }}
        >
          Don't worry! It occurs. Please enter the email {'\n'}            address linked with your account.
        </Text>

        <TextInput style={{
          backgroundColor: "#E0E0E0",
          borderWidth: 1,
          borderColor: "#E0E0E0",
          // width: 335,
          width: "90%",
          height: screenHeight * 0.06,
          alignSelf: "center",
          borderRadius: 8,
          fontSize: RFValue(12),
          fontFamily: "Urbanist_500Medium",
          lineHeight: 15,
          // position: "absolute",
          // top: 156,
          position: "relative",
          marginTop: "9%",
          padding: 15,

        }}
          placeholder='Enter your email'
          placeholderTextColor="#6A707C"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TouchableOpacity
          onPress={handleResetPassword}
          style={{
            position: "relative",
            borderRadius: 8,
            backgroundColor: '#0F2944',
            // padding: 10,
            // width: 320,
            width: "90%",
            height: screenHeight * 0.06,
            alignSelf: "center",
            marginTop: "6.5%",
            justifyContent: "center"
          }}><Text style={{
            fontSize: RFValue(15),
            fontFamily: "Urbanist_600SemiBold",
            // lineHeight: 18,
            alignSelf: "center",
            color: '#F9F9F9',


          }}
          >Send Code </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({})
export default ForgotPassword;