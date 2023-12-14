import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Dimensions, AppState, TouchableWithoutFeedback , Animated, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialCommunityIcons, Entypo,MaterialIcons,AntDesign } from '@expo/vector-icons';
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
import { useFonts } from '@expo-google-fonts/urbanist';
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

  const { selectedCity } = route.params || { selectedCity: null};





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
  navigation.navigate('Location' , { fromScreen: 'Home' });
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
            marginLeft: screenWidth * 0.062,
            position: "relative",
            // top: 20,
            top: screenHeight * 0.013,
            color: "#0F2944"
          }}
        >Location</Text>



        <View style={{
          // position: "absolute",
          // top: 105,
          // position: "relative",
          marginLeft: "5%",
          top: "0.5%",
          // flexDirection: 'row', 
          // backgroundColor:"yellow",


        }}>


        <TouchableOpacity
        onPress={() => handleCityPress(selectedCityState)}
        style={{
          position: "relative",
    
          // position:"absolute",
          // top:187,
       
          width: "91%",
          // width:279,
          height: 38,
          height: screenHeight * 0.052,
          borderRadius: 8,
          fontSize: RFValue(12),
          // alignSelf: "center",
          flexDirection: "row",
          alignItems: "center", 
        }}>


        <MaterialIcons name="location-city"
          size={RFValue(20)}
          color="#8391A1"

          style={{
            // position: "absolute",
            // left: "17%",
            // top: 2,
            marginRight: screenWidth * 0.01,
            alignSelf: "center",


          }}
        />

        <Text style={{
          fontSize: RFValue(15),
          fontFamily: "Urbanist_600SemiBold",
          color: "#8391A1", marginRight: 10
        }}>
          {selectedCityState || '  No City Selected '}
        </Text>
        <AntDesign name="down"
          size={RFValue(13)}
          color="#8391A1"

          style={{
            // position: "absolute",
            left: "5%",
            top: 2,
            alignSelf: "center",


          }}
        />
      </TouchableOpacity>


        </View>






        <View style={{
          position: 'relative',
          // top: 26,
          // position: 'absolute',
          // top: 52,
          top: screenHeight * 0.001,
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "4%",
          marginLeft: screenWidth * 0.042,
        }}>

          <TextInput style={{
            backgroundColor: "#F3F4F6",
            borderWidth: 1,
            borderColor: "#E0E0E0",
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
            paddingLeft: screenWidth * 0.12,
            letterSpacing: 0.1,
            color: "#8C9199",

          }}
          placeholderTextColor="#6A707C"
            placeholder='Search something here'
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
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
            backgroundColor: "#0F2944",
          
            width: "12%",
            
            height: screenHeight * 0.05,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            left: "7%"
          }}>
            <TouchableOpacity onPress={() => navigation.navigate("Filters")}>



              <MaterialCommunityIcons name="filter-variant-plus"
                size={screenWidth * 0.065}
                color="white" />

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
              style={[styles.button, { width: buttonWidth, height: screenHeight * 0.047 }, selectedButton === 'All' && styles.selectedButton]}
              onPress={() => handleButtonPress('All')}
            >
              <Text style={selectedButton === 'All' ? styles.selectedButtonText : styles.buttonText}>All Data</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: screenHeight * 0.047 }, selectedButton === 'Electronics' && styles.selectedButton]}
              onPress={() => handleButtonPress('Electronics')}
            >
              <Text style={selectedButton === 'Electronics' ? styles.selectedButtonText : styles.buttonText}>Electronics</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: screenHeight * 0.047 }, selectedButton === 'Jewelry' && styles.selectedButton]}
              onPress={() => handleButtonPress('Jewelry')}
            >
              <Text style={selectedButton === 'Jewelry' ? styles.selectedButtonText : styles.buttonText}>Jewelry</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: screenHeight * 0.047 }, selectedButton === 'Bag' && styles.selectedButton]}
              onPress={() => handleButtonPress('Bag')}
            >
              <Text style={selectedButton === 'Bag' ? styles.selectedButtonText : styles.buttonText}>Bag</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: screenHeight * 0.047 }, selectedButton === 'Wallet' && styles.selectedButton]}
              onPress={() => handleButtonPress('Wallet')}
            >
              <Text style={selectedButton === 'Wallet' ? styles.selectedButtonText : styles.buttonText}>Wallet</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: screenHeight * 0.047 }, selectedButton === 'Glasses' && styles.selectedButton]}
              onPress={() => handleButtonPress('Glasses')}
            >
              <Text style={selectedButton === 'Glasses' ? styles.selectedButtonText : styles.buttonText}>Glasses</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { width: buttonWidth, height: screenHeight * 0.047 }, selectedButton === 'Laptop' && styles.selectedButton]}
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
                  backgroundColor: 'rgba(118, 137, 214, 0)',
                  borderColor: "#838383",
                  borderWidth: (screenWidth, screenHeight) * 0.0012,
                  borderRadius: (screenWidth, screenHeight) * 0.015,
                  width: screenWidth*0.2,
                  height: screenHeight*0.0275 ,
                  marginLeft: screenWidth*0.02,
                  alignItems: "center",
                  justifyContent: "center",
                },
                selectedTypeButton === 'Lost' && styles.selectedFilterButton,
              ]}
              onPress={() => handleTypeButtonPress('Lost') }
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
                  <Image source={require('../../assets/LostApp/Close.png')} style={{ width: 20, height: 20, resizeMode: "contain", tintColor: "white", }} />
                </TouchableOpacity>

              )}
            </TouchableOpacity>



            <TouchableOpacity
              style={[
                {
                  backgroundColor: 'rgba(118, 137, 214, 0)',
                  borderColor: "#838383",
                  borderWidth: (screenWidth, screenHeight) * 0.0012,
                  borderRadius: (screenWidth, screenHeight) * 0.015,
                  width: screenWidth*0.2,
                  height: screenHeight*0.026 ,
                  marginLeft: screenWidth*0.02,
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
                  selectedTypeButton === 'Found' && styles.selectedFilterButtonText,
                ]}
              >
                Found
              </Text>
              {selectedTypeButton === 'Found' && (
                <TouchableOpacity onPress={handleIconPress}>
                  <Image source={require('../../assets/LostApp/Close.png')} style={{ width: 20, height: 20, resizeMode: "contain", tintColor: "white", marginLeft: -5 }} />
                </TouchableOpacity>

              )}
            </TouchableOpacity>






            <TouchableOpacity onPress={() => handleCityPress(selectedCityState )}
            style={[
              {
                backgroundColor: 'rgba(118, 137, 214, 0)',
                borderColor: "#838383",
                borderWidth: (screenWidth, screenHeight) * 0.0012,
                borderRadius: (screenWidth, screenHeight) * 0.015,
                width: "auto",
                height: screenHeight*0.026 ,
                marginLeft: screenWidth*0.02,

            
                alignItems: "center",
                justifyContent: "center",
              },
              (selectedLocation || selectedCityState ) ? styles.selectedFilterButton : null,
            ]}
          >
            <Text style={[styles.filterbuttontext,  (selectedLocation || selectedCityState ) ? styles.selectedFilterButtonText : null]}>
              { selectedLocation || selectedCityState || 'Location'}
            </Text>
            { ( selectedLocation || selectedCityState ) && (
              <TouchableOpacity onPress={() => {setSelectedCityState(null); } }>
                <Image
                  source={require('../../assets/LostApp/Close.png')}
                  style={{ width: 20, height: 20, resizeMode: "contain", tintColor: "white", marginLeft: -5 }}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>







          </ScrollView>
        </View>






        <View style={styles.buttonContentContainer}>{renderButtonContent()}</View>




 



      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    marginTop: 41,
    marginTop: "3.5%",
    marginLeft: "4%",
  },
  button: {
    // paddingTop: "1.5%",
    backgroundColor: '#F7F7F7',
    width: 89,
    //  width:buttonWidth,
    height: 34,
    justifyContent:"center",
    alignItems:"center"


  },
  buttonText: {

    fontFamily: "Urbanist_400Regular",
    fontSize: RFValue(12),
    //  lineHeight:14.09,
    color: "#858585",
    textAlign: "center"

  },
  selectedButton: {
    backgroundColor: '#0F2944',
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
    fontSize: RFValue(13),
    //  lineHeight:14.4,
    color: "#838383",
    marginHorizontal:10

  },
  filterButtonContainer: {
    flexDirection: 'row',
    marginTop: '2%',
    marginLeft: '4%',
    // backgroundColor:"yellow"
  },
  selectedFilterButton: {
    backgroundColor: '#0F2944',
    borderWidth: 0,
    flexDirection: "row",
    justifyContent: "center", alignItems: "center",


  },
  selectedFilterButtonText: {
    color: '#FFFFFF',
    marginRight: 6,
    marginLeft: 10,
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
  }

})
export default Home;