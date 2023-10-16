import React,{useEffect} from 'react';
import { View, Image, Text } from 'react-native';
import { 
  useFonts
  ,Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black, } from '@expo-google-fonts/montserrat';

const myArray = [
  {
    name: 'Green Lost Wallet',   
    date: '22- 04-2023',
    location: ' DHA, Lahore',
    image: require('../assets/LostApp/Leather.png'),
    imagee: require('../assets/LostApp/Locationnn.png'),
  },
  {
    name: '  Documents',
    date: '12- 05-2023',
    location: 'University of Lahore',
    image: require('../assets/LostApp/Documents.png'),
    imagee: require('../assets/LostApp/Locationnn.png'),
  },
  {
    name: 'Passport',
    date: '02- 03-2023',
    location: ' Pakages Mall, Lahore',
    image: require('../assets/LostApp/Passportt.png'),
    imagee: require('../assets/LostApp/Locationnn.png'),
  },
];

export default function MyComponent() {
  const [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  useEffect(() => {
    if (!fontsLoaded) {
      return;
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <View>
      {myArray.map((item, index) => (
        <View style={{

          width:"100%",
          height:141,
          marginBottom:5,
          // position:"relative",
          position:"relative",
          top:37,
          // left:6,
          
          
          left:"1.7%",
         
          borderRadius:6,
          backgroundColor:"white",
          borderWidth:2,
          borderColor: "rgba(0, 0, 0, 0.04)",
          
                  }}
                   key={index} >
          <Image 
          style={{
            width:128,
            // width:"36%",
            height:105.72,
            top:15,
            left:15,
          }}
           source={item.image} />


          <Text 
          style={{
            fontWeight:"500",
            fontFamily: 'Montserrat_500Medium',
            fontSize:12,
            lineHeight:14.63,
            position:"absolute",
            left:167,
            // left:"45%",
            top:18,
            color:"rgba(0, 0, 0, 1)",
            letterSpacing:0.02
            
          }}
          >{item.name}</Text>


          <Text
          style={{
            fontWeight:"400",
            fontFamily:"Montserrat_400Regular",
            fontSize:12,
            lineHeight:14.63,
            position:"absolute",
            left:170,
            top:38,
            color:"rgba(0, 0, 0, 1)"
            
          }}
          >{item.date}</Text>

          <Image 
          style={{
            width:14,
            height:14,
            top:-47,
            left:166,
          }}
           source={item.imagee} />
          <Text
          style={{
            fontWeight:"400",
            fontFamily:"Montserrat_500Medium",
            fontSize:12,
            lineHeight:14.63,
            position:"absolute",
            left:179,
            top:58,
            color:"rgba(0, 0, 0, 0.75)"
            
          }}
          >{item.location}</Text>
        </View>
      ))}
    </View>
  );
}
