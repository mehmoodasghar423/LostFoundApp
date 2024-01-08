import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import moment from 'moment';





const Lost = () => {
  const [userDataList, setUserDataList] = useState([]);
  const navigation = useNavigation();

  const screenWidth = Dimensions.get('window').width;
  const box_Width = (screenWidth * 0.95);
  const screenHeight = Dimensions.get('window').height;
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userUID = user.uid;
      const userRef = firebase.firestore().collection("UserData").where("uid", "==", userUID);
      setIsLoading(true); // Start loading

      userRef.onSnapshot((querySnapshot) => {
        const userDataArray = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          userDataArray.push({ id: doc.id, ...data });
        });
        setUserDataList(userDataArray);
        setIsLoading(false);

      });
    }
  }, []);



  const deleteRecord = (documentId) => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection("UserData").doc(documentId);
      userRef.delete()
        .then(() => {

        })
        .catch(error => {
          console.error("Error deleting data in Firestore: ", error);
        });
    }
  };


  const editRecord = (documentId) => {
    const selectedItem = userDataList.find(item => item.id === documentId);
    if (selectedItem) {
      navigation.navigate('LostPostNextEdit', {
        documentId: selectedItem.id,
        categorycontainer: selectedItem.category,
        lostItemcontainer: selectedItem.lostItem,
        location: selectedItem.location,
        date: selectedItem.date,
        time: selectedItem.time,
        descriptioncontainer: selectedItem.description,
        imageUrl1: selectedItem.imageUrl1,
        imageUrl2: selectedItem.imageUrl2,
        imageUrl3: selectedItem.imageUrl3,
      });
    }
  };
  

  // Filter the data
  const filteredUserDataList = userDataList.filter(item => item.Type === 'Lost');

  // Check if data exists before sorting and rendering
  let sortedUserDataList = [];
  if (filteredUserDataList && filteredUserDataList.length > 0) {
    sortedUserDataList = filteredUserDataList.sort((a, b) => {
      const dateA = a.date ? a.date.toDate() : new Date(0);
      const dateB = b.date ? b.date.toDate() : new Date(0);
      return dateB - dateA;
    });
  }



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
    <View style={{ backgroundColor: "white", height: screenHeight * 0.9 }}>
      <View style={{ justifyContent: "center", alignItems: "center",height:screenHeight*0.75 }}>

        {isLoading ? (
          <ActivityIndicator size="large" color="#FE9003" />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={sortedUserDataList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  position: "relative",
                  width: screenWidth*0.9,
                  height: screenHeight * 0.106,
                  borderRadius: 8,
                  backgroundColor: "white",
                  // elevation: 1,
                  marginTop: screenHeight*0.008,
                  borderWidth:1,
                borderWidth: (screenWidth, screenHeight) * 0.0012,
                  borderColor:"#E0E0E0"
                }}
                onPress={() => {
                  navigation.navigate('DetailsScreen', {
                    category: item.category,
                    location: item.location,
                    date: item.date,
                    time: item.time,
                    lostItem: item.lostItem,
                    description: item.description,
                    imageUrl1: item.imageUrl1,
                    imageUrl2: item.imageUrl2,
                    imageUrl3: item.imageUrl3,
                  });
                }}
              >



                <Image source={{ uri: item.imageUrl1 }} style={{
                  width: screenWidth * 0.175,
                  height: screenHeight * 0.086,
                  borderRadius: 10,
                  position: "absolute",
                  marginLeft: "1.7%",
                  marginTop: "1%",

                }} />


                <Text style={{
                  fontFamily: "Urbanist_500Medium",
                  fontSize: RFValue(14),
                  // lineHeight: 16.8,
                  position: "absolute",
                  // left: 79,
                  marginLeft: "26.5%",
                  top: screenHeight * 0.015,
                  color: "black",
                }}> {item.lostItem}</Text>


                <Text style={{
                  fontFamily: "Urbanist_400Regular",
                  fontSize: RFValue(8),
                  position: "absolute",
                  marginLeft: "28%",
                  top: screenHeight * 0.046,
                  color: "#1E1F4B",
                }}>
                  {item.date ? moment(item.date.toDate()).format("Do MMMM YYYY") : 'Date not available'}
                </Text>

                <Ionicons name="md-location-sharp" 
                size={RFValue(11)}
              color="#FE9003"
              style={{
                position: "absolute",
                left: screenWidth * 0.245,
                top: screenHeight * 0.073,
              }}
            />



                <Text style={{
                  fontFamily: "Urbanist_400Regular",
                  fontSize: RFValue(8),
                  position: "absolute",
                  left: screenWidth * 0.279,
                  top: screenHeight * 0.073,
                  color: "#FE9003",
                }}>{item.location}</Text>



                <TouchableOpacity
                  onPress={() => editRecord(item.id)}

                  style={{

                    position: "absolute",
                    right: screenWidth * 0.03,
                    top: screenHeight * 0.013,
                    justifyContent: "center",
                    width: screenWidth * 0.07,
                    height: screenHeight * 0.038,
                    // backgroundColor:"red"
                  }}>

                 

                  <MaterialCommunityIcons name="circle-edit-outline"
                  size={RFValue(24)}
                  color="#0F2944"
                  style={{
                    // position: "absolute",
                    // marginLeft: screenWidth * 0.0011
                    // left: "35%",
                  }}
                />



                </TouchableOpacity>

               

                <TouchableOpacity
                  onPress={() => deleteRecord(item.id)}

                  style={{

                    position: "absolute",
                    right: screenWidth * 0.03,
                    bottom: screenHeight * 0.014,
                    justifyContent: "center",
                    // backgroundColor:"red",
                    width: screenWidth * 0.07,
                    height: screenHeight * 0.038,
                  }}>

                  <MaterialCommunityIcons name="delete"
                  size={RFValue(24)}
                  color="#FE9003"
                  style={{
                    // position: "absolute",
                    // marginLeft: screenWidth * 0.0011
                    // left: "35%",
                  }}
                />

                </TouchableOpacity>


              </View>
            )}
          />
        )}
      </View>




    </View>
  )
}

export default Lost

const styles = StyleSheet.create({})