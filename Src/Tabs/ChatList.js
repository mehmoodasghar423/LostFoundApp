import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image, Dimensions, TextInput, FlatList, ActivityIndicator,AppState } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../config';

const ChatList = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  const [chatList, setChatList] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [lastMessages, setLastMessages] = useState({});
  const [lastMessageTimes, setLastMessageTimes] = useState({});
  const [dataFound, setDataFound] = useState(true);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChatList, setFilteredChatList] = useState([]);

  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientProfilePic, setRecipientProfilePic] = useState('');

  const [userProfilePics, setUserProfilePics] = useState({});

  const updateUserStatus = (status) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      firebase.firestore().collection('UserData').doc(currentUser.uid).update({
        onlineStatus: status,
      });
    }
  };
  
  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      updateUserStatus('offline');
    } else if (nextAppState === 'active') {
      updateUserStatus('online');
    }
  };
  
  useEffect(() => {
    // Update user status to 'online' when the component is mounted
    updateUserStatus('online');
  
    // Subscribe to app state changes
    AppState.addEventListener('change', handleAppStateChange);
  
    // Cleanup function to remove the listener
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
      // Ensure user status is set to 'offline' when the component is unmounted
      updateUserStatus('offline');
    };
  }, []);
  
  useEffect(() => {
    const currentUserUid = firebase.auth().currentUser.uid;
    const chatRoomsRef = firebase.firestore().collection('chatRooms');
  
    chatRoomsRef
      .where('participants', 'array-contains', currentUserUid)
      .onSnapshot((querySnapshot) => {
        const chatListData = [];
  
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          chatListData.push({
            chatRoomId: doc.id,
            participants: data.participants,
          });
  
          const messagesRef = doc.ref.collection('messages');
          messagesRef
            .orderBy('createdAt', 'desc')
            .limit(1)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((messageDoc) => {
                setLastMessages((prevLastMessages) => ({
                  ...prevLastMessages,
                  [doc.id]: messageDoc.data(),
                }));
                setLastMessageTimes((prevLastMessageTimes) => ({
                  ...prevLastMessageTimes,
                  [doc.id]: messageDoc.data().createdAt.toDate(),
                }));
              });
            });
        });
  
        setChatList(chatListData);
        setFilteredChatList(chatListData);
  
        const participantIds = chatListData.flatMap((room) => room.participants);
        const uniqueParticipantIds = [...new Set(participantIds)];
  
        const profilePics = {}; // Store profile pictures associated with users
  
        Promise.all(
          uniqueParticipantIds.map((userId) =>
            firebase
              .firestore()
              .collection('UserData')
              .doc(userId)
              .get()
              .then((userDoc) => {
                if (userDoc.exists) {
                  const userData = userDoc.data();
                  setUserNames((prevNames) => ({
                    ...prevNames,
                    [userId]: userData.username,
                  }));
  
                  // Store the recipient's email in state
                  if (userId !== firebase.auth().currentUser.uid) {
                    setRecipientEmail(userData.email);
                  }
  
                  // Fetch profile pictures associated with users
                  return firebase
                    .firestore()
                    .collection('UserProfilePictures')
                    .doc(userData.email)
                    .get()
                    .then((snapshot) => {
                      if (snapshot.exists) {
                        profilePics[userId] = snapshot.data().profilePic;
                      } else {
                        profilePics[userId] = null; // Set null for users without a profile picture
                      }
                      // Update the profile pictures state
                      setUserProfilePics(profilePics);
                    })
                    .catch((error) => {
                      console.error('Error fetching profile picture:', error);
                    });
                }
                return null;
              })
          )
        )
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
            setLoading(false);
          });
      });
  }, []);
  



  useEffect(() => {
    if (recipientEmail) {
      firebase.firestore().collection('UserProfilePictures').doc(recipientEmail).get()
        .then(snapshot => {
          if (snapshot.exists) {
            setRecipientProfilePic(snapshot.data().profilePic);
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

  
  useEffect(() => {
    // Sort the chatList based on the last message time
    chatList.sort((a, b) => {
      const timeA = lastMessageTimes[a.chatRoomId];
      const timeB = lastMessageTimes[b.chatRoomId];
      return timeB - timeA;
    });
  }, [chatList, lastMessageTimes]);

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



  const filterChatList = (query) => {
    if (!query) {
      setFilteredChatList(chatList);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filteredResults = chatList.filter((item) => {
        const recipientId = item.participants.find(uid => uid !== firebase.auth().currentUser.uid);
        if (recipientId) {
          const recipientName = userNames[recipientId];
          return recipientName && recipientName.toLowerCase().includes(lowerCaseQuery);
        }
        return false; // No recipient found for the chat
      });
      setFilteredChatList(filteredResults);
    };
    // Update dataFound based on whether there are results
    setDataFound(filteredChatList.length > 0);
  };




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: RFValue(20),
              fontFamily: 'Urbanist_600SemiBold',
              letterSpacing: -1,
              position: 'relative',
              marginTop: '3.5%',
              color: '#1E232C',
              alignSelf: 'center',
            }}
          >
            Messages
          </Text>
        </View>

        <View style={{
          position: 'relative',
          marginTop: '3%',
        }}>
          <TextInput
            style={{
              backgroundColor: '#EDEEEF',
              borderWidth: 1,
              borderColor: '#EDEEEF',
              width: '91%',
              height: screenHeight * 0.052,
              borderRadius: 8,
              fontSize: RFValue(12),
              fontFamily: 'Urbanist_500Medium',
              paddingLeft: screenWidth * 0.1,
              letterSpacing: 0.1,
              color: '#8C9199',
              alignSelf: 'center',
            }}
            placeholder="Search"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text); // Update search query
              filterChatList(text); // Filter chat list based on the search query
            }}
          />

          <Ionicons
            name='search'
            size={RFValue(17)}
            color='#888888'
            style={{
              position: 'absolute',
              left: '8%',
              alignSelf: 'center',
              marginTop: 10,
            }}
          />
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {loading ? (
            <ActivityIndicator size='large' color='#7689D6' />
          ) : dataFound ? (
            <FlatList
              data={filteredChatList}
              keyExtractor={(item) => item.chatRoomId}
              renderItem={({ item }) => {
                const userName = userNames[item.participants.find(uid => uid !== firebase.auth().currentUser.uid)];
                const date = lastMessageTimes[item.chatRoomId]?.toLocaleString();

                // Check if userName contains the specific text you want to filter
                if (userName && userName.includes(userName)&& date) {
                  return (
                    <TouchableOpacity
                      style={{
                        position: 'relative',
                        marginTop: '4%',
                      }}
                      onPress={() => {
                        navigation.navigate('ChatScreen', {
                          chatRoomId: item.chatRoomId,
                          participants: item.participants,
                          recipientName: userNames[item.participants.find(uid => uid !== firebase.auth().currentUser.uid)],
                          userProfilePics
                        });
                      }}
                    >
                      <View style={{
                        position: 'relative',
                        width: screenWidth * 0.96,
                        marginTop: '4%',
                      }}
                      >
                      <Image
                      style={{
                        height: screenHeight * 0.076,
                        width: screenWidth * 0.137,
                        // resizeMode: 'contain',
                        borderRadius: (screenWidth, screenHeight) * 0.1,
                        borderWidth: (screenWidth, screenHeight) * 0.004,
                        borderColor: "white"
          
                      }}
                      source={
                        userProfilePics[item.participants.find(uid => uid !== firebase.auth().currentUser.uid)] 
                        ? { uri: userProfilePics[item.participants.find(uid => uid !== firebase.auth().currentUser.uid)] }
                        : require('../../assets/LostApp/ChatProfile.png')
                      }
                    
                    />
                  
                        <Text style={{
                          fontFamily: 'Urbanist_500Medium',
                          fontSize: RFValue(15),
                          position: 'absolute',
                          marginLeft: '16%',
                          marginTop: '1.6%',
                          color: 'black',
                        }}>{userNames[item.participants.find(uid => uid !== firebase.auth().currentUser.uid)]}</Text>
                        <Text style={{
                          fontFamily: 'Urbanist_400Regular',
                          fontSize: RFValue(13),
                          position: 'absolute',
                          marginLeft: '17%',
                          marginTop: '7.5%',
                          color: '#8391A1',
                        }}>{lastMessages[item.chatRoomId]?.text}</Text>
                        <Text
                          style={{
                            fontFamily: 'Urbanist_600SemiBold',
                            fontSize: RFValue(12),
                            position: 'absolute',
                            right: 1,
                            marginTop: '1.6%',
                            color: '#8391A1',
                            marginRight: '1.5%',
                          }}
                        > {lastMessageTimes[item.chatRoomId]?.toLocaleString()}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }
                else {
                  // Return null for items that don't match the filter text
                  return null;
                }
              }}
            />
          ) : (
            <Text style={styles.noResultsText}>No results found</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: '4%',
    borderBottomWidth: RFValue(3),
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
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
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: RFValue(14),
    fontFamily: 'Urbanist_400Regular',
    color: '#8391A1',
  },
});

export default ChatList;
