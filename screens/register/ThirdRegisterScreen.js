import React from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import { TextInputC } from "./Components/Inputs";
import useRegisterForm from "./Hooks/useRegisterForm";
import tw from "twrnc";

export default function ThirdRegisterScreen({ navigation }) {
  const { setPhone, setEmail, setPassword, error, eventSection } =
    useRegisterForm(navigation);

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
            onPress={() => {
              eventSection(3);
            }}
          >
            <Text style={tw`text-center font-bold text-lg`}>CREAR</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
