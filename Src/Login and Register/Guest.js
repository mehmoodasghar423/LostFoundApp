import React from "react";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity  } from "react-native";
import { Text } from "react-native";

const SimpleMenu = () => {
  return (
    <MenuProvider style={styles.container}>
      <Menu>
        <MenuTrigger
          customStyles={{
            triggerWrapper: {
              top: -20,
            },
          }}
        >
        <Entypo name="dots-three-vertical" size={20} color="#7689D6" />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              marginTop: 15,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 8,
              width: 120,
              
              elevation: 4,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            },
          }}
        >
          <MenuOption onSelect={() => alert(`Delete Chat`)}>
            <TouchableOpacity style={styles.optionItem}>
              <Entypo name="trash" size={18} color="black" />
              <Text>Delete chat</Text>
            </TouchableOpacity>
          </MenuOption>
          <MenuOption onSelect={() => alert(`Delete`)}>
            <TouchableOpacity style={styles.optionItem}>
              <Entypo name="trash" size={18} color="black" />
              <Text>Delete chat</Text>
            </TouchableOpacity>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </MenuProvider>
  );
};



export default SimpleMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    flexDirection: "column",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 8,
  },
});
