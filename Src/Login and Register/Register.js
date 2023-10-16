import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View,Dimensions } from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
  Urbanist_300Light,Urbanist_400Regular,Urbanist_500Medium,Urbanist_600SemiBold,Urbanist_700Bold, 
} from  '@expo-google-fonts/urbanist';
import { useFonts } from  '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";



export default function Register() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
 


  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handler =()=>{
    navigation.navigate("TabNavigator")
  }


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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View>
       
        <Text
          style={{
            fontSize:  RFValue(20),
           fontFamily:"Urbanist_600SemiBold",
            // lineHeight: 20,
            // left: "6%",
            letterSpacing: -1,
            position: "relative",
            marginTop: "22%",
            // width: 210,
            alignSelf:"center"
          }}
        >
        Register to Get Started!
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
          placeholder='Enter your Username'
          placeholderTextColor="#8391A1"
          value={username}
          onChangeText={text => setUsername(text)}
        />


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
          marginTop: "2%",
          padding: 10
        }}
          placeholder='Enter your Email'
          placeholderTextColor="#8391A1"
          value={email}
          onChangeText={text => setEmail(text)}
        />

      
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
            // position: "absolute",
          // top: 187,
          position: "relative",
          marginTop: "2%",
            padding: 10,
          }}
            placeholder='Enter your password'
            placeholderTextColor="#8391A1"
            // secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={text => setPassword(text)}
          />

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
            // position: "absolute",
          // top: 187,
          position: "relative",
          marginTop: "2%",
            padding: 10,
          }}
            placeholder='Confirm password'
            placeholderTextColor="#8391A1"
            // secureTextEntry={!isPasswordVisible}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
          />
         
      

       

        <TouchableOpacity
          onPress={handler}
          style={{
            position: "relative",
           marginTop:"7%",
            borderRadius: 8,
            backgroundColor: '#7689D6',
            // padding: 10,
            // width: 320,
            width: "90%",
            height: screenHeight*0.06,
            alignSelf: "center",
            justifyContent: "center"
          }}><Text style={{
            fontSize:  RFValue(15),
            fontFamily:"Urbanist_600SemiBold",
            // lineHeight: 18,
            alignSelf: "center",
            color: '#F9F9F9',


          }}
          >Register </Text>
        </TouchableOpacity>





        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor:"red",
          position:"relative",
          marginTop:"6%",


        }}>

          <View style={styles.line} />
            <Text
              style={{
                fontSize:  RFValue(14),
                fontFamily:"Urbanist_600SemiBold",
                // lineHeight: 16.8,
                // letterSpacing: -1,
                // position: "relative",
                color: "#6A707C",
                // alignSelf: "center"
                marginHorizontal: 20
              }}
            >
            Or register with
            </Text>
          <View style={styles.line} />
        </View>



        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginTop:"6%",
          // backgroundColor:"red"
        }}>
          <TouchableOpacity style={[styles.box,{borderColor:"#4092FF",height: screenHeight*0.04,}]}>
            <Image
              source={require("../../assets/LostApp/Facebook.png")}
              style={{
                height: screenHeight*0.02,
                height: screenHeight*0.02,
                resizeMode: "contain",
                alignSelf: "center"
              }} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.box,{borderColor:"#FBBB00",height: screenHeight*0.04,}]}>
            <Image
              source={require("../../assets/LostApp/Google.png")}
              style={{
                height: screenHeight*0.02,
                height: screenHeight*0.02,
                resizeMode: "contain",
                alignSelf: "center"
              }} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.box,{borderColor:"#000000",height: screenHeight*0.04,}]}>
            <Image
              source={require("../../assets/LostApp/Ios.png")}
              style={{
                height: screenHeight*0.02,
                height: screenHeight*0.02,
                resizeMode: "contain",
                alignSelf: "center"
              }} />
          </TouchableOpacity>
        </View>

      
       
         
        <View   style={{
          position: "relative",
          marginTop:"6%",
          alignSelf: "center",
          flexDirection:"row"
        }}>
        
        
       
        <Text
          style={{
            fontSize:  RFValue(12),
            fontFamily:"Urbanist_500Medium",
            // lineHeight: 16.8,
            letterSpacing: .5,
            color: "#6A707C",
            alignSelf: "center",
            // marginHorizontal: 20,
            color: "#1E232C",
          }}
        >
        Already Have an account? 
        </Text>

        <TouchableOpacity
          onPress={()=>navigation.navigate('Login')}
          style={{
            justifyContent:"center"
          }} >
          <Text style={{
            // lineHeight: 16.8,
            letterSpacing: 1,
             alignSelf: "center",
             color: "#9457E0",
             fontSize:  RFValue(12),
             fontFamily:"Urbanist_700Bold",
             }}>
           Login Now
          </Text>
          
          </TouchableOpacity>
        </View>

        

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 2,
    // borderBottomColor: 'black',
    borderBottomColor: "#E8ECF4",
    width: "28%",
    
    
  },
  box: {
    // width:62.71,
    width: "17.5%",
    height: 33.1,
    borderRadius: 5,
    borderWidth: 1,
    // borderColor: "#E8ECF4",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 2.5,
    justifyContent: "center",
  },
  SocialIcons: {
    height: 15.53,
    width: 15.37,
    resizeMode: "contain",
    alignSelf: "center"
  }
});
