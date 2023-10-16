import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";




const LostPost = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
  };



  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    hideTimePicker();
    setSelectedTime(time);
  };


  const handleGoBack = () => {
    navigation.goBack();
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
    <SafeAreaView>

      <View>


        <View style={{ flexDirection: "row", position: "relative", alignItems: "center", marginTop: "5%", }}>


          <TouchableOpacity onPress={handleGoBack}>
            <Image style={{
              width: 41,
              width: screenWidth * 0.11,
              height: 41,
              height: screenHeight * 0.057,
              // top: 20,
              left: "40%"

            }}
              source={require("../../assets/LostApp/back.png")} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: RFValue(18),
              fontFamily: "Urbanist_600SemiBold",
              // lineHeight: 20,
              // width: 280,
              // left: 18,
              // top: 1,
              marginLeft: "30%",


            }}
          >
            Lost Post
          </Text>
        </View>

        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            left: "6%",
            position: "relative",
            top: screenHeight * 0.03

          }}
        >
          Category
        </Text>

        <View style={{
          // position: "absolute",
          // top: 105,
          position: "relative",
          top: screenHeight * 0.04
        }}>
          <TextInput style={{
            backgroundColor: "#EDEEEF",
            borderWidth: 1,
            borderColor: "#EDEEEF",
            width: "91%",
            // width:279,
            height: 38,
            height: screenHeight * 0.052,
            borderRadius: 8,
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",

            paddingLeft: screenWidth * 0.1,
            letterSpacing: 0.1,
            color: "#8C9199",
            // marginLeft: "6%"
            alignSelf: "center"
          }}
            placeholder='Search Category ' />
          <Ionicons
            name="search"
            size={RFValue(17)}
            color="#888888"

            style={{
              position: "absolute",
              left: "8%",
              // top: 72
              alignSelf: "center",
              marginTop: 10

            }}
          />
        </View>


        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            left: "6%",
            position: "relative",
            top: screenHeight * 0.063
            // position: "absolute",
            // top: 164,

          }}
        >
          Location
        </Text>

        <View style={{
          position: "relative",
          top: screenHeight * 0.073
          // position:"absolute",
          // top:187,
        }}>
          <TextInput style={{
            backgroundColor: "#EDEEEF",
            borderWidth: 1,
            borderColor: "#EDEEEF",
            width: "91%",
            // width:279,
            height: 38,
            height: screenHeight * 0.052,
            borderRadius: 8,
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",

            paddingLeft: screenWidth * 0.1,
            letterSpacing: 0.1,
            color: "#8C9199",
            // marginLeft: "6%"
            alignSelf: "center"
          }}
            placeholder='Search Location  ' />
          <Ionicons
            name="search"
            size={RFValue(17)}
            color="#888888"

            style={{
              position: "absolute",
              left: "8%",
              // top: 72
              alignSelf: "center",
              marginTop: 10

            }}
          />
        </View>



        <View style={{
          position: "relative",
          top: screenHeight * 0.09,
          flexDirection: "row",
          width: "89%",
          justifyContent: "space-between",
          alignSelf: "center"
        }}>

          <View style={{

            width: "47.3%",

          }}>
            <Text
              style={{
                fontSize: RFValue(12),
                fontFamily: "Urbanist_500Medium",
                // lineHeight: 14.4,
              }}
            >
              Date Lost
            </Text>
          </View>


          <View style={{
            width: "47.3%"
          }}>
            <Text
              style={{
                fontSize: RFValue(12),
                fontFamily: "Urbanist_500Medium",
                // lineHeight: 14.4,
                left: "6%",


              }}
            >
              Time Lost
            </Text>
          </View>



        </View>


        <View style={{
          // backgroundColor: "green",
          left: "6%",
          position: "relative",
          top: screenHeight * 0.11,
          // position: "absolute",
          // top: 264,
          flexDirection: "row",
          width: "93%",
          justifyContent: "space-between"
        }}>



          <View style={{
            backgroundColor: '#E8ECF4',
            width: "47.3%",
            height: screenHeight * 0.054,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#E8ECF4',
            flexDirection: "row",
            alignItems: "center",
            //  justifyContent:"center"
          }}>
            <TouchableOpacity style={{ flexDirection: "row", width: "100%", alignItems: "center" }} onPress={showDatePicker}>
              <Image
                style={{

                  width: screenWidth * 0.036,
                  height: screenHeight * 0.017,
                  resizeMode: "contain",
                  marginLeft: "10%"
                }}
                source={require('../../assets/LostApp/Date.png')} />

              <Text
                style={{
                  fontSize: RFValue(12),
                  fontFamily: "Urbanist_500Medium",
                  // lineHeight: 15,
                  marginLeft: "7%",
                  color: "#8391A1"
                }}
              >
                {selectedDate
                  ? `${moment(selectedDate).format("MMMM Do YYYY")}`
                  : 'Select Date'}
              </Text>

              <Image
                style={{
                  width: screenWidth*0.025,
                  height:screenHeight*0.01,
                  resizeMode:"contain",
                  position: "absolute",
                  right: screenWidth*0.03, 
                }}
                source={require('../../assets/LostApp/SelectorIcon.png')} />
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />





          <View style={{
            backgroundColor: '#E8ECF4',
            width: "47.3%",
            // height:38,
            height: screenHeight * 0.054,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#E8ECF4',
            flexDirection: "row",
            alignItems: "center",
            // justifyContent:"center"/
          }}>

            <TouchableOpacity style={{ flexDirection: "row", width: "100%", alignItems: "center" }} onPress={showTimePicker}>
              <Image
                style={{
                  width: screenWidth * 0.036,
                  height: screenHeight * 0.017,
                  resizeMode: "contain",
                   borderColor: '#8391A1', 
                   marginLeft: "10%" }}
                source={require('../../assets/LostApp/Time.png')} />

              <Text
                style={{
                  fontSize: RFValue(12),
                  fontFamily: "Urbanist_500Medium",
                  //  lineHeight: 15,
                  marginLeft: "7%",
                  color: "#8391A1"
                }}
              >
                {selectedTime
                  ? `${moment(selectedTime).format("h:mm A")}`
                  : 'Select Time'}
              </Text>

              <Image
                style={{ 
                  width: screenWidth*0.025,
                  height:screenHeight*0.01,
                  resizeMode:"contain",
                  position: "absolute",
                   right: screenWidth*0.03, 
                  }}
                source={require('../../assets/LostApp/SelectorIcon.png')} />
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          />








        </View>



        <TouchableOpacity
          onPress={() => navigation.navigate("LostPostNext")}
          style={{
            // position: "absolute",
            // top: 427,
            position: 'relative',
            top: screenHeight * 0.155,
            borderRadius: 8,
            backgroundColor: '#7689D6',
            // padding: 10,
            // width: 320,
            width: "93%",
            // width:335,
            height: screenHeight * 0.059,
            alignSelf: "center",

            justifyContent: "center"
          }}><Text style={{
            fontSize: RFValue(15),
            fontFamily: 'Urbanist_600SemiBold',
            // lineHeight: 18,
            alignSelf: "center",
            color: '#F9F9F9',


          }}
          >Next </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default LostPost

const styles = StyleSheet.create({})