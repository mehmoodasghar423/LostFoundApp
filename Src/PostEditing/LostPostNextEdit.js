import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Pressable, Alert, Modal, Dimensions, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
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
import { Entypo, Fontisto, MaterialIcons, Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';
import { LoadingModal } from "react-native-loading-modal";



const LostPostNextEdit = ({ route, navigation }) => {
  const { documentId } = route.params;
  const { selectedCity } = route.params || { selectedCity: null };
  // const { documentId, lostItem, location, date, time, description, imageUrl1, imageUrl2, imageUrl3 } = route.params;
  // Use the received data as needed in your 'LostPostNextEdit' component



  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [lostItem, setlostItem] = useState('');
  const [description, setdescription] = useState('')
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');



  // console.log('nextedit' ,documentId);
  // console.log(category);


  const [loading, setLoading] = useState(false);

  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isImageUploading2, setIsImageUploading2] = useState(false);
  const [isImageUploading3, setIsImageUploading3] = useState(false);


  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [imag1Error, setImage1Error] = useState('');

  const [showCrosImage1, setShowCrosImage1] = useState(false);
  const [showCrosImage2, setShowCrosImage2] = useState(false);
  const [showCrosImage3, setShowCrosImage3] = useState(false);


  const [defaultSelectedCategory, setDefaultSelectedCategory] = useState('');

  // Update the selected city state when received from route.params
  useEffect(() => {
    if (route.params && route.params.selectedCity) {
      setLocation(route.params.selectedCity);
    }
  }, [route.params]);



  const locationHandler = () => {
    navigation.navigate("LostPELocation", {
      documentId: documentId // Pass the documentId in the route params
    });
  };


  useEffect(() => {
    if (image1) {
      const timeout = setTimeout(() => {
        setShowCrosImage1(true);
      }, 10);

      return () => clearTimeout(timeout);
    }
  }, [image1]);


  useEffect(() => {
    if (image2) {
      const timeout = setTimeout(() => {
        setShowCrosImage2(true);
      }, 10);

      return () => clearTimeout(timeout);
    }
  }, [image2]);


  useEffect(() => {
    if (image3) {
      const timeout = setTimeout(() => {
        setShowCrosImage3(true);
      }, 10);

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



  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection("UserData").doc(documentId);
      userRef.get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();

            // Set all the relevant state variables based on the fetched data
            setCategory(data.category);
            setLocation(data.location);
            setlostItem(data.lostItem);
            setdescription(data.description);
            setImage1(data.imageUrl1); // Set the URL of the first image
            setImage2(data.imageUrl2); // Set the URL of the second image
            setImage3(data.imageUrl3); // Set the URL of the third image

            // Check if the category is available in the data
            if (data && data.category) {
              // Set the category as the default selected category
              const defaultCategory = { key: data.category, value: data.category };
              setDefaultSelectedCategory(defaultCategory);
            } else {
              console.error("Category not found in the retrieved data.");
            }
          } else {
            console.error("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
    }
  }, [documentId]);




  const data = [
    { key: 'Electronics', value: 'Electronics' },
    { key: 'Jewelry', value: 'Jewelry' },
    { key: 'Bag', value: 'Bag' },
    { key: 'Wallet', value: 'Wallet' },
    { key: 'Glasses', value: 'Glasses' },
  ]






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
      setDescriptionError(''); // Clear the errors
    }

    if (isValid) {
      setLoading(true); // Set loading to true before Firestore operation

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
          Type: "Lost"
        };

        userDataRef.update(userData)
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





  const [modalVisible, setModalVisible] = useState(false);
  const [homeModalVisible, sethomeModalVisible] = useState(false);




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
            <Ionicons name="ios-chevron-back-sharp"
              size={screenWidth * 0.08}
              color="#6A707C"
              style={{
              }} />
          </TouchableOpacity>


          <Text
            style={{
              fontSize: RFValue(20),
              fontFamily: "Urbanist_600SemiBold",
              color: "#0F2944"
              // marginLeft: "30%",


            }}
          >
            Lost Post Editing
          </Text>


          <TouchableOpacity
            style={{
              marginRight: "4%",
            }}
            onPress={() => sethomeModalVisible(true)}>

            <Image style={{
              width: screenWidth * 0.1,
              height: screenHeight * 0.047,
              resizeMode: "contain",
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",

            }}
              source={require("../../assets/HomeBack.png")} />
          </TouchableOpacity>





        </View>




        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            left: "6%",
            position: "relative",
            top: screenHeight * 0.02

          }}
        >
          Category
        </Text>

        <View style={{
          // position: "absolute",
          // top: 105,
          position: "relative",
          top: screenHeight * 0.032
        }}>

          <SelectList
            setSelected={setCategory}
            data={data}
            defaultOption={defaultSelectedCategory}
            boxStyles={{
              backgroundColor: "#EDEEEF",
              borderWidth: 1,
              borderColor: "#EDEEEF",
              width: "91%",
              // height: screenHeight * 0.052,
              borderRadius: 8,
              fontSize: RFValue(12),

              paddingLeft: screenWidth * 0.1,

              color: "#8C9199",
              // marginLeft: "6%"
              alignSelf: "center"
            }}

            dropdownStyles={{
              borderWidth: 1,
              borderColor: "#EDEEEF",
              width: "91%",
              alignSelf: "center"
            }}

            dropdownTextStyles={{
              fontSize: RFValue(12),
              fontFamily: "Urbanist_500Medium",
            }}
            inputStyles={{
              // backgroundColor:"red",
              fontSize: RFValue(12),
              fontFamily: "Urbanist_500Medium",
            }}
          />
          <MaterialIcons name="category"
            size={RFValue(20)}
            color="#8391A1"

            style={{
              position: "absolute",
              left: "7%",
              top: screenHeight * 0.013,
              marginRight: screenWidth * 0.01,



            }}
          />
        </View>


        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            left: "6%",
            position: "relative",
            top: screenHeight * 0.055
            // position: "absolute",
            // top: 164,

          }}
        >
          Location
        </Text>

        <TouchableOpacity
          onPress={locationHandler}
          style={{
            position: "relative",
            top: screenHeight * 0.063,
            // position:"absolute",
            // top:187,
            backgroundColor: "#EDEEEF",
            borderWidth: 1,
            borderColor: '#EDEEEF',
            width: "91%",
            // width:279,
            height: 38,
            height: screenHeight * 0.052,
            borderRadius: 8,
            fontSize: RFValue(12),
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center", justifyContent: "center",
          }}>


          <MaterialIcons name="location-city"
            size={RFValue(20)}
            color="#8391A1"

            style={{
              // position: "absolute",
              // left: "17%",
              // top: 2,
              marginRight: screenWidth * 0.01,
              alignSelf: "center",


            }}
          />

          <Text style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            color: "#8391A1", marginRight: 10
          }}>
            {location || '  Please Select Your Specific Location here '}
          </Text>
          <AntDesign name="down"
            size={RFValue(13)}
            color="#8391A1"

            style={{
              // position: "absolute",
              left: "17%",
              top: 2,
              alignSelf: "center",


            }}
          />
        </TouchableOpacity>


        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            left: "6%",
            position: "relative",
            top: screenHeight * 0.08

          }}
        >
          Name
        </Text>

        <TextInput style={{
          backgroundColor: "#EDEEEF",
          borderWidth: 1,
          borderColor: nameError ? '#483d8b' : '#EDEEEF',
          width: "91%",
          // width:279,
          height: 38,
          height: screenHeight * 0.052,
          borderRadius: 8,
          fontSize: RFValue(12),
          fontFamily: "Urbanist_500Medium",
          position: "relative",
          top: screenHeight * 0.091,
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
            top: screenHeight * 0.11
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
            borderColor: descriptionError ? '#483d8b' : '#EDEEEF',
            width: "91%",
            // width:279,
            height: 38,
            height: screenHeight * 0.12,
            borderRadius: 8,
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            position: "relative",
            top: screenHeight * 0.12,
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
            top: screenHeight * 0.155
            // position: "absolute",
            // top: 164,

          }}
        >
          Upload Photos
        </Text>


        <View style={{

          position: "relative",
          top: screenHeight * 0.173,
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

                <TouchableOpacity onPress={GallerypickImage1}
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

                <TouchableOpacity onPress={CamerapickImage1}
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












          <View style={{ width: screenWidth * 0.19, height: screenHeight * 0.087, backgroundColor: "#E8ECF4", alignItems: "center", justifyContent: "center", borderRadius: 8, marginRight: 10 }}>
            {!image1 && !isImageUploading && (

              <TouchableOpacity onPress={() => setModalVisible(true)}>
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
            {isImageUploading && currentImageIndex === 1 ? (
              <ActivityIndicator size="large" color="#0F2944" style={{ position: "absolute", }} />
            ) : (
              image1 && (
                <View style={{ position: 'relative' }}>
                  <Image source={{ uri: image1 }} style={{ width: screenWidth * 0.19, height: screenHeight * 0.087, alignSelf: 'center', borderRadius: 8 }} />
                  {showCrosImage1 && (
                    <TouchableOpacity
                      onPress={() => {
                        setImage1(null); // Replace this with the action you want to perform when dismissing the image
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




          <View style={{ position: 'relative', width: screenWidth * 0.19, height: screenHeight * 0.087, backgroundColor: '#E8ECF4', alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginRight: 10 }}>
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



          <View style={{ position: 'relative', width: screenWidth * 0.19, height: screenHeight * 0.087, backgroundColor: '#E8ECF4', alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginRight: 10 }}>
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
          onPress={saveDataToFirestore}

          style={{
            // position: "absolute",
            // top: 427,
            position: 'relative',
            top: screenHeight * 0.2,
            borderRadius: 8,
            backgroundColor: '#0F2944',
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


        {homeModalVisible && (
          <TouchableWithoutFeedback onPress={() => sethomeModalVisible(false)}>
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
                    onPress={() => sethomeModalVisible(false)}
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
                  >Changes Are not Saved in this Post!</Text>
                  <Text
                    style={{
                      fontSize: RFValue(16),
                      fontFamily: "Urbanist_600SemiBold",
                      color: "black", marginTop: "1%"

                    }}
                  >Do You Want to Continue ?</Text>

                  <View style={{ flexDirection: 'row', marginTop: screenHeight * 0.02, marginLeft: "7%", }}>
                    <TouchableOpacity
                      onPress={() => sethomeModalVisible(false)}
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

export default LostPostNextEdit;