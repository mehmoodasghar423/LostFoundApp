import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Dimensions, AppState, TouchableWithoutFeedback, Animated, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialCommunityIcons, Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import MainData from '../HomeTabCategory/MainData';
import Electronics from '../HomeTabCategory/Electronics';
import Jewelry from '../HomeTabCategory/Jewelry';
import Wallet from '../HomeTabCategory/Wallet';
import Glasses from '../HomeTabCategory/Glasses';
import Bag from '../HomeTabCategory/Bag';
import Laptop from '../HomeTabCategory/Laptop';

import { useNavigation, route } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import {
  useFonts,
  Raleway_100Thin, Raleway_200ExtraLight, Raleway_300Light, Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold, Raleway_700Bold, Raleway_800ExtraBold, Raleway_900Black,
} from '@expo-google-fonts/raleway';
// import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { Picker } from '@react-native-picker/picker';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import SelectDropdown from 'react-native-select-dropdown'
import { firebase } from '../../config';
import { SelectList } from 'react-native-dropdown-select-list';






const Home = ({ route }) => {
  const { selectedType } = route.params || { selectedType: null };
  const { selectedLocation } = route.params || { selectedLocation: null };
  const { categoryselectedButton } = route.params || { categoryselectedButton: null };

  const { leftMarkerDate } = route.params || { leftMarkerDate: null };
  const { rightMarkerDate } = route.params || { rightMarkerDate: null };

  const { appliedFiltersCount } = route.params || { appliedFiltersCount: 0 };

  const { selectedCity } = route.params || { selectedCity: null };





  const [homeModalVisible, sethomeModalVisible] = useState(false);



  // console.log(selectedLocation);




  const { sliderValues } = route.params || { sliderValues: null };
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const buttonWidth = (screenWidth * 0.25);

  // console.log('Home' ,leftMarkerDate) ;
  // console.log(selectedLocation);
  // console.log(categoryselectedButton);
  // console.log(sliderValues);
  const [selectedTypeButton, setSelectedTypeButton] = useState(null);

  const handleTypeButtonPress = (type) => {
    if (selectedTypeButton === type) {
      handleIconPress(); // If the same button is pressed again, call the icon press function
    } else {
      setSelectedTypeButton(type);
    }
  };

  const handleIconPress = () => {
    // Toggle off the filter when clicking the icon
    if (selectedTypeButton) {
      setSelectedTypeButton(null);
    }
  };



  // Create a new state to manage selected city
  const [selectedCityState, setSelectedCityState] = useState(null);

  // Update the selected city state when received from route.params
  useEffect(() => {
    if (route.params && route.params.selectedCity) {
      setSelectedCityState(route.params.selectedCity);
    }
  }, [route.params]);

  useEffect(() => {
    if (route.params && route.params.selectedLocation) {
      setSelectedCityState(route.params.selectedLocation);
    }
  }, [route.params]);


  const handleCityPress = (city) => {
    if (selectedCityState === city) {
      setSelectedCityState(null); // Clear the selected city
    } else {
      setSelectedCityState(city); // Set the selected city
    }
    navigation.navigate('Location', { fromScreen: 'Home' });
  };





  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');



  // console.log(topLocation);

  const citiesOfPakistan = [
    'Karachi', 'Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Hyderabad', 'Peshawar',
    'Quetta', 'Islamabad', 'Sargodha', 'Sialkot', 'Bahawalpur', 'Sukkur', 'Larkana', 'Sheikhupura',
    'Rahim Yar Khan', 'Jhang', 'Dera Ghazi Khan', 'Gujrat', 'Sahiwal', 'Wah Cantonment', 'Mardan',
    'Kasur', 'Okara', 'Mingora', 'Nawabshah', 'Chiniot', 'Kotri', 'Kāmoke', 'Hafizabad', 'Sadiqabad',
    'Mirpur Khas', 'Burewala', 'Kohat', 'Khanewal', 'Dera Ismail Khan', 'Turbat', 'Muzaffargarh',
    'Abbottabad', 'Mandi Bahauddin', 'Shikarpur', 'Jacobabad', 'Jhelum', 'Khanpur', 'Khairpur',
    'Khuzdar', 'Pakpattan', 'Hub', 'Daska', 'Gojra', 'Dadu', 'Muridke', 'Bahawalnagar', 'Samundri',
    'Tando Allahyar', 'Tando Adam', 'Jaranwala', 'Chishtian', 'Attock', 'Vehari', 'Kot Abdul Malik',
    'Ferozwala', 'Chakwal', 'Gujranwala Cantonment', 'Kamalia', 'Umerkot', 'Ahmedpur East', 'Kot Addu',
    'Wazirabad', 'Mansehra', 'Layyah', 'Swabi', 'Chaman', 'Taxila', 'Nowshera', 'Khushab', 'Shahdadkot',
    'Mianwali', 'Kabal', 'Lodhran', 'Hasilpur', 'Charsadda', 'Bhakkar', 'Badin', 'Arifwala', 'Ghotki',
    'Sambrial', 'Jatoi', 'Daska Kalan', 'Mandi', 'Tando Muhammad Khan', 'Tank', 'Thatta', 'Bhalwal',
    'Pind Dadan Khan', 'Hujra Shah Muqim', 'Kotri', 'Loralai', 'Dera Murad Jamali', 'Balakot', 'Mian Channu',
    'Eminabad', 'Kohlu', 'Haveli', 'Kahuta', 'Tando Jam', 'Rajanpur', 'Gojra', 'Ratodero', 'Shujaabad',
    'Dipalpur', 'Gujar Khan', 'Nankana Sahib', 'Qila Didar Singh', 'Kalat', 'Panjgur', 'Mastung', 'Kalabagh',
    'Chakwal', 'Kharian', 'Dinga', 'Leiah', 'Jauharabad', 'Karak', 'Tando Allahyar', 'Paharpur', 'Mianwali',
    'Musa Khel Bazar', 'Parachinar', 'Jhelum', 'Kandhkot', 'Harunabad', 'Kashmor', 'Matiari', 'Mehrabpur',
    'Pindigheb', 'Turbat', 'Sibi', 'Khanpur', 'Chak Azam Sahu', 'Bhit Shah', 'Tando Ghulam Ali', 'Sohbatpur',
    'Khangarh', 'Harappa', 'Narowal', 'Faruka', 'Bhawana', 'Khurrianwala', 'Zhob', 'Sakrand', 'Gandava',
    'Jati', 'Dasu', 'Bhera', 'Kulachi', 'Ranipur', 'Ghotki', 'Chak Two Hundred Forty-Nine TDA', 'Sarai Alamgir',
    'Dunga Bunga', 'Yazman', 'Dera Bugti', 'Tharu Shah', 'Jhawarian', 'Alipur', 'Gwadar', 'Usta Muhammad',
    'Lodhran', 'Qadirpur Ran', 'Warah', 'Rohri', 'Sujawal', 'Alizai', 'Jampur', 'Awaran', 'Loralai',
    'Havelian', 'Kahror Pakka', 'Charsadda', 'Pishin', 'Khoski', 'Chaman', 'Kandiaro', 'Dadhar',
  ];

  const data = citiesOfPakistan.map(city => ({ key: city, value: city }));




  ///
  const [selectedButton, setSelectedButton] = useState('All');

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  useEffect(() => {
    if (categoryselectedButton) {
      // If categoryselectedButton has a value, set the selectedButton state
      setSelectedButton(categoryselectedButton);
    } else {
      // If categoryselectedButton is null or undefined, set the default button to 'All'
      setSelectedButton('All');
    }
  }, [categoryselectedButton]);



  ///////////online user//////


  const updateUserStatus = (status) => {
    // console.log('Updating user status:', status);
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      // console.log('Current user:', currentUser.uid);
      firebase.firestore().collection('UserData').doc(currentUser.uid).update({
        onlineStatus: status,
      })
      // .then(() => console.log('User status updated successfully'))
      .catch((error) => console.error('Error updating user status:', error));
    }
  };

  const handleAppStateChange = (nextAppState) => {
    // console.log('App state changed:', nextAppState);
    if (nextAppState === 'background') {
      updateUserStatus('offline');
    } else if (nextAppState === 'active') {
      updateUserStatus('online');
    }
  };

  useEffect(() => {
    // console.log('Component mounted');
    updateUserStatus('online'); // Check if this log is printed in console

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      // console.log('Component unmounted');
      AppState.removeEventListener('change', handleAppStateChange);
      updateUserStatus('offline'); // Check if this log is printed in console
    };
  }, []);

  ///////////b/

  const renderButtonContent = () => {

    if (selectedButton === 'All') {
      return <MainData
        searchQuery={searchQuery}
        selectedType={selectedType}
        selectedLocation={selectedLocation}
        categoryselectedButton={categoryselectedButton}
        leftMarkerDate={leftMarkerDate}
        rightMarkerDate={rightMarkerDate}
        selectedTypeButton={selectedTypeButton}
        selectedCityState={selectedCityState}

      />

    } else if (selectedButton === 'Electronics') {
      return <Electronics
        searchQuery={searchQuery}
        selectedType={selectedType}
        selectedLocation={selectedLocation}
        categoryselectedButton={categoryselectedButton}
        sliderValues={sliderValues}
        selectedTypeButton={selectedTypeButton}
        selectedCityState={selectedCityState} />

    } else if (selectedButton === 'Jewelry') {
      return <Jewelry
        searchQuery={searchQuery}
        selectedType={selectedType}
        selectedLocation={selectedLocation}
        categoryselectedButton={categoryselectedButton}
        leftMarkerDate={leftMarkerDate}
        rightMarkerDate={rightMarkerDate}
        selectedTypeButton={selectedTypeButton}
        selectedCityState={selectedCityState} />;

    } else if (selectedButton === 'Bag') {
      return <Bag
        searchQuery={searchQuery}
        selectedType={selectedType}
        selectedLocation={selectedLocation}
        categoryselectedButton={categoryselectedButton}
        leftMarkerDate={leftMarkerDate}
        rightMarkerDate={rightMarkerDate}
        selectedTypeButton={selectedTypeButton}
        selectedCityState={selectedCityState} />;

    } else if (selectedButton === 'Wallet') {
      return <Wallet
        searchQuery={searchQuery}
        selectedType={selectedType}
        selectedLocation={selectedLocation}
        categoryselectedButton={categoryselectedButton}
        leftMarkerDate={leftMarkerDate}
        rightMarkerDate={rightMarkerDate}
        selectedTypeButton={selectedTypeButton}
        selectedCityState={selectedCityState} />;

    } else if (selectedButton === 'Glasses') {
      return <Glasses
        searchQuery={searchQuery}
        selectedType={selectedType}
        selectedLocation={selectedLocation}
        categoryselectedButton={categoryselectedButton}
        leftMarkerDate={leftMarkerDate}
        rightMarkerDate={rightMarkerDate}
        selectedTypeButton={selectedTypeButton}
        selectedCityState={selectedCityState} />;
    } else if (selectedButton === 'Laptop') {
      return <Laptop
        searchQuery={searchQuery}
        selectedType={selectedType}
        selectedLocation={selectedLocation}
        categoryselectedButton={categoryselectedButton}
        leftMarkerDate={leftMarkerDate}
        rightMarkerDate={rightMarkerDate}
        selectedTypeButton={selectedTypeButton}
        selectedCityState={selectedCityState} />;
    }
    return null;
  };




  let [fontsLoaded] = useFonts({
    Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
    Raleway_100Thin, Raleway_200ExtraLight, Raleway_300Light, Raleway_400Regular, Raleway_500Medium, Raleway_600SemiBold, Raleway_700Bold, Raleway_800ExtraBold, Raleway_900Black,

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




        <View style={{

          top: 14,
          top: screenHeight * 0.0184,
          left: 19,
          left: "5%",
          // position: "absolute",
          // top: 105,
          // position: "relative",
          // marginLeft: "4%",
          // top: "0.5%",

          // flexDirection: 'row', 
          // backgroundColor: "yellow",


        }}>


          <TouchableOpacity
            onPress={() => handleCityPress(selectedCityState)}
            style={{
              position: "relative",
              flexDirection: "row",
              alignItems: "center",
            }}>

            <Image
              style={{
                width: 14,
                height: 14,
                width: screenWidth * 0.039,
                height: screenHeight * 0.0187,
                alignSelf: "center",
                resizeMode: "contain",
                // backgroundColor: "red",

                // marginTop:"14%"
              }}

              source={require('../../assets/location.png')} />

            <Text style={{
              fontSize: RFValue(16),
              lineHeight: RFValue(24),
              fontFamily: "Urbanist_500Medium",
              color: "#0F2944",
              marginRight: 14,
              marginRight: screenWidth * 0.037,
              left: 6,
              left: screenWidth * 0.017,
            }}>
              {selectedCityState || 'No City Selected'}
            </Text>

            <Image
              style={{

                width: 14,
                height: 14,
                width: screenWidth * 0.039,
                height: screenHeight * 0.0187,
                alignSelf: "center",
                resizeMode: "contain"
                // backgroundColor: "red",

                // marginTop:"14%"
              }}

              source={require('../../assets/down.png')} />

          </TouchableOpacity>


        </View>






        <View style={{
          marginTop: 24,
          marginTop: screenHeight * 0.032,

          // position: 'relative',
          // top: 26,
          // position: 'absolute',
          // top: 52,
          // top: screenHeight * 0.001,
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "5%",
          // marginLeft: screenWidth * 0.042,
        }}>

          <TextInput style={{
            // backgroundColor: "#F3F4F6",
            borderWidth: 1,
            borderColor: "#E0E0E0",
            width: 285,
            width: "83.3%",
            height: 33,
            height: screenHeight * 0.044,
            borderRadius: 4,
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            lineHeight: 15,
            position: "relative",
            // paddingLeft:"5%",
            // paddingLeft:"20%",
            paddingLeft: screenWidth * 0.095,
            letterSpacing: 0.1,
            color: "#8C9199",

          }}
            placeholderTextColor="#6A707C"
            placeholder='Search something here'
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />


          <Image
            style={{
              width: 12,
              height: 12,
              width: screenWidth * 0.033,
              height: screenHeight * 0.016,
              alignSelf: "center",
              // backgroundColor: "red",
              resizeMode:"contain",
              position: "absolute",
              // marginTop:"14%"
              left: 13
            }}

            source={require('../../assets/Search.png')} />

          <View style={{
            backgroundColor: "#0F2944",

            width: 34,
            width: "10%",
            height: 33,
            height: screenHeight * 0.044,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
            // left: "7%"
            marginLeft: 3.7
          }}>
            <TouchableOpacity onPress={() => navigation.navigate("Filters")}>



              <Image
                style={{

                  width: 14,
                  height: 13,
                  width: screenWidth * 0.039,
                  height: screenHeight * 0.018,
                  alignSelf: "center",

                }}

                source={require('../../assets/Filter.png')} />




              {appliedFiltersCount > 0 && ( // Display count only if there are applied filters
                <View
                  style={{
                    position: 'absolute', top: 0, right: 0,
                    backgroundColor: 'red', width: screenWidth * 0.04, height: screenHeight * 0.02,
                    alignItems: "center", justifyContent: "center", borderRadius: (screenWidth, screenHeight) * 0.07,
                  }}>
                  <Text style={{ color: 'white', fontSize: RFValue(11), fontFamily: "Urbanist_600SemiBold", }}>{appliedFiltersCount}</Text>
                </View>
              )}

            </TouchableOpacity>
          </View>
        </View>



        <View style={styles.buttons}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>

            <TouchableOpacity
              style={[styles.button, {
                height: 32,
                height: screenHeight * 0.043,
                marginRight: 4,
                marginRight: screenWidth * 0.012,
                paddingHorizontal: 16,
                paddingHorizontal: screenWidth * 0.0445,


              }, selectedButton === 'All' && styles.selectedButton]}
              onPress={() => handleButtonPress('All')}
            >
              <Text style={selectedButton === 'All' ? styles.selectedButtonText : styles.buttonText}>All Data</Text>
            </TouchableOpacity>



            <TouchableOpacity
              style={[styles.button, {
                height: 32,
                height: screenHeight * 0.043,
                marginRight: screenWidth * 0.012,
                paddingHorizontal: screenWidth * 0.0445,

              }, selectedButton === 'Electronics' && styles.selectedButton]}
              onPress={() => handleButtonPress('Electronics')}
            >
              <Text style={selectedButton === 'Electronics' ? styles.selectedButtonText : styles.buttonText}>Electronics</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.button, {
                height: 32,
                height: screenHeight * 0.043,
                marginRight: screenWidth * 0.012,
                paddingHorizontal: screenWidth * 0.0445,
              }, selectedButton === 'Jewelry' && styles.selectedButton]}
              onPress={() => handleButtonPress('Jewelry')}
            >
              <Text style={selectedButton === 'Jewelry' ? styles.selectedButtonText : styles.buttonText}>Jewelry's</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.button, {
                height: 32,
                height: screenHeight * 0.043,
                marginRight: screenWidth * 0.012,
                paddingHorizontal: screenWidth * 0.0445,
              }, selectedButton === 'Bag' && styles.selectedButton]}
              onPress={() => handleButtonPress('Bag')}
            >
              <Text style={selectedButton === 'Bag' ? styles.selectedButtonText : styles.buttonText}>Bag</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.button, {
                height: 32,
                height: screenHeight * 0.043,
                marginRight: screenWidth * 0.012,
                paddingHorizontal: screenWidth * 0.0445,
              }, selectedButton === 'Wallet' && styles.selectedButton]}
              onPress={() => handleButtonPress('Wallet')}
            >
              <Text style={selectedButton === 'Wallet' ? styles.selectedButtonText : styles.buttonText}>Wallet</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.button, {
                height: 32,
                height: screenHeight * 0.043,
                 marginRight: screenWidth * 0.012, 
              paddingHorizontal: screenWidth * 0.0445,
                 }, selectedButton === 'Glasses' && styles.selectedButton]}
              onPress={() => handleButtonPress('Glasses')}
            >
              <Text style={selectedButton === 'Glasses' ? styles.selectedButtonText : styles.buttonText}>Glasses</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, {
                height: 32,
                height: screenHeight * 0.043,
                 marginRight: screenWidth * 0.012, 
              paddingHorizontal: screenWidth * 0.0445,
                }, selectedButton === 'Laptop' && styles.selectedButton]}
              onPress={() => handleButtonPress('Laptop')}
            >
              <Text style={selectedButton === 'Laptop' ? styles.selectedButtonText : styles.buttonText}>Laptop</Text>
            </TouchableOpacity>
          </ScrollView>

        </View>



        <View style={styles.filterButtonContainer}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>

            <TouchableOpacity
              style={[
                {
                  // backgroundColor: 'rgba(118, 137, 214, 0)',
                  borderColor: "#E0E0E0",
                  borderWidth: (screenWidth, screenHeight) * 0.0012,
                  borderRadius: (screenWidth, screenHeight) * 0.015,
                  borderRadius: 4,
                  width: screenWidth * 0.2,
                  // height: 26,
                  height: screenHeight * 0.0345,
                  // marginLeft: screenWidth * 0.02,
                  alignItems: "center",
                  justifyContent: "center",
                },
                selectedTypeButton === 'Lost' && styles.selectedFilterButton,
              ]}
              onPress={() => handleTypeButtonPress('Lost')}
            >
              <Text
                style={[
                  styles.filterbuttontext,
                  selectedTypeButton === 'Lost' && styles.selectedFilterButtonText,
                ]}
              >
                Lost
              </Text>
              {selectedTypeButton === 'Lost' && (


                <TouchableOpacity onPress={handleIconPress}>
                  <Image source={require('../../assets/crosss.png')} style={{ 
                    width: 8,
                    height: 8,
                    width: screenWidth * 0.021,
                    height: screenHeight * 0.011,
                    resizeMode:"contain",
                  //  backgroundColor:"red",
                     tintColor: "#FE9003", marginTop: 1, marginLeft: 8 }} />
                </TouchableOpacity>

              )}
            </TouchableOpacity>



            <TouchableOpacity
              style={[
                {
                  borderColor: "#E0E0E0",
                  borderWidth: (screenWidth, screenHeight) * 0.0012,
                  borderRadius: (screenWidth, screenHeight) * 0.015,
                  width: screenWidth * 0.2,
                  height: screenHeight * 0.0275,
                  borderRadius: 4,
                  height: 26,
                  height: screenHeight * 0.0345,
                  marginLeft: screenWidth * 0.008,
                  // marginLeft: 3,
                  alignItems: "center",
                  justifyContent: "center",
                },
                selectedTypeButton === 'Found' && styles.selectedFilterButton,
              ]}
              onPress={() => handleTypeButtonPress('Found')}
            >
              <Text
                style={[
                  styles.filterbuttontext,
                  selectedTypeButton === 'Found' && styles.selectedFilterButtonTextfOUND,
                ]}
              >
                Found
              </Text>
              {selectedTypeButton === 'Found' && (
                <TouchableOpacity onPress={handleIconPress}>
                  <Image source={require('../../assets/crosss.png')} style={{
                    width: screenWidth * 0.021,
                    height: screenHeight * 0.011,
                    resizeMode:"contain",
                      tintColor: "#FE9003", marginTop: 1 }} />

                </TouchableOpacity>

              )}
            </TouchableOpacity>





            <TouchableOpacity onPress={() => handleCityPress(selectedCityState)}
              style={[
                {
                  backgroundColor: 'rgba(118, 137, 214, 0)',
                  borderColor: "#E0E0E0",
                  borderWidth: (screenWidth, screenHeight) * 0.0012,
                  marginLeft: screenWidth * 0.008,
                  borderRadius: (screenWidth, screenHeight) * 0.015,
                  borderRadius: 4,
                  width: "auto",
                  height: screenHeight * 0.026,
                  height: 26,
                  height: screenHeight * 0.0345,
                  paddingHorizontal: 3,
                  paddingHorizontal: screenWidth * 0.01,

                  alignItems: "center",
                  justifyContent: "center",
                },
                (selectedLocation || selectedCityState) ? styles.selectedFilterButtonLocation : null,
              ]}
            >
              <Text style={[styles.filterbuttontext, (selectedLocation || selectedCityState) ? styles.selectedFilterButtonTextLocation : null]}>
                {selectedLocation || selectedCityState || 'Location'}
              </Text>
              {(selectedLocation || selectedCityState) && (
                <TouchableOpacity onPress={() => { setSelectedCityState(null); }}>
                  <Image source={require('../../assets/crosss.png')} style={{ 
                    width: screenWidth * 0.021,
                    height: screenHeight * 0.011,
                    resizeMode:"contain",

                      tintColor: "#FE9003", marginTop: 1, }} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

          </ScrollView>
        </View>





        <View style={{
          marginTop: 12,
          marginTop: screenHeight * 0.016,
          marginLeft: "5%", flexDirection: "row", alignItems: "center",
        }}>



          <Text style={{
            fontSize: RFValue(16),
            fontFamily: "Urbanist_500Medium",
            color: "#0F2944",
          }}>
            All Items
          </Text>



        </View>





        <View style={styles.buttonContentContainer}>{renderButtonContent()}</View>








      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    // marginTop: 41,
    // marginLeft: "4%",
    marginLeft: "5%",
    marginTop: 13,
    marginTop: "3.6%",
    // backgroundColor:"red"
  },
  button: {
    // paddingTop: "1.5%",
    backgroundColor: '#F3F4F6',
    // width: 87,
    // width:"auto",
    paddingHorizontal: 16,
    // paddingHorizontal: "4.87%",
    //  width:buttonWidth,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
    borderRadius: 6,
    // shadowColor: "#363B64",
  },
  buttonText: {

    fontFamily: "Raleway_500Medium",
    fontSize: RFValue(12),
    lineHeight:  RFValue(14.4),
    color: "#858585",
    textAlign: "center"

  },
  selectedButton: {
    backgroundColor: '#0F2944',

    //  width:buttonWidth

  },
  selectedButtonText: {
    fontFamily: "Raleway_500Medium",
    fontSize: RFValue(12),
    lineHeight:  RFValue(14.4),
    color: "#FFFFFF",
    textAlign: "center"
  },
  buttonContentContainer: {
    //  marginTop: -7,
    // backgroundColor:"yellow"
  },
  filterbutton: {

    backgroundColor: 'rgba(118, 137, 214, 0)',
    borderColor: "#838383",
    borderWidth: 1.2,
    borderRadius: 14,
    width: 70,
    //  width:buttonWidth,
    height: 22,
    marginLeft: 10,

    alignItems: "center",
    justifyContent: "center",
    // paddingBottom: 3
  },
  filterbuttontext: {
    fontFamily: "Urbanist_500Medium",
    fontSize: RFValue(12),
    //  lineHeight:14.4,
    color: "#6A707C",
    marginHorizontal: 10

  },
  filterButtonContainer: {
    flexDirection: 'row',
    marginTop: 12,
    marginTop: '3.33%',
    marginLeft: "5%",
    // backgroundColor:"yellow"
  },
  selectedFilterButton: {
    // backgroundColor: '#0F2944',
    borderColor: "#FE9003",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",


  },
  selectedFilterButtonText: {
    color: '#FE9003',
    // marginRight: 6,
    // marginLeft: 10,
    left: -9,
    // marginRight:10
  },
  selectedFilterButtonTextfOUND: {
    color: '#FE9003',
    // marginRight: 6,
    // marginLeft: 10,
    left: -8
  },
  selectedFilterButtonTextLocation: {
    color: '#FE9003',
    // marginRight: 6,
    marginLeft: 4,
    // left:-8
  },
  locationFilterbutton: {
    backgroundColor: 'rgba(118, 137, 214, 0)',
    borderColor: "#838383",
    borderWidth: 1.2,
    borderRadius: 14,
    width: "auto",
    //  width:buttonWidth,
    height: 22,
    marginLeft: 10,

    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 3
  },
  selectedFilterButtonLocation: {
    // backgroundColor: '#0F2944',
    borderColor: "#FE9003",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 5


  },

})
export default Home;