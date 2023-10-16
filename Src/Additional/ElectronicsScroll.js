










import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView,TouchableOpacity } from 'react-native';

const ParentViewWithBoxes = () => {
  const screenWidth = Dimensions.get('window').width;
  const box_Width = (screenWidth * 0.95);
  const boxWidth = (screenWidth * 0.60);
  
  
  const screenHeight = Dimensions.get('window').height;
  const boxHeight = screenHeight * 0.3;

  


  // Sample data containing image paths and text
  const things = [
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
    {
      image: require("../../assets/LostApp/GlassesBg.png"),
      Distance: '1.8 km',
      Distancepng: require('../../assets/LostApp/Locationtwo.png'),
      name: 'Glasses',
      date: '3 July 2023'

    },
   
  ];

  const myArray = [
    {
      name: 'Glasses',
      date: '3 July 2023',
      image: require('../../assets/LostApp/GlassesBg.png'),
      Shadow: require('../../assets/LostApp/Shadow.png'),
      type: 'Lost'
  
    },
    {
      name: 'Glasses',
      date: '3 July 2023',
      image: require('../../assets/LostApp/GlassesBg.png'),
      Shadow: require('../../assets/LostApp/Shadow.png'),
      type: 'Lost'
  
    },
    {
      name: 'Glasses',
      date: '3 July 2023',
      image: require('../../assets/LostApp/GlassesBg.png'),
      Shadow: require('../../assets/LostApp/Shadow.png'),
      type: 'Lost'
  
    },
  ];



  return (
    
     <View>
      <View style={{ flexDirection: "row" }}>

        <Text style={{
          position: "relative",
          fontSize: 14,
          fontWeight: "500",
          lineHeight: 16.44,
          color: "#000000",
          marginLeft: "6%"
        }}>Recent Ads</Text>
        <TouchableOpacity style={{ marginLeft: "54%" }}>

          <Text style={{
            position: "relative",

            fontSize: 12,
            fontWeight: "400",
            lineHeight: 14.09,
            color: "#858585",

          }}>See more</Text>

        </TouchableOpacity>
      </View>




      <ScrollView horizontal showsHorizontalScrollIndicator={false}  >



        <View style={{ flexDirection: "row", position: "relative", marginTop: 9, }}>

          {myArray.map((item, index) => (
            <View style={{
              position: "relative",
              // width: 179,
              width:boxWidth,
              height: 197,
              // height:boxHeight,
              borderRadius: 8,
              backgroundColor: "blue",

              marginLeft: 8,

            }}
              key={index} >


              <Image
                style={{

                  width: "100%",
                  height: "100%",
                  borderRadius: 8
                }}
                source={item.image} />

              <Image
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: 8
                }}
                source={item.Shadow} />


              <Text
                style={{
                  fontWeight: "500",
                  // fontFamily: 'Montserrat_500Medium',
                  fontSize: 14,
                  lineHeight: 16.44,
                  position: "absolute",
                  left: 10,
                  // left:"45%",
                  bottom: 42,
                  color: "white",


                }}
              >{item.name}</Text>


              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 10,
                  lineHeight: 11.74,
                  position: "absolute",
                  right: 9,
                  bottom: 45,
                  color: "#D7D7D7"

                }}
              >{item.date}</Text>

              <View
                style={{
                  backgroundColor: "#8DA4BC",
                  width: 31,
                  height: 17.04,
                  position: "absolute",
                  right: 17,
                  top: 12,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 9,
                    lineHeight: 10.63,
                    color: "#FFFFFF"

                  }}
                >{item.type}</Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("Details")}

                style={{
                  backgroundColor: '#7689D6',
                  // width: 163,
                  width: "91%",
                  height: 29,
                  borderRadius: 8,
                  position: "absolute",
                  right: 8,

                  bottom: 9,
                  justifyContent: "center"

                }}>

                <Text style={{
                  color: "white",
                  alignSelf: "center",
                  fontSize: 10,
                  fontWeight: "500",
                  lineHeight: 12
                }}>View details</Text>
              </TouchableOpacity>
            </View>
          ))}




        </View>
      </ScrollView>





      <View style={{ flexDirection: "row", marginTop: 21 }}>

        <Text style={{
          position: "relative",
          fontSize: 14,
          fontWeight: "500",
          lineHeight: 16.44,
          color: "#000000",
          marginLeft: "6%"
        }}>Lost Items Near me</Text>
        <TouchableOpacity style={{ marginLeft: "38%" }}>

          <Text style={{
            position: "relative",

            fontSize: 12,
            fontWeight: "400",
            lineHeight: 14.09,
            color: "#858585",

          }}>See more</Text>

        </TouchableOpacity>
      </View>


      <ScrollView>
      <View style={{ justifyContent:"center",alignItems:"center" }}>
  
      {things.map((item, index) => (
        <View style={{
          position: "relative",
          // width: 320,
        //   width: "89%",
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
     
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    // resizeMode: "contain",
    width: 179,
    height: 197,
    margin: 4,
    // flex: 1,
    // resizeMode: 'cover',
    borderRadius: 10,




  },
  container: {
    flex: 1,
    backgroundImage: 'url("../../assets/LostApp/GlassesBg.png")',
    backgroundSize: 'cover',
    width: 100,
    height: 100
  },
})

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