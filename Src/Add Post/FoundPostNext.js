import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Pressable, Alert, Modal, Dimensions } from 'react-native'
// import React,{useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";



const FoundPostNext = () => {

  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;


  const handleGoBack = () => {
    navigation.goBack();
  };

  const [modalVisible, setModalVisible] = useState(false);

  const [lostItem, setlostItem] = useState('');
  const [description, setdescription] = useState('')

  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied!');
      }
    })();
  }, []);


  const GallerypickImage1 = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setSelectedImage1(result.uri);
      setModalVisible(!modalVisible);
    }

  };


  const CamerapickImage1 = async () => {
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setSelectedImage1(result.uri);
      setModalVisible(!modalVisible)
    }

  };


  const pickImage2 = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setSelectedImage2(result.uri);
    }

  };
  const pickImage3 = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setSelectedImage3(result.uri);
    }

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

        <View style={{ flexDirection: "row", position: "relative", alignItems: "center", marginTop: "5%", }}>


          <TouchableOpacity onPress={handleGoBack}>
            <Image style={{
              width: 41,
              width: screenWidth * 0.11,
              height: 41,
              height: screenHeight * 0.057,
              // top: 20,
              left: "40%"

            }}
              source={require("../../assets/LostApp/back.png")} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: RFValue(18),
              fontFamily: "Urbanist_600SemiBold",
              // lineHeight: 20,
              // width: 280,
              // left: 18,
              // top: 1,
              marginLeft: "30%",


            }}
          >
            Found Post
          </Text>
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
          Name
        </Text>

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
          position: "relative",
          top: screenHeight * 0.04,
          paddingLeft: screenWidth * 0.05,
          letterSpacing: 0.1,
          color: "#8C9199",
          // marginLeft: "6%"
          alignSelf: "center",
        }}

          placeholder='Enter Found item Name '
          placeholderTextColor="#8391A1"
          value={lostItem}
          onChangeText={text => setlostItem(text)}
        />



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
          Description
        </Text>

        <TextInput
          multiline
          style={{
            backgroundColor: "#EDEEEF",
            borderWidth: 1,
            borderColor: "#EDEEEF",
            width: "91%",
            // width:279,
            height: 38,
            height: screenHeight * 0.16,
            borderRadius: 8,
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            position: "relative",
            top: screenHeight * 0.073,
            paddingLeft: screenWidth * 0.05,
            letterSpacing: 0.1,
            color: "#8C9199",
            // marginLeft: "6%"
            alignSelf: "center"
          }}
          placeholder='Enter Description '
          placeholderTextColor="#8391A1"
          value={description}
          onChangeText={text => setdescription(text)}

        />















        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            left: "6%",
            position: "relative",
            top: screenHeight * 0.1
            // position: "absolute",
            // top: 164,

          }}
        >
          Upload Photos
        </Text>


        <View style={{

          position: "relative",
          top: screenHeight * 0.12,
          left: "6%",
          flexDirection: "row"
        }}>









          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              // Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>


            <View style={{
              // backgroundColor:"red",
              alignItems: "center"
            }}>
              <View style={{
                // margin: 20,
                backgroundColor: 'white',
                borderRadius: 20,
                top:screenHeight*0.43,
                paddingVertical: screenHeight * 0.03,
                alignItems: 'center',
                shadowColor: '#000',
                width: screenWidth * 0.65,
                height: screenHeight * 0.189,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}
                  style={{ position: "absolute",right:screenWidth*0.03,top:screenHeight*-0.02 }} >
                  <Image style={{  width: screenWidth * 0.06, height: screenHeight * 0.1, tintColor: "#7689D6",resizeMode:"contain" ,}}
                    source={require('../../assets/LostApp/Close.png')}
                  />
                </TouchableOpacity>


                <TouchableOpacity onPress={GallerypickImage1}
                  style={{ flexDirection: "row",marginTop:"3%" }}>
                  <Image style={{ width: screenWidth * 0.055, height: screenHeight * 0.02, marginRight: screenWidth*0.012,resizeMode:"contain" }}
                    source={require('../../assets/LostApp/Gallery.png')}
                  />

                  <Text style={{ fontFamily: "Urbanist_500Medium", fontSize: RFValue(12),  }}>Gallery</Text>


                </TouchableOpacity>

                <Image style={{ width: "80%", marginTop: "7.5%",height:screenHeight*0.003}}
                  source={require('../../assets/LostApp/Linee.png')}
                />

                <TouchableOpacity onPress={CamerapickImage1}
                  style={{ flexDirection: "row", marginTop: "7%" }}>
                  <Image style={{ width: screenWidth * 0.055, height: screenHeight * 0.02, marginRight: screenWidth*0.012,resizeMode:"contain" }}
                    source={require('../../assets/LostApp/Cameraa.png')}
                  />
                  <Text style={{ fontFamily: "Urbanist_500Medium", fontSize: RFValue(12), }}>Camera</Text>
                </TouchableOpacity>

              </View>
            </View>
          </Modal>












          <View style={{ width: screenWidth * 0.19, height: screenHeight * 0.087, backgroundColor: "#E8ECF4", alignItems: "center", justifyContent: "center", borderRadius: 8, marginRight: 10 }}>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image style={{
                width: screenWidth * 0.06,
                height: screenHeight * 0.03,
                resizeMode: "contain"
              }}
                source={require("../../assets/LostApp/UploadIcon.png")} />
            </TouchableOpacity>

            {selectedImage1 && <Image
              source={{ uri: selectedImage1 }}
              style={{
                width: screenWidth * 0.19, height: screenHeight * 0.087,
                alignSelf: "center",
                borderRadius: 8,
                position: "absolute"
              }}

            />}
          </View>


          <View style={{ width: screenWidth * 0.19, height: screenHeight * 0.087, backgroundColor: "#E8ECF4", alignItems: "center", justifyContent: "center", borderRadius: 8, marginRight: 10 }}>
            <TouchableOpacity onPress={pickImage2}>
              <Image style={{
                width: screenWidth * 0.06,
                height: screenHeight * 0.03,
                resizeMode: "contain"
              }}
                source={require("../../assets/LostApp/UploadIcon.png")} />
            </TouchableOpacity>

            {selectedImage2 && <Image
              source={{ uri: selectedImage2 }}
              style={{
                width: screenWidth * 0.19, height: screenHeight * 0.087,
                alignSelf: "center",
                borderRadius: 8,
                position: "absolute"
              }}

            />}
          </View>

          <View style={{ width: screenWidth * 0.19, height: screenHeight * 0.087, backgroundColor: "#E8ECF4", alignItems: "center", justifyContent: "center", borderRadius: 8, marginRight: 10 }}>
            <TouchableOpacity onPress={pickImage3}>
              <Image style={{
                width: screenWidth * 0.06,
                height: screenHeight * 0.03,
                resizeMode: "contain"
              }}
                source={require("../../assets/LostApp/UploadIcon.png")} />
            </TouchableOpacity>

            {selectedImage3 && <Image
              source={{ uri: selectedImage3 }}
              style={{
                width: screenWidth * 0.19, height: screenHeight * 0.087,
                alignSelf: "center",
                borderRadius: 8,
                position: "absolute"
              }}

            />}
          </View>





        </View>




        <TouchableOpacity
          onPress={() => navigation.navigate("MyAds")}

          style={{
            // position: "absolute",
            // top: 427,
            position: 'relative',
            top: screenHeight * 0.17,
            borderRadius: 8,
            backgroundColor: '#7689D6',
            height: screenHeight * 0.059,
            alignSelf: "center",
            width: "93%",
            justifyContent: "center"
          }}><Text style={{
            fontSize: RFValue(15),
            fontFamily: 'Urbanist_600SemiBold',
            // lineHeight: 18,
            alignSelf: "center",
            color: '#F9F9F9',


          }}
          >Publish </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  centeredView: {

    // justifyContent: 'center',
    // alignItems: 'center',
    // position: "relative",
    // top:screenHeight
  },
  modalView: {


  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default FoundPostNext;