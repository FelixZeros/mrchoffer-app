import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import { TextInputC } from "./Components/Inputs";
import useRegisterForm from "./Hooks/useRegisterForm";
import tw from "twrnc";

export default function ThirdRegisterScreen({ navigation }) {
  const { setPhone, setEmail, setPassword, error, eventSection } =
    useRegisterForm(navigation);

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreate = async () => {
    const res = await eventSection(3);
    console.log(res)
    if( !res )setMessage('Húbo un problema al crear al usuario, intente de nuevo')
    if(res) setMessage('Usuario creado con éxito')
    setIsOpen(true);
  };

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="never">
        <View style={tw`p-6 flex flex-col gap-4`}>
          <Text style={tw`text-lg font-bold text-center`}>
            Registro de Conductor
          </Text>
          <Text style={tw`font-bold text-base`}>Crear Usuario</Text>

          {error.phone && (
            <Text style={tw`text-red-500`}>Campo obligatorio</Text>
          )}
          <TextInputC
            label="TELÉFONO"
            setState={setPhone}
            keyboardType="numeric"
          />

          {error.email && (
            <Text style={tw`text-red-500`}>Campo obligatorio</Text>
          )}
          <TextInputC
            label="EMAIL"
            setState={setEmail}
            keyboardType="email-address"
          />

          {error.password && (
            <Text style={tw`text-red-500`}>Campo obligatorio</Text>
          )}
          <TextInputC
            label="CONTRASEÑA"
            setState={setPassword}
            keyboardType="default"
            secureTextEntry={true}
          />

          <Pressable
            style={({ pressed }) =>
              tw`${
                pressed ? "bg-[#fad371]" : "bg-[#FFCB44]"
              } w-[170px] h-[50px] rounded-xl self-center flex flex-col justify-center`
            }
            onPress={handleCreate}
          >
            <Text style={tw`text-center font-bold text-lg`}>CREAR</Text>
          </Pressable>
          <Modal animationType="slide" transparent={true} visible={isOpen}>
            <View
              style={tw`bg-white shadow rounded-[20px] py-10 mx-3  justify-center my-auto`}
            >
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                style={tw`absolute right-5 top-2`}
              >
                <View>
                  <Text style={tw`font-bold self-center text-lg`}>x</Text>
                </View>
              </TouchableOpacity>

              <Text
                style={tw`font-bold self-center text-[5] text-center mb-20 mx-10`}
              >
                {message}
              </Text>

              <View
                style={tw`p-6 flex w-full justify-center flex-row gap-4 bottom-0 absolute `}
              >
                <Pressable
                  onPress={() => {
                    setIsOpen(false)
                    navigation.navigate("Login")
                  }}
                  style={tw`w-[120px] h-[50px] bg-[#FFCB44] rounded-xl self-center flex flex-col justify-center`}
                >
                  <Text style={tw`text-center font-bold`}>Confirmar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
