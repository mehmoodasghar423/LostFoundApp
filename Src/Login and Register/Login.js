import { StyleSheet, Text, View,TouchableOpacity,Image,Dimensions,TouchableWithoutFeedback,TextInput,Alert } from 'react-native'
import React, { useEffect,useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import {
  Urbanist_300Light,Urbanist_400Regular,Urbanist_500Medium,Urbanist_600SemiBold,Urbanist_700Bold, 
} from  '@expo-google-fonts/urbanist';
import { useFonts } from  '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LoadingModal } from "react-native-loading-modal";
import { firebase } from '../../config';
import { Entypo, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



const API_ENDPOINT ='https://31d9-39-37-159-76.ngrok-free.app/api/v1/login'


export default function Login() {
  const navigation = useNavigation();
 

 
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;


  const [email, setEmail] = useState('mehmoodasghar029@gmail.com');
  const [password, setPassword] = useState('Meh12345')
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const [loading, setLoading] = useState(false); 

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const [modalVisible, setmodalVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handler =()=>{
    navigation.navigate("TabNavigator")
  }

  const ForgotPasswordhandler =()=>{
    navigation.navigate("ForgotPassword")
  }

  const handleLogin = async () => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to login');
      }
  
      // If login is successful, you might want to handle the response, e.g., extract tokens, user data, etc.
      const data = await response.json();
      
        // Save the token to AsyncStorage
    await AsyncStorage.setItem('userToken', data.token);

      console.log('Login success:', data);
      Alert.alert('Login success');
    navigation.navigate("TabNavigator");

    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Failed to log in');
    }
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
    // Check if both email and password are provided
    if (!email.trim() || !password.trim()) {
      // Display the custom modal when both fields are not filled
      setmodalVisible(true);
      return; // Exit the function early if fields are empty
    }
  
    try {
      setLoading(true); // Show loading modal when login process starts
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setLoading(false); // Hide loading modal when login process ends successfully
      navigation.navigate("TabNavigator");
    } catch (error) {
      setLoading(false); // Hide loading modal if an error occurs during login
      const customMessage = "Invalid Information Entered";
      // Display the custom modal when invalid information is entered
      setmodalVisible(true);
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
            alignSelf:"center",
            color:"#0F2944"
          }}
        >
                Welcome back!     

        </Text>
        <Text
          style={{
            fontFamily:"Urbanist_600SemiBold",
            fontSize: RFValue(20),
            // lineHeight: 20,
            // left: "6%",
            letterSpacing: -0.5,
            position: "relative",
            // top: 78,
            // marginTop: "1%",
            // width: 210,
            alignSelf:"center",
            color:"#0F2944"
          }}
        >
        Glad to see you, Again!

        </Text>

        <TextInput style={{
          backgroundColor: "#E0E0E0",
          borderWidth: 1,
          borderColor: emailError ? 'red' : '#E8ECF4',
          // width: 335,
          width: "92%",
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
          placeholderTextColor="#6A707C"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {loading && <LoadingModal modalVisible={true} />}
        <View style={{
          // flexDirection: 'row',
          // alignItems: 'center',
        }}>
          <TextInput style={{
            backgroundColor: "#E0E0E0",
            borderWidth: 1,
            borderColor: passwordError ? 'red' : '#E8ECF4',
            // width: 335,
            width: "92%",
            // width: screenWidth*0.92,
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
            placeholderTextColor="#6A707C"
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
           
              color: "#FE9003"
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>


        <TouchableOpacity 

        // onPress={() => loginUser(email, password)}
        onPress={handleLogin}
        
          style={{
            position: "relative",
            borderRadius: 8,
            backgroundColor: '#0F2944',
            width: "92%",
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



        <TouchableOpacity
    
          style={{
            position: "relative",
            borderRadius: 5,
           justifyContent:"center",
           alignItems:"center",
           width: "17.2%",
            height: screenHeight*0.044,
            alignSelf: "center",
            marginTop:"6%",
         borderWidth:0.6,
         borderColor:"#FBBB00"
          }}>

          <Image
          style={{
            height:screenHeight*0.024,
            width:screenWidth*0.04,
            resizeMode:"contain",
            alignSelf:"center",
        //  backgroundColor:"red"

          }}
           source={require('../../assets/google.png')}/>
         
        </TouchableOpacity>




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
            // color: "#1E232C",
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
             color: "#FE9003",
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
                    paddingHorizontal: screenWidth * 0.04,
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
                      fontSize: RFValue(17),
                      fontFamily: "Urbanist_600SemiBold",
                      color: "black", marginTop: "1%"
        
                    }}
                  >Add Valid Information for Login !</Text>
        
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
                        width: "50%",
                        height: screenHeight * 0.032,
                        backgroundColor: "#0F2944",
                        borderRadius: (screenWidth, screenHeight) * 0.03,
                        alignItems: "center",
                        justifyContent: "center",
                        
                      }}
                      onPress={() => setmodalVisible(false)}
>
                      <Text
                        style={{
                          fontSize: RFValue(15),
                          fontFamily: "Urbanist_600SemiBold",
                          color: "white",
                          // left: "6%",
                        }}>Enter Data Again</Text>
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
