import React from "react";
import { View, TextInput, Image, Text, Pressable } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import tw from "twrnc";

export const TextInputC = ({ label, setState, ...rest }) => {
  return (
    <View>
      <TextInput
        {...rest}
        onChange={(e) => setState(e.nativeEvent.text)}
        style={tw`p-3 border border-gray-300 rounded-lg font-semibold`}
        placeholder={label}
        placeholderTextColor="black"
      />
    </View>
  );
};

export const SelectInput = ({ label, setState, data, ...rest }) => {
  return (
    <View>
      <Dropdown
        {...rest}
        data={data}
        search
        searchPlaceholder="Buscar"
        placeholderStyle={{ fontWeight: "600", fontSize: 14 }}
        labelField="label"
        valueField="value"
        placeholder={label}
        onChange={(e) => setState(e.label)}
        style={tw`p-3 border border-gray-300 rounded-lg font-semibold`}
      />
    </View>
  );
};

export const CameraInput = ({
  navigation,
  label,
  type,
  id,
  setBack,
  setFront,
}) => {
  const getBack = (url) => {
    setBack(url);
  };
  const getFront = (url) => {
    setFront(url);
  };

  return (
    <View>
      <Text style={tw`font-bold text-base`}>{label}</Text>
      <View style={tw`flex flex-row justify-between`}>
        <Pressable
          style={tw`flex flex-col items-center justify-center gap-1 border border-[#FFCB44] rounded-xl w-[160px] h-[57px] mt-3`}
          onPress={() =>
            navigation.navigate("modalCamera", {
              type: type,
              side: "front",
              id: id,
              getFront: getFront,
            })
          }
        >
          <Image
            style={{ width: 28, height: 21 }}
            source={require("../../../assets/camera.png")}
          />
          <Text> + Parte frontal:</Text>
        </Pressable>
        <Pressable
          style={tw`flex flex-col items-center justify-center gap-1 border border-[#FFCB44] rounded-xl w-[160px] h-[57px] mt-3`}
          onPress={() =>
            navigation.navigate("modalCamera", {
              type: type,
              side: "back",
              id: id,
              getBack: getBack,
            })
          }
        >
          <Image
            style={{ width: 28, height: 21 }}
            source={require("../../../assets/camera.png")}
          />
          <Text> + Parte trasera:</Text>
        </Pressable>
      </View>
    </View>
  );
};
