import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';




import Home from './Tabs/Home'
import MyAds from './Tabs/MyAds'
import Middle from './Tabs/Middle'
import Chat from './Tabs/Chat'
import Profile from './Tabs/Profile'
import { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";






//ChatStack
import Chating from './Chat Stack/Chating';


//Add Post
// import AddPost1 from './Add Post/AddPost1';
import ItemDetail from './ItemDetail';










const ChatStack = createStackNavigator();
function ChatPageStackScreen() {
  return (
    <ChatStack.Navigator independent={true} initialRouteName='' >
      <ChatStack.Screen options={{ headerShown: false }} name='Chatt' component={Chat} />
      <ChatStack.Screen options={{ headerShown: false }} name='Chating' component={Chating} />

    </ChatStack.Navigator>
  )
}




const Tab = createBottomTabNavigator();

export default function TabScreens() {

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const TabBarHeight = screenHeight * 0.08;

  const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View style={{
        width: screenWidth * 0.153,
        height: screenHeight * 0.073,
        borderRadius: (screenWidth, screenHeight) * 0.16,
        backgroundColor: "#7689D6",
        borderColor: "#ddd",
        borderWidth: (screenWidth, screenHeight) * 0.0025,
        shadowOpacity: 0.3,
        shadowRadius: 3,
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
    >
      <Tab.Screen name="Home" component={Home}
        options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top:screenHeight*0.013 }}>
              <Image source={require("../assets/HomeIcon.png")}
                resizeMode="contain"
                style={{
                  width: screenWidth * 0.2,
                  height: screenHeight * 0.03,
                  tintColor: focused ? "#7689D6" : "#748c94",
                }}
              />
              <Text style={{ color: focused ? "#7689D6" : "#748c94", fontSize:RFValue(10),  }}>
                Home
              </Text>
            </View>
          )
        }}
      />


      <Tab.Screen name="MyAds" component={MyAds}
        options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center",  top:screenHeight*0.013 }}>
              <Image source={require("../assets/AdsIcon.png")}
                resizeMode="contain"
                style={{
                  width: screenWidth * 0.2,
                  height: screenHeight * 0.03,
                  tintColor: focused ? "#7689D6" : "#748c94",
                }}
              />
              <Text style={{ color: focused ? "#7689D6" : "#748c94", fontSize:RFValue(10), }}>
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
              <Image
                source={require("../assets/PlusIcon.png")}
                resizeMode="contain"
                style={{
                  height: 22,
                  width: 22,
                  width: screenWidth * 0.2,
                  height: screenHeight * 0.031,
                 top:screenHeight*0.0077

                }}
              />
            </View>

          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          )
        }}
      />

      <Tab.Screen name="Chat" component={ChatPageStackScreen}

        options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top:screenHeight*0.013 }}>
              <Image source={require("../assets/ChatIcon.png")}
                resizeMode="contain"
                style={{
                  width: screenWidth * 0.2,
                  height: screenHeight * 0.03,
                  tintColor: focused ? "#7689D6" : "#748c94",
                }}
              />
              <Text style={{ color: focused ? "#7689D6" : "#748c94", fontSize:RFValue(10),}}>
                Chat
              </Text>
            </View>
          )
        }}
      />


      <Tab.Screen name="Profile" component={Profile}
        options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center",top:screenHeight*0.013 }}>
              <Image source={require("../assets/ProfileIcon.png")}
                resizeMode="contain"
                style={{
                  width: screenWidth * 0.2,
                  height: screenHeight * 0.03,
                  tintColor: focused ? "#7689D6" : "#748c94",
                }}
              />
              <Text style={{ color: focused ? "#7689D6" : "#748c94", fontSize:RFValue(10),}}>
                Profile
              </Text>
            </View>
          )
        }}
      />

    </Tab.Navigator>

  );
}




