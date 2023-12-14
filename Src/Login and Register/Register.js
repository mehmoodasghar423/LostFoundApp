import { StyleSheet, Text, View,TouchableOpacity,Image,Dimensions,TouchableWithoutFeedback,TextInput,Alert } from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import {
  Urbanist_300Light,Urbanist_400Regular,Urbanist_500Medium,Urbanist_600SemiBold,Urbanist_700Bold, 
} from  '@expo-google-fonts/urbanist';
import { useFonts } from  '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { firebase } from '../../config';
import PhoneInput from 'react-native-phone-input';
import { LoadingModal } from "react-native-loading-modal";


export default function Register() {
  const navigation = useNavigation();



  
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;


  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
 
  const [loading, setLoading] = useState(false); // Loading state 

  const [initialCountry, setInitialCountry] = useState('pk');

  useEffect(() => {
    // Simulating a delay for fetching initial country data
    setTimeout(() => {
      setInitialCountry('pk'); // Set Pakistan as the default country
    }, 1000); 
  }, []);


  const [modalVisible, setmodalVisible] = useState(false);


  const registrationUser = async () => {

      // Set loading state to true during registration process
  setLoading(true);


    // Validation checks for required fields
    if (!username || !phoneNumber || !email || !password || !confirmPassword) {
      setLoading(false); 
      setmodalVisible(true);
      return;
    }

     // Username should be at least 5 characters
  if (username.length < 5) {
    setLoading(false);
    Alert.alert('Error', 'Username must be at least 5 characters');
    return;
  }

    if (password !== confirmPassword) {
      setLoading(false); 
      Alert.alert('Error', 'Password and Confirm Password should be the same');
      return;
    }

    // Email validation check for @gmail.com
    if (!email.toLowerCase().includes('@gmail.com')) {
      setLoading(false); 
      Alert.alert('Error', 'Please provide a valid Gmail address');
      return;
    }

    // Password length check for minimum 8 characters
    if (password.length < 8) {
       setLoading(false); 
      Alert.alert('Error', 'Password must contain at least 8 characters');
      return;
    }

    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Send email verification
        return firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: "https://lost-e3f4a.firebaseapp.com",
        });
      })
      .then(() => {
        // alert("Verification email sent");
      })
      .then(() => {
        // Store user data in Firestore
        firebase.firestore().collection("UserData")
          .doc(firebase.auth().currentUser.uid)
          .set({
            username,
            phoneNumber,
            email,
            password,
            confirmPassword,
            onlineStatus: 'online',
          });
      })
      .catch((error) => {
        setLoading(false); 
        alert(error.message);
      });
  }
  




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
            alignSelf:"center",
            color:"#0F2944"
          }}
        >
        Register to Get Started!
        </Text>

        <TextInput style={{
          backgroundColor: "#F3F4F6",
          borderWidth: 1,
          borderColor: "#E0E0E0",
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
          placeholderTextColor="#6A707C"
          value={username}
          onChangeText={text => setUsername(text)}
          autoCorrect={false}
        />

        {loading && <LoadingModal modalVisible={true} />}


        <PhoneInput style={{
          backgroundColor: "#F3F4F6",
          borderWidth: 1,
          borderColor: "#E0E0E0",
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
          padding: 10,
        }}
          placeholder='Enter your Phone Number'
          placeholderTextColor="#6A707C"
          value={phoneNumber}
        initialCountry={initialCountry}
        onChangePhoneNumber={(number) => setPhoneNumber(number)}
        textInputProps={{
          style: { fontSize: 30 }, // Adjust the font size as needed
        }}
         
        />


        <TextInput style={{
          backgroundColor: "#F3F4F6",
          borderWidth: 1,
          borderColor: "#E0E0E0",
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
          placeholderTextColor="#6A707C"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
          autoCorrect={false}
        />

      
          <TextInput style={{
            backgroundColor: "#F3F4F6",
            borderWidth: 1,
            borderColor: "#E0E0E0",
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
            placeholderTextColor="#6A707C"
            // secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
            autoCorrect={false}
          secureTextEntry={true}

          />

          <TextInput style={{
            backgroundColor: "#F3F4F6",
            borderWidth: 1,
            borderColor: "#E0E0E0",
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
            placeholderTextColor="#6A707C"
            // secureTextEntry={!isPasswordVisible}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            autoCapitalize="none"
            autoCorrect={false}
          secureTextEntry={true}

          />
         
      

       

        <TouchableOpacity
        onPress={() => registrationUser(username, email, password, confirmPassword)}
          style={{
            position: "relative",
           marginTop:"7%",
            borderRadius: 8,
            backgroundColor: '#0F2944',
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



        <TouchableOpacity
    // onPress={SigninWith}
          style={{
            position: "relative",
            borderRadius: 5,
            backgroundColor: '#0F2944',
            width: "60%",
            height:33,
            height: screenHeight*0.04,
            alignSelf: "center",
            marginTop:"6%",
            justifyContent: "center",
            flexDirection:"row"
          }}>

          <Image
          style={{
            height:screenHeight*0.03,
            width:screenWidth*0.05,
            resizeMode:"contain",
            alignSelf:"center",
            marginRight:10,

          }}
           source={require('../../assets/Google.webp')}/>
          <Text style={{
            fontSize: RFValue(13),
            fontFamily:"Urbanist_600SemiBold",
            // lineHeight: 18,
            alignSelf: "center",
            color: '#F9F9F9',
          }}
          >Sign up with Google </Text>
        </TouchableOpacity>
      
       
         
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
            color: "#6A707C",
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
             color: "#FE9003",
             fontSize:  RFValue(12),
             fontFamily:"Urbanist_700Bold",
             }}>
           Login Now
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
                  >Add Valid Information for Register !</Text>
        
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
