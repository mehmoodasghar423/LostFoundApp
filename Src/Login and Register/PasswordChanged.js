import { StyleSheet, Text, View,TouchableOpacity,Image,TextInput,Dimensions } from 'react-native'
import React,{useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Urbanist_300Light,Urbanist_400Regular,Urbanist_500Medium,Urbanist_600SemiBold,Urbanist_700Bold, 
} from  '@expo-google-fonts/urbanist';
import { useFonts } from  '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const CreateNewPassword = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;


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
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
  
    <View>
    <TouchableOpacity onPress={handleGoBack}>
    <Image style={{
      width: 41,
      width:screenWidth*0.11,
      height: 41,
      height: screenHeight*0.057,
      // top: 20,
      marginTop:"6%",
      left: "5%"


    }}
      source={require("../../assets/LostApp/back.png")} />
  </TouchableOpacity>

  <Image style={{
    width: 185,
    height: 185,
   //  height: height * 0.3,
   //  width: width * 0.8,
   width: screenWidth * 0.57,
   height: screenHeight * 0.4,
     marginTop:"10%", 
     resizeMode:"contain",
     alignSelf: "center",
     position:"relative",
    // backgroundColor:"red" 
  }}
   source={require("../../assets/LostApp/PasswordChanged.jpg")} />

  <Text
  style={{
    fontSize: RFValue(20),
    fontFamily:"Urbanist_600SemiBold",
    // lineHeight: 20,
    // left: "6%",
    letterSpacing: -1,
    position: "relative",
 marginTop:"2%",
  
    // width: 210,
    alignSelf:"center"
  }}
>
Password Changed!
</Text>

  <Text
  style={{
    fontSize:  RFValue(12),
    fontFamily:"Urbanist_500Medium",
    // lineHeight: 18,
    // left: "6%",
    position: "relative",
   marginTop:"2%",
    alignSelf:"center",
    color:"#8391A1",
    // width:240
  }}
>
Your password has been changed successfully.
</Text>


  <TouchableOpacity
  onPress={()=>navigation.navigate('Login')}
  style={{
    position: "relative",
    borderRadius: 8,
    backgroundColor: '#7689D6',
    // padding: 10,
    // width: 320,
    width: "90%",
    height: screenHeight*0.06,
    alignSelf: "center",
    marginTop:"8%",
    justifyContent: "center"
  }}><Text style={{
    fontSize:  RFValue(15),
    fontFamily:"Urbanist_600SemiBold",
    // lineHeight: 18,
    alignSelf: "center",
    color: '#F9F9F9',


  }}
  >Back to login </Text>
</TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({})
export default CreateNewPassword;