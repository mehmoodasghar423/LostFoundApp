import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Dimensions ,TouchableWithoutFeedback} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Ionicons,AntDesign  } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { firebase } from '../../config';
import { SelectList } from 'react-native-dropdown-select-list';
import { Entypo ,Fontisto,MaterialIcons  } from '@expo/vector-icons';




const FoundPost = ({ route }) => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const { selectedCity } = route.params || { selectedCity: null};

  // console.log(selectedCity);
  const [category, setCategory] = useState('');

  const [selectedDate, setSelectedDate] = useState(null);


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);




    const [modalVisible, setmodalVisible] = useState(false);

  const [categoryError, setCategoryError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [dateError, setDateError] = useState('');



  // Create a new state to manage selected city
  const [location, setLocation] = useState('');

  // Update the selected city state when received from route.params
  useEffect(() => {
    if (route.params && route.params.selectedCity) {
      setLocation(route.params.selectedCity);
    }
  }, [route.params]);





  const locationHandler=()=>{
    navigation.navigate("FPostLocation")
  }
  const data = [
    {key:'Electronics', value:'Electronics'},
    {key:'Jewelry', value:'Jewelry'},                                     
    {key:'Bag', value:'Bag'},
    {key:'Wallet', value:'Wallet'}, 
    {key:'Glasses', value:'Glasses'},
    {key:'Laptop', value:'Laptop'},
  ]


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





  const handleGoBack = () => {
    navigation.goBack();
  };




 const NextScreen = () => {
    // Validate the fields
    let isValid = true;

    if (!category) {
      setCategoryError('Please select a category');
      isValid = false;
    } else {
      setCategoryError(''); // Clear the error
    }

    if (!location) {
      setLocationError('Please enter the location');
      isValid = false;
    } else {
      setLocationError(''); // Clear the error
    }

    if (!selectedDate) {
      setDateError('Please select a date');
      isValid = false;
    } else {
      setDateError(''); // Clear the error
    }
    if (isValid) {
      navigation.navigate('FoundPostNext', {
        category,
        location,
        date: selectedDate,
     
      });
    }
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
   
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

      <View>




        <View style={{ flexDirection: "row", position: "relative", alignItems: "center", marginTop: "3%", justifyContent: "space-between" }}>


          <TouchableOpacity
            style={{
              marginLeft: "4%",
              // marginTop:screenHeight*0.003,
              // backgroundColor: "red",
              height: screenHeight * 0.055,
              width: "11.4%",
              borderRadius: (screenWidth, screenHeight) * 0.016,
              borderWidth: (screenWidth, screenHeight) * 0.0013,
              borderColor: "#E0E0E0",
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",

            }}
            onPress={handleGoBack}>
            <Image style={{
              width: 10,
              height: 16,
              width: screenWidth * 0.0285,
              height: screenHeight * 0.021,
              resizeMode: "contain",
              tintColor: "#6A707C",
              // backgroundColor:"red",
              // marginLeft: screenWidth*0.73,
              // position:"absolute",
              // marginTop:screenHeight*-0.023


            }}
              source={require("../../assets/back.png")} />

          </TouchableOpacity>


          <Text
            style={{
              fontSize: RFValue(20),
              fontFamily: "Urbanist_600SemiBold",
              color: "#0F2944"
              // marginLeft: "30%",


            }}
          >
            Found Post
          </Text>


          <TouchableOpacity
            style={{
              marginRight: "4%",
              // marginTop:screenHeight*0.003,
              // backgroundColor: "red",
              height: screenHeight * 0.055,
              width: "11.4%",
              borderRadius: (screenWidth, screenHeight) * 0.016,
              borderWidth: (screenWidth, screenHeight) * 0.0013,
              borderColor: "#E0E0E0",
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",

            }}
            onPress={() => setmodalVisible(true)}
          >

            <Image
              style={{
                width: 19,
                height: 20,
                width: screenWidth * 0.053,
                height: screenHeight * 0.027,
                alignSelf: "center",
                marginRight: "3%",
                resizeMode: "contain",
                //  backgroundColor:"red"
              }}

              source={require('../../assets/Homeicon.png')} />
          </TouchableOpacity>







        </View>

        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            left: "4.5%",
            position: "relative",
            top: screenHeight * 0.03,
            color: "#0F2944"
          }}
        >
          Category
        </Text>

        <View style={{
          // position: "absolute",
          // top: 105,
          position: "relative",
          top: screenHeight * 0.04,
          // backgroundColor:"red"
        }}>


          <TouchableOpacity style={{
            // backgroundColor:"red",  s
            borderWidth: 1,
            borderRadius: 8,
            borderWidth: (screenWidth, screenHeight) * 0.0013,
            borderColor: categoryError ? '#0F2944' : '#E0E0E0',

            borderRadius: (screenWidth, screenHeight) * 0.01,

            width: "91%",
            alignSelf: "center",
          }}>



            <SelectList
              setSelected={setCategory} data={data}

              boxStyles={{
                // backgroundColor: "#EDEEEF",

                height: screenHeight * 0.052,
                // height: screenHeight * 0.052,
                borderColor: "rgba(255, 0, 0, 0)",
                marginLeft: screenWidth * 0.05,
                fontSize: RFValue(12),
                paddingLeft: screenWidth * 0.05,
                color: "#8C9199",
                alignItems: "center",
                width: "97%",
              }}
              dropdownStyles={{
                borderWidth: 1,
                borderColor: "#EDEEEF",
                width: "100%",
                alignSelf: "center",
                marginTop: 0
              }}

              dropdownTextStyles={{
                fontSize: RFValue(12),
                fontFamily: "Urbanist_500Medium",
              }}
              inputStyles={{
                // backgroundColor:"red",
                fontSize: RFValue(12),
                fontFamily: "Urbanist_500Medium",
                color: "#6A707C",
                textAlign: "center",
                // marginLeft:screenWidth*0.06,
                marginTop: screenHeight * 0.005,
                height: screenHeight * 0.022,
                // paddingLeft: -10
              }}
            />


            <Image style={{
              width: screenWidth * 0.1,
              height: screenHeight * 0.047,
              width: 15,
              height: 15,
              width: screenWidth * 0.0402,
              height: screenHeight * 0.0197,
              resizeMode: "contain",


              alignSelf: "center",
              position: "absolute",
              left: screenWidth * 0.038,
              top: screenHeight * 0.0155,
              // alignSelf:"center",
              // marginRight: screenWidth * 0.01,



            }}
              source={require("../../assets/Search.png")} />



          </TouchableOpacity>
        </View>


        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            left: "4.5%",
            position: "relative",
            top: screenHeight * 0.07,
            color: "#0F2944"

            // position: "absolute",
            // top: 164,

          }}
        >
          Location
        </Text>

        <TouchableOpacity
          onPress={locationHandler}
          style={{
            position: "relative",
            top: screenHeight * 0.08,
            // position:"absolute",
            // top:187,
            // backgroundColor: "#EDEEEF",
            borderWidth: 1,
            borderColor: locationError ? '#0F2944' : '#E0E0E0',
            width: "91%",
            height: screenHeight * 0.05,
            // width:279,
            // height: 38,
            borderRadius: 8,
            borderWidth: (screenWidth, screenHeight) * 0.0013,
            borderColor: categoryError ? '#0F2944' : '#E0E0E0',
            fontSize: RFValue(12),
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            //  justifyContent: "center",
          }}>


          <Image style={{
            width: 15,
            width: screenWidth * 0.0402,
            height: 15,
            height: screenHeight * 0.0197,
            resizeMode: "contain",
            marginLeft: screenWidth * 0.05,
            marginLeft: 13,
            marginLeft: screenWidth * 0.036,
            // backgroundColor:"red",

            alignSelf: "center",


          }}
            source={require("../../assets/location.png")} />




          <Text style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            color: "#6A707C",
            marginLeft: screenWidth * 0.033,
            marginLeft: 10
          }}>
            {location || 'Select Location'}
          </Text>

          <Image style={{
            width: 11,
            height: 7,
            width: screenWidth * 0.03,
            height: screenHeight * 0.01,
            resizeMode: "contain",
            // backgroundColor:"red",
            // marginLeft: screenWidth * 0.05,
            position: "absolute",
             right: 17,
             right: screenWidth * 0.0474,

            alignSelf: "center",


          }}
            source={require("../../assets/down2.png")} />

        </TouchableOpacity>







        <Text
          style={{

            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            left: "4.5%",
            position: "relative",
            top: screenHeight * 0.11,
            color: "#0F2944"
            // lineHeight: 14.4,
          }}
        >
          Date Found
        </Text>








        <TouchableOpacity
          onPress={showDatePicker}
          style={{
            position: "relative",
            top: screenHeight * 0.12,
            // position:"absolute",
            // top:187,
            // backgroundColor: "#EDEEEF",
            borderWidth: 1,
            borderColor: dateError ? '#0F2944' : '#E0E0E0',
            width: "91%",
            height: screenHeight * 0.05,
            borderRadius: 8,
            borderWidth: (screenWidth, screenHeight) * 0.0013,
            borderColor: categoryError ? '#0F2944' : '#E0E0E0',
            fontSize: RFValue(12),
            // alignSelf: "center",
            marginLeft: "4.5%",
            flexDirection: "row",
            alignItems: "center",
            //  justifyContent: "center",
          }}>





          <Image style={{
            width: 15,
            height: 15,
            width: screenWidth * 0.0402,
            height: screenHeight * 0.0197,
            resizeMode: "contain",
            marginLeft: screenWidth * 0.05,
            marginLeft: 13,
            marginLeft: screenWidth * 0.036,
            // backgroundColor:"red",

            alignSelf: "center",


          }}
            source={require("../../assets/calender.png")} />





          <Text
            style={{
              fontSize: RFValue(12),
              fontFamily: "Urbanist_500Medium",
              color: "#6A707C",
              marginLeft: screenWidth * 0.033,
              marginLeft: 10
            }}
          >
            {selectedDate
              ? `${moment(selectedDate).format("MMMM Do YYYY")}`
              : 'Select Date'}
          </Text>

          <Image style={{
            width: 11,
            height: 7,
            width: screenWidth * 0.03,
            height: screenHeight * 0.01,
            resizeMode: "contain",
            // backgroundColor:"red",
            // marginLeft: screenWidth * 0.05,
            position: "absolute",
             right: 17,
             right: screenWidth * 0.0474,

            alignSelf: "center",

          }}
            source={require("../../assets/down2.png")} />






          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />

        </TouchableOpacity>


        <TouchableOpacity
          onPress={NextScreen}
          style={{
            // position: "absolute",
            // top: 427,
            position: 'relative',
            top: screenHeight * 0.164,
            borderRadius: 8,
            backgroundColor: '#0F2944',
            // padding: 10,
            // width: 320,
            width: "91%",
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


        {modalVisible && (
          <TouchableWithoutFeedback onPress={() => setmodalVisible(false)}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                height: screenHeight * 1,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <TouchableWithoutFeedback>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: (screenWidth, screenHeight) * 0.03,
                    paddingVertical: screenHeight * 0.03,
                    paddingHorizontal: screenWidth * 0.07,
                    alignItems: 'center',

                    // position:"absolute"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setmodalVisible(false)}
                    style={{ position: 'absolute', top: screenHeight * 0.007, right: screenWidth * 0.021 }}>

                    <Entypo name="cross"
                      size={screenWidth * 0.065}
                      color="black" />
                  </TouchableOpacity>

                  <Text
                    style={{
                      fontSize: RFValue(12),
                      fontFamily: "Urbanist_600SemiBold",
                      color: "#778899"

                    }}
                  >Your Will Lost Your Post Data !</Text>
                  <Text
                    style={{
                      fontSize: RFValue(16),
                      fontFamily: "Urbanist_600SemiBold",
                      color: "black", marginTop: "1%"

                    }}
                  >Do You Want to Continue ?</Text>

                  <View style={{ flexDirection: 'row', marginTop: screenHeight * 0.02, marginLeft: "7%", }}>
                    <TouchableOpacity
                      onPress={() => setmodalVisible(false)}
                      style={{
                        marginRight: screenWidth * 0.05,
                        width: "25%",
                        height: screenHeight * 0.032,
                        backgroundColor: "#3cb371",
                        borderRadius: (screenWidth, screenHeight) * 0.03,
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(15),
                          fontFamily: "Urbanist_600SemiBold",
                          color: "white",
                          // left: "6%",
                        }}
                      >Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        marginRight: screenWidth * 0.05,
                        width: "40%",
                        height: screenHeight * 0.032,
                        backgroundColor: "#0F2944",
                        borderRadius: (screenWidth, screenHeight) * 0.03,
                        alignItems: "center",
                        justifyContent: "center",

                      }}
                      onPress={() => navigation.navigate("Home")}>
                      <Text
                        style={{
                          fontSize: RFValue(15),
                          fontFamily: "Urbanist_600SemiBold",
                          color: "white",
                          // left: "6%",
                        }}>Go To Home</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </SafeAreaView>
  )
}

export default FoundPost

const styles = StyleSheet.create({})