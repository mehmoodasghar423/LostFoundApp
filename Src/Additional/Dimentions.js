










import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView,TouchableOpacity } from 'react-native';

const ParentViewWithBoxes = () => {
  const screenWidth = Dimensions.get('window').width;
  const box_Width = (screenWidth * 0.95);
  const screenHeight = Dimensions.get('window').height;
  const boxHeight = screenHeight * 0.3;

  


  // Sample data containing image paths and text
  const things = [
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("./assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('./assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
   
  ];

  return (
    <ScrollView>
    <View style={{ justifyContent:"center",alignItems:"center" }}>

    {things.map((item, index) => (
      <View style={{
        position: "relative",
        // width: 320,
        width: "89%",
        width:box_Width,
        height: 53,
        // height: boxHeight,
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
        marginTop: 9,
        borderWidth:1
        
      }}
        key={index} >

        <Image
          style={{
            width: 48,
            height: 46,
            borderRadius: 8,
            position: "absolute",
            left: 3,
            top: 4,

          }}
          source={item.image} />


        <Text
          style={{
            fontWeight: "500",
            // fontFamily: 'Montserrat_500Medium',
            fontSize: 14,
            lineHeight: 16.44,
            position: "absolute",
            left: 65,
            top: 11,
            color: "black",
          }}
        >{item.name}</Text>

        <Image
          style={{
            width: 12.07,
            height: 12.07,
            position: "absolute",
            left: 65,
            top: 30,
          }}
          source={item.Distancepng} />

        <Text
          style={{
            fontWeight: "400",
            // fontFamily: 'Montserrat_500Medium',
            fontSize: 9.05,
            lineHeight: 10.63,
            position: "absolute",
            left: 80.09,
            top: 30.54,
            color: "#858585",
          }}
        >{item.Distance}</Text>

        <Text
          style={{
            fontWeight: "400",
            // fontFamily: 'Montserrat_500Medium',
            fontSize: 10,
            lineHeight: 11.74,
            position: "absolute",
            right: 13,
            top: 12,
            color: "#BDBDBD",
          }}
        >{item.date}</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Details")}

          style={{

            position: "absolute",
            right: 12,
            top: 31,
            justifyContent: "center"

          }}>

          <Text style={{
            color: "#858585",
            alignSelf: "center",
            fontSize: 9.05,
            fontWeight: "400",
            lineHeight: 10.63
          }}>View details</Text>
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
    marginTop: 40,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  box: {
    height: 80,
    borderWidth: 1,
    borderColor: 'black',
    position: 'relative',
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginTop: 9,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  absoluteText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontSize: 16,
  },
});

export default ParentViewWithBoxes;











// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// // import BottomTabs from './src/Lost & Found App/BottomTabs'
// import Welcome from './Src/Welcome'
// import Login from './Src/Login'
// import TabNavigator from './Src/TabNavigator'
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();
// const App = () => {
//   return (
//     <NavigationContainer>
//     <Stack.Navigator initialRouteName='TabNavigator'>
//     <Stack.Screen name="Welcome" component={Welcome}  options={{headerShown:false}} />
//     <Stack.Screen name="Login" component={Login}  options={{headerShown:false}} />
//     <Stack.Screen name="TabNavigator" component={TabNavigator}  options={{headerShown:false}} />
//     </Stack.Navigator>
//     </NavigationContainer>
//   )
// }


// const styles = StyleSheet.create({})
// export default App





// <View style={{
//   width:"100%",
//   height:"100%",
//   position:"relative",
//   bottom:0
// }}>
// <BottomTabs/>
// </View>