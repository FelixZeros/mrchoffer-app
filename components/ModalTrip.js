import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import tw from "twrnc";

export const ModalCancelTrip = ({
  isVisible,
  setIsVisible,
  navigation,
  socket,
  requestInfo,
}) => {
  const [comment, setComment] = useState("");

  return (
    <Modal animationType="slide" visible={isVisible} transparent={true}>
      <ScrollView keyboardShouldPersistTaps="never">
        <View
          style={tw`flex flex-col w-full items-center p-7 mt-40 border bg-white rounded-3xl`}
        >
          <Text style={tw`text-3xl font-bold text-center`}>
            ¿Está seguro de cancelar el servicio?
          </Text>
          <View style={tw`flex flex-row gap-10 mt-10`}>
            <Pressable
              style={({ pressed }) =>
                tw`${
                  pressed ? "bg-[#3a3a3a]" : "bg-[#292929]"
                } w-[120px] h-[50px] rounded-lg self-center flex flex-col justify-center`
              }
              onPress={() => {
                setIsVisible(false);
              }}
            >
              <Text style={tw`text-center font-bold text-2xl text-white`}>
                No
              </Text>
            </Pressable>
            <View>
              <Pressable
                style={({ pressed }) =>
                  tw`${
                    pressed ? "bg-[#fad371]" : "bg-[#FFCB44]"
                  } w-[120px] h-[50px] rounded-lg self-center flex flex-col justify-center`
                }
                onPress={() => {
                  setIsVisible(false);
                  socket.emit("client:cancel-trip", {
                    id: requestInfo.idFront,
                    comment: comment,
                    cancelBy: 2,
                  });

                  navigation.navigate("Portal");
                }}
              >
                <Text style={tw`text-center font-bold text-2xl`}>Sí</Text>
              </Pressable>
            </View>
          </View>
          <Text style={tw`self-start text-base font-semibold mt-10`}>
            Cuéntanos el motivo <Text style={tw`text-red-500`}>*</Text>
          </Text>
          <TextInput
            editable
            multiline
            numberOfLines={10}
            maxLength={1000}
            onChangeText={(text) => setComment(text)}
            style={tw`w-full border h-[190px] rounded-xl p-4`}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

export const ModalCancel = ({ info, visible, setVisible, navigation }) => {
  setTimeout(() => {
    setVisible(false);
    navigation.navigate("Portal");
  }, 10 * 1000);

  return (
    <Modal animationType="slide" visible={visible} transparent={true}>
      <ScrollView keyboardShouldPersistTaps="never">
        <View
          style={tw`flex flex-col w-full items-center p-7 mt-50 border bg-white rounded-3xl`}
        >
          <Text style={tw`text-2xl font-bold text-center`}>
            El usuario ha cancelado el servicio
          </Text>
          <Text style={tw`text-lg font-semibold mt-4`}>
            El motivo: {info?.comment}
          </Text>
          <Text style={tw`text-lg font-semibold mt-4`}>
            Serás redirigido a la pantalla principal en 10 segundos
          </Text>
        </View>
      </ScrollView>
    </Modal>
  );
};
