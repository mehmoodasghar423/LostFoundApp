import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View,Dimensions ,Alert,TouchableWithoutFeedback} from 'react-native'
import { Entypo, Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config';
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { SelectList } from 'react-native-dropdown-select-list';




const Settings = () => {




  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [email, setEmail] = useState('');
  const [modalVisible, setmodalVisible] = useState(false);

  const [category, setCategory] = useState('Pakistan');
  const [defaultCountry, setDefaultCountry] = useState({ key: 'Pakistan', value: 'Pakistan' });

  const data = [
    { key: 'Pakistan', value: 'Pakistan' },
    { key: 'United States', value: 'United States' },
    { key: 'India', value: 'India' },
    { key: 'China', value: 'China' },
    { key: 'Indonesia', value: 'Indonesia' },
    { key: 'Brazil', value: 'Brazil' },
    { key: 'Nigeria', value: 'Nigeria' },
    { key: 'Bangladesh', value: 'Bangladesh' },
    { key: 'Russia', value: 'Russia' },
    { key: 'Mexico', value: 'Mexico' },
    { key: 'Japan', value: 'Japan' },
    { key: 'Ethiopia', value: 'Ethiopia' },
    { key: 'Philippines', value: 'Philippines' },
    { key: 'Egypt', value: 'Egypt' },
    { key: 'Vietnam', value: 'Vietnam' },
    { key: 'DR Congo', value: 'DR Congo' },
    { key: 'Turkey', value: 'Turkey' },
    { key: 'Iran', value: 'Iran' },
    { key: 'Germany', value: 'Germany' },
    { key: 'Thailand', value: 'Thailand' },
    // Add more countries as needed...
  ];
  

  const handleGoBack = () => {
    navigation.goBack();
  };


  const handleResetPassword = () => {
    if (email.trim() === '') {
      // Alert the user to enter their email if the field is empty
      Alert.alert('Please Enter Email', 'Please enter your email to reset your password.');
    } else if (!email.trim().toLowerCase().endsWith('@gmail.com')) {
      // Alert the user if the email format is incorrect
      Alert.alert('Incorrect Email Format', 'Please enter a valid Gmail address.');
    } else {
      const user = firebase.auth().currentUser;
      if (user) {
        firebase
          .auth()
          .sendPasswordResetEmail(user.email)
          .then(() => {
            // Password reset email sent successfully
            Alert.alert('Password Reset', 'Password reset email sent. Please check your inbox.');
          })
          .catch((error) => {
            console.error('Error sending password reset email:', error);
            Alert.alert('Error', 'An error occurred while sending the password reset email.');
          });
      }
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
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
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
    Settings
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
    fontSize:  RFValue(18),
   fontFamily:"Urbanist_600SemiBold",
    // lineHeight: 20,
    // left: "6%",
    // letterSpacing: -1,
    position: "relative",
    marginTop: "12%",
    // width: 210,
    alignSelf:"center",
    color:"#0F2944"
  }}
>
Select Your Country Here !
</Text>



  <View style={{
    // position: "absolute",
    // top: 105,
    position: "relative",
    top: screenHeight * 0.04
  }}>
   
  <SelectList 
  setSelected={setCategory} data={data}

  placeholder='Select Your Country Here'
  defaultOption={defaultCountry}
  
  boxStyles={{
    backgroundColor: "#EDEEEF",
      borderWidth: 1,
      borderColor: '#EDEEEF',
      width: "91%",
      // height: screenHeight * 0.052,
      // borderRadiush: 8,
      fontSize: RFValue(12),
    
      paddingLeft: screenWidth * 0.1,
      // borderBottomLeftRadius:8,
    
      color: "#8C9199",
      // marginLeft: "6%"
      alignSelf: "center"
  }}
  
  dropdownStyles={{
    borderWidth: 1,
    borderColor: "#EDEEEF",
    width: "91%",
    alignSelf: "center"
  }}

  dropdownTextStyles={{
    fontSize: RFValue(17),
    fontFamily: "Urbanist_500Medium",
  }}
  inputStyles={{
    // backgroundColor:"red",
    fontSize: RFValue(17),
    fontFamily:"Urbanist_600SemiBold",

    color:"#0F2944"
  }}
  />

  
  </View>



    <Text
    style={{
      fontSize:  RFValue(18),
     fontFamily:"Urbanist_600SemiBold",
      // lineHeight: 20,
      // left: "6%",
      // letterSpacing: -1,
      position: "relative",
      marginTop: "22%",
      // width: 210,
      alignSelf:"center",
      color:"#0F2944"
    }}
  >
 You can Change or Reset your Account {'\n'}                    Password here !
  </Text>

  <TextInput style={{
    backgroundColor: "#F7F8F9",
    borderWidth: 1,
    borderColor: "#E8ECF4",
    // width: 335,
    width: "90%",
    height: screenHeight*0.06,
    alignSelf: "center",
    borderRadius: 8,
    fontSize:  RFValue(12),
    fontFamily:"Urbanist_500Medium",
    // lineHeight: 15,
    // position: "absolute",
    // top: 156,
    position: "relative",
    marginTop: "6.4%",
    padding: 10
  }}
    placeholder='Enter your Email Here'
    placeholderTextColor="#8391A1"
    value={email}
    onChangeText={text => setEmail(text)}
    autoCorrect={false}
  />



  



  <TouchableOpacity
 onPress={handleResetPassword}
    style={{
      position: "relative",
      borderRadius: 8,
      backgroundColor: '#0F2944',
      width: "90%",
      height:33,
      height: screenHeight*0.06,
      alignSelf: "center",
      marginTop:"8%",
      justifyContent: "center"
    }}><Text style={{
      fontSize: RFValue(15),
      fontFamily:"Urbanist_600SemiBold",
      // lineHeight: 18,
      alignSelf: "center",
      color: '#F9F9F9',


    }}
    > Change Password</Text>
  </TouchableOpacity>

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