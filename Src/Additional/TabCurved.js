import {
    Alert,
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,Dimensions
  } from 'react-native';
  import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import { NavigationContainer } from '@react-navigation/native';
  import Home from './Tabs/Home'
  import MyAds from './Tabs/MyAds'
  import Middle from './Tabs/Middle'
  import Chat from './Tabs/Chat'
  import Profile from './Tabs/Profile'
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { useNavigation } from '@react-navigation/native';
  import React, { useEffect,useState } from 'react';
  import {
    Urbanist_300Light,Urbanist_400Regular,Urbanist_500Medium,Urbanist_600SemiBold,Urbanist_700Bold, 
  } from  '@expo-google-fonts/urbanist';
  import { useFonts } from  '@expo-google-fonts/urbanist';
  import * as SplashScreen from 'expo-splash-screen';
  import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
  
  
  
  
  
  //HomeStack
  import Filters from './HomeStack/Filters';
  import Notifications from './HomeStack/Notifications';
  import Map from './HomeStack/Map';
  
  //ChatStack
  import Chating from './Chat Stack/Chating';
  
  
  import ItemDetails from './HomeTabCategory/ItemsStack/ItemDetails';
  //Add Post
  // import AddPost1 from './Add Post/AddPost1';
  import ItemDetail from './ItemDetail';
  
  
  
  
  
  
  
  
  const HomeStack = createNativeStackNavigator();
  function HomePageStackScreen (){
    return(
      <HomeStack.Navigator independent={true} initialRouteName='Homee' >
      <HomeStack.Screen options={{headerShown:false}} name='Homee' component={Home} />
      <HomeStack.Screen options={{headerShown:false}} name='Filters' component={Filters} />
      <HomeStack.Screen options={{headerShown:false}} name='Notifications' component={Notifications} />
      <HomeStack.Screen options={{headerShown:false}} name='ItemDetail' component={ItemDetail} />
      <HomeStack.Screen options={{headerShown:false}} name='Map' component={Map} />
     
      </HomeStack.Navigator>
    )
  }
  
  
  const ChatStack = createNativeStackNavigator();
  function ChatPageStackScreen (){
    return(
      <ChatStack.Navigator independent={true} initialRouteName='' >
      <ChatStack.Screen options={{headerShown:false}} name='Chatt' component={Chat} />
      <ChatStack.Screen options={{headerShown:false}} name='Chating' component={Chating} />
     
      </ChatStack.Navigator>
    )
  }
  
  export default function TabNavigator() {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const IconSize = Math.min(screenWidth, screenHeight) * 0.07;
    const MiddleIconSize = Math.min(screenWidth, screenHeight) * 0.09;
    const TabBarHeight = screenHeight * 0.1;
    const UpBtnBorderRadius = Math.min(screenWidth, screenHeight) * 0.3; 
  
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
    const navigation = useNavigation();
    
    const _renderIcon = (routeName, selectedTab) => {
      let icon = '';
  
      switch (routeName) {
        case 'Home':
          icon = 'ios-home-outline';
          break;
        case 'MyAds':
          icon = 'megaphone-outline';
          break;
        case 'Chat':
          icon = 'chatbubble-ellipses-outline';
          break;
        case 'Profile':
          icon = 'person-outline';
          break;
      }
  
      return (
        <Ionicons
          name={icon}
          size={IconSize}
          color={routeName === selectedTab ? '#7689D6' : 'gray'}
        />
      );
    };
  
    const renderTabBar = ({ routeName, selectedTab, navigate }) => {
      return (
        <TouchableOpacity
          onPress={() => navigate(routeName)}
          style={styles.tabbarItem}
        >
        <View>
        {_renderIcon(routeName, selectedTab)}
        <Text style={[styles.tabLabel, { color: routeName === selectedTab ? '#7689D6' : '#BDBDBD' }]}>
          {routeName}
        </Text>
      </View>
        </TouchableOpacity>
      );
    };
  
    return (
      <NavigationContainer independent={true}>
        <CurvedBottomBarExpo.Navigator
          type="DOWN"
          circlePosition='CENTER'
          style={styles.bottomBar}
          shadowStyle={styles.shawdow}
          height={TabBarHeight}
          // circleWidth={50}
          bgColor="white"
          initialRouteName="Home"
          borderTopLeftRight
          screenOptions={{headerShown:false}}
          renderCircle={({ selectedTab, navigate }) => (
            <Animated.View style={{
              width: 60,
              width: "16.5%",
              height: screenHeight*0.08,
              borderRadius: UpBtnBorderRadius,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#7689D6',
              bottom: "6%",
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,}
            }}>
              <TouchableOpacity
                style={styles.button}
                onPress={()=>navigation.navigate('Middle')}
  
              >
                <Ionicons name={'add-circle'} color="white" size={MiddleIconSize} />
              
              </TouchableOpacity>
            </Animated.View>
          )}
          tabBar={renderTabBar}
        >
          <CurvedBottomBarExpo.Screen
            name="Home"
            position="LEFT"
            component={() => <HomePageStackScreen/> 
          }
          />
          <CurvedBottomBarExpo.Screen
            name="MyAds"
            position="LEFT"
            component={() => <MyAds/>}
          />
          <CurvedBottomBarExpo.Screen
            name="Chat"
            component={() => <ChatPageStackScreen/>}
            position="RIGHT"
          />
          <CurvedBottomBarExpo.Screen
            name="Profile"
            component={() => <Profile />}
            position="RIGHT"
          />
        </CurvedBottomBarExpo.Navigator>
      </NavigationContainer>
    );
  }
  
  export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    shawdow: {
      shadowColor: '#00000040',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
    },
    bottomBar: {
      // backgroundColor:"red"
    },
    btnCircleUp: {
    
  
    },
    imgCircle: {
      width: 30,
      height: 30,
      tintColor: 'gray',
    },
    tabbarItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    img: {
      width: 30,
      height: 30,
    },
   
    tabLabel:{
      fontSize:RFValue(10),
      alignSelf:"center",
      // lineHeight:10.63,
      fontFamily:"Urbanist_600SemiBold",
      marginTop:2
    }
  });
  
  
  
  
  
  
  
  
  
  
  
  
  