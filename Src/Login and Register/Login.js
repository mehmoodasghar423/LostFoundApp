import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View,Dimensions } from 'react-native'
import React, { useEffect,useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
  Urbanist_300Light,Urbanist_400Regular,Urbanist_500Medium,Urbanist_600SemiBold,Urbanist_700Bold, 
} from  '@expo-google-fonts/urbanist';
import { useFonts } from  '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { firebase } from '../../config';



export default function Login() {
  const navigation = useNavigation();
 

 
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  


  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handler =()=>{
    navigation.navigate("TabNavigator")
  }

  const ForgotPasswordhandler =()=>{
    navigation.navigate("ForgotPassword")
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


  const loginUser = async (email, password) => {
    if (email.trim() === '') {
      setEmailError('Please enter your email');
    } else {
      setEmailError('');
    }
  
    if (password.trim() === '') {
      setPasswordError('Please enter your password');
    } else {
      setPasswordError('');
    }
  
    if (email.trim() !== '' && password.trim() !== '') {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        const customMessage = "Invalid Information Entered";
        alert(customMessage);
      }
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View>
       
        <Text
          style={{
            fontFamily:"Urbanist_600SemiBold",
            fontSize: RFValue(20),
            // lineHeight: 20,
            // left: "6%",
            letterSpacing: -0.5,
            position: "relative",
            // top: 78,
            marginTop: "21%",
            // width: 210,
            alignSelf:"center"
          }}
        >
          Welcome back! Glad to {'\n'}       see you, Again!

        </Text>

        <TextInput style={{
          backgroundColor: "#F7F8F9",
          borderWidth: 1,
          borderColor: emailError ? 'red' : '#E8ECF4',
          // width: 335,
          width: "90%",
          height: screenHeight*0.06,
          alignSelf: "center",
          borderRadius: 8,
          fontFamily:"Urbanist_500Medium",
          fontSize: RFValue(12),
          // lineHeight: 15,
          // position: "absolute",
          // top: 156,
          position: "relative",
          marginTop:"10%",
          padding: 10
        }}
          placeholder='Enter your email'
          placeholderTextColor="#8391A1"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={{
          // flexDirection: 'row',
          // alignItems: 'center',
        }}>
          <TextInput style={{
            backgroundColor: "#F7F8F9",
            borderWidth: 1,
            borderColor: passwordError ? 'red' : '#E8ECF4',
            // width: 335,
            width: "90%",
            width: screenWidth*0.9,
            height: 43,
            height: screenHeight*0.06,
            alignSelf: "center",
            borderRadius: 8,
            fontSize: RFValue(12),
            fontFamily:"Urbanist_500Medium",
            // lineHeight: 15,
            // position: "absolute",
            // top: 156,
            position: "relative",
            // position: "absolute",
          // top: 187,
          position: "relative",
          marginTop:"2%",
            padding: 10,
          }}
            placeholder='Enter your password'
            placeholderTextColor="#8391A1"
            // secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          />
         
        </View>

        <TouchableOpacity 
        onPress={ForgotPasswordhandler}
        style={{ alignItems: "flex-end",   position: "relative",
        marginTop:"2%", }}>
          <Text
            style={{
              fontSize: RFValue(12),
              fontFamily:"Urbanist_600SemiBold",
              // lineHeight: 14.4,
              // left: -20,
              left: "-6%",
              letterSpacing: -1,
           
              color: "#6A707C"
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
        onPress={() => loginUser(email, password)}
          style={{
            position: "relative",
            borderRadius: 8,
            backgroundColor: '#7689D6',
            width: "90%",
            height:33,
            height: screenHeight*0.06,
            alignSelf: "center",
            marginTop:"2%",
            justifyContent: "center"
          }}><Text style={{
            fontSize: RFValue(15),
            fontFamily:"Urbanist_600SemiBold",
            // lineHeight: 18,
            alignSelf: "center",
            color: '#F9F9F9',


          }}
          >Login </Text>
        </TouchableOpacity>





        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor:"red",
          position:"relative",
          marginTop:"7%",

        }}>

          <View style={styles.line} />
            <Text
              style={{
                fontSize: RFValue(14),
                fontFamily:"Urbanist_600SemiBold",
                // lineHeight: 16.8,
                letterSpacing: -0.5,
                // position: "relative",
                color: "#6A707C",
                // alignSelf: "center"
                marginHorizontal: 20
              }}
            >
              Or Login with
            </Text>
          <View style={styles.line} />
        </View>



        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginTop:"5%",
          // backgroundColor:"red"
        }}>
          <TouchableOpacity style={[styles.box,{borderColor:"#4092FF", height: screenHeight*0.04,}]}>
            <Image
              source={require("../../assets/LostApp/Facebook.png")}
              style={{
                height: screenHeight*0.02,
                height: screenHeight*0.02,
                resizeMode: "contain",
                alignSelf: "center"
              }} />
          </TouchableOpacity>

          <TouchableOpacity  
          style={[styles.box,{borderColor:"#FBBB00", height: screenHeight*0.04,}]}>
            <Image
              source={require("../../assets/LostApp/Google.png")}
              style={{
                height: screenHeight*0.02,
                height: screenHeight*0.02,
                resizeMode: "contain",
                alignSelf: "center"
              }} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.box,{borderColor:"#000000", height: screenHeight*0.04,}]}>
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
          marginTop:"5%",
          alignSelf: "center",
          flexDirection:"row"
        }}>
        
        
       
        <Text
          style={{
            fontSize:RFValue(12),
            fontFamily:"Urbanist_500Medium",
            // lineHeight: 16.8,
            letterSpacing: 1,
            color: "#6A707C",
            alignSelf: "center",
            // marginHorizontal: 20,
            color: "#1E232C",
          }}
        >
          Dont have an account? 
        </Text>

        <TouchableOpacity
          onPress={()=>navigation.navigate('Register')}
          style={{
            justifyContent:"center"
          }} >
          <Text style={{
             color: "#9457E0",
             fontSize: RFValue(12),
             fontFamily:"Urbanist_700Bold",
            //  lineHeight: 16.8,
             letterSpacing: 1,
             alignSelf: "center",
          
             }}>
           Register Now
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
    // height: screenHeight*0.05,
    borderRadius: 5,
    borderWidth: 1,
    // borderColor: "#E8ECF4",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 2.5,
    justifyContent: "center",
  },
 
});
