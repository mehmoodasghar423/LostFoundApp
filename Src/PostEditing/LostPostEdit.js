import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Dimensions ,TouchableWithoutFeedback} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react';
import {
  Urbanist_300Light, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
import { useFonts } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { firebase } from '../../config';
import { SelectList } from 'react-native-dropdown-select-list';
import { Entypo ,Fontisto,MaterialIcons,Ionicons,AntDesign  } from '@expo/vector-icons';





const LostPostEdit = ({ route, navigation }) => {
  const { documentId } = route.params;
  const { selectedCity } = route.params || { selectedCity: null};


  // const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

// Update the selected city state when received from route.params
useEffect(() => {
  if (route.params && route.params.selectedCity) {
    setLocation(route.params.selectedCity);
  }
}, [route.params]);


const locationHandler = () => {
  navigation.navigate("LPeLocation", {
    documentId: documentId // Pass the documentId in the route params
  });
};


  const [defaultSelectedCategory, setDefaultSelectedCategory] = useState('');
  const [modalVisible, setmodalVisible] = useState(false);


  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection("UserData").doc(documentId);
      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
  
            setLocation(data.location);
  
           
            // Check if the category is available in the data
            if (data && data.category) {
              // Set the category directly as the default selected category
              const defaultCategory = { key: '1', value: data.category };
              setDefaultSelectedCategory(defaultCategory);
            } else {
              console.error("Category not found in the retrieved data.");
            }
          } else {
            console.error("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error getting document:", error);
        });
    }
  }, [documentId]);
  
  
  

  const data = [
    { key: 'Electronics', value: 'Electronics' },
    { key: 'Jewelry', value: 'Jewelry' },
    { key: 'Bag', value: 'Bag' },
    { key: 'Wallet', value: 'Wallet' },
    { key: 'Glasses', value: 'Glasses' },
  ]


  const handleGoBack = () => {
    navigation.goBack();
  };




  const NextScreen = () => {
    navigation.navigate('LostPostNextEdit', {
      category: category,
      location,
      documentId: documentId
    });
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

  return (
    <SafeAreaView>

      <View>


      <View style={{ flexDirection: "row", position: "relative", alignItems: "center", marginTop: "3%", justifyContent: "space-between" }}>


      <TouchableOpacity
        style={{
          marginLeft: "4%",
          // marginTop:screenHeight*0.003,
          // backgroundColor: "red",
          height: screenHeight * 0.055,
          width: "11.4%",
          borderRadius: (screenWidth, screenHeight) * 0.016,
          borderWidth: (screenWidth, screenHeight) * 0.0013,
          borderColor: "#E0E0E0",
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",

        }}
        onPress={handleGoBack}>
        <Ionicons name="ios-chevron-back-sharp"
          size={screenWidth * 0.08}
          color="#6A707C"
          style={{
          }} />
      </TouchableOpacity>


      <Text
        style={{
          fontSize: RFValue(20),
          fontFamily: "Urbanist_600SemiBold",
          color: "#0F2944"
          // marginLeft: "30%",


        }}
      >
      Lost Post Editing
      </Text>


      <TouchableOpacity 
      style={{
        marginRight: "4%",
      }}
      onPress={() => setmodalVisible(true)}>
      <Image style={{
        width: screenWidth * 0.1,
        height: screenHeight * 0.047,
        resizeMode: "contain",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",

      }}
        source={require("../../assets/HomeBack.png")} />
    </TouchableOpacity>


   


    </View>

        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            left: "6%",
            position: "relative",
            top: screenHeight * 0.03

          }}
        >
          Category
        </Text>

        <View style={{
          // position: "absolute",
          // top: 105,
          position: "relative",
          top: screenHeight * 0.04
        }}>

          <SelectList
            setSelected={setCategory}
            data={data}
            defaultOption={defaultSelectedCategory}
            boxStyles={{
              backgroundColor: "#EDEEEF",
              borderWidth: 1,
              borderColor: "#EDEEEF",
              width: "91%",
              // height: screenHeight * 0.052,
              borderRadius: 8,
              fontSize: RFValue(12),

              paddingLeft: screenWidth * 0.1,

              color: "#8C9199",
              // marginLeft: "6%"
              alignSelf: "center"
            }}

            dropdownStyles={{
              borderWidth: 1,
              borderColor: "#EDEEEF",
              width: "91%",
              alignSelf: "center"
            }}

            dropdownTextStyles={{
              fontSize: RFValue(12),
              fontFamily: "Urbanist_500Medium",
            }}
            inputStyles={{
              // backgroundColor:"red",
              fontSize: RFValue(12),
              fontFamily: "Urbanist_500Medium",
            }}
          />
          <MaterialIcons name="category"
          size={RFValue(20)}
          color="#8391A1"
  
          style={{
            position: "absolute",
            left: "7%",
            top:screenHeight*0.013,
            marginRight:screenWidth*0.01,
         
     
  
          }}
        />
        </View>


        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: "Urbanist_500Medium",
            // lineHeight: 14.4,
            left: "6%",
            position: "relative",
            top: screenHeight * 0.063
            // position: "absolute",
            // top: 164,

          }}
        >
          Location
        </Text>

        <TouchableOpacity 
        onPress={locationHandler}
        style={{
          position: "relative",
          top: screenHeight * 0.073,
          // position:"absolute",
          // top:187,
          backgroundColor: "#EDEEEF",
          borderWidth: 1,
          borderColor:  '#EDEEEF',
          width: "91%",
          // width:279,
          height: 38,
          height: screenHeight * 0.052,
          borderRadius: 8,
          fontSize: RFValue(12),
          alignSelf:"center",
          flexDirection:"row",
          alignItems:"center",justifyContent:"center",
        }}>
         
      
        <MaterialIcons name="location-city"
        size={RFValue(20)}
        color="#8391A1"

        style={{
          // position: "absolute",
          // left: "17%",
          // top: 2,
          marginRight:screenWidth*0.01,
          alignSelf: "center",
   

        }}
      />
            
       <Text style={{ 
        fontSize: RFValue(12),
        fontFamily: "Urbanist_500Medium",
        color:"#8391A1",marginRight:10
      }}>
       {location || '  Please Select Your Specific Location here '}
       </Text>
            <AntDesign name="down" 
            size={RFValue(13)}
            color="#8391A1"

            style={{
              // position: "absolute",
              left: "17%",
              top: 2,
              alignSelf: "center",
       

            }}
          />
        </TouchableOpacity>



      



        


        <TouchableOpacity
          onPress={NextScreen}
          style={{
            // position: "absolute",
            // top: 427,
            position: 'relative',
            top: screenHeight * 0.155,
            borderRadius: 8,
            backgroundColor: '#7689D6',
            // padding: 10,
            // width: 320,
            width: "93%",
            // width:335,
            height: screenHeight * 0.059,
            alignSelf: "center",

            justifyContent: "center"
          }}><Text style={{
            fontSize: RFValue(15),
            fontFamily: 'Urbanist_600SemiBold',
            // lineHeight: 18,
            alignSelf: "center",
            color: '#F9F9F9',


          }}
          >Next </Text>
        </TouchableOpacity>



        {modalVisible && (
          <TouchableWithoutFeedback onPress={() => setmodalVisible(false)}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                height: screenHeight * 1,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <TouchableWithoutFeedback>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: (screenWidth, screenHeight) * 0.03,
                    paddingVertical: screenHeight * 0.03,
                    paddingHorizontal: screenWidth * 0.07,
                    alignItems: 'center',
  
                    // position:"absolute"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setmodalVisible(false)}
                    style={{ position: 'absolute', top: screenHeight * 0.007, right: screenWidth * 0.021 }}>
  
                    <Entypo name="cross"
                      size={screenWidth * 0.065}
                      color="black" />
                  </TouchableOpacity>
  
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      fontFamily: "Urbanist_600SemiBold",
                      color: "#778899"
  
                    }}
                    >You Are Going to Home Page !</Text>
                  <Text
                    style={{
                      fontSize: RFValue(16),
                      fontFamily: "Urbanist_600SemiBold",
                      color: "black", marginTop: "1%"
  
                    }}
                  >Do You Want to Continue ?</Text>
  
                  <View style={{ flexDirection: 'row', marginTop: screenHeight*0.02 ,marginLeft:"7%",}}>
                    <TouchableOpacity
                      onPress={() => setmodalVisible(false)}
                      style={{
                        marginRight: screenWidth * 0.05,
                        width: "25%",
                        height: screenHeight * 0.032,
                        backgroundColor: "#3cb371",
                        borderRadius: (screenWidth, screenHeight) * 0.03,
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(15),
                          fontFamily: "Urbanist_600SemiBold",
                          color: "white",
                          // left: "6%",
                        }}
                      >Cancel</Text>
                    </TouchableOpacity>
  
                    <TouchableOpacity
                      style={{
                        marginRight: screenWidth * 0.05,
                        width: "40%",
                        height: screenHeight * 0.032,
                        backgroundColor: "#7689D6",
                        borderRadius: (screenWidth, screenHeight) * 0.03,
                        alignItems: "center",
                        justifyContent: "center",
                        
                      }}
                      onPress={() => navigation.navigate("Home")}>
                      <Text
                        style={{
                          fontSize: RFValue(15),
                          fontFamily: "Urbanist_600SemiBold",
                          color: "white",
                          // left: "6%",
                        }}>Go To Home</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        )}

        
        
      </View>
    </SafeAreaView>
  )
}

export default LostPostEdit

const styles = StyleSheet.create({})