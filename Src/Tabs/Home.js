import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Dimensions, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import Electronics from '../HomeTabCategory/Electronics';
import Jewelry from '../HomeTabCategory/Jewelry';
import Wallet from '../HomeTabCategory/Wallet';
import Glasses from '../HomeTabCategory/Glasses';
import Bag from '../HomeTabCategory/Bag';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { Picker } from '@react-native-picker/picker';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";



const Home = () => {
  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = (screenWidth * 0.25);
  const screenHeight = Dimensions.get('window').height;

  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('Pakistan');
  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);

  };

  const handler = () => {
    navigation.navigate('Filters');
  };

  const [selectedButton, setSelectedButton] = useState('button1');

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  const renderButtonContent = () => {
    if (selectedButton === 'button1') {
      return <Electronics />;
    } else if (selectedButton === 'button2') {
      return <Jewelry />;
    } else if (selectedButton === 'button3') {
      return <Bag />;
    } else if (selectedButton === 'button4') {
      return <Wallet />;
    } else if (selectedButton === 'button5') {
      return <Glasses />;
    }
    return null;
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


      <View style={{ backgroundColor: "#FFFFFF" }}>
        <Text
          style={{
          
            fontSize: RFValue(12),
            fontFamily: "Urbanist_400Regular",
            // lineHeight: 14.4,
            // left: 28,
            marginLeft: screenWidth*0.042,
            position: "relative",
            top: 20,
            top: screenHeight*0.028,
            color: "#838383"
          }}
        >Location</Text>



        <View style={{
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
          marginLeft: "3%",
          top: "2%",
          alignItems: "center",
          width: "92%"

        }}>


          <TouchableOpacity style={{}}>
            <Text style={{
              fontFamily: "Urbanist_500Medium",
              fontSize: RFValue(20),
              // lineHeight:24


            }} > {selectedValue}</Text>
          </TouchableOpacity>


          <View style={{
            width: 27,
            // marginLeft: "7%",
            position: "relative",
            // bottom: 10,
            borderRadius: 10,
            alignSelf: "center",
            marginLeft: 6,
           
          }}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={handleValueChange}
              mode="dropdown">
              <Picker.Item label="Pakistan" value="Pakistan" />
              <Picker.Item label="China" value="China" />
              <Picker.Item label="America" value="America" />
              <Picker.Item label="Africa" value="Africa" />
              <Picker.Item label="Qatar" value="Qatar" />

            </Picker>
          </View>



          <TouchableOpacity style={{ position: "absolute", right: -3 }}
            onPress={() => navigation.navigate('Notifications')}>
            <Image style={{
              width: 14,
              width: screenWidth * 0.038,
              height: 18,
              height: screenHeight * 0.042,
              resizeMode: "contain"

            }}
              source={require("../../assets/LostApp/Notification.png")} />
          </TouchableOpacity>

        </View>




        <View style={{
          position: 'relative',
          top: 36,
          position: 'absolute',
          top: 72,
          top: screenHeight*0.096,
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "4%",
          marginLeft: screenWidth*0.042,
        }}>

          <TextInput style={{
            backgroundColor: "#EDEEEF",
            borderWidth: 1,
            borderColor: "#EDEEEF",
            width: "86%",
            // width:279,
            height: 37,
            height: screenHeight * 0.05,
            borderRadius: 8,
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 22,
            position: "relative",
            // paddingLeft:"5%",
            // paddingLeft:"20%",
            paddingLeft: screenWidth*0.12,
            letterSpacing: 0.1,
            color: "#8C9199",

          }}
            placeholder='Search something here' />
          <Ionicons
            name="search"
            size={RFValue(17)}
            color="#888888"

            style={{
              position: "absolute",
              left: "5%",


            }}
          />

          <View style={{
            backgroundColor: "#7689D6",
            width: 39,
            width: "12%",
            height: 36,
            height: screenHeight * 0.05,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            left: "7%"
          }}>
            <TouchableOpacity onPress={handler}>

              <Image style={{
                //  width: 23,
                width: screenWidth * 0.062,
                //  height: 22, 
                height: screenHeight * 0.062,
                resizeMode: "contain"
              }}
                source={require('../../assets/LostApp/Filter.png')} />
            </TouchableOpacity>
          </View>
        </View>



        <View style={styles.buttons}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>

            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: screenHeight * 0.047 }, selectedButton === 'button1' && styles.selectedButton]}
              onPress={() => handleButtonPress('button1')}
            >
              <Text style={selectedButton === 'button1' ? styles.selectedButtonText : styles.buttonText}>Electronics</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: screenHeight * 0.047 }, selectedButton === 'button2' && styles.selectedButton]}
              onPress={() => handleButtonPress('button2')}
            >
              <Text style={selectedButton === 'button2' ? styles.selectedButtonText : styles.buttonText}>Jewelry</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: screenHeight * 0.047 }, selectedButton === 'button3' && styles.selectedButton]}
              onPress={() => handleButtonPress('button3')}
            >
              <Text style={selectedButton === 'button3' ? styles.selectedButtonText : styles.buttonText}>Bag</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: screenHeight * 0.047 }, selectedButton === 'button4' && styles.selectedButton]}
              onPress={() => handleButtonPress('button4')}
            >
              <Text style={selectedButton === 'button4' ? styles.selectedButtonText : styles.buttonText}>Wallet</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: screenHeight * 0.047 }, selectedButton === 'button5' && styles.selectedButton]}
              onPress={() => handleButtonPress('button5')}
            >
              <Text style={selectedButton === 'button5' ? styles.selectedButtonText : styles.buttonText}>Glasses</Text>
            </TouchableOpacity>
          </ScrollView>

        </View>
        <View style={styles.buttonContentContainer}>{renderButtonContent()}</View>



        <TouchableOpacity onPress={() => navigation.navigate('Map')}
          style={{
            
            width:screenWidth*0.15,
            height:screenHeight*0.083,
            position: "absolute",
            right: screenWidth*0.03,
            top: screenHeight*0.8,
            // borderRadius: (screenWidth,screenHeight) * 0.02,
          }}>
          <Image style={{ width: "100%", height: "100%", }}
            source={require("../../assets/LostApp/MapIcon.png")} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    marginTop: 51,
    marginTop: "14%",
    marginLeft: "4%",
  },
  button: {
    paddingTop: "1.5%",
    backgroundColor: '#F7F7F7',
    width: 89,
    //  width:buttonWidth,
    height: 34,


  },
  buttonText: {

    fontFamily: "Urbanist_400Regular",
    fontSize: RFValue(12),
    //  lineHeight:14.09,
    color: "#858585",
    textAlign: "center"

  },
  selectedButton: {
    backgroundColor: '#7689D6',
    borderRadius: 8,
    shadowColor: "#363B64",
    //  width:buttonWidth

  },
  selectedButtonText: {
    fontFamily: "Urbanist_400Regular",
    fontSize: RFValue(12),
    //  lineHeight:14.4,
    color: "#FFFFFF",
    textAlign: "center"
  },
  buttonContentContainer: {
    //  marginTop: -7,
  },

})
export default Home;