import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Pressable, Alert, Modal, Dimensions, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
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
import { firebase } from '../../config';
import 'firebase/storage';
import { Entypo, Ionicons, AntDesign,SimpleLineIcons  } from '@expo/vector-icons';
import { LoadingModal } from "react-native-loading-modal";
import Constants from 'expo-constants';




const API_ENDPOINT ='https://31d9-39-37-159-76.ngrok-free.app/api/v1/createpost'


const LostPostNext = ({ route }) => {

  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [modalVisible, setModalVisible] = useState(false);
  const [homemodalVisibleNew, sethomemodalVisibleNew] = useState(false);

  
  const [lostItem, setlostItem] = useState('');
  const [description, setdescription] = useState('')
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const { category, location, number, date, } = route.params;

  // console.log(date);
  const [loading, setLoading] = useState(false);
  const [isImageUploading1, setIsImageUploading1] = useState(false);
  const [isImageUploading2, setIsImageUploading2] = useState(false);
  const [isImageUploading3, setIsImageUploading3] = useState(false);


  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [imag1Error, setImage1Error] = useState('');

  const [showCrosImage1, setShowCrosImage1] = useState(false);
  const [showCrosImage2, setShowCrosImage2] = useState(false);
  const [showCrosImage3, setShowCrosImage3] = useState(false);


  const [cloudinaryUrl1, setCloudinaryUrl1] = useState(null);
  const [cloudinaryUrl2, setCloudinaryUrl2] = useState(null);
  const [cloudinaryUrl3, setCloudinaryUrl3] = useState(null);




  useEffect(() => {
    if (image1) {
      const timeout = setTimeout(() => {
        setShowCrosImage1(true);
      }, 1200);

      return () => clearTimeout(timeout);
    }
  }, [image1]);


  useEffect(() => {
    if (image2) {
      const timeout = setTimeout(() => {
        setShowCrosImage2(true);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [image2]);


  useEffect(() => {
    if (image3) {
      const timeout = setTimeout(() => {
        setShowCrosImage3(true);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [image3]);


  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    setUser(currentUser);
  }, []);


  const handleGoBack = () => {
    navigation.goBack();
  };


 




///1


  const pickImage1Gallery = async () => {
    setIsImageUploading1(true);
    setCurrentImageIndex(1);
  
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (status !== 'granted') {
        console.error('Permission to access media library was denied');
        setIsImageUploading1(false);
        setCurrentImageIndex(null);
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });
  
      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        setImage1(selectedAsset.uri);
        // console.log('url', selectedAsset.uri);
  
      // Now, upload the image to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary1(selectedAsset.uri);

    
    }

  } catch (error) {
      console.error('Error picking image:', error);
    } finally {
      setIsImageUploading1(false);
      setCurrentImageIndex(null);
    }
  };

  const pickImage1Camera = async () => {
    setIsImageUploading1(true);
    setCurrentImageIndex(1);
  
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (status !== 'granted') {
        console.error('Permission to access media library was denied');
        setIsImageUploading1(false);
        setCurrentImageIndex(null);
        return;
      }
  
      const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
  
      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        setImage2(selectedAsset.uri);
        // console.log('url', selectedAsset.uri);
  
      // Now, upload the image to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary1(selectedAsset.uri);

    
    }

  } catch (error) {
      console.error('Error picking image:', error);
    } finally {
      setIsImageUploading1(false);
      setCurrentImageIndex(null);
    }
  };
  
  const uploadToCloudinary1 = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('file', { uri: imageUri, name: 'image.jpg', type: 'image/jpeg' });
      formData.append('upload_preset', 'lossfound'); 
  
      const response = await fetch("https://api.cloudinary.com/v1_1/dca7xqlaw/image/upload", {
        method: 'post',
        body: formData,
      });
  
      const result = await response.json();
    // console.log(result);

    // Ensure that the 'secure_url' property is present in the Cloudinary response
    const cloudinaryUrl = result.url;
    if (!cloudinaryUrl) {
      throw new Error("Cloudinary URL not found in the response");
    }

    // Return the Cloudinary URL
    setCloudinaryUrl1(cloudinaryUrl)

  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};



///22


  const pickImage2 = async () => {
    setIsImageUploading2(true);
    setCurrentImageIndex(1);
  
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (status !== 'granted') {
        console.error('Permission to access media library was denied');
        setIsImageUploading2(false);
        setCurrentImageIndex(null);
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });
  
      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        setImage2(selectedAsset.uri);
        // console.log('url', selectedAsset.uri);
  
      // Now, upload the image to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary2(selectedAsset.uri);

    
    }

  } catch (error) {
      console.error('Error picking image:', error);
    } finally {
      setIsImageUploading2(false);
      setCurrentImageIndex(null);
    }
  };
  
  const uploadToCloudinary2 = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('file', { uri: imageUri, name: 'image.jpg', type: 'image/jpeg' });
      formData.append('upload_preset', 'lossfound'); 
  
      const response = await fetch("https://api.cloudinary.com/v1_1/dca7xqlaw/image/upload", {
        method: 'post',
        body: formData,
      });
  
      const result = await response.json();
    // console.log(result);

    // Ensure that the 'secure_url' property is present in the Cloudinary response
    const cloudinaryUrl = result.url;
    if (!cloudinaryUrl) {
      throw new Error("Cloudinary URL not found in the response");
    }

    // Return the Cloudinary URL
    setCloudinaryUrl2(cloudinaryUrl)

  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};



