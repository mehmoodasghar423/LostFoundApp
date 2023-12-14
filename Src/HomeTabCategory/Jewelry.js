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





const Jewelry = ({ searchQuery, handleSearch, selectedType, selectedLocation, categoryselectedButton,selectedTypeButton,selectedCityState ,leftMarkerDate,rightMarkerDate}) => {
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
    <View style={{ height:screenHeight*0.7, marginTop: screenHeight*0.01 ,paddingBottom:screenHeight*0.01}}>
      {isLoading ? ( // Show loading icon when data is loading
        <ActivityIndicator size="large" color="#7689D6" />
      ) : filteredData.length > 0 ? ( // Data is available, render the data
        <FlatList
          data={filteredData.filter(item => item.lostItem && item.category === 'Jewelry')} // Filter out items where lostItem is empty
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                height: 55.48,
                height: screenHeight * 0.08,
                width: "92%",
                borderRadius: 5,
                borderColor: "#E8ECF4",
                backgroundColor: "white",
                elevation: 3,
                marginBottom: 10,
                alignSelf: "center",
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
                });
              }}
            >


              <View style={{ flexDirection: "row" }}>
                <Image source={{ uri: item.imageUrl1 }} style={{
                  height: screenHeight * 0.068,
                  width: 50.25,
                  width: screenWidth * 0.14,
                  borderRadius: 8,
                  marginTop: 6,
                  marginTop: "1.4%",
                  marginLeft: 5,
                  marginLeft: "1.3%"
                }} />
                <Text style={styles.itemTitle}> {item.lostItem}</Text>
           
                <View  style={{backgroundColor:"#778899",borderRadius:10,marginLeft:"4.5%",position:"absolute",bottom:screenHeight*0.002,
                height:screenHeight*0.015,alignItems:"center",justifyContent:"center"}}>
                <Text style={{ fontFamily: "Urbanist_600SemiBold", fontSize: RFValue(9),color:"white" }}
                >{item.Type}</Text>
                
                </View>

                
                <Text style={styles.itemDate}>
                {item.date ? moment(item.date.toDate()).format("D MMM YYYY") : 'Date not available'}
              </Text>
              </View>


              <View style={styles.SecondView}>
              <Ionicons name="md-location-sharp" 
                size={RFValue(11)}
              color="#8391A1"
              style={{
                marginTop: screenHeight*0.0015,marginRight:screenWidth*0.003
              }}
            />
                



                <Text style={styles.Locationtxt}>{item.location}</Text>
                <TouchableOpacity style={styles.detailsView}>
                  <Text style={styles.detailbtb}>View Details</Text>
                </TouchableOpacity>
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
  type: {
    fontSize: 14,
    color: '#858585',
    position: "absolute",
    backgroundColor: "#D7D7D7",
    width: 45,
    height: 25,
    borderRadius: 8,
    paddingLeft: 8,
    right: 12,
    top: 12,
    paddingTop: 3

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
  LostListView: {

  },
  ItemImage: {

  },
  itemTitle: {
    marginLeft: 10,
    marginLeft: "3%",
    marginTop: 12,
    fontSize: RFValue(14),
    fontFamily: "Urbanist_500Medium"
  },
  itemDate: {
    position: "absolute",
    right: "3.5%",
    top: 11.3,
    color: "#8391A1",
    fontSize: 10,
    fontFamily: "Urbanist_400Regular",
    fontSize: RFValue(10),
  },
  SecondView: {
    flexDirection: "row",
    // bottom: 21,
    bottom: "6%",
    marginLeft: 65,
    marginLeft: "20%",
    // backgroundColor:"red"
  },
  LocationImg: {
    height: 12,
    width: 12,
    marginTop: 2
  },
  Locationtxt: {
    color: "#8391A1",
    fontFamily: "Urbanist_400Regular",
    fontSize: RFValue(10),
    // backgroundColor:"yellow"

  },
  detailsView: {
    position: "absolute",
    right: 13,
    right: "5%"
  },
  detailbtb: {
    color: "#8391A1",
    fontSize: RFValue(9),
    fontFamily: "Urbanist_400Regular",
    // lineHeight:10.63,
    right: -7


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



export default Jewelry;
