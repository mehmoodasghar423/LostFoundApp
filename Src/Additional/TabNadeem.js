import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Home from './Home';
import MyAds from './MyAds';
import Chat from './Chat';
import Profile from './Profile';
import AddPost from './AddPost';

const Tab = createBottomTabNavigator();
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
      width: 55,
      height: 55,
      borderRadius: 27,
      backgroundColor: "#7689D6",
      borderColor:"#ddd",
     borderWidth:2,
      shadowOpacity:0.3,
      shadowRadius:3,
      shadowOffset:{
        height:3,
        width:3
      }
    }}>
      {children}
    </View>

  </TouchableOpacity>
)
export default function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIcon: () => null,
        tabBarLabel: '',
        style: {
          position: "absolute",
          evelation: 3,
          borderRadius: 25,
          height: 70,
          left: 5,
          right: 5
        }
      }}
    >
      <Tab.Screen name="Home" component={Home}
        options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
              <Image source={require("../assets/Home.png")}
                resizeMode="contain"
                style={{
                  height: 22,
                  width: 22,
                  tintColor: focused ? "#7689D6" : "#748c94",
                }}
              />
              <Text style={{ color: focused ? "#7689D6" : "#748c94", fontSize: 10 }}>
                Home
              </Text>
            </View>
          )
        }}
      />
      <Tab.Screen name="MyAds" component={MyAds}
        options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
              <Image source={require("../assets/AdsIcon.png")}
                resizeMode="contain"
                style={{
                  height: 22,
                  width: 22,
                  tintColor: focused ? "#7689D6" : "#748c94",
                }}
              />
              <Text style={{ color: focused ? "#7689D6" : "#748c94", fontSize: 10 }}>
                My Ads
              </Text>
            </View>
          )
        }}
      />
      <Tab.Screen name='addpost' component={AddPost}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/PlusButton.png")}
                resizeMode="contain"
                style={{
                  height: 22,
                  width: 22,
                  top:7
                }}
              />
            </View>

          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          )
        }}
      />
      <Tab.Screen name="Chat" component={Chat}
        options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
              <Image source={require("../assets/Chat.png")}
                resizeMode="contain"
                style={{
                  height: 22,
                  width: 22,
                  tintColor: focused ? "#7689D6" : "#748c94",
                }}
              />
              <Text style={{ color: focused ? "#7689D6" : "#748c94", fontSize: 10 }}>
                Chat
              </Text>
            </View>
          )
        }}
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
              <Image source={require("../assets/Profile.png")}
                resizeMode="contain"
                style={{
                  height: 22,
                  width: 22,
                  tintColor: focused ? "#7689D6" : "#748c94",
                }}
              />
              <Text style={{ color: focused ? "#7689D6" : "#748c94", fontSize: 10 }}>
                Profile
              </Text>
            </View>
          )
        }}
      />

    </Tab.Navigator>
  );
}


export const styles = StyleSheet.create({

});