///33333333


  const pickImage3 = async () => {
    setIsImageUploading3(true);
    setCurrentImageIndex(1);
  
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (status !== 'granted') {
        console.error('Permission to access media library was denied');
        setIsImageUploading3(false);
        setCurrentImageIndex(null);
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });
  
      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        setImage3(selectedAsset.uri);
        // console.log('url', selectedAsset.uri);
  
      // Now, upload the image to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary3(selectedAsset.uri);

    
    }

  } catch (error) {
      console.error('Error picking image:', error);
    } finally {
      setIsImageUploading3(false);
      setCurrentImageIndex(null);
    }
  };
  
  const uploadToCloudinary3 = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('file', { uri: imageUri, name: 'image.jpg', type: 'image/jpeg' });
      formData.append('upload_preset', 'lossfound'); 
  
      const response = await fetch("https://api.cloudinary.com/v1_1/dca7xqlaw/image/upload", {
        method: 'post',
        body: formData,
      });
  
      const result = await response.json();
    // console.log(result);

    // Ensure that the 'secure_url' property is present in the Cloudinary response
    const cloudinaryUrl = result.url;
    if (!cloudinaryUrl) {
      throw new Error("Cloudinary URL not found in the response");
    }

    // Return the Cloudinary URL
    setCloudinaryUrl3(cloudinaryUrl)

  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};




