import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';

const ObjectList = () => {
  const navigation = useNavigation();

  const dataArray = [
    {
      id: 1,
      image: require("../../assets/LostApp/ChatProfile.png"),
      text1: 'Text for Object 1',
      text2: 'Description 1',
    },
    {
      id: 2,
      image: require("../../assets/LostApp/ChatProfile.png"),
      text1: 'Text for Object 2',
      text2: 'Description 2',
    },
    {
      id: 3,
      image: require("../../assets/LostApp/ChatProfile.png"),
      text1: 'Text for Object 3',
      text2: 'Description 3',
    },
  ];

  const handleObjectPress = (object) => {
    // Open the ObjectDetailsScreen and pass the object data as a parameter
    navigation.navigate('ObjectDetailsScreen', { object });
  };

  return (
    <ScrollView>
    <View style={styles.container}>
    {dataArray.map((object) => (
        <View key={object.id} style={styles.objectContainer}>
          <Image  source={object.image} style={styles.image} />
          <Text style={styles.text}>{object.text1}</Text>
          <Text style={styles.text}>{object.text2}</Text>
          <TouchableOpacity
          style={styles.button}
          onPress={() => handleObjectPress(object)}
          >
          <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
          </View>
          ))}
          </View>
          </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  objectContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ObjectList;
