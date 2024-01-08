import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import { Asset } from 'expo-asset';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

import { firebase } from '../../config';





const Laptop = ({ searchQuery, handleSearch, selectedType, selectedLocation, categoryselectedButton,selectedTypeButton,selectedCityState ,leftMarkerDate,rightMarkerDate}) => {
  const navigation = useNavigation();
  // console.log(categoryselectedButton);

  const screenWidth = Dimensions.get('window').width;
  const box_Width = (screenWidth * 0.95);
  const boxWidth = (screenWidth * 0.50);
  const screenHeight = Dimensions.get('window').height;
  const boxHeight = screenHeight * 0.27;

  const [userDataList, setUserDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const userRef = firebase.firestore().collection("UserData");
    setIsLoading(true);
  
    const typeQuery = selectedType || selectedTypeButton
      ? userRef.where("Type", "==", selectedType || selectedTypeButton)
      : userRef;
  
    const locationQuery = selectedLocation || selectedCityState
      ? typeQuery.where("location", "==", selectedLocation || selectedCityState)
      : typeQuery;
  
    const categoryQuery =
      categoryselectedButton && categoryselectedButton !== "All"
        ? locationQuery.where("category", "==", categoryselectedButton)
        : locationQuery;
  
    let dateFilterQuery = categoryQuery;
  
    if (leftMarkerDate && rightMarkerDate) {
      dateFilterQuery = dateFilterQuery.where("date", ">=", leftMarkerDate).where("date", "<=", rightMarkerDate);
    }
  
    dateFilterQuery.onSnapshot((querySnapshot) => {
      const userDataArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        userDataArray.push({ id: doc.id, ...data });
      });
  
      const sortedData = [...userDataArray].sort((a, b) => {
        const dateA = a.date ? a.date.toDate() : null;
        const dateB = b.date ? b.date.toDate() : null;
  
        if (dateA && dateB) {
          return dateB - dateA;
        } else if (dateA && !dateB) {
          return -1;
        } else if (!dateA && dateB) {
          return 1;
        }
        return 0;
      });
  
      setUserDataList(sortedData);
      setFilteredData(sortedData);
      setIsLoading(false);
    });
  }, [selectedType, selectedLocation, categoryselectedButton, selectedTypeButton, selectedCityState, leftMarkerDate, rightMarkerDate]);
  




  useEffect(() => {
    if (searchQuery) {
      // Filter the data based on the search query
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filteredResults = userDataList.filter((item) => {
        // Check 'lostItem,' 'location,' and 'item.date' fields and make sure they are defined before calling toLowerCase()
        if (item.lostItem && item.location && item.date) {
          const lostItem = item.lostItem.toLowerCase();
          const location = item.location.toLowerCase();
          const date = moment(item.date.toDate()).format("Do MMMM YYYY").toLowerCase();
          return lostItem.includes(lowerCaseQuery) || location.includes(lowerCaseQuery) || date.includes(lowerCaseQuery);
        }
        return false; // Return false if 'lostItem,' 'location,' or 'item.date' is undefined
      });
      setFilteredData(filteredResults);
    } else {
      // If no search query, display all data
      setFilteredData(userDataList);
    }
  }, [searchQuery, userDataList]);






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
  /////////////////////
  ////////////////
  return (
    <View style={{
      // height: screenHeight * 0.6,
      height:RFPercentage (69),
      // marginTop: 12,
      marginTop: screenHeight * 0.0155,
      // backgroundColor:"red",
      // borderBottomWidth:1,
      paddingBottom: screenHeight * 0.014
    }}>
      {isLoading ? ( // Show loading icon when data is loading
        <ActivityIndicator size="large" color="#7689D6" />
      ) : filteredData.length > 0 ? ( // Data is available, render the data
        <FlatList
        data={filteredData.filter(item => item.lostItem && item.category === 'Laptop')} // Filter out items where lostItem is empty
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                height: 55,
                height: screenHeight * 0.074,
                width: 321,
                width: "90%",
                borderRadius: 8,
                borderColor: "#E0E0E0",
                backgroundColor: "white",
                // elevation: 1,
                marginBottom: 8,
                marginBottom: screenHeight * 0.011,
                alignSelf: "center",
                borderWidth: 1,
                borderRadius: (screenWidth, screenHeight) * 0.01,
                borderWidth: (screenWidth, screenHeight) * 0.0012,

                // marginLeft:19
              }}
              onPress={() => {
                navigation.navigate('DetailsScreen', {
                  category: item.category,
                  location: item.location,
                  number: item.number,
                  date: item.date,
                  time: item.time,
                  lostItem: item.lostItem,
                  description: item.description,
                  imageUrl1: item.imageUrl1,
                  imageUrl2: item.imageUrl2,
                  imageUrl3: item.imageUrl3,
                  participants: [item.uid],
                  Type: item.Type
                });
              }}
            >


              <View style={{ flexDirection: "row" }}>
                <Image source={{ uri: item.imageUrl1 }} style={{
                  height: 47.5,
                  width: 50,
                  height: screenHeight * 0.0635,
                  width: screenWidth * 0.14,
                  borderRadius: 8,
                  borderRadius: (screenWidth, screenHeight) * 0.01,
                  // marginTop: 6,
                  // marginTop: "1.4%",
                  marginLeft: 3.1,
                  marginTop: 3.5,
                  marginLeft: screenWidth * 0.009,
                  marginTop: screenHeight * 0.004,
                  // backgroundColor:"red"
                  // marginLeft: "1.3%"
                }} />
                <Text style={{
                  marginLeft: 8,
                  marginTop: 10.5,
                  marginTop: screenHeight * 0.014,
                  marginLeft: "2.5%",
                  fontSize: RFValue(14),
                  fontFamily: "Raleway_500Medium",
                  fontWeight: "500",
                  color: "#0F2944",
                  lineHeight: RFValue(16.44) ,
                }}> {item.lostItem}</Text>




                <Text style={{
                  position: "absolute",
                  // right: "3.5%",
                  marginTop: 10.5,
                  right: 13,
                  marginTop: 10.5,
                  right: screenWidth * 0.037,
                  color: "#6A707C",
                  fontSize: RFValue(12),
                  fontFamily: "Raleway_400Regular",
                  lineHeight:  RFValue(14),
                }}>
                  {item.date ? moment(item.date.toDate()).format("D MMM YYYY") : 'Date not available'}
                </Text>
              </View>


              <Image
                style={{
                  width: 13,
                  height: 13,
                  width: screenWidth * 0.037,
                  height: screenHeight * 0.017,
                  // alignSelf: "center",
                  resizeMode: "contain",
                  position: "absolute",
                  left: 63.5,
                  bottom: 8.5,
                  left: screenWidth * 0.18,
                  bottom: screenHeight * 0.011,
                  resizeMode: "contain",
                  //  backgroundColor:"red"
                }}

                source={require('../../assets/locate.png')} />

              <Text style={{
                color: "#6A707C",
                fontFamily: "Raleway_400Regular",
                fontSize: RFValue(12),
                lineHeight: RFValue( 14.09),
                marginLeft: "1%",
                position: "absolute",
                bottom: 8.5,
                bottom: screenHeight * 0.011,
                left: 76,
                left: screenWidth * 0.216,
              }}>{item.location}</Text>

              <TouchableOpacity style={{
                position: "absolute",
                // backgroundColor:"red",
                right: 14.2,
                right: screenWidth * 0.038,
                bottom: 8.5
              }}>
                <Text style={styles.detailbtb}>View Details</Text>
              </TouchableOpacity>



              <View style={styles.SecondView}>






              </View>

            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>No results found</Text>
      )}

    </View>
);
};

