import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, Dimensions, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from '@react-navigation/native';
import { LoadingModal } from "react-native-loading-modal";
import { Ionicons, AntDesign, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';


import { firebase } from '../../config';
import 'firebase/storage';



const Profile = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const AccountDeatilsHandler = () => {
    navigation.navigate('AccountDeatils', { selectedImage, profilname: name.username });
  };

  ////
  const SettingHandler = () => {
    navigation.navigate('Settings');
  };
  const ContactHandler = () => {
    navigation.navigate('Contact');
  };
  const [loadingg, setloadingg] = useState(true);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [selectedImage, setSelectedImage] = useState(null);
  ///
  const [name, setName] = useState("")
  useEffect(() => {
    firebase.firestore().collection("UserData")
      .doc(firebase.auth().currentUser.uid).get()
      .then((sanpshot) => {
        if (sanpshot.exists) {
          setName(sanpshot.data())
        } else {
          console.log("user does not exist")
        }
      })
  }, [])



  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied!');
      }
    })();
  }, []);





  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        const storageRef = firebase.storage().ref();
        const imageName = `${firebase.auth().currentUser.uid}/${new Date().getTime()}.jpg`;
        const imageRef = storageRef.child(imageName);
        const response = await fetch(selectedAsset.uri);
        const blob = await response.blob();
        await imageRef.put(blob);
        const imageUrl = await imageRef.getDownloadURL();

        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          await firebase.firestore().collection("UserProfilePictures").doc(currentUser.email).set({
            profilePic: imageUrl,
          });
          setSelectedImage(imageUrl);
        }
      }
    } catch (error) {
      console.error("Error picking image: ", error);
      // Handle the error appropriately, display an alert, etc.
    }
  };


  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      firebase.firestore().collection("UserProfilePictures").doc(currentUser.email).get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setSelectedImage(snapshot.data().profilePic);
            setloadingg(false); // Set loadingg to false when image is fetched
          }
        })
        .catch((error) => {
          console.error("Error fetching profile picture: ", error);
          setloadingg(false); // Set loadingg to false on error
          // Handle the error appropriately, display an alert, etc.
        });
    }
  }, []);


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


  const handleSignOut = async () => {
    try {
      setLoading(true); // Show loading modal when sign-out starts
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        // Update user status to 'offline'
        await firebase.firestore().collection('UserData').doc(currentUser.uid).update({
          onlineStatus: 'offline',
        });
      }
      // Sign the user out after updating the status
      await firebase.auth().signOut();
      // Navigate to the login screen or perform any other necessary action
      navigation.navigate('Login');
    } catch (error) {
      console.error('Sign-out error:', error);
      setLoading(false); // Hide loading modal on error
    }
  };


  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            const user = firebase.auth().currentUser;
            if (user) {
              user
                .delete()
                .then(() => {

                  navigation.navigate('Login');
                })
                .catch((error) => {

                  Alert.alert('Error', 'An error occurred while deleting your account.');
                });
            } else {
              Alert.alert('Error', 'User not found. Please sign in again.');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View>

        <View
          style={{
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
          }}>
          <Text
            style={{
              fontSize: RFValue(20),
              fontFamily: "Urbanist_600SemiBold",

              letterSpacing: -1,
              position: "relative",
              marginTop: "3.5%",
              color: "#0F2944",
              alignSelf: "center",
            }}
          >
            Profile
          </Text>
        </View>

        {loading && <LoadingModal modalVisible={true} />}
        <View style={{
          // position:"absolute",
          // top:81,
          position: "relative",
          // top:61,
          marginTop: "6%"
          // backgroundColor:"red",
          // height:130
        }}>

          <Image
            source={require('../../assets/Dpp.png')}
            style={
              {

                width: screenWidth * 0.29,
                height: screenHeight * 0.14,
                alignSelf: "center",
                // backgroundColor: "red",
                resizeMode: "contain",
                //   borderRadius: (screenWidth, screenHeight) * 0.07,
                // borderWidth:(screenWidth, screenHeight) * 0.007,
                borderColor: "white",
              }}
          />

          {selectedImage && <Image
            source={{ uri: selectedImage }}
            style={{

              width: screenWidth * 0.29,
              height: screenHeight * 0.14,
              alignSelf: "center",
              position: "absolute",
              borderColor: "white",
              // borderWidth:(screenWidth, screenHeight) * 0.007,
              borderRadius:(screenWidth, screenHeight) * 0.08,
            }}

          />}

          <TouchableOpacity onPress={pickImage} style={{
            backgroundColor: "white",
            height: screenHeight * 0.04,
            width: screenWidth * 0.08,
            position: "absolute",
            bottom: screenHeight * -0.0006,
            alignSelf: "center",
            right: screenWidth * 0.38,
            alignItems:"center",
            justifyContent:"center",
              borderRadius:(screenWidth, screenHeight) * 0.08,

          }}>
          <SimpleLineIcons name="camera"
          size={RFValue(19)}
          color="#0F2944" // Set color based on selectedButton
          style={{
            width: screenWidth * 0.06,
            height: screenHeight * 0.031,
            alignSelf: "center",
            // marginRight: "3%",
            // backgroundColor:"yellow",
            // marginTop: "2%"

          }}
        />
          </TouchableOpacity>

        </View>



        <Text
          style={{
            fontSize: RFValue(20),
            fontFamily: "Urbanist_600SemiBold",
            // lineHeight: 20,
            // left: "6%",
            letterSpacing: -1,
            position: "relative",
            // top: 73,
            marginTop: "3.5%",
            color: "#1E232C",
            // width: 210,
            alignSelf: "center"
          }}
        >
          {name.username}
        </Text>



        <View style={{
          // position:"absolute",
          // top:81,
          position: "relative",
          marginTop: "4%",
          width: 236,
          width: screenWidth * 0.66,
          height: 38,
          height: screenHeight * 0.053,
          alignSelf: "center",
          borderColor: "#0F2944",
          borderWidth: (screenWidth, screenHeight) * 0.0014,
          borderRadius: (screenWidth, screenHeight) * 0.007,
          flexDirection: "row"
        }}>

          <Image
            style={{
              width: 18.33,
              height: 18.33,
              width: screenWidth * 0.06,
              height: screenHeight * 0.027,
              resizeMode: "contain",
              alignSelf: "center",
              marginLeft: "29%",
            }}
            source={require('../../assets/LostApp/Point.png')} />


          <Text
            style={{
              fontSize: RFValue(20),
              fontFamily: "Urbanist_600SemiBold",
              // lineHeight: 17.5,
              left: "20%",
              letterSpacing: -1,

              color: "#0F2944",
              // width: 210,
              alignSelf: "center"
            }}
          >
            Points : 0
          </Text>


        </View>





        <TouchableOpacity
          onPress={AccountDeatilsHandler}
          style={{
            position: "relative",
            marginTop: "5%",
            width: "82%",
            height: 60,
            borderColor: "#8391A1",
            borderBottomWidth: screenWidth * 0.001,
            marginLeft: "6%",
            flexDirection: "row",
          }}>

          <MaterialCommunityIcons name="contacts-outline"
            size={RFValue(19)}
            color="#0F2944" // Set color based on selectedButton
            style={{
              width: screenWidth * 0.053,
              height: screenHeight * 0.031,
              alignSelf: "center",
              marginRight: "3%",
              // backgroundColor:"yellow",
              marginTop: "2%"

            }}
          />





          <Text
            style={{
              fontSize: RFValue(15),
              position: "absolute",
              left: "13%",
              fontFamily: "Urbanist_500Medium",
              alignSelf: "center",

            }}
          >
            Account Detail
          </Text>
        </TouchableOpacity>







        <TouchableOpacity
          onPress={SettingHandler}
          style={{
            position: "relative",
            marginTop: "2%",
            width: "82%",
            height: 60,
            borderColor: "#8391A1",
            borderBottomWidth: screenWidth * 0.001,
            marginLeft: "6%",
            flexDirection: "row",
          }}>

          <SimpleLineIcons name="settings"
            size={RFValue(19)}
            color="#0F2944" // Set color based on selectedButton
            style={{
              width: screenWidth * 0.055,
              height: screenHeight * 0.031,
              alignSelf: "center",
              marginRight: "3%",
              // backgroundColor:"yellow",
              marginTop: "2%"

            }}
          />


          <Text
            style={{
              fontSize: RFValue(15),
              position: "absolute",
              left: "13%",
              fontFamily: "Urbanist_500Medium",
              alignSelf: "center"
            }}
          >
            Settings
          </Text>


        </TouchableOpacity>






        <TouchableOpacity
          onPress={ContactHandler}
          style={{

            position: "relative",
            marginTop: "2%",
            width: "82%",
            height: 60,
            borderColor: "#8391A1",
            borderBottomWidth: screenWidth * 0.001,
            marginLeft: "6%",
            flexDirection: "row",
          }}>

          <AntDesign name="mail"
            size={RFValue(19)}
            color="#0F2944" // Set color based on selectedButton
            style={{
              width: screenWidth * 0.055,
              height: screenHeight * 0.031,
              alignSelf: "center",
              marginRight: "3%",
              // backgroundColor:"yellow",
              marginTop: "2%"

            }}
          />

          <Text
            style={{
              fontSize: RFValue(15),
              position: "absolute",
              left: "13%",
              fontFamily: "Urbanist_500Medium",
              alignSelf: "center"
            }}
          >
            Contact
          </Text>


        </TouchableOpacity>





        <TouchableOpacity
          onPress={handleSignOut}
          style={{
            // position: "absolute",
            // top: 427,
            position: 'relative',
            // top: 120,
            borderRadius: 8,
            backgroundColor: '#0F2944',
            width: "90%",
            height: screenHeight * 0.06,
            alignSelf: "center",
            marginTop: "6%",
            justifyContent: "center"
          }}><Text style={{
            fontSize: RFValue(15),
            fontFamily: "Urbanist_600SemiBold",
            // lineHeight: 18,
            alignSelf: "center",
            color: '#F9F9F9',


          }}
          >Logout </Text>
        </TouchableOpacity>



        <TouchableOpacity
          onPress={handleDeleteAccount}
          style={{
            position: 'relative',
            // top: 127,
            borderRadius: 8,
            width: "90%",
            height: screenHeight * 0.06,
            alignSelf: "center",
            marginTop: "1%",
            justifyContent: "center"
          }}><Text style={{
            fontSize: RFValue(15),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 18,
            alignSelf: "center",
            color: '#FE9003',


          }}
          >Delete Account </Text>
        </TouchableOpacity>



      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({})
export default Profile