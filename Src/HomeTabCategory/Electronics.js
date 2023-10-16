import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image,Dimensions,FlatList } from 'react-native'
import { Asset } from 'expo-asset';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect,useState } from 'react';
import {
  Urbanist_300Light,Urbanist_400Regular,Urbanist_500Medium,Urbanist_600SemiBold,Urbanist_700Bold, 
} from  '@expo-google-fonts/urbanist';
import { useFonts } from  '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";



const myArray = [
  {
    name: 'Glasses',
    date: '3 July 2023',
    image: require('../../assets/LostApp/GlassesBg.png'),
    Shadow: require('../../assets/LostApp/Shadow.png'),
    type: 'Lost'

  },
  {
    name: 'Glasses',
    date: '3 July 2023',
    image: require('../../assets/LostApp/GlassesBg.png'),
    Shadow: require('../../assets/LostApp/Shadow.png'),
    type: 'Lost'

  },
  {
    name: 'Glasses',
    date: '3 July 2023',
    image: require('../../assets/LostApp/GlassesBg.png'),
    Shadow: require('../../assets/LostApp/Shadow.png'),
    type: 'Lost'

  },
];




const LostItem = [
  {
    id: 1,
    imagepath1: require("../../assets/LostApp/GlassesBg.png"),
    Title: "Glasses",
    imagepath:require("../../assets/LostApp/Locationtwo.png"),
    date: "3 july, 2023",
    Location: "1.8 km",
  },
  {
    id: 2,
    imagepath1: require("../../assets/LostApp/GlassesBg.png"),
    Title: "Glasses",
    imagepath:require("../../assets/LostApp/Locationtwo.png"),
    date: "3 july, 2023",
    Location: "1.8 km",
  },
  {
    id: 3,
    imagepath1: require("../../assets/LostApp/GlassesBg.png"),
    Title: "Glasses",
    imagepath:require("../../assets/LostApp/Locationtwo.png"),
    date: "3 july, 2023",
    Location: "1.8 km",
  },
  {
    id: 4,
    imagepath1: require("../../assets/LostApp/GlassesBg.png"),
    Title: "Glasses",
    imagepath:require("../../assets/LostApp/Locationtwo.png"),
    date: "3 july, 2023",
    Location: "1.8 km",
  },
  {
    id: 5,
    imagepath1: require("../../assets/LostApp/GlassesBg.png"),
    Title: "Glasses",
    imagepath:require("../../assets/LostApp/Locationtwo.png"),
    date: "3 july, 2023",
    Location: "1.8 km",
  },
  {
    id: 6,
    imagepath1: require("../../assets/LostApp/GlassesBg.png"),
    Title: "Glasses",
    imagepath:require("../../assets/LostApp/Locationtwo.png"),
    date: "3 july, 2023",
    Location: "1.8 km",
  },
  {
    id: 7,
    imagepath1: require("../../assets/LostApp/GlassesBg.png"),
    Title: "Glasses",
    imagepath:require("../../assets/LostApp/Locationtwo.png"),
    date: "3 july, 2023",
    Location: "1.8 km",
  },
  {
    id: 8,
    imagepath1: require("../../assets/LostApp/GlassesBg.png"),
    Title: "Glasses",
    imagepath:require("../../assets/LostApp/Locationtwo.png"),
    date: "3 july, 2023",
    Location: "1.8 km",
  },
  {
    id: 9,
    imagepath1: require("../../assets/LostApp/GlassesBg.png"),
    Title: "Glasses",
    imagepath:require("../../assets/LostApp/Locationtwo.png"),
    date: "3 july, 2023",
    Location: "1.8 km",
  },
 
];



