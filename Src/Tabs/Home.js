import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Dimensions, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import MainData from '../HomeTabCategory/MainData';
import Electronics from '../HomeTabCategory/Electronics';
import Jewelry from '../HomeTabCategory/Jewelry';
import Wallet from '../HomeTabCategory/Wallet';
import Glasses from '../HomeTabCategory/Glasses';
import Bag from '../HomeTabCategory/Bag';
import { useNavigation ,route} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { Picker } from '@react-native-picker/picker';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import SelectDropdown from 'react-native-select-dropdown'



const CustomSelectorImage = () => (
  <Image
    source={require('../../assets/LostApp/Selector.png')} // Replace with the path to your image
    style={{ width: 20, height: 20,position:"relative" }} // Set the desired width and height for your image
    resizeMode="contain" // Adjust the resizeMode property as needed
  />
);


const Home = ({ route }) => {
  const { selectedType } = route.params || { selectedType: null };
  const { selectedLocation } = route.params || { selectedLocation: null };
  const { categoryselectedButton } = route.params || { categoryselectedButton: null };
  const { sliderValues } = route.params || { sliderValues: null };
  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = (screenWidth * 0.25);
  const screenHeight = Dimensions.get('window').height;

  // console.log(selectedType);
  // console.log(selectedLocation);
  // console.log(categoryselectedButton);
  // console.log(sliderValues);
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');

  const [selectedValue, setSelectedValue] = useState('Pakistan');
  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);

  };

  const handler = () => {
    navigation.navigate('Filters');
  };

  const [selectedButton, setSelectedButton] = useState('button0');

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };


  
  const renderButtonContent = () => {

    if (selectedButton === 'button0') {
      return <MainData  searchQuery={searchQuery}  selectedType={selectedType}  selectedLocation={selectedLocation}  categoryselectedButton={categoryselectedButton} sliderValues={sliderValues} />;
    } else if (selectedButton === 'button1') {
      return <Electronics  searchQuery={searchQuery}  selectedType={selectedType}  selectedLocation={selectedLocation}  categoryselectedButton={categoryselectedButton} sliderValues={sliderValues} />;
    } else if (selectedButton === 'button2') {
      return <Jewelry  searchQuery={searchQuery}  selectedType={selectedType}  selectedLocation={selectedLocation}  categoryselectedButton={categoryselectedButton} sliderValues={sliderValues}/>;
    } else if (selectedButton === 'button3') {
      return <Bag  searchQuery={searchQuery}  selectedType={selectedType}  selectedLocation={selectedLocation}  categoryselectedButton={categoryselectedButton} sliderValues={sliderValues} />;
    } else if (selectedButton === 'button4') {
      return <Wallet  searchQuery={searchQuery}  selectedType={selectedType}  selectedLocation={selectedLocation}  categoryselectedButton={categoryselectedButton} sliderValues={sliderValues}/>;
    } else if (selectedButton === 'button5') {
      return <Glasses  searchQuery={searchQuery}  selectedType={selectedType}  selectedLocation={selectedLocation}  categoryselectedButton={categoryselectedButton} sliderValues={sliderValues} />;
    }
    return null;
  };

  const [selected, setSelected] = React.useState("1");
  const countries = ["Pakistan", "Canada", "Australia", "Ireland"]
  const defaultSelectedIndex = 0; 
  
  const renderCustomDropdownIcon = () => {
    return <CustomSelectorImage />;
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
        marginLeft: screenWidth*0.062,
        position: "relative",
        top: 20,
        top: screenHeight*0.028,
        color: "#838383"
      }}
    >Location</Text>



    <View style={{
      // position: "absolute",
      // top: 105,
      // position: "relative",
      // marginLeft: "1%",
      top: "5.5%",
      flexDirection: 'row', 
      // backgroundColor:"red",
      height:30,marginBottom:30,
      
    }}>
     
    <SelectDropdown
    data={countries}
    onSelect={(selectedItem, index) => {
      console.log(selectedItem, index) }}
    defaultButtonText={countries[defaultSelectedIndex]}
    buttonTextAfterSelection={(selectedItem, index) => { return selectedItem }}
    rowTextForSelection={(item, index) => {return item}}
  
    dropdownStyle={{
      width: '39%', // Adjust the width
      height: 'auto', // Set height to auto or a specific value
      borderColor: '#8391A1', // Border color
      borderWidth: 1, // Border width
      borderRadius: 10, // Border radius
      backgroundColor: 'white', // Dropdown background color
      marginTop: -40, // Adjust margin top
      fontSize:10
    }}
    buttonStyle={{
      width: '39%', // Adjust the width
      height: 'auto', // Set height to auto or a specific value
  backgroundColor:"white"
  
    }}
    selectedRowStyle={{ backgroundColor:"#7689D6", }}
    buttonTextStyle={{ fontFamily: "Urbanist_500Medium",fontSize: RFValue(20),}}
    rowTextStyle={{ fontFamily: "Urbanist_500Medium",fontSize: RFValue(15) }}
  
  
    dropdownIconPosition="right" // Show icon on the right side
    renderDropdownIcon={renderCustomDropdownIcon}
  />
  
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
              style={[styles.button, { width: buttonWidth, height: screenHeight * 0.047 }, selectedButton === 'button0' && styles.selectedButton]}
              onPress={() => handleButtonPress('button0')}
            >
              <Text style={selectedButton === 'button0' ? styles.selectedButtonText : styles.buttonText}>All Data</Text>
            </TouchableOpacity>

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