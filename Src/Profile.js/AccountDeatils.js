import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions,ActivityIndicator,TouchableWithoutFeedback,TextInput } from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config';
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Entypo, Ionicons ,FontAwesome} from '@expo/vector-icons';





export default function AccountDeatils({ route }) {
const { selectedImage,profilname } = route.params;
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [userData, setUserData] = useState(null);
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  const [modalVisible, setmodalVisible] = useState(false);



const [userName, setUserName]=useState('')
const [email, setEmail]=useState('')

  // Fetch the user's own data from Firestore when the component mounts

  useEffect(() => {
    // Ensure the user is authenticated (you may want to add additional checks)
    if (firebase.auth().currentUser) {
      const userId = firebase.auth().currentUser.uid;
  
      // Fetch user data from Firestore
      firebase
        .firestore()
        .collection('UserData')
        .doc(userId)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            const userData = snapshot.data();
            // Update email state directly
            setEmail(userData.email || ''); // Update with default value if null or undefined
            // Update userName state directly
            setUserName(userData.username || ''); // Update with default value if null or undefined
          } else {
            console.log('User data not found in Firestore.');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);
  



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
        flexDirection: "row",
        marginTop:"1%",
         position: "relative",
          alignItems: "center",
         justifyContent: "space-between" ,
        paddingBottom: "2.15%",
        borderBottomWidth: RFValue(3),
        borderBottomColor: 'rgba(0, 0, 0, 0.1)', 
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
        <Image style={{
          width: 10,
          height: 16,
          width: screenWidth * 0.0285,
          height: screenHeight * 0.021,
          resizeMode: "contain",
          tintColor: "#6A707C",
          // backgroundColor:"red",
          // marginLeft: screenWidth*0.73,
          // position:"absolute",
          // marginTop:screenHeight*-0.023


        }}
          source={require("../../assets/back.png")} />

      </TouchableOpacity>


      <Text
      style={{
        fontSize: RFValue(20),
        fontFamily: "Urbanist_600SemiBold",
        color: "#0F2944"
        // marginLeft: "30%",


      }}
    >
    Account Detail
    </Text>

     
    <TouchableOpacity
    style={{
      marginRight: "4%",
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
    onPress={() => setmodalVisible(true)}
    >

    <Image
              style={{
                width: 19,
                height: 20,
                width: screenWidth * 0.053,
                height: screenHeight * 0.027,
                alignSelf: "center",
                marginRight: "3%",
                resizeMode: "contain",
                //  backgroundColor:"red"
              }}

              source={require('../../assets/Homeicon.png')} />
  </TouchableOpacity>




    </View>


    

    

       
      



      <TextInput style={{
        // backgroundColor: "#F7F8F9",
        borderWidth: 1,
        borderWidth: (screenWidth, screenHeight) * 0.0013,

        borderColor: "#E0E0E0",
        // width: 335,
        width: "91%",
        height: screenHeight*0.06,
        alignSelf: "center",
        borderRadius: 8,
        fontSize:  RFValue(12),
        fontFamily:"Urbanist_500Medium",
        // lineHeight: 15,
        // position: "absolute",
        // top: 156,
        position: "relative",
        marginTop: "10%",
       
        padding: 10,
        color:"#6A707C"

      }}
        placeholder='Enter User Name'
        placeholderTextColor="#8391A1"
        value={userName}
        onChangeText={text => setUserName(text)}
        // autoCorrect={false}
      />
    
      <TextInput style={{
        // backgroundColor: "#F7F8F9",
        borderWidth: 1,
        borderWidth: (screenWidth, screenHeight) * 0.0013,

        borderColor: "#E0E0E0",
        // width: 335,
        width: "91%",
        height: screenHeight*0.06,
        alignSelf: "center",
        borderRadius: 8,
        fontSize:  RFValue(12),
        fontFamily:"Urbanist_500Medium",
        // lineHeight: 15,
        // position: "absolute",
        // top: 156,
        position: "relative",
        marginTop: 8,
        marginTop: "3%",
        padding: 10,
        color:"#6A707C"
      }}
        placeholder='Enter User Name'
        placeholderTextColor="#8391A1"
        value={email}
        onChangeText={text => setEmail(text)}
        // autoCorrect={false}
      />
    
    
    
      
    
    
    
      <TouchableOpacity
    //  onPress={handleResetPassword}
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
        > Save Changes</Text>
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
                  >Your Will Lost Your Post Data !</Text>
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
  );
}
