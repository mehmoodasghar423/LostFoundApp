import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, Dimensions, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";



const Profile = () => {

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied!');
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
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
              fontFamily: "Urbanist_600SemiBold",
              // lineHeight: 20,
              // left: "6%",
              letterSpacing: -1,
              position: "relative",
              // top: 19,
              marginTop: "3.5%",
              color: "#1E232C",
              // width: 210,
              alignSelf: "center",
            }}
          >
            Profile
          </Text>
        </View>

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
            source={require('../../assets/LostApp/NProfile.webp')}
            style={
              {
                width: 110,
                height: 110,
                width: screenWidth * 0.29,
                height: screenHeight * 0.14,
                alignSelf: "center",
                // borderRadius: 100,
                // resizeMode:"contain",
                backgroundColor: "red",
                borderRadius: (screenWidth, screenHeight) * 0.07,
              borderWidth:(screenWidth, screenHeight) * 0.007,
                borderColor:"white"
              }}
          />

          {selectedImage && <Image
            source={{ uri: selectedImage }}
            style={{
              width: 110,
              height: 110,
              width: screenWidth * 0.29,
              height: screenHeight * 0.14,
              alignSelf: "center",
              borderRadius: 100,
              position: "absolute",
              borderWidth:(screenWidth, screenHeight) * 0.007,
              borderColor:"white"
            }}

          />}

          <TouchableOpacity onPress={pickImage}>
            <Image
              style={{
                width: 32,
                width: screenWidth*0.078,
                height: 32,
                height: screenHeight*0.05,
                alignSelf: "center",
                position: "absolute",
                bottom: screenHeight*-0.006,
                // alignSelf:"center",
                right: screenWidth*0.37,
                resizeMode:"contain"

              }}
              source={require('../../assets/LostApp/Camera.png')} />
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
          Sam
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
          borderColor: "#7689D6",
          borderWidth: (screenWidth, screenHeight) * 0.0014,
          borderRadius: (screenWidth, screenHeight) * 0.007,
          flexDirection: "row"
        }}>

          <Image
            style={{
              width: 18.33,
              height: 18.33,
              width: screenWidth * 0.06,
              height: screenHeight * 0.027,
              resizeMode: "contain",
              alignSelf: "center",
              marginLeft: "29%",
            }}
            source={require('../../assets/LostApp/Point.png')} />


          <Text
            style={{
              fontSize: RFValue(20),
              fontFamily: "Urbanist_600SemiBold",
              // lineHeight: 17.5,
              left: "20%",
              letterSpacing: -1,

              color: "#7689D6",
              // width: 210,
              alignSelf: "center"
            }}
          >
            Points :1234
          </Text>


        </View>





        <View style={{
          position: "relative",
          marginTop: "5%",
          width: "82%",
          height: 60,
          borderColor: "#8391A1",
          borderBottomWidth: screenWidth * 0.001,
          marginLeft: "6%",
          flexDirection: "row",
        }}>

          <Image
            style={{
              width: 18.33,
              height: 18.33,
              width: screenWidth * 0.051,
              height: screenHeight * 0.031,
              resizeMode: "contain",
              alignSelf: "center",
              //  backgroundColor:"red"

            }}
            source={require('../../assets/LostApp/Account.png')} />


          <Text
            style={{
              fontSize: RFValue(15),
              position: "absolute",
              left: "13%",
              fontFamily: "Urbanist_500Medium",
              alignSelf: "center"
            }}
          >
            Account Detail
          </Text>
        </View>







        <View style={{
          position: "relative",
          marginTop: "2%",
          width: "82%",
          height: 60,
          borderColor: "#8391A1",
          borderBottomWidth: screenWidth * 0.001,
          marginLeft: "6%",
          flexDirection: "row",
        }}>

          <Image
            style={{
              width: screenWidth * 0.051,
              height: screenHeight * 0.031,
              resizeMode: "contain",
              alignSelf: "center",

            }}
            source={require('../../assets/LostApp/Setting.png')} />


          <Text
            style={{
              fontSize: RFValue(15),
              position: "absolute",
              left: "13%",
              fontFamily: "Urbanist_500Medium",
              alignSelf: "center"
            }}
          >
            Settings
          </Text>


        </View>






        <View style={{

          position: "relative",
          marginTop: "2%",
          width: "82%",
          height: 60,
          borderColor: "#8391A1",
          borderBottomWidth: screenWidth * 0.001,
          marginLeft: "6%",
          flexDirection: "row",
        }}>

          <Image
            style={{
              width: screenWidth * 0.051,
              height: screenHeight * 0.031,
              resizeMode: "contain",
              alignSelf: "center",
            }}
            source={require('../../assets/LostApp/Contact.png')} />


          <Text
            style={{
              fontSize: RFValue(15),
              position: "absolute",
              left: "13%",
              fontFamily: "Urbanist_500Medium",
              alignSelf: "center"
            }}
          >
            Contact
          </Text>


        </View>





        <TouchableOpacity
          // onPress={handler}
          style={{
            // position: "absolute",
            // top: 427,
            position: 'relative',
            // top: 120,
            borderRadius: 8,
            backgroundColor: '#7689D6',
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
          // onPress={handler}
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
            color: '#DF1818',


          }}
          >Delete Account </Text>
        </TouchableOpacity>



      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({})
export default Profile