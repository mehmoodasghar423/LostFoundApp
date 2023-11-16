import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Pressable, Alert, Modal, Dimensions ,ActivityIndicator} from 'react-native'
// import React,{useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { firebase } from '../../config';
import 'firebase/storage';



const LostPostNextEdit = ({ route,navigation}) => {
    const { documentId } = route.params;
  // const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
// console.log(documentId);
  const [lostItem, setlostItem] = useState('');
  const [description, setdescription] = useState('')
  const [image1, setImage1] = useState(null); 
  const [image2, setImage2] = useState(null); 
  const [image3, setImage3] = useState(null); 
  const { category, location,date,time } = route.params;


  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isImageUploading2, setIsImageUploading2] = useState(false);
  const [isImageUploading3, setIsImageUploading3] = useState(false);


  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  

  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    setUser(currentUser);
  }, []);


  const handleGoBack = () => {
    navigation.goBack();
  };



  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection("UserData").doc(documentId);
      userRef.get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            setlostItem(data.lostItem);
            setdescription(data.description);
           setImage1(data.imageUrl1); // Set the URL of the first image
        setImage2(data.imageUrl2); // Set the URL of the second image
        setImage3(data.imageUrl3); // Set the URL of the third image
            // setImageUrl(data.imageUrl); // Set the image URL
          } else {
            console.error("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
    }
  }, [documentId]);








  const saveDataToFirestore = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userDataRef = firebase.firestore().collection("UserData").doc(documentId);

      const userData = {
        lostItem,
        description,
        imageUrl1: image1 ? image1 : null,
        imageUrl2: image2 ? image2 : null,
        imageUrl3: image3 ? image3 : null,
        uid: user.uid,
        category, 
        location,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        time
      };
  
      userDataRef.update(userData)
      .then(() => {
        navigation.navigate('MyAds');
      })
      .catch(error => {
        console.error("Error updating data in Firestore: ", error);
      });
    }
    };

  
  
  const [modalVisible, setModalVisible] = useState(false);

 



  const GallerypickImage1 = async () => {
    setIsImageUploading(true); // Set loading indicator to true
    setCurrentImageIndex(1); // Set the current image index
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
  
    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      setModalVisible(!modalVisible);
      const storageRef = firebase.storage().ref();
      const imageName = `${user.uid}/${new Date().getTime()}.jpg`;
      const imageRef = storageRef.child(imageName);
      const response = await fetch(selectedAsset.uri);
      const blob = await response.blob();
      await imageRef.put(blob);
      const imageUrl = await imageRef.getDownloadURL();
      setImage1(imageUrl);
      setIsImageUploading(false);
    } else {
      //if the user cancels the image selection
      setIsImageUploading(false); // Set loading indicator to false
      setCurrentImageIndex(null); // Reset the current image index
    
    }
  };


  const CamerapickImage1 = async () => {
    setIsImageUploading(true); // Set loading indicator to true
    setCurrentImageIndex(1); // Set the current image index
    
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
  
    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      setModalVisible(!modalVisible);
      const storageRef = firebase.storage().ref();
      const imageName = `${user.uid}/${new Date().getTime()}.jpg`;
      const imageRef = storageRef.child(imageName);
      const response = await fetch(selectedAsset.uri);
      const blob = await response.blob();
      await imageRef.put(blob);
      const imageUrl = await imageRef.getDownloadURL();
      setImage1(imageUrl);
      setIsImageUploading(false);
    } else {
      //if the user cancels the image selection
      setIsImageUploading(false); // Set loading indicator to false
      setCurrentImageIndex(null); // Reset the current image index
    
    }
  };
  const pickImage2 = async () => {
    setIsImageUploading2(true); // Set loading indicator to true
    setCurrentImageIndex(1); // Set the current image index
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
  
    if (!result.canceled) {
      const selectedAsset = result.assets[0];
     
      const storageRef = firebase.storage().ref();
      const imageName = `${user.uid}/${new Date().getTime()}.jpg`;
      const imageRef = storageRef.child(imageName);
      const response = await fetch(selectedAsset.uri);
      const blob = await response.blob();
      await imageRef.put(blob);
      const imageUrl = await imageRef.getDownloadURL();
      setImage2(imageUrl);
      setIsImageUploading2(false);
    } else {
      //if the user cancels the image selection
      setIsImageUploading2(false); // Set loading indicator to false
      setCurrentImageIndex(null); // Reset the current image index
    
    }
  };
  

  const pickImage3 = async () => {
    setIsImageUploading3(true); // Set loading indicator to true
    setCurrentImageIndex(1); // Set the current image index
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
  
    if (!result.canceled) {
      const selectedAsset = result.assets[0];
     
      const storageRef = firebase.storage().ref();
      const imageName = `${user.uid}/${new Date().getTime()}.jpg`;
      const imageRef = storageRef.child(imageName);
      const response = await fetch(selectedAsset.uri);
      const blob = await response.blob();
      await imageRef.put(blob);
      const imageUrl = await imageRef.getDownloadURL();
      setImage3(imageUrl);
      setIsImageUploading3(false);
    } else {
      //if the user cancels the image selection
      setIsImageUploading3(false); // Set loading indicator to false
      setCurrentImageIndex(null); // Reset the current image index
    
    }
  };
 

 
 
  ///



 
  


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
              marginLeft: "22%",


            }}
          >
          Lost Post Editing
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

          placeholder='Enter Lost item Name '
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

            {isImageUploading && currentImageIndex === 1 ? (
              <ActivityIndicator size="large" color="#7689D6"  style={{position:"absolute",}}/>
            ) : (
              image1 && (
                <Image
                  source={{ uri: image1 }}
                  style={{
                    width: screenWidth * 0.19,
                    height: screenHeight * 0.087,
                    alignSelf: "center",
                    borderRadius: 8,
                    position: "absolute",
                  }}
                />
              )
            )}
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

            {isImageUploading2 && currentImageIndex === 1 ? (
              <ActivityIndicator size="large" color="#7689D6"  style={{position:"absolute",}}/>
            ) : (
              image2 && (
                <Image
                  source={{ uri: image2 }}
                  style={{
                    width: screenWidth * 0.19,
                    height: screenHeight * 0.087,
                    alignSelf: "center",
                    borderRadius: 8,
                    position: "absolute",
                  }}
                />
              )
            )}
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

            {isImageUploading3 && currentImageIndex === 1 ? (
              <ActivityIndicator size="large" color="#7689D6"  style={{position:"absolute",}}/>
            ) : (
              image3 && (
                <Image
                  source={{ uri: image3 }}
                  style={{
                    width: screenWidth * 0.19,
                    height: screenHeight * 0.087,
                    alignSelf: "center",
                    borderRadius: 8,
                    position: "absolute",
                  }}
                />
              )
            )}
          </View>





        </View>




        <TouchableOpacity
          onPress={saveDataToFirestore}

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

export default LostPostNextEdit;