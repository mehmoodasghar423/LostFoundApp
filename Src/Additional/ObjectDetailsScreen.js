import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ObjectDetailsScreen = () => {
  const route = useRoute();
  const { object } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={ object.image } style={{ width: 200, height: 200 }} />
      <Text>{object.text1}</Text>
      <Text>{object.text2}</Text>
    </View>
  );
};

export default ObjectDetailsScreen;
