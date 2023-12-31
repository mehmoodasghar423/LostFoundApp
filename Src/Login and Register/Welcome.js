import { StatusBar } from 'expo-status-bar';
import { TextBase } from 'react-native';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get('window');
import React, { useEffect } from 'react';
import {
    Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";






const Welcome = () => {

    const navigation = useNavigation();

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;


    const handler = () => {
        navigation.navigate('Login');
    };
    const Guesthandler = () => {
        navigation.navigate('Guest');
    };

    const Registerhandler = () => {
        navigation.navigate('Register');
    };


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
        <SafeAreaView >


            <View style={{
                // alignItems: 'center',
                // justifyContent: 'center',

            }}>

                <Image style={{
            
                    width: screenWidth * 0.7,
                    height: screenHeight * 0.43,
                    resizeMode: "contain",
                    alignSelf: "center",
                  
                    // backgroundColor:"red"

                }}
                    source={require("../../assets/Welcome.png")} />

                <View style={{ top: "13%",}}>


                <Image style={{
                 
                    width: screenWidth * 0.3,
                
                    height: screenHeight * 0.07,
                    //   top: -80, 
                    alignSelf: "center",
                    //   position:"absolute",
                    resizeMode: "contain",
                    // backgroundColor:"yellow"

                }}
                    source={require("../../assets/losticon.png")} />


                    <TouchableOpacity
                        onPress={handler}
                        style={{
                            position: "relative",
                            marginTop: "5%",
                            // position:"absolute",top:505,
                            borderRadius: 8,
                            backgroundColor: '#0F2944',
                            // padding: 10,
                            width: 320,
                            width: screenWidth * 0.89,
                            height: 53,
                            height: screenHeight * 0.073,
                            alignSelf: "center",

                            justifyContent: "center"
                        }}><Text style={{
                            fontSize: RFValue(15),
                            // lineHeight: 18,
                            alignSelf: "center",
                            color: '#F9F9F9',
                            fontFamily: "Urbanist_600SemiBold"

                        }}
                        >Login </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={Registerhandler}
                        style={{
                            position: "relative",
                            marginTop: "2%",
                            // position:"absolute",top:572,
                            borderRadius: 8,
                            backgroundColor: 'white',
                            borderWidth: 1,
                            // padding: 10,
                            width: 320,
                            width: screenWidth * 0.89,
                            height: 53,
                            height: screenHeight * 0.073,
                            alignSelf: "center",
                            borderColor:"#0F2944",
                            // top: 235,
                            justifyContent: "center"
                        }}><Text style={{
                            fontSize: RFValue(15),
                            fontFamily: "Urbanist_600SemiBold",
                            // lineHeight: 18,
                            alignSelf: "center",
                            color: '#0F2944',

                        }}
                        >Register </Text>

                    </TouchableOpacity>

                  

                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
});
export default Welcome;