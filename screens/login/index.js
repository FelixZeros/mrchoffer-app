import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { BACKEND_URL } from "@env";
import { TextInputC } from "../register/Components/Inputs";
import tw from "twrnc";
import authContext from "../../context/Auth/AuthContext";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const { login, getUserLocal, user } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "3988542422-sqmf67tc0res4mpoem47vsrmuqbpd05s.apps.googleusercontent.com",
    androidClientId:
      "3988542422-r4f39l49p3rin7amho8eemig7ic3pus9.apps.googleusercontent.com",
    webClientId:
      "3988542422-p6i03qqj4fq8d55cmc3o3lra6etap27k.apps.googleusercontent.com",
  });

  useEffect(() => {
    getUserLocal();
  }, []);

  useEffect(() => {
    console.log(user);
    if (user) navigation.navigate("Portal");
  }, [user]);

  useEffect(() => {
    handleSignInWithGoogleAsync();
  }, [response]);

  const handleSignInWithGoogleAsync = async () => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log(authentication);
      const { accessToken } = authentication;
      getUserInfo(accessToken);
    }
  };

  const getUserInfo = async (accessToken) => {
    if (!accessToken) return;
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
      );
      const userInfoResponse = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(userInfoResponse));
      console.log(userInfoResponse);
    } catch (err) {
      console.log(err);
    }
  };

  async function onSubmit() {
    const response = await login(email, password);
    if (response.isLogged === false) {
      setError(true);
    } else if (response.isLogged === true) {
      navigation.navigate("Portal");
    }
  }

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="never">
        <View style={tw`mt-20 p-6 flex flex-col gap-4 justify-center`}>
          <Image
            source={require("../../assets/logo.png")}
            style={tw`self-center`}
          />
          {/* {error.email && <Text style={tw`text-red-500`}>Campo obligatorio</Text>} */}
          {error && (
            <Text style={tw`text-red-600 text-center`}>
              {" "}
              Algo está mal, intenta de nuevo!
            </Text>
          )}
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
              tw`${
                pressed ? "bg-[#fad371]" : "bg-[#FFCB44]"
              } w-full h-[50px] rounded-xl self-center flex flex-col justify-center`
            }
          >
            <Text style={tw`text-center font-bold text-lg`}>
              Iniciar Sesión
            </Text>
          </Pressable>
          <Pressable
            disabled
            onPress={() => promptAsync()}
            style={({ pressed }) =>
              tw`${
                pressed ? "bg-[#fad371]" : "bg-white"
              }flex flex-row gap-4 w-full h-[50px] rounded-xl self-center justify-center items-center border border-gray-300`
            }
          >
            <Image
              source={require("../../assets/google-logo.png")}
              style={tw`self-center`}
            />
            <Text style={tw`text-center font-medium text-lg`}>
              Iniciar sesión con google
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("firstSectionRegister")}
          >
            <Text style={tw`text-center font-medium text-lg text-[#0057FF]`}>
              Olvidé mi contraseña
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("firstSectionRegister")}
          >
            <Text style={tw`text-center font-medium text-lg text-[#0057FF]`}>
              Regístrate
            </Text>
          </Pressable>
          <View style={tw`bg-black rounded-lg px-2 py-2`}>
            <Text
              style={tw`text-center font-semibold text-sm text-white uppercase`}
            >
              2023 Mr choffer, TODOS LOS DERECHOS RESERVADOS
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
