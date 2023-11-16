import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { firebase } from '../config';
import * as ImagePicker from 'expo-image-picker';

const RecordEditing = ({ route, navigation }) => {
  const { documentId } = route.params;
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [lostItem, setlostItem] = useState('');
  const [description, setdescription] = useState('')
  const [image1, setImage1] = useState(null); 
  const [image2, setImage2] = useState(null); 
  const [image3, setImage3] = useState(null); 



  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
  };



  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    hideTimePicker();
    setSelectedTime(time);
  };


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
            setCategory(data.setCategory);
            setLocation(data.setLocation);
            setSelectedDate(data.setSelectedDate);
            setSelectedTime(data.setSelectedTime);
            setdescription(data.setdescription);
          
          } else {
            console.error("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
    }
  }, [documentId]);



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 6],
    });
  
    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      setImage(selectedAsset.uri);
    }
  };

 
  

  const saveEditedData = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userDataRef = firebase.firestore().collection("UserData").where("uid", "==", user.uid);
  
      // Check if the user already has a document in the collection
      const userSnapshot = await userDataRef.get();
  
      if (userSnapshot.empty) {
        // If no document exists for the user, add a new one
        const userData = {
          name,
          qualification,
          intro,
          uid: user.uid,
          imageUrl: image ? image : null,
      
        };
  
        firebase.firestore().collection("UserData").add(userData)
          .then(() => {
            navigation.goBack(); 
          })
          .catch(error => {
            console.error("Error adding document to Firestore: ", error);
          });
      } else {
        
        const userDataDoc = userSnapshot.docs[0];
        const userData = {
          name,
          qualification,
          intro,
          imageUrl: image ? image : userDataDoc.get("imageUrl"), 
        };
  
        userDataDoc.ref.update(userData)
          .then(() => {
            navigation.goBack(); 
          })
          .catch(error => {
            console.error("Error updating data in Firestore: ", error);
          });
      }
    }
  };
  
  
  
  
  
  
  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="Qualification"
        value={qualification}
        onChangeText={text => setQualification(text)}
      />
      <TextInput
        placeholder="intro"
        value={intro}
        onChangeText={text => setintro(text)}
      />
     
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Change Image" onPress={pickImage} />
      <Button title="Save Data" onPress={saveEditedData} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    margin: 10,
  },
});

export default RecordEditing;
