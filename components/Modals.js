import React from "react";
import {
  Modal,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import { Linking } from "react-native";
import tw from "twrnc";

export const ModalImage = ({ isOpen, image, setIsOpen }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View
        style={tw`justify-center w-full h-full absolute bottom-0 bg-gray-600/30  backdrop-opacity-20]`}
      >
        <View
          style={tw`bg-white shadow rounded-[20px] py-10 mx-3 bottom-0 top-0 my-auto overflow-hidden flex flex-col gap-6`}
        >
          <TouchableOpacity
            onPress={() => setIsOpen(false)}
            style={tw`absolute right-5 top-2`}
          >
            <View>
              <Text style={tw`font-bold self-center text-3xl`}>x</Text>
            </View>
          </TouchableOpacity>

          <Image
            source={{
              uri: image,
            }}
            style={tw`w-[350px] h-[250px] rounded-2xl self-center`}
          />

          <Pressable
            onPress={() => setIsOpen(false)}
            style={tw`w-[120px] h-[40px] bg-[#FFCB44] rounded-xl self-center flex flex-col justify-center`}
          >
            <Text style={tw`text-center font-bold text-xl`}>Confirmar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export const ModalSelectCompany = ({
  isOpen,
  setIsOpen,
  companies,
  setCompany,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View
        style={tw`justify-center w-full h-full absolute bottom-0 bg-gray-600/30  backdrop-opacity-20]`}
      >
        <View
          style={tw`flex flex-col bg-white mx-10 rounded-2xl min-h-[300px]`}
        >
          {companies?.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() => {
                  setIsOpen(false);
                  setCompany(item);
                }}
                style={tw`flex flex-row items-center justify-between px-4 py-2`}
              >
                <View
                  style={tw`flex flex-row-reverse items-center gap-4 w-full justify-between`}
                >
                  <Image
                    source={{
                      uri: item?.company?.photo,
                    }}
                    style={tw`w-10 h-10 rounded-full`}
                  />
                  <Text style={tw`text-xl font-bold uppercase mx-4s`}>
                    {item?.company?.name}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={tw`border-b border-[#E5E5E5]`} />
            </View>
          ))}
          <Pressable
            onPress={() => setIsOpen(false)}
            style={tw` absolute bottom-4 w-[120px] h-[40px] bg-[#FFCB44] rounded-xl self-center flex flex-col justify-center`}
          >
            <Text style={tw`text-center font-bold text-xl`}>Volver</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export const ModalRecharge = ({ phone, isOpen, setIsOpen }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View
        style={tw`justify-center w-full h-full absolute bottom-0 bg-gray-600/30  backdrop-opacity-20]`}
      >
        <View
          style={tw`flex flex-col bg-white mx-10 rounded-2xl min-h-[300px] items-center justify-center gap-4 py-6`}
        >
          <Image source={require("../assets/logoPay.png")} />
          <Text style={tw`text-center font-bold text-xl`}>
            Puedes realizar la recarga en el punto físico de tu empresa
          </Text>
          <Pressable
            style={tw`flex flex-row items-center gap-2 border-[0.5px] border-[#D9D9D] rounded-lg py-2 px-4`}
            onPress={() => Linking.openURL(`https://wa.me/57${phone}`)}
          >
            <Text style={tw`text-lgs font-bold`}>Enviar mensaje a </Text>
            <Image source={require("../assets/ws.png")} />
          </Pressable>
          <Pressable
            onPress={() => setIsOpen(false)}
            style={tw`w-[120px] h-[40px] bg-[#FFCB44] mt-4 rounded-xl self-center flex flex-col justify-center`}
          >
            <Text style={tw`text-center font-bold text-xl`}>Confirmar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export const ModalNoSaldo = ({ isOpen, setIsOpen }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View
        style={tw`justify-center w-full h-full absolute bottom-0 bg-gray-600/30  backdrop-opacity-20]`}
      >
        <View
          style={tw`flex flex-col bg-white mx-10 rounded-2xl min-h-[300px] items-center justify-center gap-4`}
        >
          <Text style={tw`text-center font-bold text-2xl`}>
            No tienes saldo suficiente para aceptar solicitudes de carrera, por
            favor recarga tu cuenta
          </Text>
          <Image source={require("../assets/logoPay.png")} />
          <Pressable
            onPress={() => setIsOpen(false)}
            style={tw`w-[120px] h-[40px] bg-[#FFCB44] mt-4 rounded-xl self-center flex flex-col justify-center`}
          >
            <Text style={tw`text-center font-bold text-xl`}>Confirmar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
