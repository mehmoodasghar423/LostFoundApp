import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { GiftedChat, InputToolbar, Composer, Bubble } from 'react-native-gifted-chat';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Dimensions, Linking, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Entypo } from '@expo/vector-icons';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";




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
                backgroundColor: '#7689D6', // Example background color

                marginTop: 0,
                marginRight: 10,
                marginBottom: 4,
                borderTopLeftRadius: 16, // Radius for top left corner
                borderTopRightRadius: 16, // Radius for top right corner
                borderBottomLeftRadius: 16, // Radius for bottom left corner
                borderBottomRightRadius: 0, // Radius for bottom right corner
              },
            }}
          />
        </View>
      );
    }

    // For recipient's messages or other users' messages
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
            userProfilePics[currentMessage.user._id]
              ? { uri: userProfilePics[currentMessage.user._id] }
              : require('../assets/LostApp/ChatProfile.png')
          }
        />
        <Bubble {...props} />
      </View>
    );
  };




  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;


  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const user = firebase.auth().currentUser;
  const chatRoomRef = firebase.firestore().collection('chatRooms').doc(chatRoomId);
  const messagesRef = chatRoomRef.collection('messages');

  const [messages, setMessages] = useState([]);

  const handleGoBack = () => {
    navigation.goBack();
  };
  ///



  const handleDeleteChat = () => {
    Alert.alert(
      "Delete Chat",
      "Are you sure you want to delete this chat?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
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

              console.log('Chat room and messages deleted successfully');
              navigation.goBack(); // Go back after deletion
            } catch (error) {
              console.error('Error deleting chat room:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
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
            console.log("Recipient's data not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching recipient's data:", error);
        });
    } else {
      console.error('Invalid participants data.');
    }
  };



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


  // ...


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
    <SafeAreaView style={{ flex: 1 }}>

      <View style={{ flex: 1 }}>

        <View style={{
          flexDirection: "row",
          position: "relative",
          alignItems: "center",
          backgroundColor: "white",
        
          height: screenHeight * 0.06,
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


          <TouchableOpacity style={{marginLeft:"6%"}} onPress={handleGoBack}>
          <Ionicons name="ios-chevron-back-sharp" size={30} color="black" />
          </TouchableOpacity>

          {recipientName ? ( // Check if recipientName is available
            <Text
              style={{
                fontSize: RFValue(18),
                fontFamily: "Urbanist_600SemiBold",
                marginLeft: "5%",
              }}
            >
              {recipientName}
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={makeCall}
            style={{ position: "absolute", right: 56 }}>
            <Ionicons name="call" size={20} color="#7689D6" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeleteChat}
            style={{ position: "absolute", right: 16 }}>
            <Entypo name="trash" size={18} color="#7689D6" />

          </TouchableOpacity>


        </View>

        <View style={{ flex: 1 }}>
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
                  backgroundColor: '#f0f8ff',

                  borderRadius: 10,
                  height: 40, alignItems: "center", justifyContent: "center"
                  // Example background color for the text input area
                }}
                renderComposer={(composerProps) => (
                  <Composer
                    {...composerProps}
                    textInputStyle={{
                      fontFamily: 'Urbanist_500Medium',
                      fontSize: RFValue(15),
                      width: 100// Example font size for the text input
                      // Add any other styles you want for the text input
                    }}
                  />
                )}
              />
            )}
          />
        </View>



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