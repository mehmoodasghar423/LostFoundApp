import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, Dimensions, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from '@react-navigation/native';
import { LoadingModal } from "react-native-loading-modal";
import { Ionicons, AntDesign, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignOut_API_ENDPOINT ='https://31d9-39-37-159-76.ngrok-free.app/api/v1/logout'


const Profile = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);



  ////
  const SettingHandler = () => {
    navigation.navigate('Settings');
  };
  const ContactHandler = () => {
    navigation.navigate('Contact');
  };
  const [loadingg, setloadingg] = useState(true);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [selectedImage, setSelectedImage] = useState(null);
  ///
  const [name, setName] = useState("")




  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied!');
      }
    })();
  }, []);



  const signOut = async () => {
    try {
      // Retrieve the token from AsyncStorage
      const userToken = await AsyncStorage.getItem('userToken');
  
      if (!userToken) {
        // Handle the case where there's no token in AsyncStorage
        console.error('No user token found in AsyncStorage');
        return;
      }
  
      const response = await fetch(SignOut_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });
  
      if (response.ok) {
        console.log('User successfully signed out');
        // Clear the token from AsyncStorage
        await AsyncStorage.removeItem('userToken');
        // Add any additional logic you want to perform after signing out
    navigation.navigate("Login");

      } else {
        console.error('Failed to sign out');
        console.log('Response Status:', response.status);
        console.log('Response Text:', await response.text());
        // Handle sign-out failure
      }
    } catch (error) {
      console.error('Error signing out:', error);
      // Handle any errors that occurred during the sign-out process
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View>

        <View
          style={{
            paddingBottom: "4%",
            borderBottomWidth: RFValue(3),
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
          }}>
          <Text
            style={{
              fontSize: RFValue(20),
              // fontSize: 20,
              
              fontFamily: "Urbanist_600SemiBold",

              letterSpacing: -1,
              position: "relative",
              marginTop: "3.5%",
              color: "#0F2944",
              alignSelf: "center",
            }}
          >
            Profile
          </Text>
        </View>

        {loading && <LoadingModal modalVisible={true} />}
        <View style={{
          // position:"absolute",
          // top:81,
          position: "relative",
          // top:61,
          marginTop: "6%"
          // backgroundColor:"red",
          // height:130
        }}>

          <Image
            source={require('../../assets/Dpp.png')}
            style={
              {

                width: screenWidth * 0.305,
                height: screenHeight * 0.1468,
                alignSelf: "center",
                // backgroundColor: "red",
                resizeMode: "contain",
                //   borderRadius: (screenWidth, screenHeight) * 0.07,
                // borderWidth:(screenWidth, screenHeight) * 0.007,
                borderColor: "white",
              }}
          />

          {selectedImage && <Image
            source={{ uri: selectedImage }}
            style={{

              width: 110,
              height: 110,
              width: screenWidth * 0.305,
              height: screenHeight * 0.1468,
              alignSelf: "center",
              position: "absolute",
              borderColor: "white",
              // borderWidth:(screenWidth, screenHeight) * 0.007,
              borderRadius: (screenWidth, screenHeight) * 0.1,
            }}

          />}

          <TouchableOpacity 
          // onPress={pickImage}
           style={{
            // backgroundColor: "white",
            height: screenHeight * 0.04,
            width: screenWidth * 0.08,
            position: "absolute",
            bottom: screenHeight * -0.0006,
            alignSelf: "center",
            right: screenWidth * 0.38,
            
           
           

          }}>
          <Image
          style={{
            width: 32,
            width: screenWidth * 0.087,
            height: 32,
            height: screenHeight * 0.0423,
            alignSelf: "center",
            resizeMode:"contain",
            marginRight: "3%",
            // backgroundColor:"red",
          }}

          source={require('../../assets/Camera.png')} />

          </TouchableOpacity>

        </View>



        <Text
          style={{
            fontSize: RFValue(20),
            fontFamily: "Urbanist_600SemiBold",
            // lineHeight: 20,
            // left: "6%",
            letterSpacing: -1,
            position: "relative",
            // top: 73,
            marginTop: "3.5%",
            color: "#1E232C",
            // width: 210,
            alignSelf: "center"
          }}
        >
         Ali
        </Text>



        <View style={{
          // position:"absolute",
          // top:81,
          position: "relative",
          marginTop: "4%",
          width: 236,
          width: screenWidth * 0.66,
          height: 38,
          height: screenHeight * 0.053,
          alignSelf: "center",
          borderColor: "#0F2944",
          borderWidth: (screenWidth, screenHeight) * 0.0014,
          borderRadius: (screenWidth, screenHeight) * 0.007,
          flexDirection: "row",justifyContent:"center"
        }}>

          <Image
            style={{
              width: 18.33,
              height: 18.33,
              width: screenWidth * 0.06,
              height: screenHeight * 0.027,
              resizeMode: "contain",
              alignSelf: "center",
              // marginLeft: "29%",
              marginRight:8
            }}
            source={require('../../assets/LostApp/Point.png')} />


          <Text
            style={{
              fontSize: RFValue(15),
              fontFamily: "Urbanist_600SemiBold",
              // lineHeight: 17.5,
              // left: "20%",
              letterSpacing: -1,

              color: "#0F2944",
              // width: 210,
              alignSelf: "center"
            }}
          >
            Points : 1234
          </Text>


        </View>





        <TouchableOpacity
          // onPress={AccountDeatilsHandler}
          style={{
            position: "relative",
            marginTop: "5%",
            width: "82%",
            height: 60,
            height: screenHeight*0.075,
            borderColor: "#E0E0E0",
            borderBottomWidth: screenWidth * 0.001,
            marginLeft: "5%",
            flexDirection: "row",
          }}>



          <Image
            style={{
              width: 20,
              height: 20,
              width: screenWidth * 0.056,
              height: screenHeight * 0.0266,
              resizeMode:"contain",
              alignSelf: "center",
              marginRight: "3%",
              // backgroundColor:"red"
            }}

            source={require('../../assets/profile-circle.png')} />


          <Text
            style={{
              fontSize: RFValue(16),
              position: "absolute",
              left: "13%",
              fontFamily: "Urbanist_500Medium",
              alignSelf: "center",
              color: "#0F2944"
            }}
          >
            Account Detail
          </Text>
        </TouchableOpacity>







        <TouchableOpacity
          // onPress={SettingHandler}
          style={{
            position: "relative",
            marginTop: "2%",
            width: "82%",
            height: 60,
            height: screenHeight*0.075,
            borderColor: "#E0E0E0",
            borderBottomWidth: screenWidth * 0.001,
            marginLeft: "5%",
            flexDirection: "row",
          }}>

          <Image
          style={{
            
            width: 20,
            height: 20,
            width: screenWidth * 0.056,
            height: screenHeight * 0.0266,
            resizeMode:"contain",
            alignSelf: "center",
            marginRight: "3%",
          }}

          source={require('../../assets/setting-2.png')} />


          <Text
            style={{
              fontSize: RFValue(16),
              position: "absolute",
              left: "13%",
              fontFamily: "Urbanist_500Medium",
              alignSelf: "center",
              color: "#0F2944"
            }}
          >
            Settings
          </Text>


        </TouchableOpacity>






        <TouchableOpacity
          // onPress={ContactHandler}
          style={{
            position: "relative",
            marginTop: "2%",
            width: "82%",
            height: 60,
            height: screenHeight*0.075,
            borderColor: "#E0E0E0",
            borderBottomWidth: screenWidth * 0.001,
            marginLeft: "5%",
            flexDirection: "row",
          }}>

          <Image
          style={{
          
            width: 20,
            height: 20,
            width: screenWidth * 0.056,
            height: screenHeight * 0.0266,
            resizeMode:"contain",
            alignSelf: "center",
            marginRight: "3%",
          }}

          source={require('../../assets/sms-notification.png')} />


          <Text
            style={{
              fontSize: RFValue(16),
              position: "absolute",
              left: "13%",
              fontFamily: "Urbanist_500Medium",
              alignSelf: "center",
              color: "#0F2944"
            }}
          >
            Contact
          </Text>


        </TouchableOpacity>





        <TouchableOpacity
          onPress={signOut}
          style={{
            // position: "absolute",
            // top: 427,
            position: 'relative',
            // top: 120,
            borderRadius: 8,
            backgroundColor: '#0F2944',
            width: "90%",
            height: screenHeight * 0.06,
            alignSelf: "center",
            marginTop: "6%",
            justifyContent: "center"
          }}><Text style={{
            fontSize: RFValue(15),
            fontFamily: "Urbanist_600SemiBold",
            // lineHeight: 18,
            alignSelf: "center",
            color: '#F9F9F9',


          }}
          >Logout </Text>
        </TouchableOpacity>



        <TouchableOpacity
          // onPress={handleDeleteAccount}
          style={{
            position: 'relative',
            // top: 127,
            borderRadius: 8,
            width: "90%",
            height: screenHeight * 0.06,
            alignSelf: "center",
            marginTop: "1%",
            justifyContent: "center"
          }}><Text style={{
            fontSize: RFValue(15),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 18,
            alignSelf: "center",
            color: '#FE9003',


          }}
          >Delete Account </Text>
        </TouchableOpacity>



      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({})
export default Profile