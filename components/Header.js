import React from "react";
import { Image, Text, View } from "react-native";
import tw from "twrnc";
export const Header = ({ text }) => {
  return (
    <View style={tw`flex flex-col`}>
      <Image
        style={{ width: 57, height: 29 }}
        source={require("../assets/logoHeader.png")}
      />
    </View>
  );
};
