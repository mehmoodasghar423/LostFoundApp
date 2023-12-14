import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Dimensions,TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { useNavigation } from '@react-navigation/native';
import { Ionicons,Entypo } from '@expo/vector-icons';
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




const FoundPostEdit = ({ route, navigation }) => {
  const { documentId } = route.params;


  // const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)

  const [defaultSelectedCategory, setDefaultSelectedCategory] = useState('');

  const [homeModalVisible, sethomeModalVisible] = useState(false);


  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection("UserData").doc(documentId);
      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            // console.log("Retrieved data:", data); // Log the retrieved data to check its structure
            setLocation(data.location);
  
            // Check if the category is available in the data
            if (data && data.category) {
              // Set the category directly as the default selected category
              const defaultCategory = { key: '1', value: data.category };
              setDefaultSelectedCategory(defaultCategory);
            } else {
              console.error("Category not found in the retrieved data.");
            }
          } else {
            console.error("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
    }
  }, [documentId]);
  
  
  

  const data = [
    { key: 'Electronics', value: 'Electronics' },
    { key: 'Jewelry', value: 'Jewelry' },
    { key: 'Bag', value: 'Bag' },
    { key: 'Wallet', value: 'Wallet' },
    { key: 'Glasses', value: 'Glasses' },
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




  const NextScreen = () => {
    navigation.navigate('FoundPostNextEdit', {
      category: category,
      location,
      date: selectedDate,
      time: selectedTime,
      documentId: documentId
    });
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


         <View style={{ flexDirection: "row",
     position: "relative", alignItems: "center",
      marginTop: "5%", justifyContent: "space-between" }}>


    <TouchableOpacity
      style={{
        marginLeft: "4%"
      }}
      onPress={handleGoBack}>
      <Ionicons name="ios-chevron-back-sharp"
        size={screenWidth * 0.075}
        color="black" />
    </TouchableOpacity>

    <Text
      style={{
        fontSize: RFValue(18),
        fontFamily: "Urbanist_600SemiBold",

      }}
    >
      Found Post Edit
    </Text>

    <TouchableOpacity onPress={() => sethomeModalVisible(true)}>
      <Image style={{
        width: screenWidth * 0.1,
        height: screenHeight * 0.047,
        resizeMode: "contain",
        marginRight: "4%",

      }}
        source={require("../../assets/HomeBack.png")} />
    </TouchableOpacity>

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

          <SelectList
            setSelected={setCategory}
            data={data}
            defaultOption={defaultSelectedCategory}
            boxStyles={{
              backgroundColor: "#EDEEEF",
              borderWidth: 1,
              borderColor: "#EDEEEF",
              width: "91%",
              // height: screenHeight * 0.052,
              borderRadius: 8,
              fontSize: RFValue(12),

              paddingLeft: screenWidth * 0.1,

              color: "#8C9199",
              // marginLeft: "6%"
              alignSelf: "center"
            }}

            dropdownStyles={{
              borderWidth: 1,
              borderColor: "#EDEEEF",
              width: "91%",
              alignSelf: "center"
            }}

            dropdownTextStyles={{
              fontSize: RFValue(12),
              fontFamily: "Urbanist_500Medium",
            }}
            inputStyles={{
              // backgroundColor:"red",
              fontSize: RFValue(12),
              fontFamily: "Urbanist_500Medium",
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
            placeholder='Search Location  '
            value={location}
            onChangeText={text => setLocation(text)}
          />
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
              Date Found
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
              Time Found
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
                  width: screenWidth * 0.025,
                  height: screenHeight * 0.01,
                  resizeMode: "contain",
                  position: "absolute",
                  right: screenWidth * 0.03,
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
                  marginLeft: "10%"
                }}
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
                  width: screenWidth * 0.025,
                  height: screenHeight * 0.01,
                  resizeMode: "contain",
                  position: "absolute",
                  right: screenWidth * 0.03,
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
          onPress={NextScreen}
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



        {homeModalVisible && (
          <TouchableWithoutFeedback onPress={() => sethomeModalVisible(false)}>
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
                    onPress={() => sethomeModalVisible(false)}
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
                    >You Are Going to Home Page !</Text>
                  <Text
                    style={{
                      fontSize: RFValue(16),
                      fontFamily: "Urbanist_600SemiBold",
                      color: "black", marginTop: "1%"
  
                    }}
                  >Do You Want to Continue ?</Text>
  
                  <View style={{ flexDirection: 'row', marginTop: screenHeight*0.02 ,marginLeft:"7%",}}>
                    <TouchableOpacity
                      onPress={() => sethomeModalVisible(false)}
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
                        backgroundColor: "#7689D6",
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

export default FoundPostEdit

const styles = StyleSheet.create({})