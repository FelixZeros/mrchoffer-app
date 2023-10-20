import React from "react";
import { View, Text, Button, Image, Pressable } from "react-native";
import { BACKEND_URL } from "@env";
import { TextInputC } from "../register/Components/Inputs";
import useLogin from "./Hooks/useLogin";
import tw from "twrnc";

export default function LoginScreen({ navigation }) {
  const { setEmail, setPassword } = useLogin();
  return (
    <View style={tw`mt-20 p-6 flex flex-col gap-4`}>
      <Image
        source={require("../../assets/logo.png")}
        style={tw`self-center`}
      />
      {/* {error.email && <Text style={tw`text-red-500`}>Campo obligatorio</Text>} */}
      <TextInputC
        label="EMAIL"
        setState={setEmail}
        keyboardType="email-address"
      />

      {/* {error.password && (
        <Text style={tw`text-red-500`}>Campo obligatorio</Text>
      )} */}
      <TextInputC
        label="CONTRASEÑA"
        setState={setPassword}
        keyboardType="default"
        secureTextEntry={true}
      />

      <Pressable
        onPress={() => navigation.navigate("Portal")}
        style={({ pressed }) =>
          tw`${
            pressed ? "bg-[#fad371]" : "bg-[#FFCB44]"
          } w-full h-[50px] rounded-xl self-center flex flex-col justify-center`
        }
      >
        <Text style={tw`text-center font-bold text-lg`}>Iniciar Sesión</Text>
      </Pressable>
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate("firstSectionRegister")}
      />
    </View>
  );
}
