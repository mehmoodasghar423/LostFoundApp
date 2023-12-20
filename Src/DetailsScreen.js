import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Linking, Alert, ActivityIndicator, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import Carousel from "pinar";
import ResponsiveImage from "react-native-responsive-image";
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { firebase } from '../config';

import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';



const DetailsScreen = ({ route }) => {
  const { category, location, lostItem, description, date, imageUrl1, imageUrl2, imageUrl3, participants, chatRoomId, Type } = route.params;
  const [recipientName, setRecipientName] = useState(''); // Add this state
  // Add this state to check if the user has their own data
  const userHasData = participants && participants.length > 0 && participants[0] === firebase.auth().currentUser.uid;



  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  // Inside your DetailsScreen component

  // ... existing code ...

  const [userProfilePics, setuserProfilePics] = useState(null); // Update the initial state to null
  const [recipientEmail, setRecipientEmail] = useState(''); // Initialize recipient's email state


  const [loading, setLoading] = useState(true); // State to manage loading state of images

  // Function to handle image loading completion
  const handleImageLoad = () => {
    setLoading(false); // Update loading state to false when images are loaded
  };


  useEffect(() => {
    if (participants && participants.length > 0) {
      const recipientUid = participants.find(uid => uid !== firebase.auth().currentUser.uid);

      if (recipientUid) {
        firebase.firestore().collection('UserData').doc(recipientUid).get()
          .then(snapshot => {
            if (snapshot.exists) {
              const userData = snapshot.data();
              setRecipientEmail(userData.email); // Set recipient's email from userData
            } else {
              console.log('Recipient data not found');
            }
          })
          .catch(error => {
            console.error('Error fetching recipient data:', error);
          });
      }
    }
  }, [participants]);

  // Now, use recipientEmail to fetch the profile picture
  useEffect(() => {
    if (recipientEmail) {
      firebase.firestore().collection('UserProfilePictures').doc(recipientEmail).get()
        .then(snapshot => {
          if (snapshot.exists) {
            setuserProfilePics(snapshot.data().profilePic);
          } else {
            // console.log('Recipient profile picture not found');
            // Set a default profile picture for the recipient here if needed
          }
        })
        .catch(error => {
          console.error('Error fetching recipient profile picture:', error);
        });
    }
  }, [recipientEmail]);


  const handleGoBack = () => {
    navigation.goBack();
  };





  const makeCall = async () => {
    const user = firebase.auth().currentUser;

    if (!user) {
      // User is not authenticated, handle the error or redirect to the authentication page.
      return;
    }

    if (participants && participants.length > 0) {
      const ownerUid = participants[0]; // Assuming the owner's UID is the first in the participants array

      firebase.firestore().collection('UserData').doc(ownerUid).get()
        .then((userDoc) => {
          if (userDoc.exists) {
            const userData = userDoc.data();
            const ownerPhoneNumber = userData.phoneNumber;

            // Check if the phone number exists before making the call
            if (ownerPhoneNumber) {
              const phoneNumber = `tel:${ownerPhoneNumber}`;
              Linking.openURL(phoneNumber)
                .catch((error) => {
                  console.error('Error making the call:', error);

                });
            } else {
              Alert.alert('Phone Number Not Found', 'The owner\'s phone number is not available.');
              // Handle the case where the owner's phone number is not available
            }
          } else {
            console.log("Owner's data not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching owner's data:", error);
        });
    } else {
      // Handle the case where participants are not defined or an empty array.
      console.error('Invalid participants data.');
    }
  };



  useEffect(() => {
    // Check if the user has their own data
    if (participants && participants.length > 0) {
      const recipientUid = participants.find((uid) => uid !== firebase.auth().currentUser.uid);

      if (recipientUid) {
        firebase.firestore().collection('UserData').doc(recipientUid).get()
          .then((userDoc) => {
            if (userDoc.exists) {
              const userData = userDoc.data();
              setRecipientName(userData.username);
            }
          });
      }
    }
  }, [participants]);


  const shareData = () => {
    const message = `Check out this item: ${lostItem}`;
    const url = imageUrl1; // Replace with the URL you want to share

    Linking.openURL(`whatsapp://send?text=${message}%20${url}`);

  };



  const [selectedButton, setSelectedButton] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const createChatRoom = (user, participants) => {
    // Check if user and participants are defined and are strings
    if (user && typeof user.uid === 'string' && participants && typeof participants === 'string') {
      const sortedUids = [user.uid, participants].sort();
      const chatRoomId = sortedUids.join('_');

      // Create or update the chat room with participants
      firebase.firestore().collection('chatRooms').doc(chatRoomId).set({
        participants: [user.uid, participants],
        lastMessage: null,
      });

      // Redirect to chat screen
      navigation.navigate('ChatScreen', {
        chatRoomId,
        participants: [user.uid, participants],
        recipientName: recipientName,
        userProfilePics

      });
    } else {
      // Handle the case where user or participants are undefined or not valid.
      console.error('Invalid user or participants data.');
    }
  };



  const startChat = async () => {
    const user = firebase.auth().currentUser;

    if (!user) {
      // User is not authenticated, handle the error or redirect to the authentication page.
      return;
    }

    if (participants && participants.length > 0) {
      if (participants.includes(user.uid)) {
        // If the user's ID is in the participants list, show an alert
        Alert.alert('Cannot Message Yourself', 'You cannot send a message to your own Account.', [{ text: 'OK' }]);
        return;
      }

      if (chatRoomId) {
        // If a chat room already exists, navigate to the ChatScreen
        navigation.navigate('ChatScreen', {
          chatRoomId,
          participants: [user.uid, ...participants], // Include user's ID in participants
          recipientName: recipientName,
          userProfilePics
        });
      } else {
        // If a chat room doesn't exist, create one and navigate to the ChatScreen
        createChatRoom(user, participants[0], navigation); // Use the first participant if there are multiple
      }
    } else {
      // Handle the case where participants is not defined or is an empty array.
      console.error('Invalid participants data.');
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
      <ScrollView showsVerticalScrollIndicator={false}>

        <View >
          <View style={{ flexDirection: "row", position: "relative", alignItems: "center", marginTop: "5%", justifyContent: "space-between" }}>


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
              Details
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
              onPress={shareData}>

              <FontAwesome name="share-square-o"
                size={RFValue(19)}
                color="#6A707C"
                style={{
                  // position: "absolute",
                  // marginRight: screenWidth * 0.06
                  // left: "35%",
                }}
              />
            </TouchableOpacity>


          </View>






          <View style={{
            height: screenHeight * 0.307,
            width: screenWidth * 0.64,
            alignSelf: 'center',
            marginTop: '8%',
            borderRadius: (screenWidth, screenHeight) * 0.013,
            //  backgroundColor:"red",
            elevation: 3
          }}>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            <Carousel style={{ alignItems: 'center', justifyContent: 'center', borderRadius: (screenWidth, screenHeight) * 0.007 }}>
              <View style={styles.slide1}>
                <Image
                  onLoad={handleImageLoad} // Call the function when image is loaded
                  style={{ width: '100%', height: '100%', borderRadius: 10 }}
                  source={{ uri: imageUrl1 || imageUrl2 || imageUrl3 }}
                />
              </View>

              <View style={styles.slide2}>
                <Image
                  onLoad={handleImageLoad} // Call the function when image is loaded
                  style={{ width: '100%', height: '100%', borderRadius: 10 }}
                  source={{ uri: imageUrl2 || imageUrl3 || imageUrl1 }}
                />
              </View>

              <View style={styles.slide3}>
                <Image
                  onLoad={handleImageLoad} // Call the function when image is loaded
                  style={{ width: '100%', height: '100%', borderRadius: 10 }}
                  source={{ uri: imageUrl3 || imageUrl1 || imageUrl2 }}
                />
              </View>
            </Carousel>
          </View>





          <View style={styles.buttons}>

            <TouchableOpacity
              onPress={startChat}
              style={[{
                width: "44%",
                height: screenHeight * 0.059,
                borderWidth: (screenWidth, screenHeight) * 0.0018,
                borderColor: "#0F2944",
                borderRadius: (screenWidth, screenHeight) * 0.007,
                marginRight: screenWidth * 0.012,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"

              }, selectedButton === 'button1' && styles.selectedButton]}

            >
              <AntDesign
                name="message1"
                size={RFValue(15)}
                color={selectedButton === 'button2' ? "#0F2944" : "#0F2944"} // Set color based on selectedButton
                style={{
                  width: screenWidth * 0.047,
                  height: screenHeight * 0.03,
                  alignSelf: "center",
                  marginRight: "3%",
                  // backgroundColor:"yellow",
                  marginTop: "2%"

                }}
              />
              <Text style={selectedButton === 'button1' ? styles.selectedButtonText : styles.buttonText}>Message</Text>
            </TouchableOpacity>





            <TouchableOpacity
              onPress={makeCall}
              style={[{
                width: "44%",
                height: screenHeight * 0.059,
                borderWidth: (screenWidth, screenHeight) * 0.0018,
                borderColor: "#0F2944",
                borderRadius: (screenWidth, screenHeight) * 0.007,
                // marginRight: screenWidth * 0.016,
                marginLeft: screenWidth * 0.012,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }, selectedButton === 'button2' && styles.selectedButton]}

            >
              <Ionicons name="call-outline"
                size={RFValue(17)}
                color={selectedButton === 'button2' ? "#0F2944" : "#0F2944"} // Set color based on selectedButton
                style={{
                  width: screenWidth * 0.057,
                  height: screenHeight * 0.04,
                  alignSelf: "center",
                  marginRight: "3%",
                  // backgroundColor:"yellow",
                  marginTop: "6%"

                }}
              />

              <Text style={selectedButton === 'button2' ? styles.selectedButtonText : styles.buttonText}>Call</Text>
            </TouchableOpacity>
          </View>



          <View style={{
            backgroundColor: "#0F29440D",
            marginTop: screenHeight * 0.04,
            borderTopLeftRadius: (screenWidth, screenHeight) * 0.032,
            borderTopRightRadius: (screenWidth, screenHeight) * 0.032,
            height: screenHeight * 0.43
            // borderTopLeftRadius: 24,
          }}>


            <View style={{ position: "relative", marginTop: "9%", alignSelf: "center", width: "94%", flexDirection: "row", }}>

              <Text style={{
                fontFamily: "Urbanist_600SemiBold",
                fontSize: RFValue(16),
                color: "#0F2944",
                lineHeight: RFValue(19.2),
                marginLeft: "1.5%"
              }}
              >{lostItem}</Text>

              <View style={{ backgroundColor: "#0F2944", borderRadius: 5, marginLeft: "2%", alignItems: "center", justifyContent: "center", height: screenHeight * 0.02 }}>
                <Text style={{ fontFamily: "Urbanist_600SemiBold", fontSize: RFValue(11), color: "white", marginHorizontal: 5 }}
                >{Type}</Text>

              </View>

              <Text style={{ fontFamily: "Urbanist_500Medium", fontSize: RFValue(12), letterSpacing: 2, alignSelf: "center", color: "#1E1F4B", position: "absolute", right: screenWidth * 0.017, }}
              >
                {date ? moment(date.toDate()).format("Do MMMM YYYY") : 'Date not available'}

              </Text>

            </View>


            <View style={{ position: "relative", marginTop: "3%", alignSelf: "center", width: "94%", }}>
              <Text style={{
                fontFamily: "Urbanist_500Medium",
                fontSize: RFValue(12),
                color: "#0F2944",
                marginLeft:"1.5%",
              }}
              >Description</Text>
              <Text style={{
                 fontFamily: "Urbanist_400Regular", 
                 fontSize: RFValue(10),
                  top: screenHeight * 0.005, 
                  color: "#6A707C" ,
                  marginLeft:"1.5%",
                // backgroundColor:"red",
                width:"95%",
                marginTop:screenHeight*0.006
                }}
              >{description}</Text>

              <View style={{ position: "relative", top: screenHeight * 0.015, flexDirection: "row", alignItems: "center",marginLeft:"0.6%" }}>
                <Ionicons name="md-location-sharp"
                  size={RFValue(15)}
                  color="#FE9003"
                  style={{
                    marginTop: screenHeight * 0.0015, marginRight: screenWidth * 0.003
                  }}
                />

                <Text style={{ fontFamily: "Urbanist_500Medium", fontSize: RFValue(12), alignSelf: "center", color: "#8391A1", marginLeft: "1.5%",letterSpacing:1 }}>
                  {location}
                </Text>
              </View>
            </View>


            <TouchableOpacity
              // onPress={handler}
              style={{
                // position: "absolute",
                // top: 427,
                position: 'relative',
                marginTop: screenHeight * 0.06,
                marginBottom: screenHeight * 0.04,
                borderRadius: 8,
                backgroundColor: '#0F2944',
                // padding: 10,
                // width: 320,
                width: "91.4%",
                height: screenHeight * 0.059,
                alignSelf: "center",

                justifyContent: "center"
              }}><Text style={{
                fontSize: 15,
                fontFamily: "Urbanist_600SemiBold",
                lineHeight: 18,
                alignSelf: "center",
                color: '#F9F9F9',


              }}
              >View on map </Text>
            </TouchableOpacity>

          </View>


        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    position: "relative",
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "center"
  },

  buttonText: {
    fontSize: RFValue(18),
    fontFamily: "Urbanist_500Medium",
    // lineHeight: 18,
    color: "#0F2944",
    textAlign: "center",
    marginLeft: "3%"

  },
  selectedButton: {
    backgroundColor: '#0F2944',
    shadowColor: "#363B64",
    borderWidth: 0

  },
  selectedButtonText: {
    fontSize: RFValue(18),
    fontFamily: "Urbanist_500Medium",
    // lineHeight: 18,
    color: "white",
    textAlign: "center"
  },
})


export default DetailsScreen;
