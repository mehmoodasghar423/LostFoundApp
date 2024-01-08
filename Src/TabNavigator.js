import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, Feather, Octicons, FontAwesome5, AntDesign,MaterialIcons} from '@expo/vector-icons';



import Home from './Tabs/Home'
import MyAds from './Tabs/MyAds'
import Middle from './Tabs/Middle'
import ChatList from './Tabs/ChatList'
import Profile from './Tabs/Profile'
import { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import {
  useFonts,
  Raleway_100Thin,Raleway_200ExtraLight,Raleway_300Light,Raleway_400Regular, Raleway_500Medium,Raleway_600SemiBold,Raleway_700Bold,Raleway_800ExtraBold,Raleway_900Black,
} from '@expo-google-fonts/raleway';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";






const Tab = createBottomTabNavigator();

export default function TabScreens() {

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const TabBarHeight = screenHeight * 0.08;

  const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
      style={{
        // top: -30,
        top:screenHeight*-0.035,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View style={{
        width: screenWidth * 0.153,
        height: screenHeight * 0.073,
        borderRadius: (screenWidth, screenHeight) * 0.16,
        // backgroundColor: "#0F2944",
        // backgroundColor: "red",
        borderColor: "#ddd",
        // borderWidth: (screenWidth, screenHeight) * 0.0025,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: {
          height: 3,
          width: 3
        }
      }}>
        {children}
      </View>

    </TouchableOpacity>
  )


  let [fontsLoaded] = useFonts({
    Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
  Raleway_100Thin,Raleway_200ExtraLight,Raleway_300Light,Raleway_400Regular, Raleway_500Medium,Raleway_600SemiBold,Raleway_700Bold,Raleway_800ExtraBold,Raleway_900Black,

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

    <Tab.Navigator
      screenOptions={{
        tabBarIcon: () => null,
        tabBarLabel: '',
        tabBarStyle: { height: TabBarHeight },
      }}
      initialRouteName='Home'
    >
      <Tab.Screen name="Home" component={Home}
        options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center",
             justifyContent: "center",
              top: screenHeight * 0.013,
            width:screenWidth*0.14,
            // backgroundColor:"red"
           }}>


           <Image
           style={{
             width: 19,
             height: 20,
             width: screenWidth * 0.0525,
            height: screenHeight * 0.0266,
            resizeMode:"contain",
             alignSelf: "center",
            //  backgroundColor: "red",
             tintColor: focused ? "#0F2944" : "#748c94"
             // marginTop:"14%"
           }}

           source={require('../assets/Homeicon.png')} />
             
              <Text style={{ color: focused ? "#0F2944" : "#748c94", fontSize: RFValue(10), fontFamily: "Raleway_500Medium" }}>
                Home
              </Text>
            </View>
          )
        }}
      />


      <Tab.Screen name="MyAds" component={MyAds}
        options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center",
            justifyContent: "center",
             top: screenHeight * 0.013,
           width:screenWidth*0.14,
          //  backgroundColor:"red"
          }}>
          <Image
          style={{
            width: screenWidth * 0.05,
            height: screenHeight * 0.035,
            width: 22,
            height: 20,
            width: screenWidth * 0.06,
            height: screenHeight * 0.0266,
            resizeMode:"contain",
            alignSelf: "center",
            // backgroundColor: "red",
            tintColor: focused ? "#0F2944" : "#748c94"
            // marginTop:"14%"
          }}

          source={require('../assets/Adds.png')} />

              <Text style={{ color: focused ? "#0F2944" : "#748c94", fontSize: RFValue(10), fontFamily: "Raleway_500Medium" }}>
                My Ads
              </Text>
            </View>
          )
        }}
      />


      <Tab.Screen name="Middle" component={Middle}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>

       

              <View style={{backgroundColor:"white",   
                    width: screenWidth * 0.07,
                    height: screenHeight * 0.032,
                 top: screenHeight * 0.01,
                 borderRadius: (screenWidth, screenHeight) * 0.01,
                 alignSelf:"center",
                 justifyContent: "center",
                 alignItems: "center",
                }}>
        

                <Image style={{
            
                  width: 52.5,
                  width: screenWidth * 0.1455,
                  // height: 52.5,
                  height: screenHeight * 0.08,
                  resizeMode: "contain",
                  alignSelf: "center",
                
                  // backgroundColor:"yellow"

              }}
                  source={require("../assets/midlle2.png")} />
            
              </View>
            </View>

          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          )
        }}
      />

      <Tab.Screen name="Chat" component={ChatList}

        options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center",
            justifyContent: "center",
             top: screenHeight * 0.013,
           width:screenWidth*0.14,
          //  backgroundColor:"red"
          }}>
          <Image
          style={{
            width: screenWidth * 0.05,
            height: screenHeight * 0.035,
            width: 22,
            height:22,
            width: screenWidth * 0.06,
            height: screenHeight * 0.0295,
            resizeMode:"contain",

            alignSelf: "center",
            // backgroundColor: "red",
            tintColor: focused ? "#0F2944" : "#748c94"
            // marginTop:"14%"
          }}

          source={require('../assets/chatIcon.png')} />
              <Text style={{ color: focused ? "#0F2944" : "#748c94", fontSize: RFValue(10), fontFamily: "Raleway_500Medium" }}>
                Chat
              </Text>
            </View>
          )
        }}
      />


      <Tab.Screen name="Profile" component={Profile}
        options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center",
            justifyContent: "center",
             top: screenHeight * 0.013,
           width:screenWidth*0.14,
          //  backgroundColor:"red"
          }}>
          <Image
          style={{
            width: screenWidth * 0.05,
            height: screenHeight * 0.035,
            width: 24,
            height: 24,
            width: screenWidth * 0.0665,
            height: screenHeight * 0.032,
            resizeMode:"contain",

            alignSelf: "center",
            // backgroundColor: "red",
            tintColor: focused ? "#0F2944" : "#748c94"
            // marginTop:"14%"
          }}

          source={require('../assets/Profile.png')} />
              <Text style={{ color: focused ? "#0F2944" : "#748c94", fontSize: RFValue(10), fontFamily: "Raleway_500Medium" }}>
                Profile
              </Text>
            </View>
          )
        }}
      />

    </Tab.Navigator>

  );
}




