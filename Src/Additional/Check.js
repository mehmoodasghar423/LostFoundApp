import { StyleSheet, Text, View, Dimensions, FlatList,Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_PRODUCTS_API_ENDPOINT = 'https://31d9-39-37-159-76.ngrok-free.app/api/v1/userproduct';

const Check = () => {
  const screenWidth = Dimensions.get('window').width;

  const [products, setProducts] = useState([]);

  const fetchProducts = async (token) => {
    try {
      const response = await fetch(USER_PRODUCTS_API_ENDPOINT, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log('Fetched Data:', data);
        setProducts(data.data); // Update to set the array inside 'data'
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  
  // Function to get the user token from AsyncStorage
  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token;
    } catch (error) {
      console.error('Error getting user token:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Get the user token
      const token = await getUserToken();

      // Now you can use the token in your API requests or perform other actions
      if (token) {
        // Fetch products using the token
        fetchProducts(token);
      } else {
        console.log('User token not found.');
        // Handle the case where the token is not available
      }
    };

    fetchData();
  }, []); // Add products to the dependency array

//   console.log(products);

  return (
    <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
      <View>
        <Text style={{ fontSize: 20, marginBottom: 10 }}> User own  products </Text>
        {products.length > 0 ? (
          <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: 'green', padding: 5, margin: 3, borderRadius: 5 }}>
                <Text>id: {item._id}</Text>
                <Text>user: {item.user}</Text>
                <Text>item: {item.item}</Text>
                <Text>category: {item.category}</Text>
                <Text>type: {item.type}</Text>
                <Text>City: {item.city}</Text>
                <Text>Country: {item.country}</Text>
                <Text>Description: {item.description}</Text>
                <Text>date_added: {item.date_added}</Text>

                <FlatList
                data={item.image}
                keyExtractor={(imageItem) => imageItem.public_id}
                renderItem={({ item: imageItem }) => (
                  <View>
                    <Image
                      source={{ uri: imageItem.url }}
                      style={{ width: 100, height: 100 }}
                    />
                  </View>
                )}
              />

              </View>
            )}
          />
        ) : (
          <Text>No products available</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default Check;
