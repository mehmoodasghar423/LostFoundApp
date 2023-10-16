import { StyleSheet, Text, View,Button} from 'react-native'
import React from 'react'

function MyaddsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Profile"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    );
  }

const styles = StyleSheet.create({})
export default MyaddsScreen;