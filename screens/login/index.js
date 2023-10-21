import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, Image, Pressable } from "react-native";
import { BACKEND_URL } from "@env";
import { TextInputC } from "../register/Components/Inputs";
import useLogin from "./Hooks/useLogin";
import tw from "twrnc";
import authContext from "../../context/Auth/AuthContext";

export default function LoginScreen({ navigation }) {

  const { login } = useContext(authContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false)

  async function onSubmit() {
    const isValidLogin = await login(email, password)
    if (isValidLogin) navigation.navigate("Portal")
    else setError(true)
  }

  useEffect(() => {setTimeout(() => setError(false), 3000)},[])

  return (
    <View style={tw`mt-20 p-6 flex flex-col gap-4`}>
      <Image
        source={require("../../assets/logo.png")}
        style={tw`self-center`}
      />
      {/* {error.email && <Text style={tw`text-red-500`}>Campo obligatorio</Text>} */}
      {error && <Text style={tw`text-red-600 text-center`}> Algo está mal, intenta de nuevo!</Text>}
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
        disabled={!email}
        onPress={() => onSubmit()}
        style={({ pressed }) =>
          tw`${pressed ? "bg-[#fad371]" : "bg-[#FFCB44]"
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
