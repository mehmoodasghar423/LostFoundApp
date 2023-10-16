// import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useState } from 'react';
import {
  Urbanist_300Light,Urbanist_400Regular,Urbanist_500Medium,Urbanist_600SemiBold,Urbanist_700Bold, 
} from  '@expo-google-fonts/urbanist';
import { useFonts } from  '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';


const App = () => {
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
    <View>
      <Text style={{alignSelf:"center",marginTop:100,color:"black",fontSize:20,fontFamily:"Urbanist_100Thin_Italic",}}>Mehmood Ahmad from Ali Rose</Text>
      <Text style={{alignSelf:"center",fontSize:20,fontFamily:"Urbanist_600SemiBold",}}>Lost<Text style={{fontFamily:"Urbanist_400Regular"}}>&</Text>Found</Text>
    </View>
  )
}


const styles = StyleSheet.create({

 
})
export default App;