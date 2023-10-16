import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image,Dimensions,TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect,useState } from 'react';
import {
  Urbanist_300Light,Urbanist_400Regular,Urbanist_500Medium,Urbanist_600SemiBold,Urbanist_700Bold, 
} from  '@expo-google-fonts/urbanist';
import { useFonts } from  '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";




const ChatArray =[
  {
    image: require("../../assets/LostApp/ChatProfile.png"),
    name: 'Theresa ',
  lastMessage:'Okay, i’ll work on it when it’s...',
    time: '6:21',
    UnreadMessages:'4'
  },
  {
    image: require("../../assets/LostApp/ChatProfile.png"),
    name: 'Theresa ',
  lastMessage:'Okay, i’ll work on it when it’s...',
    time: '6:21',
    UnreadMessages:'4'
  },
  {
    image: require("../../assets/LostApp/ChatProfile.png"),
    name: 'Theresa ',
  lastMessage:'Okay, i’ll work on it when it’s...',
    time: '6:21',
    UnreadMessages:'4'
  },
  {
    image: require("../../assets/LostApp/ChatProfile.png"),
    name: 'Theresa ',
  lastMessage:'Okay, i’ll work on it when it’s...',
    time: '6:21',
    UnreadMessages:'4'
  },
  {
    image: require("../../assets/LostApp/ChatProfile.png"),
    name: 'Theresa ',
  lastMessage:'Okay, i’ll work on it when it’s...',
    time: '6:21',
    UnreadMessages:'4'
  },
  {
    image: require("../../assets/LostApp/ChatProfile.png"),
    name: 'Theresa ',
  lastMessage:'Okay, i’ll work on it when it’s...',
    time: '6:21',
    UnreadMessages:'4'
  },
]





const Chat = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

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
      <View >

      
        <View style={styles.container}>
          <Text
            style={{
              fontSize: RFValue(20),
              fontFamily:"Urbanist_600SemiBold",
              // lineHeight: 20,
              // left: "6%",
              letterSpacing: -1,
              position: "relative",
              // top: 19,
              marginTop:"3.5%",
              color: "#1E232C",
              // width: 210,
              alignSelf: "center",
         
            }}
          >
            Messages
          </Text>
          
          </View>


          <View style={{
          position:"relative",
        marginTop:"3%"
          }}>
          <TextInput style={{
            backgroundColor: "#EDEEEF",
            borderWidth: 1,
            borderColor: "#EDEEEF",
            width: "91%",
            // width:279,
            height: 38,
            height: screenHeight*0.052,
            borderRadius: 8,
            fontSize: RFValue(12),
            fontFamily:"Urbanist_500Medium",
    
            paddingLeft:screenWidth*0.1,
            letterSpacing: 0.1,
            color: "#8C9199",
            // marginLeft: "6%"
            alignSelf:"center"
          }}
            placeholder='Search ' />
          <Ionicons
            name="search"
            size={RFValue(17)}
            color="#888888"

            style={{
              position: "absolute",
              left: "8%",
              // top: 72
              alignSelf:"center",
              marginTop:10

            }}
          />
        </View>




        <View style={{ justifyContent:"center",alignItems:"center" }}>

        {ChatArray.map((item, index) => (
          <TouchableOpacity>
          <View style={{
            position: "relative",
            // top:70,
            // width: 320,
            // width: "89%",
            width:screenWidth*0.96,
            // height: 48,
            // height: screenHeight*0.067,
            // height: boxHeight,
          
            marginTop: "4%",
          // marginLeft:"4.5%"
          // borderWidth:1
            
              
            }}
              key={index} >
    
              <Image
                style={{
                  // width: 48,
                  // height: 48,
                  height: screenHeight*0.076,
                  width:  screenWidth*0.137,
                
               resizeMode:"contain"


    
                }}
                source={item.image} />
    
    
              <Text
                style={{
                  fontFamily:"Urbanist_500Medium",
                  // fontFamily: 'Montserrat_500Medium',
                  fontSize: RFValue(15),
                  // lineHeight: 18,
                  position: "absolute",
                  // left: 77,
                  marginLeft:"16%",
                  marginTop:"1.6%",
                  color: "black",
                }}
              >{item.name}</Text>
    
  
    
              <Text
                style={{
                  fontFamily:"Urbanist_400Regular",
                  // fontFamily: 'Montserrat_500Medium',
                  fontSize: RFValue(13),
                  // lineHeight: 19.5,
                  position: "absolute",
                  marginLeft:"17%",
                  marginTop:"7.5%",
                  color: "#8391A1",
                  
                }}
              >{item.lastMessage}</Text>
    
              
    
              
              <Text
                style={{
                 fontFamily:"Urbanist_600SemiBold",
                  fontSize: RFValue(12),
                  position: "absolute",
                  right: 1,
                  marginTop:"1.6%",
                  color: "#8391A1",
                  marginRight:"1.5%"
                }}
              >{item.time}</Text>
    
<TouchableOpacity style={{
  position:"absolute",
  backgroundColor:"#7689D6",
  width:20,
  height:20,
  width:screenWidth*0.055,
  height:screenHeight*0.028,
  borderRadius:100,
  alignItems:"center",
  justifyContent:"center",
  right:12,
  bottom:12
}}>

              <Text
                style={{
                  fontFamily:"Urbanist_600SemiBold",
                  fontSize: RFValue(10),
                  color:"white"
                
                }}
              >{item.UnreadMessages}</Text>
    
              </TouchableOpacity>
            </View>
            </TouchableOpacity>
          ))}
        </View>
    



      </View>
    </SafeAreaView>
  )
}

export default Chat;

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
});