const AddProducts = async (token) => {
 
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },

      body: JSON.stringify({
        item:lostItem,
        type: "Lost",
        category,
        date_added :date,
        city:location,
        country:"Pakistan",
        description,
        image:[ 
          {
            url: cloudinaryUrl1,
        },
          {
            url: cloudinaryUrl2,
        },
          {
            url: cloudinaryUrl3,
        },
          
       
      ]
      }),
    });

    if (response.ok) {
      Alert.alert('Success', 'Data added successfully to products');
   
     console.log('DATA ADDED SUCCESFULLY');
   
      navigation.navigate("Check");
    } else {
      console.log('Request Payload:', JSON.stringify({
        item: lostItem,
      }));
      Alert.alert('Error', 'Failed to add data');
      console.log('Response Status:', response.status);
      console.log('Response Text:', await response.text());
    }
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('Error', 'Something went wrong');
  }
};




  


  const saveDataToFirestore = () => {
    let isValid = true;

    if (!lostItem) {
      setNameError('Please Enter a name');
      isValid = false;
    } else {
      setNameError(''); // Clear the error
    }

    if (!description) {
      setDescriptionError('Please enter a description');
      isValid = false;
    } else {
      setDescriptionError(''); // Clear the error
    }

    if (isValid) {
      setLoading(true); // Set loading to true before Firestore operation
      const user = firebase.auth().currentUser;
      if (user) {
        const userData = {
          lostItem,
          description,
          imageUrl1: image1 ? image1 : null,
          imageUrl2: image2 ? image2 : null,
          imageUrl3: image3 ? image3 : null,
          uid: user.uid,
          category,
          location,
          date: firebase.firestore.Timestamp.fromDate(new Date(date)),
          Type: "Lost"
        };

        // Add a new document to Firestore
        firebase.firestore().collection("UserData").add(userData)
          .then(() => {
            setLoading(false); // Set loading to false after Firestore operation
            navigation.navigate('MyAds', { initialButton: 'lost' });
          })
          .catch(error => {
            setLoading(false); // Set loading to false on error
            console.error("Error adding document to Firestore: ", error);
          });
      }
    }
  };







  const GallerypickImage111 = async () => {
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


  const CamerapickImage111 = async () => {
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



  const pickImage222 = async () => {
    setIsImageUploading2(true); 
    setCurrentImageIndex(1); 

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


  const pickImage333 = async () => {
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

      
      <View style={{ flexDirection: "row", position: "relative", alignItems: "center", marginTop: "3%", justifyContent: "space-between" }}>


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
        <Image style={{
          width: 10,
          height: 16,
          width: screenWidth * 0.0285,
          height: screenHeight * 0.021,
          resizeMode: "contain",
          tintColor: "#6A707C",
          // backgroundColor:"red",
          // marginLeft: screenWidth*0.73,
          // position:"absolute",
          // marginTop:screenHeight*-0.023


        }}
          source={require("../../assets/back.png")} />

      </TouchableOpacity>


      <Text
        style={{
          fontSize: RFValue(20),
          fontFamily: "Urbanist_600SemiBold",
          color: "#0F2944"
          // marginLeft: "30%",


        }}
      >
        Lost Post
      </Text>


      <TouchableOpacity
        style={{
          marginRight: "4%",
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
        onPress={() => sethomemodalVisibleNew(true)}>

    

        <Image
          style={{
            width: 19,
            height: 20,
            width: screenWidth * 0.053,
            height: screenHeight * 0.027,
            alignSelf: "center",
            marginRight: "3%",
            resizeMode: "contain",
            //  backgroundColor:"red"
          }}

          source={require('../../assets/Homeicon.png')} />
      </TouchableOpacity>







    </View>












        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            marginLeft: "4.5%",
            position: "relative",
            top: screenHeight * 0.03

          }}
        >
          Name
        </Text>

        <TextInput style={{
          // backgroundColor: "#EDEEEF",
          borderWidth: 1,
          borderWidth: (screenWidth, screenHeight) * 0.0013,
          borderColor: nameError ? '#483d8b' : '#E0E0E0',
          width: "91%",
          // width:279,
          height: 38,
          height: screenHeight * 0.052,
          borderRadius: 8,
          fontSize: RFValue(12),
          fontFamily: "Urbanist_500Medium",
          position: "relative",
          top: screenHeight * 0.04,
          paddingLeft: screenWidth * 0.043,  
          // paddingLeft: 15,  
          
          color: "#6A707C",
          // marginLeft: "6%"
          alignSelf: "center",
        }}

          placeholder='Enter Lost item Name '
          placeholderTextColor="#6A707C"
          value={lostItem}
          onChangeText={text => setlostItem(text)}
        />



        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            marginLeft: "4.5%",
            position: "relative",
            top: screenHeight * 0.07,
            color: "#0F2944"

          }}
        >
          Description
        </Text>

        <TextInput
          multiline
          style={{
            // backgroundColor: "#EDEEEF",
            borderWidth: 1,
            borderWidth: (screenWidth, screenHeight) * 0.0013,
            borderColor: descriptionError ? '#483d8b' : '#E0E0E0',
            width: "91%",
            // width:279,
            height: 38,
            height: screenHeight * 0.16,
            borderRadius: 8,
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            position: "relative",
            top: screenHeight * 0.08,
            paddingLeft: screenWidth * 0.043,  
            color: "#6A707C",
            // marginLeft: "6%"
            alignSelf: "center",
            textAlignVertical: 'top',
            paddingVertical: screenHeight * 0.0155
          }}
          placeholder='Enter Description '
          placeholderTextColor="#6A707C"
          value={description}
          onChangeText={text => setdescription(text)}

        />















        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            marginLeft: "4.5%",
            position: "relative",
            top: screenHeight * 0.11,
            color: "#0F2944"

          }}
        >
          Upload Photos
        </Text>


        <View style={{

          position: "relative",
          top: screenHeight * 0.12,
          marginLeft: "4.5%",
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
            top: screenHeight * 0.43,
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
              style={{ position: "absolute", right: screenWidth * 0.03, top: screenHeight * -0.02 }} >
              <Image style={{ width: screenWidth * 0.06, height: screenHeight * 0.1, tintColor: "#0F2944", resizeMode: "contain", }}
                source={require('../../assets/LostApp/Close.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={pickImage1Gallery}
              style={{ flexDirection: "row", marginTop: "3%" }}>
              <AntDesign name="picture"
                size={RFValue(19)}
                color="#0F2944" // Set color based on selectedButton
                style={{
                  width: screenWidth * 0.06,
                  height: screenHeight * 0.031,
                  alignSelf: "center",
                  marginRight: "3%",
                  // backgroundColor:"yellow",
                  // marginTop: "2%"

                }}
              />

              <Text style={{ fontFamily: "Urbanist_500Medium", fontSize: RFValue(14), }}>Gallery</Text>


            </TouchableOpacity>

            <Image style={{ width: "80%", marginTop: "7.5%", height: screenHeight * 0.003 }}
              source={require('../../assets/LostApp/Linee.png')}
            />

            <TouchableOpacity 
            onPress={pickImage1Camera}
              style={{ flexDirection: "row", marginTop: "7%" }}>
           
              <SimpleLineIcons name="camera"
                size={RFValue(19)}
                color="#0F2944" // Set color based on selectedButton
                style={{
                  width: screenWidth * 0.06,
                  height: screenHeight * 0.031,
                  alignSelf: "center",
                  marginRight: "3%",
                  // backgroundColor:"yellow",
                  // marginTop: "2%"

                }}
              />

              <Text style={{ fontFamily: "Urbanist_500Medium", fontSize: RFValue(14), }}>Camera</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>












          <View style={{ width: screenWidth * 0.19, height: screenHeight * 0.087, backgroundColor: "#F3F4F6", alignItems: "center", justifyContent: "center", borderRadius: 8, marginRight: 10 }}>
            {!image1 && !isImageUploading1 && (

              <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="add-circle-sharp"
              size={RFValue(29)}
              color="#0F2944"
              style={{
                width: screenWidth * 0.08,
                  height: screenHeight * 0.041,
                alignSelf: "center",
              

              }}
            />
         
             
              </TouchableOpacity>
            )}
            {isImageUploading1 && currentImageIndex === 1 ? (
              <ActivityIndicator size="large" color="#0F2944" style={{ position: "absolute", }} />
            ) : (
              image1 && (
                <View style={{ position: 'relative' }}>
                  <Image source={{ uri: image1 }} style={{ width: screenWidth * 0.19, height: screenHeight * 0.087, alignSelf: 'center', borderRadius: 8 }} />
                  {showCrosImage1 && (
                    <TouchableOpacity
                      onPress={() => {
                        setImage1(null); 
                        setShowCrosImage1(false);
                      }}
                      style={{ position: 'absolute', top: screenHeight * 0.001, right: screenWidth * -0.006 }}
                    >
                      <Image style={{ width: screenWidth * 0.05, height: screenHeight * 0.02, resizeMode: 'contain', borderRadius: 100 }} source={require('../../assets/cros.jpg')} />
                    </TouchableOpacity>
                  )}
                </View>
              )
            )}
          </View>




          <View style={{ position: 'relative', width: screenWidth * 0.19, height: screenHeight * 0.087, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginRight: 10 }}>
            {!image2 && !isImageUploading2 && (
              <TouchableOpacity onPress={pickImage2}>
              <Ionicons name="add-circle-sharp"
              size={RFValue(29)}
              color="#0F2944" // Set color based on selectedButton
              style={{
                width: screenWidth * 0.08,
                  height: screenHeight * 0.041,
                alignSelf: "center",
                // marginRight: "3%",
                // backgroundColor:"yellow",
                // marginTop: "2%"

              }}
            />
              </TouchableOpacity>
            )}

            {isImageUploading2 && currentImageIndex === 1 ? (
              <ActivityIndicator size="large" color="#0F2944" style={{ position: 'absolute' }} />
            ) : (
              image2 && (
                <View style={{ position: 'relative' }}>
                  <Image source={{ uri: image2 }} style={{ width: screenWidth * 0.19, height: screenHeight * 0.087, alignSelf: 'center', borderRadius: 8 }} />
                  {showCrosImage2 && (
                    <TouchableOpacity
                      onPress={() => {
                        setImage2(null); // Replace this with the action you want to perform when dismissing the image
                        setShowCrosImage2(false);
                      }}
                      style={{ position: 'absolute', top: screenHeight * 0.001, right: screenWidth * -0.006 }}
                    >
                      <Image style={{ width: screenWidth * 0.05, height: screenHeight * 0.02, resizeMode: 'contain', borderRadius: 100 }} source={require('../../assets/cros.jpg')} />
                    </TouchableOpacity>
                  )}
                </View>
              )
            )}
          </View>



          <View style={{ position: 'relative', width: screenWidth * 0.19, height: screenHeight * 0.087, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginRight: 10 }}>
            {!image3 && !isImageUploading3 && (
              <TouchableOpacity onPress={pickImage3}>
              <Ionicons name="add-circle-sharp"
              size={RFValue(29)}
              color="#0F2944" // Set color based on selectedButton
              style={{
                width: screenWidth * 0.08,
                  height: screenHeight * 0.041,
                alignSelf: "center",
                // marginRight: "3%",
                // backgroundColor:"yellow",
                // marginTop: "2%"

              }}
            />
              </TouchableOpacity>
            )}

            {isImageUploading3 && currentImageIndex === 1 ? (
              <ActivityIndicator size="large" color="#0F2944" style={{ position: 'absolute' }} />
            ) : (
              image3 && (
                <View style={{ position: 'relative' }}>
                  <Image source={{ uri: image3 }} style={{ width: screenWidth * 0.19, height: screenHeight * 0.087, alignSelf: 'center', borderRadius: 8 }} />
                  {showCrosImage3 && (
                    <TouchableOpacity
                      onPress={() => {
                        setImage3(null); // Replace this with the action you want to perform when dismissing the image
                        setShowCrosImage3(false);
                      }}
                      style={{ position: 'absolute', top: screenHeight * 0.001, right: screenWidth * -0.006 }}
                    >
                      <Image style={{ width: screenWidth * 0.05, height: screenHeight * 0.02, resizeMode: 'contain', borderRadius: 100 }} source={require('../../assets/cros.jpg')} />
                    </TouchableOpacity>
                  )}
                </View>
              )
            )}
          </View>











        </View>



        {loading && <LoadingModal modalVisible={true} />}
        <TouchableOpacity
          onPress={AddProducts}

          style={{
            // position: "absolute",
            // top: 427,
            position: 'relative',
            top: screenHeight * 0.162,
            borderRadius: 8,
            backgroundColor: '#0F2944',
            height: screenHeight * 0.059,
            alignSelf: "center",
            width: "91%",
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



        {homemodalVisibleNew && (
          <TouchableWithoutFeedback onPress={() => sethomemodalVisibleNew(false)}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                height: screenHeight * 1,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <TouchableWithoutFeedback>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: (screenWidth, screenHeight) * 0.03,
                    paddingVertical: screenHeight * 0.03,
                    paddingHorizontal: screenWidth * 0.07,
                    alignItems: 'center',

                    // position:"absolute"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => sethomemodalVisibleNew(false)}
                    style={{ position: 'absolute', top: screenHeight * 0.007, right: screenWidth * 0.021 }}>

                    <Entypo name="cross"
                      size={screenWidth * 0.065}
                      color="black" />
                  </TouchableOpacity>

                  <Text
                    style={{
                      fontSize: RFValue(12),
                      fontFamily: "Urbanist_600SemiBold",
                      color: "#778899"

                    }}
                  >Your Will Lost Your Post Data !</Text>
                  <Text
                    style={{
                      fontSize: RFValue(16),
                      fontFamily: "Urbanist_600SemiBold",
                      color: "black", marginTop: "1%"

                    }}
                  >Do You Want to Continue ?</Text>

                  <View style={{ flexDirection: 'row', marginTop: screenHeight*0.02 ,marginLeft:"7%",}}>
                    <TouchableOpacity
                      onPress={() => sethomemodalVisibleNew(false)}
                      style={{
                        marginRight: screenWidth * 0.05,
                        width: "25%",
                        height: screenHeight * 0.032,
                        backgroundColor: "#3cb371",
                        borderRadius: (screenWidth, screenHeight) * 0.03,
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(15),
                          fontFamily: "Urbanist_600SemiBold",
                          color: "white",
                          // left: "6%",
                        }}
                      >Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        marginRight: screenWidth * 0.05,
                        width: "40%",
                        height: screenHeight * 0.032,
                        backgroundColor: "#0F2944",
                        borderRadius: (screenWidth, screenHeight) * 0.03,
                        alignItems: "center",
                        justifyContent: "center",
                        
                      }}
                      onPress={() => navigation.navigate("Home")}>
                      <Text
                        style={{
                          fontSize: RFValue(15),
                          fontFamily: "Urbanist_600SemiBold",
                          color: "white",
                          // left: "6%",
                        }}>Go To Home</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        )}

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

export default LostPostNext;