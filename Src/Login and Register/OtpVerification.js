import { StyleSheet, Text, View,TouchableOpacity,Image,TextInput ,Dimensions} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
  import {
    Urbanist_300Light,Urbanist_400Regular,Urbanist_500Medium,Urbanist_600SemiBold,Urbanist_700Bold, 
  } from  '@expo-google-fonts/urbanist';
  import { useFonts } from  '@expo-google-fonts/urbanist';
  import * as SplashScreen from 'expo-splash-screen';
  import { RFPercentage, RFValue } from "react-native-responsive-fontsize";




  const CELL_COUNT = 4;

const OtpVerification = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;


    const handleGoBack = () => {
        navigation.goBack();
      };


  const [email, setEmail] = useState('');


  const [value, setValue] = useState('');
  const [isFull, setIsFull] = React.useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT, setIsFull });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });


  const handleFulfill = (code) => {
    if (code.length === CELL_COUNT) {
      setIsFull(true);
    }
  };


  let [fontsLoaded] = useFonts({
    Urbanist_300Light,Urbanist_400Regular,Urbanist_500Medium,Urbanist_600SemiBold,Urbanist_700Bold,  
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
    <TouchableOpacity onPress={handleGoBack}>
    <Image style={{
      width: 41,
      width:screenWidth*0.11,
      height: 41,
      height: screenHeight*0.057,
      // top: 20,
      marginTop:"6%",
      left: "5%"

    }}
      source={require("../../assets/LostApp/back.png")} />
  </TouchableOpacity>

  <Text
  style={{
    fontSize: RFValue(20),
    fontFamily:"Urbanist_600SemiBold",
    // lineHeight: 20,
    // left: "6%",
    letterSpacing: -1,
    position: "relative",
    marginTop:"10%",
   
   
    // width: 210,
    alignSelf:"center"
  }}
>
OTP Verification
</Text>

  <Text
  style={{
    fontSize:  RFValue(12),
   fontFamily:"Urbanist_500Medium",
    // lineHeight: 18,
    // left: "6%",
    position: "relative",
    marginTop:"2%",
    alignSelf:"center",
    color:"#8391A1",
    // width:260
  }}
>
Enter the verification code we just sent on your {'\n'}                              email address.
</Text>





<View style={{}}>
      <CodeField
        ref={ref}
        {...props}
        // caretHidden={true}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={{position:"relative",marginTop:"10%",width:"90%",alignSelf:"center"}}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[{
              width:"21.6%",
              height:60,
              height: screenHeight*0.082,
              // lineHeight: 26.4,
              fontSize: RFValue(22),
               borderRadius:8,
              backgroundColor:"#E8ECF4",
              color:"#1E232C",
             fontFamily:"Urbanist_700Bold",
              borderWidth:1,
              borderColor:"#E8ECF4",
              textAlign:"center",
              paddingTop:17,
              
            }, isFocused && styles.focusCell , isFull && styles.full,]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </View>


  <TouchableOpacity
  onPress={()=>navigation.navigate('CreateNewPassword')}
  style={{
    position: "relative",
    borderRadius: 8,
    backgroundColor: '#7689D6',
    // padding: 10,
    // width: 320,
    width: "90%",
    height: screenHeight*0.06,
    alignSelf: "center",
   marginTop:"8%",
    justifyContent: "center"
  }}><Text style={{
    fontSize: RFValue(15),
    fontFamily:"Urbanist_600SemiBold",
    // lineHeight: 18,
    alignSelf: "center",
    color: '#F9F9F9',


  }}
  >Verify Code </Text>
</TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    cell: {
    //   width: 70,
      width:"21.6%",
      height: 60,
      // lineHeight: 26.4,
      fontSize: RFValue(22),
       borderRadius:8,
      backgroundColor:"#E8ECF4",
      color:"#1E232C",
     fontFamily:"Urbanist_700Bold",
      borderWidth:1,
      borderColor:"#E8ECF4",
      textAlign:"center",
      paddingTop:17,
      
   
    },
    focusCell: {
      borderColor: '#7689D6',
      borderWidth:1,
    },
  full: {
    borderColor: 'red',
    borderWidth:3,
  },

  });
  
export default OtpVerification;