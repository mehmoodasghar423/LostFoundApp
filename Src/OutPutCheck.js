import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

const Screen3 = () => {
  const navigation = useNavigation();

  const [userDataList, setUserDataList] = useState([]);

  useEffect(() => {
    const userRef = firebase.firestore().collection("UserData");

    userRef.onSnapshot((querySnapshot) => {
      const userDataArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        userDataArray.push({ id: doc.id, ...data });
      });
      setUserDataList(userDataArray.reverse()); 
    });
  }, []);

  return (
    <View>
    <FlatList
    data={userDataList}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={styles.userContainer}
        onPress={() => {
          navigation.navigate('DetailsScreen', {
            category:item.category,
            location:item.location,
            imageUrl1: item.imageUrl1,
          });
        }}
      >
        <Image source={{ uri: item.imageUrl1 }} style={styles.image} />
       <Text> {item.location}</Text>
            <Text>{item.category}</Text>
      </TouchableOpacity>
    )}
  />
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    backgroundColor: "grey",
    marginVertical: 10,
    borderRadius: 30,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    margin: 10,
  },
});

export default Screen3;
