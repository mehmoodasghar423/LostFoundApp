import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Linking, FlatList, TextInput } from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config';
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


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




const FilterLocation = () => {

    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);


    useEffect(() => {
        if (searchQuery) {
            const filteredResults = citiesOfPakistan.filter(city =>
                city.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(filteredResults);
        } else {
            // If no search query, display all data
            setFilteredData(citiesOfPakistan);
        }
    }, [searchQuery]);


    const handleSelectedCity = (city) => {
        // Logic to handle the selected city
        setSelectedCity(city);
        // Navigate back to the home screen with the selected city as a parameter
        navigation.navigate('Filters', { selectedCity: city });
    };


    const handleGoBack = () => {
        navigation.goBack();
    };


    const renderCity = ({ item }) => {
        return (
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', width: "90%", marginLeft: "6%", paddingVertical: screenHeight * 0.014 }}>
                <TouchableOpacity onPress={() => handleSelectedCity(item)}>
                    <Text style={{ fontFamily: "Urbanist_500Medium", color: "#838383", fontSize: RFValue(14) }}>{item}</Text>
                </TouchableOpacity>
            </View>
        );
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



            <View style={{ flexDirection: "row", position: "relative", alignItems: "center", marginTop: "3%", }}>


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
              <Ionicons name="ios-chevron-back-sharp"
                size={screenWidth * 0.08}
                color="#6A707C"
                style={{
                }} />
            </TouchableOpacity>
  
            <Text
              style={{
                fontSize: RFValue(18),
                fontFamily: "Urbanist_600SemiBold",
                color: "#0F2944",
                marginLeft: "4%",
  
                // lineHeight: 21.6,
  
              }}
            >
            Select City
            </Text>
          </View>

                <View style={{
                    position: 'relative',
                    // top: 26,
                    // position: 'absolute',
                    // top: 52,
                    top: screenHeight * 0.001,
                    flexDirection: "row",
                    alignItems: "center",
                    // marginLeft: "8%",
                    marginLeft: screenWidth * 0.052,
                    // backgroundColor:"red",
                    marginTop: screenHeight * 0.01,
                }}>

                    <TextInput style={{
                        backgroundColor: "#EDEEEF",
                        borderWidth: 1,
                        borderColor: "#EDEEEF",
                        width: "96%",
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
                        placeholder='Search City here'
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


                </View>



                <View style={{ marginLeft: "6%", borderBottomWidth: 0.5, borderColor: "#838383", width: "90%", paddingBottom: screenHeight * 0.009 }}>
                    <Text style={{
                        fontFamily: "Urbanist_600SemiBold",
                        marginTop: "5%",
                        alignItems: "center",

                        color: "#ccc",
                        //   alignSelf: "center",
                        fontSize: RFValue(14),

                    }}>All Cities</Text>
                </View>


                <View style={{ marginLeft: "6%" }}>
                    <Text style={{
                        fontFamily: "Urbanist_600SemiBold",
                        marginTop: "4%",
                        alignItems: "center",

                        color: "#483d8b",
                        //   alignSelf: "center",
                        fontSize: RFValue(14),

                    }}>Popular Cities</Text>
                </View>

                <View style={{ marginTop: screenHeight * 0.009 }}>
                    <FlatList
                        data={filteredData}
                        renderItem={renderCity}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}


export default FilterLocation;
const styles = StyleSheet.create({

    container: {
        paddingBottom: "4%",
        borderBottomWidth: RFValue(3),
        borderBottomColor: 'rgba(0, 0, 0, 0.1)', // Adjust the shadow color and opacity
        ...Platform.select({
            ios: {
                shadowColor: 'transparent',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0,
                shadowRadius: 0,
            },
            android: {
                elevation: 0,
            },
        }),
    },
})