const styles = StyleSheet.create({
  userContainer: {
    backgroundColor: "grey",
    marginVertical: 10,
    borderRadius: 30,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    margin: 10,
  },
  backgroundImage: {
    // resizeMode: "contain",
    width: 179,
    height: 197,
    margin: 4,
    // flex: 1,
    // resizeMode: 'cover',
    borderRadius: 10,




  },
  container: {
    flex: 1,
    backgroundImage: 'url("../../assets/LostApp/GlassesBg.png")',
    backgroundSize: 'cover',
    width: 100,
    height: 100
  },

  headingtxt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,



  },
  headingtxt2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  sndtxt2: {
    paddingHorizontal: 10,
  },
  sndtxt: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    padding: 5,
    borderBottomColor: '#E0E0E0',
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 8,
  },
  image2: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 8
  },
  title: {
    fontSize: RFValue(16),
    position: "absolute",
    color: "#FFFFFF",
    fontWeight: "500",
    // lineHeight: 16,
    left: 10,
    bottom: 45

  },

  date: {
    fontSize: RFValue(12),
    color: '#D7D7D7',
    position: "absolute",
    right: 9,
    bottom: 45
  },
  detailsbtn: {
    position: "absolute",
    backgroundColor: "#7689D6",
    height: 33,
    width: "91%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    left: 8,
    bottom: 9
  },
  heading: {
    fontSize: RFValue(12),
    fontWeight: "600",
  },
  itemTitle: {
    marginLeft: 8,
    // marginLeft: "2.7%",
    marginTop: 10.5,
    fontSize: RFValue(14),
    fontFamily: "Raleway_500Medium",
    fontWeight: "500",
    color: "#0F2944",
    lineHeight: 16.44,
    // backgroundColor:"red"
  },
  itemDate: {
    position: "absolute",
    // right: "3.5%",
    top: 10.5,
    right: 13,
    color: "#6A707C",
    fontSize: RFValue(12),
    fontFamily: "Raleway_400Regular",
    lineHeight: 14,
    // backgroundColor:"red"


  },
  SecondView: {
    flexDirection: "row",
    // bottom: 21,
    bottom: "6%",
    marginLeft: 65,
    marginLeft: "20.2%",
    // backgroundColor:"red"
  },
  LocationImg: {
    height: 12,
    width: 12,
    marginTop: 2
  },
  Locationtxt: {
    color: "#6A707C",
    fontFamily: "Raleway_400Regular",
    fontSize: RFValue(12),
    lineHeight: 14.09,
    marginLeft: "1%",
    position: "absolute", bottom: 8.5, left: 76
    // backgroundColor:"yellow"

  },
  detailsView: {
    position: "absolute",
    // backgroundColor:"red",
    right: 14.2,
    bottom: 8.5
  },
  detailbtb: {
    color: "#FE9003",
    fontSize: RFValue(12),
    fontFamily: "Raleway_600SemiBold",
    // lineHeight:10.63,

    lineHeight: RFValue(14.09)


  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: RFValue(15),
    fontFamily: "Urbanist_400Regular",
    color: "#8391A1"

  },
  itemtype: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: RFValue(10),
    fontFamily: "Urbanist_400Regular",
    color: "#7689D6",
    marginLeft: "0.5%",


  },



})

export default Laptop;
