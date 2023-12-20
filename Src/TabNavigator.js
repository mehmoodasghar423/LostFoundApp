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
import { useFonts } from '@expo-google-fonts/urbanist';
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
        backgroundColor: "#0F2944",
        // backgroundColor: "red",
        borderColor: "#ddd",
        borderWidth: (screenWidth, screenHeight) * 0.0025,
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

              <Ionicons
                name="home-outline"
                size={screenWidth * 0.065} // Adjust the size to match the image
                color={focused ? "#0F2944" : "#748c94"} // Use the focused state to set the color
              />
              <Text style={{ color: focused ? "#0F2944" : "#748c94", fontSize: RFValue(10), fontFamily: "Urbanist_600SemiBold" }}>
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
              <Ionicons name="ios-megaphone-outline"
                size={screenWidth * 0.065} // Adjust the size to match the image
                color={focused ? "#0F2944" : "#748c94"} // Use the focused state to set the color
              />

              <Text style={{ color: focused ? "#0F2944" : "#748c94", fontSize: RFValue(10), fontFamily: "Urbanist_600SemiBold" }}>
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
              <Ionicons name="chatbubble-ellipses-outline"
                size={screenWidth * 0.065} // Adjust the size to match the image
                color={focused ? "#0F2944" : "#748c94"} // Use the focused state to set the color
              />
              <Text style={{ color: focused ? "#0F2944" : "#748c94", fontSize: RFValue(10), fontFamily: "Urbanist_600SemiBold" }}>
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
              <AntDesign name="user"
                size={screenWidth * 0.065} // Adjust the size to match the image
                color={focused ? "#0F2944" : "#748c94"} // Use the focused state to set the color
              />
              <Text style={{ color: focused ? "#0F2944" : "#748c94", fontSize: RFValue(10), fontFamily: "Urbanist_600SemiBold" }}>
                Profile
              </Text>
            </View>
          )
        }}
      />

    </Tab.Navigator>

  );
}