const Electronics = () => {
  const navigation = useNavigation();

  // const screenWidth = Dimensions.get('window').width;
  // const boxWidth = (screenWidth * 0.50);
  // const box_two_Width = (screenWidth * 0.89);

  // const screenHeight = Dimensions.get('window').height;
  // const boxHeight = screenHeight * 0.27; 
  // const box_two_hieght = screenHeight * 0.07; 
  
  const screenWidth = Dimensions.get('window').width;
  const box_Width = (screenWidth * 0.95);
  const boxWidth = (screenWidth * 0.50);
  const screenHeight = Dimensions.get('window').height;
  const boxHeight = screenHeight * 0.27; 

  let [fontsLoaded] = useFonts({
    Urbanist_300Light,Urbanist_400Regular,Urbanist_500Medium,Urbanist_600SemiBold,Urbanist_700Bold,  
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


  const RenderLostItem = ({ item }) => {

    return (
      <View style={{
        // flexDirection: "column",
        height: 55.48,
        height: screenHeight * 0.08,
        width: "92%",
        borderRadius: 5,
        borderColor: "#E8ECF4",
        backgroundColor: "white",
        elevation: 3,
        marginBottom: 10,
        alignSelf:"center",
      }}>
        <View style={{ flexDirection: "row" }}>
          <Image source={item.imagepath1} style={{
            // height: 48.16,
            height: screenHeight*0.068,
            width: 50.25,
            width:  screenWidth*0.14,
            borderRadius: 8,
            marginTop: 6,
            marginTop: "1.4%",
            marginLeft: 5,
            marginLeft: "1.3%"
          }} />
          <Text style={styles.itemTitle}>{item.Title}</Text>
          <Text style={styles.itemDate}>{item.date}</Text>
        </View>
        <View style={styles.SecondView}>
          <Image source={item.imagepath}
            style={{
              // height: 12,
              height: screenHeight * 0.015,
              // width: 12,
              width: screenWidth*0.03,
              marginTop: 2
              
            }}
          />
          <Text style={styles.Locationtxt}>{item.Location}</Text>
          <TouchableOpacity style={styles.detailsView}>
            <Text style={styles.detailbtb}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>


    )
  }


  return (
    <View style={{ marginTop: "3.4%" }}>
      <View style={{ flexDirection: "row" }}>

        <Text style={{
          position: "relative",
          fontSize: RFValue(14) ,
          fontFamily:"Urbanist_600SemiBold",
          // lineHeight: 16.44,
          color: "#000000",
          marginLeft: "4%"
        }}>Recent Ads</Text>
        <TouchableOpacity style={{position:"absolute",right: "4%" }}>

          <Text style={{
            position: "relative",

            fontSize: RFValue(12) ,
            fontFamily:"Urbanist_400Regular",
            // lineHeight: 14.09,
            color: "#858585",

          }}>See more</Text>

        </TouchableOpacity>
      </View>




      <ScrollView horizontal showsHorizontalScrollIndicator={false}  >



        <View style={{ flexDirection: "row", position: "relative", marginTop: "1.5%",marginLeft:10 }}>

          {myArray.map((item, index) => (
            <View style={{
              position: "relative",
              // width: 179,
              width:boxWidth,
              height: screenHeight * 0.27,
              // height:boxHeight,
              borderRadius: 8,
              backgroundColor: "blue",

              marginLeft: screenWidth*0.02,

            }}
              key={index} >


              <Image
                style={{

                  width: "100%",
                  height: "100%",
                  borderRadius: 8
                }}
                source={item.image} />

              <Image
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "70%",
                  borderRadius: 10,
                  bottom:0
                }}
                source={item.Shadow} />


              <Text
                style={{
                  fontFamily:"Urbanist_500Medium",
                  fontSize: RFValue(14) ,
                  // lineHeight: 16.44,
                  position: "absolute",
                  // left: 10,
                  left:"7%",
                  // bottom: 42,
                  bottom:"21.5%",
                  color: "white",


                }}
              >{item.name}</Text>


              <Text
                style={{
                  fontFamily:"Urbanist_400Regular",
                  fontSize: RFValue(10) ,
                  // lineHeight: 11.74,
                  position: "absolute",
                  right: 9,
                  right:"5.1%",
                  // bottom: 45,
                  bottom:"22.5%",
                  color: "#D7D7D7"

                }}
              >{item.date}</Text>

              <View
                style={{
                  backgroundColor: "#8DA4BC",
                  // width: 31,
                  width:  screenWidth * 0.09,
                  // height: 17.04,
                  height: screenHeight * 0.024,
                  position: "absolute",
                  // right: 17,
                  right:"9%",
                  // top: 12,
                  top: "6%",
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: RFValue(9) ,
                    // lineHeight: 10.63,
                    color: "#FFFFFF"

                  }}
                >{item.type}</Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("ItemDetail")}

                style={{
                  backgroundColor: '#7689D6',
                  // width: 163,
                  width: "91%",
                  // height: 29,
                  height: boxHeight*0.15,
                  borderRadius: 8,
                  position: "absolute",
                  // right: 8,
                  bottom:"5%",
                  justifyContent: "center",
                  alignSelf:"center"

                }}>

                <Text style={{
                  color: "white",
                  alignSelf: "center",
                    fontSize: RFValue(10) ,
                  fontFamily:"Urbanist_500Medium",
                  // lineHeight: 12
                }}>View details</Text>
              </TouchableOpacity>
            </View>
          ))}




        </View>
      </ScrollView>





      <View style={{ flexDirection: "row", marginTop: 0 ,marginBottom:9}}>

        <Text style={{
          position: "relative",
          fontSize: RFValue(14) ,
          fontFamily:"Urbanist_600SemiBold",
          // lineHeight: 16.44,
          color: "#000000",
          marginLeft: "4%"
        }}>Lost Items Near me</Text>
        <TouchableOpacity  style={{position:"absolute",right: "4%" }}>

          <Text style={{
            position: "relative",

            fontSize: RFValue(12) ,
            fontFamily:"Urbanist_400Regular",
            // lineHeight: 14.09,
            color: "#858585",

          }}>See more</Text>

        </TouchableOpacity>
      </View>


      <FlatList
      style={{ height: "60%", }}
      data={LostItem}
      keyExtractor={(item) => item.id}
      renderItem={RenderLostItem}
    />

      

    </View>
  )
}


const styles = StyleSheet.create({
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
    fontSize: RFValue(16) ,
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
       fontSize: RFValue(12) ,
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
    fontSize: RFValue(12) ,
    fontWeight: "600",
  },
  LostListView: {
   
  },
  ItemImage: {
   
  },
  itemTitle: {
    marginLeft: 10,
    marginLeft:"3%",
    marginTop: 12,
    fontSize: RFValue(14) ,
    fontFamily:"Urbanist_500Medium"
  },
  itemDate: {
    position: "absolute",
    right:"3.5%",
    top:11.3,
    color: "#8391A1",
    fontSize: 10,
    fontFamily:"Urbanist_400Regular",
    fontSize: RFValue(10) ,
  },
  SecondView: {
    flexDirection: "row",
    // bottom: 21,
    bottom:"6%",
    marginLeft: 65,
    marginLeft:"20%",
    // backgroundColor:"red"
  },
  LocationImg: {
    height: 12,
    width: 12,
    marginTop: 2
  },
  Locationtxt: {
    color: "#8391A1",
    fontFamily:"Urbanist_400Regular",
    fontSize: RFValue(10) ,

  },
  detailsView: {
    position: "absolute",
    right: 13,
    right:"5%"
  },
  detailbtb: {
    color: "#8391A1",
    fontSize: RFValue(9) ,
    fontFamily:"Urbanist_400Regular",
    // lineHeight:10.63,
right:-7
    

  }
  
  

})
export default Electronics;