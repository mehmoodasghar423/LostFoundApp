import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';


import Welcome from './Src/Login and Register/Welcome'
import Guest from './Src/Login and Register/Guest'
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
import LPostLocation from './Src/Add Post/LPostLocation'  
import FPostLocation from './Src/Add Post/FPostLocation'  

import FilterLocation from './Src/HomeStack/FilterLocation';

import Filters from './Src/HomeStack/Filters';
import Notifications from './Src/HomeStack/Notifications';
import Map from './Src/HomeStack/Map';
import ItemDetail from './Src/ItemDetail'

import OutPutCheck from './Src/OutPutCheck';
import DetailsScreen from './Src/DetailsScreen';
import RecordEditing from './Src/RecordEditing';

import ChatScreen from './Src/ChatScreen';

import MyAds from './Src/Tabs/MyAds'


import AccountDeatils from './Src/Profile.js/AccountDeatils';
import Settings from './Src/Profile.js/Settings';
import Contact from './Src/Profile.js/Contact';


import LostPostEdit from './Src/PostEditing/LostPostEdit';
import LostPostNextEdit from './Src/PostEditing/LostPostNextEdit';
import FoundPostEdit from './Src/PostEditing/FoundPostEdit';
import FoundPostNextEdit from './Src/PostEditing/FoundPostNextEdit';


import FoundPELocation from './Src/PostEditing/FoundPELocation';
import { firebase } from './config';
import Location from './Src/HomeStack/Location';
import TopLocation from './Src/HomeStack/TopLocation';
import LostPELocation from './Src/PostEditing/LostPELocation.js';




const Stack = createStackNavigator();
const App = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
  }

  useEffect(() => {
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
  }, []);

  if (initializing) {
      return null;
  }

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Welcome'>
    {user ? (
      //  if a user is logged in
      <>
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Middlee" component={Middle}  options={{headerShown:false}} />
        <Stack.Screen name="LostPost" component={LostPost}  options={{headerShown:false}} /> 
        <Stack.Screen name="LostPostNext" component={LostPostNext}  options={{headerShown:false}} />  
        <Stack.Screen name="OutPutCheck" component={OutPutCheck}  options={{headerShown:false}} />  
        <Stack.Screen name="FoundPost" component={FoundPost}  options={{headerShown:false}} /> 
        <Stack.Screen name="FoundPostNext" component={FoundPostNext}  options={{headerShown:false}} /> 
        <Stack.Screen name="LPostLocation" component={LPostLocation}  options={{headerShown:false}} /> 
        <Stack.Screen name="FPostLocation" component={FPostLocation}  options={{headerShown:false}} /> 
        <Stack.Screen name="MyAds" component={MyAds}  options={{headerShown:false}} />
        <Stack.Screen name="LostPostEdit" component={LostPostEdit}  options={{headerShown:false}} />
        <Stack.Screen name="LostPELocation" component={LostPELocation}  options={{headerShown:false}} />
        <Stack.Screen name="LostPostNextEdit" component={LostPostNextEdit}  options={{headerShown:false}} />
        <Stack.Screen name="FoundPostEdit" component={FoundPostEdit}  options={{headerShown:false}} />
        <Stack.Screen name="FoundPostNextEdit" component={FoundPostNextEdit}  options={{headerShown:false}} />
        <Stack.Screen name="FoundPELocation" component={FoundPELocation}  options={{headerShown:false}} />
        <Stack.Screen name='Filters' component={Filters} options={{headerShown:false}}/>
        <Stack.Screen name='FilterLocation' component={FilterLocation} options={{headerShown:false}}/>
        <Stack.Screen name='Location' component={Location} options={{headerShown:false}}/>
        <Stack.Screen name='TopLocation' component={TopLocation} options={{headerShown:false}}/>
        <Stack.Screen name='Notifications' component={Notifications} options={{headerShown:false}} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen}  options={{headerShown:false}} />  
        <Stack.Screen name="ChatScreen" component={ChatScreen}  options={{headerShown:false}} />  
        <Stack.Screen name='ItemDetail' component={ItemDetail} options={{headerShown:false}}/>
        <Stack.Screen name='AccountDeatils' component={AccountDeatils} options={{headerShown:false}}/>
        <Stack.Screen name='Settings' component={Settings} options={{headerShown:false}}/>
        <Stack.Screen name='Contact' component={Contact} options={{headerShown:false}}/>
        <Stack.Screen name='Map' component={Map} options={{headerShown:false}}/>
      </>
    ) : (
      //  when user not logged in
      <>
      <Stack.Screen name="Welcome" component={Welcome}  options={{headerShown:false}} />
      <Stack.Screen name="Guest" component={Guest}  options={{headerShown:false}} />
      <Stack.Screen name="Login" component={Login}  options={{headerShown:false}} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword}  options={{headerShown:false}} />
      <Stack.Screen name="Register" component={Register}  options={{headerShown:false}} />
      <Stack.Screen name="OtpVerification" component={OtpVerification}  options={{headerShown:false}} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword}  options={{headerShown:false}} />
      <Stack.Screen name="PasswordChanged" component={PasswordChanged}  options={{headerShown:false}} />
      </>
    )}
    </Stack.Navigator>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({})
export default App;








