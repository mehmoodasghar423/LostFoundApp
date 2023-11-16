import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, Dimensions,FlatList ,ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config';

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
    navigation.navigate('LostPostEdit', { documentId });
  };


  const filteredUserDataList = userDataList.filter(item => item.Type === 'Lost');


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
    <View style={{backgroundColor:"white",height:screenHeight * 0.8}}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
      <FlatList
      showsVerticalScrollIndicator={false}
      data={filteredUserDataList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={{
            position: "relative",
            width: 300,
            height: screenHeight * 0.106,
            borderRadius: 8,
            backgroundColor: "white",
            elevation: 3,
            marginTop: 9,
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
              marginLeft:"1.7%",
              marginTop:"1%"
            }} />


            <Text style={{
              fontFamily: "Urbanist_500Medium",
              fontSize: RFValue(14),
              // lineHeight: 16.8,
              position: "absolute",
              // left: 79,
              marginLeft:"26.5%",
              top: screenHeight*0.015,
              color: "black",
            }}> {item.lostItem}</Text>
            
       
            <Text style={{
              fontFamily: "Urbanist_400Regular",
              fontSize: RFValue(8),
              position: "absolute",
              marginLeft:"28.3%",
              top: screenHeight*0.046,
              color: "#1E1F4B",
            }}>
            {item.date ? moment(item.date.toDate()).format("Do MMMM YYYY") : 'Date not available'}
            </Text>


         
        <Image source={require("../../assets/LostApp/Locationtwo.png")}
          style={{
            width:screenWidth*0.03,
                height:screenHeight*0.03,
                resizeMode:"contain",
                position: "absolute",
                left:screenWidth*0.232,
                top: screenHeight*0.063,
          }}
        />


        <Text style={{
          fontFamily: "Urbanist_400Regular",
          fontSize: RFValue(8),
          position: "absolute",
          left:screenWidth*0.268,
          top: screenHeight*0.067,
          color: "#8391A1",
        }}>{item.location}</Text>


       
        <TouchableOpacity
        onPress={() => editRecord(item.id)}

        style={{

          position: "absolute",
          right:screenWidth*0.09,
          top: screenHeight*0.013,
          justifyContent: "center",
          width: screenWidth*0.051,
          height:screenHeight*0.021,
// backgroundColor:"red"
        }}>

        <Image
          style={{
            tintColor: "#7689D6",
            alignSelf: "center",
            width: screenWidth*0.041,
            height:screenHeight*0.016,
            resizeMode:"contain"


          }}
          source={require('../../assets/LostApp/Editt.png')}
        />

      </TouchableOpacity>



      <TouchableOpacity
   onPress={() => deleteRecord(item.id)} 

      style={{

        position: "absolute",
        right:screenWidth*0.03,
        top: screenHeight*0.014,
        justifyContent: "center",
        // backgroundColor:"red",
        width: screenWidth*0.04,
        height:screenHeight*0.018,
      }}>

      <Image
        style={{

          alignSelf: "center",
          width: screenWidth*0.036,
          height:screenHeight*0.02,
          resizeMode:"contain"


        }}
        source={require('../../assets/LostApp/Delete.png')}
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