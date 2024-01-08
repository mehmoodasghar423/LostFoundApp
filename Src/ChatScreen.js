import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { GiftedChat, InputToolbar, Composer, Bubble, Actions } from 'react-native-gifted-chat';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Dimensions, Linking, Alert, TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import { LoadingModal } from "react-native-loading-modal";





const ChatScreen = ({ route }) => {
  const { chatRoomId, participants, recipientName, userProfilePics } = route.params;





  const renderMessage = (props) => {
    const { currentMessage } = props;
    const isUser = currentMessage.user._id === firebase.auth().currentUser.uid;

    if (isUser) {
      return (
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                // Styling for user's messages
                backgroundColor: '#0F2944', // Example background color

                marginTop: 0,
                marginRight: screenWidth * 0.024,
                marginBottom: screenHeight * 0.007,
                borderTopLeftRadius: 16, // Radius for top left corner
                borderTopRightRadius: 16, // Radius for top right corner
                borderBottomLeftRadius: 16, // Radius for bottom left corner
                borderBottomRightRadius: 0, // Radius for bottom right corner
                // paddingTop:screenHeight*0.002
              },
            }}
          />
        </View>
      );
    }
    // Inside the ChatScreen component's renderMessage function
    // Ensure userProfilePics is not null or undefined before accessing properties
    const userProfilePic = userProfilePics && userProfilePics[currentMessage.user._id];




    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginLeft: '2%',
          }}
          source={
            userProfilePic
              ? { uri: userProfilePic }
              : require('../assets/Dpp.png')
          }
        />
        <Bubble {...props}
        wrapperStyle={{
          left: {
            // Styling for user's messages
            backgroundColor: '#F3F4F6', // Example background color

            marginTop: 0,
            marginRight: screenWidth * 0.024,
            marginBottom: screenHeight * 0.007,
          
            // paddingTop:screenHeight*0.002
          },
        }}
      
        />
      </View>
    );

  };




  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;


  const [modalVisible, setmodalVisible] = useState(false);
  const [homeModalVisible, sethomeModalVisible] = useState(false);
  const [loading, setLoading] = useState(false); 



  const user = firebase.auth().currentUser;
  const chatRoomRef = firebase.firestore().collection('chatRooms').doc(chatRoomId);
  const messagesRef = chatRoomRef.collection('messages');

  const [messages, setMessages] = useState([]);

  const handleGoBack = () => {
    navigation.goBack();
  };
  ///



  const handleDeleteChat = async () => {
    try {
      setLoading(true); // Show loading modal 
      // Delete all messages in the chat room
      const batch = firebase.firestore().batch();
      const messagesSnapshot = await messagesRef.get();
      messagesSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
  
      // Delete the chat room itself
      batch.delete(chatRoomRef);
  
      // Commit the batch operation
      await batch.commit();
      setLoading(false); // Hide loading modal when login process ends successfully
      // console.log('Chat room and messages deleted successfully');
      navigation.goBack(); // Go back after deletion
    } catch (error) {
      console.error('Error deleting chat room:', error);
    }
  };
  



  const makeCall = async () => {
    if (participants && participants.length > 0) {
      const ownerUid = participants.find((uid) => uid !== user.uid);

      firebase.firestore().collection('UserData').doc(ownerUid).get()
        .then((userDoc) => {
          if (userDoc.exists) {
            const userData = userDoc.data();
            const ownerPhoneNumber = userData.phoneNumber;

            if (ownerPhoneNumber) {
              const phoneNumber = `tel:${ownerPhoneNumber}`;
              Linking.openURL(phoneNumber)
                .catch((error) => {
                  console.error('Error making the call:', error);
                });
            } else {
              Alert.alert('Phone Number Not Found', 'The recipient\'s phone number is not available.');
            }
          } else {
            // console.log("Recipient's data not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching recipient's data:", error);
        });
    } else {
      console.error('Invalid participants data.');
    }
  };


  //
  // ...

  useEffect(() => {
    const unsubscribe = messagesRef
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const newMessages = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();

          if (data.text && data.senderUid) {
            // Check if data.createdAt is not null or undefined, and it's a valid date
            const createdAt = data.createdAt && data.createdAt.toDate ? data.createdAt.toDate() : new Date();
            //
            newMessages.push({
              _id: doc.id,
              text: data.text,
              createdAt,
              user: {
                _id: data.senderUid,
              },
            });
          } else {
            console.warn('Message with missing data:', data);
          }
        });

        setMessages(newMessages);
      });
  }, []);


  // ...//////


  const onSend = (newMessages = []) => {
    const messageText = newMessages[0].text;

    if (messageText) {
      // Send the message to Firestore
      messagesRef.add({
        text: messageText,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        senderUid: user.uid,
      });

      // Update the lastMessage field in the chat room
      chatRoomRef.update({
        lastMessage: messageText,
      });
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

  //

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

      <View style={{ flex: 1 }}>

        <View style={{
          flexDirection: "row",
          position: "relative",
          alignItems: "center",
          backgroundColor: "white",

          height: screenHeight * 0.07,
          // paddingBottom: "4%",
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


          <TouchableOpacity
            style={{
              marginLeft: "5%",
              // marginTop:screenHeight*0.003,
              // backgroundColor:"red",
              height: screenHeight * 0.047,
              justifyContent: "center",
              alignSelf: "center"
            }}
            onPress={handleGoBack}>
            <Image style={{
              width: 9.4,
              width: screenWidth * 0.05,
              height: 14.02,
              height: screenHeight * 0.025,
              resizeMode: "contain",
              // backgroundColor:"red",
              // marginLeft: screenWidth*0.73,
              // position:"absolute",
              // marginTop:screenHeight*-0.023


            }}
              source={require("../assets/back.png")} />


          </TouchableOpacity>

          {recipientName ? ( // Check if recipientName is available
            <Text
              style={{
                fontSize: RFValue(17),
                fontFamily: "Urbanist_600SemiBold",
                marginLeft: "2%",
                // position:"absolute",
                marginLeft: screenWidth * 0.06,
                // marginLeft: 24,
                color: "#0F2944"



              }}
            >
              {recipientName}
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={makeCall}
            style={{
              position: "absolute",
              right: screenWidth * 0.147,
              // right: 53,
            }}>
            <Image style={{
              width: 16,
              height: 17,
              width: screenWidth * 0.044,
              height: screenHeight * 0.023,
              resizeMode: "contain",
              // backgroundColor:"red"
              // marginLeft: screenWidth*0.73,
              // position:"absolute",
              // marginTop:screenHeight*-0.023


            }}
              source={require("../assets/call.png")} />
          </TouchableOpacity>



          <TouchableOpacity
            onPress={() => setmodalVisible(true)}

            style={{
              position: "absolute",
              right: screenWidth * 0.045,
              //  right:  16,
            }}>
            <Image style={{
              width: screenWidth * 0.1,
              height: screenHeight * 0.047,
              width: 17,
              height: 17.5,
              width: screenWidth * 0.046,
              height: screenHeight * 0.023,
              resizeMode: "contain",
              // marginLeft: screenWidth*0.73,
              // position:"absolute",
              // marginTop:screenHeight*-0.023


            }}
              source={require("../assets/delete.png")} />

          </TouchableOpacity>


        </View>

        {loading && <LoadingModal modalVisible={true} />}

        <View style={{ flex: 1, }}>
          <GiftedChat

            messages={messages}
            onSend={(newMessages) => onSend(newMessages)}
            user={{
              _id: user.uid,
            }}
            textProps={{
              style: {
                fontFamily: 'Urbanist_500Medium',
                fontSize: RFValue(13),

              },
            }}
            renderMessage={renderMessage}

            renderInputToolbar={(props) => (
              <InputToolbar
                {...props}
                containerStyle={{
                  // backgroundColor: 'lightgrey', 
                  // height:46,
                  //  borderTopWidth:1

                }}
                primaryStyle={{
                  backgroundColor: '#F3F4F6',
                  // backgroundColor: 'red',

                  borderRadius: (screenWidth, screenHeight) * 0.01,
                  height: screenHeight * 0.055,
                  // height:"auto",
                  alignItems: "center",
                   justifyContent: "center"
                  // Example background color for the text input area
                }}
                renderComposer={(composerProps) => (
                  <Composer
                    {...composerProps}
                    textInputStyle={{
                      fontFamily: 'Urbanist_500Medium',
                      fontSize: RFValue(15),


                    }}
                  // multiline={true}
                  />
                )}
              />
            )}

          />
        </View>






        {modalVisible && (
          <TouchableWithoutFeedback onPress={() => setmodalVisible(false)}>
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
                    paddingVertical: screenHeight * 0.04,
                    // paddingTop:38,
                    paddingHorizontal: screenWidth * 0.05,
                    alignItems: 'center',

                    // position:"absolute"
                  }}
                >



                  <Text
                    style={{
                      fontSize: RFValue(16),
                      fontFamily: "Urbanist_600SemiBold",
                      color: "black",
                      //  marginTop: "1%"

                    }}
                  >Confirmation!</Text>

                  <Text
                    style={{
                      fontSize: RFValue(13),
                      fontFamily: "Urbanist_500Medium",
                      color: "#6A707C",
                      marginTop: 5
                    }}
                  >Are you sure you want to delete this chat?</Text>

                  <View style={{ flexDirection: "row",
                   position: 'relative',
                  //  marginTop: "10%",
                  marginTop:29,
                    width: "90%", alignSelf: "center", 
                    justifyContent: "center" }}>
          
          
          
                    <TouchableOpacity
                    onPress={() => setmodalVisible(false)}
                      style={{
                        // borderRadius: 4,
                        // backgroundColor: '#0F2944',
                        height: screenHeight * 0.059,
                        alignSelf: "center",
                        justifyContent: "center",
                        // width: "35.3%",
                        width: "45%",
                        borderRadius: (screenWidth, screenHeight) * 0.006,
                        borderRadius: 7,
                        borderColor: "#0F2944",
                        borderWidth: (screenWidth, screenHeight) * 0.0012,
                        marginRight:10,
                        // borderWidth: 1,
          
                      }}><Text style={{
                        fontSize: RFValue(15),
                        fontFamily: "Urbanist_600SemiBold",
                        // lineHeight: 18,
                        alignSelf: "center",
                        color: '#0F2944',
          
          
                      }}
                      >No</Text>
                    </TouchableOpacity>
          
                    <TouchableOpacity
                      onPress={handleDeleteChat}
                      style={{
                        // borderRadius: 4,
                        backgroundColor: '#0F2944',
                        height: screenHeight * 0.059,
                        alignSelf: "center",
                        justifyContent: "center",
                        width: "47%",
                        borderRadius: (screenWidth, screenHeight) * 0.007,
                        borderRadius: 8,
                        marginRight:10,

          
                      }}><Text style={{
                        fontSize: RFValue(15),
                        fontFamily: "Urbanist_500Medium",
                        // lineHeight: 18,
                        alignSelf: "center",
                        color: '#F9F9F9',
          
          
                      }}
                      >Yes</Text>
                    </TouchableOpacity>
                  </View>



                 
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        )}

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
                    height: 300,
                    width: 130
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
                  >You Are Going to H</Text>
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

  );
};


const styles = StyleSheet.create({

  callImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginLeft: "50%",
    position: "absolute"

  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "flex-start",
    paddingVertical: 8,
  },

});
export default ChatScreen;


// kookswsw