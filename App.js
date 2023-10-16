import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Welcome from './Src/Login and Register/Welcome'
import Login from './Src/Login and Register/Login'
import Register from './Src/Login and Register/Register'
import ForgotPassword from './Src/Login and Register/ForgotPassword'
import OtpVerification from './Src/Login and Register/OtpVerification'
import CreateNewPassword from './Src/Login and Register/CreateNewPassword'
import PasswordChanged from './Src/Login and Register/PasswordChanged'

import Middle from './Src/Tabs/Middle'
import TabNavigator from './Src/TabNavigator'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import LostPost from './Src/Add Post/LostPost'
import LostPostNext from './Src/Add Post/LostPostNext'
import FoundPost from './Src/Add Post/FoundPost'
import FoundPostNext from './Src/Add Post/FoundPostNext'


import Filters from './Src/HomeStack/Filters';
import Notifications from './Src/HomeStack/Notifications';
import Map from './Src/HomeStack/Map';
import ItemDetail from './Src/ItemDetail'


import MyAds from './Src/Tabs/MyAds'


const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Welcome'>
    <Stack.Screen name="Welcome" component={Welcome}  options={{headerShown:false}} />
    <Stack.Screen name="Login" component={Login}  options={{headerShown:false}} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword}  options={{headerShown:false}} />
    <Stack.Screen name="Register" component={Register}  options={{headerShown:false}} />
    <Stack.Screen name="OtpVerification" component={OtpVerification}  options={{headerShown:false}} />
    <Stack.Screen name="CreateNewPassword" component={CreateNewPassword}  options={{headerShown:false}} />
    <Stack.Screen name="PasswordChanged" component={PasswordChanged}  options={{headerShown:false}} />
    <Stack.Screen name="TabNavigator" component={TabNavigator}  options={{headerShown:false}} />
    <Stack.Screen name="Middlee" component={Middle}  options={{headerShown:false}} />
    <Stack.Screen name="LostPost" component={LostPost}  options={{headerShown:false}} /> 
    <Stack.Screen name="LostPostNext" component={LostPostNext}  options={{headerShown:false}} /> 
    <Stack.Screen name="FoundPost" component={FoundPost}  options={{headerShown:false}} /> 
    <Stack.Screen name="FoundPostNext" component={FoundPostNext}  options={{headerShown:false}} /> 
    <Stack.Screen name="MyAds" component={MyAds}  options={{headerShown:false}} />
    <Stack.Screen name='Filters' component={Filters} options={{headerShown:false}}/>
    <Stack.Screen name='Notifications' component={Notifications} options={{headerShown:false}} />
    <Stack.Screen name='ItemDetail' component={ItemDetail} options={{headerShown:false}}/>
    <Stack.Screen name='Map' component={Map} options={{headerShown:false}}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({})
export default App;



