import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const locationWidth = Dimensions.get("window").width
const mainViewWidth = Dimensions.get("window").width

const ElectronicsScreen = () => {
  const Glass = [
    {
      id: 1,
      Title: "Glasses",
      Type: "Lost",
      imagepath: require('../assets/Glasses.png'),
      date: "3 july, 2023",
      imageShadow: require("../assets/shadow.png")
    },
    {
      id: 2,
      Title: "Glasses",
      Type: "Lost",
      imagepath: require('../assets/Glasses.png'),
      date: "3 july, 2023",
      imageShadow: require("../assets/shadow.png")
    },
    {
      id: 3,
      Type: "Lost",
      imagepath: require('../assets/Glasses.png'),
      date: "3 july, 2023",
      imageShadow: require("../assets/shadow.png")
    },
  ];

  const LostItem = [
    {
      id: 1,
      imagepath1: require('../assets/Glasses.png'),
      Title: "Glasses",
      imagepath: require('../assets/Location.png'),
      date: "3 july, 2023",
      Location: "1.8 km",
    },
    {
      id: 2,
      imagepath1: require('../assets/Glasses.png'),
      Title: "Glasses",
      imagepath: require('../assets/Location.png'),
      date: "3 july, 2023",
      Location: "1.8 km",
    },
    {
      id: 3,
      imagepath1: require('../assets/Glasses.png'),
      Title: "Glasses",
      imagepath: require('../assets/Location.png'),
      date: "3 july, 2023",
      Location: "1.8 km",
    }, {

      id: 4,
      imagepath1: require('../assets/Glasses.png'),
      Title: "Glasses",
      imagepath: require('../assets/Location.png'),
      date: "3 july, 2023",
      Location: "1.8 km",
    }, {
      id: 5,
      imagepath1: require('../assets/Glasses.png'),
      Title: "Glasses",
      imagepath: require('../assets/Location.png'),
      date: "3 july, 2023",
      Location: "1.8 km",
    },
    {
      id: 6,
      imagepath1: require('../assets/Glasses.png'),
      Title: "Glasses",
      imagepath: require('../assets/Location.png'),
      date: "3 july, 2024",
      Location: "1.8 km",
    },
    {
      id: 7,
      imagepath1: require('../assets/Glasses.png'),
      Title: "Glasses",
      imagepath: require('../assets/Location.png'),
      date: "3 july, 2023",
      Location: "1.8 km",
    },
  ];


  const imagewidth = screenWidth * 0.5;
  const imageheight = 190;
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>

        <View style={{}}>
          <View style={{ width: imagewidth, height: imageheight, }}>
            <Image source={item.imagepath} style={styles.image} />
            <Image source={item.imageShadow} style={styles.image2} />
          </View>
          <Text style={styles.title}>{item.Title}</Text>
          <Text style={styles.type}>{item.Type}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <TouchableOpacity style={styles.detailsbtn}
            onPress={() => navigation.navigate("details")}
          >
            <Text style={{ color: "white", fontWeight: "500" }}>View details</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  };

  const RenderLostItem = ({ item }) => {

    return (
      <View style={styles.LostListView}>
        <View style={{ flexDirection: "row" }}>
          <Image source={item.imagepath1} style={styles.ItemImage} />
          <Text style={styles.itemTitle}>{item.Title}</Text>
          <Text style={styles.itemDate}>{item.date}</Text>
        </View>
        <View style={styles.SecondView}>
          <Image source={item.imagepath}
            style={styles.LocationImg}
          />
          <Text style={styles.Locationtxt}>{item.Location}</Text>
          <TouchableOpacity style={styles.detailsView}>
            <Text style={styles.detailbtb}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>


    )
  }

  return (
    <View>
      <View style={styles.headingtxt}>
        <Text style={styles.heading}>Recent Ads</Text>
        <TouchableOpacity style={styles.sndtxt}>
          <Text style={{ color: "#858585" }}>See more</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={Glass}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <View style={{ marginTop: 20 }}>
        <View style={styles.headingtxt2}>
          <Text style={styles.heading}>Lost Items Near me</Text>
          <TouchableOpacity style={styles.sndtxt2}>
            <Text style={{ color: "#858585" }}>See more</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={{ height: "50%" }}
        data={LostItem}
        keyExtractor={(item) => item.id}
        renderItem={RenderLostItem}
      />
    </View >
  );
};

const styles = StyleSheet.create({
  headingtxt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,



  },
  headingtxt2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  sndtxt2: {
    paddingHorizontal: 10,
  },
  sndtxt: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    padding: 5,
    borderBottomColor: '#E0E0E0',
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 8,
  },
  image2: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 8
  },
  title: {
    fontSize: 16,
    position: "absolute",
    color: "#FFFFFF",
    fontWeight: "500",
    lineHeight: 16,
    left: 10,
    bottom: 45

  },
  type: {
    fontSize: 14,
    color: '#858585',
    position: "absolute",
    backgroundColor: "#D7D7D7",
    width: 45,
    height: 25,
    borderRadius: 8,
    paddingLeft: 8,
    right: 12,
    top: 12,
    paddingTop: 3

  },
  date: {
    fontSize: 12,
    color: '#D7D7D7',
    position: "absolute",
    right: 9,
    bottom: 45
  },
  detailsbtn: {
    position: "absolute",
    backgroundColor: "#7689D6",
    height: 33,
    width: "91%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    left: 8,
    bottom: 9
  },
  heading: {
    fontSize: 12,
    fontWeight: "600",
  },
  LostListView: {
    flexDirection: "column",
    height: 60,
    width: "95%",
    borderRadius: 5,
    borderColor: "#E8ECF4",
    backgroundColor: "white",
    elevation: 3,
    marginBottom: 10
  },
  ItemImage: {
    height: 48,
    width: 50,
    borderRadius: 8,
    marginTop: 6,
    marginLeft: 5
  },
  itemTitle: {
    marginLeft: 10,
    marginTop: 7
  },
  itemDate: {
    position: "absolute",
    right: 20,
    color: "#8391A1",
    fontSize: 10,
    fontWeight: "400"
  },
  SecondView: {
    flexDirection: "row",
    bottom: 25,
    marginLeft: 65
  },
  LocationImg: {
    height: 12,
    width: 12,
    marginTop: 2
  },
  Locationtxt: {
    color: "#8391A1",
    fontWeight: "400",
    fontSize: 10
  },
  detailsView: {
    position: "absolute",
    right: 20
  },
  detailbtb: {
    color: "#8391A1",
    fontSize: 10,
    fontWeight: "400"
  }

});

export default ElectronicsScreen;