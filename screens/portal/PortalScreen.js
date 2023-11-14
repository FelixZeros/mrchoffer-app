import tw from "twrnc";
import * as React from "react";
import { Button, View, Pressable, Text, Modal, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RequestScreen } from "./request/RequestScreen";
import { ProfileScreen } from "./profile/ProfileScreen";
import Icon from "react-native-ionicons";
import { CompaniesScreen } from "./companies/CompaniesScreen";
import { PortalTabs } from "./components/portal-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";

export const PortalScreen = ({ navigation }) => {
  const Tab = createBottomTabNavigator();
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleSession = async () => {
    setModalVisible(false);
    await AsyncStorage.removeItem("@user");
    navigation.navigate("Login");
  };

  return (
    <View style={tw`h-full`}>
      <Pressable
        style={tw`absolute top-13 right-4 z-10`}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={require("../../assets/button-bar.png")}
          style={tw`w-[46px] h-[46px] self-center`}
        />
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={tw`flex flex-col h-full`}>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={tw`absolute top-13 right-4 z-10`}
            >
              <Image
                source={require("../../assets/cross.png")}
                style={tw`w-[14px] h-[16px]`}
              />
            </Pressable>
            <View style={tw`flex flex-col items-center justify-center h-full`}>
              <Image
                source={require("../../assets/logo.png")}
                style={tw`self-center mt-23`}
              />
              <View
                style={tw`border-2 w-full py-4 my-4 flex flex-col items-center gap-3 border-gray-300`}
              >
                <Text style={tw`text-2xl font-bold`}>Legal</Text>
                <Pressable
                  onPress={() => Linking.openURL("https://www.google.com/")}
                >
                  <Text style={tw`text-xl font-semibold`}>
                    Términos y condiciones generales
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => Linking.openURL("https://www.google.com/")}
                >
                  <Text style={tw`text-xl font-semibold`}>
                    Términos y condiciones particulares
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => Linking.openURL("https://www.google.com/")}
                >
                  <Text style={tw`text-xl font-semibold`}>
                    Política de privacidad
                  </Text>
                </Pressable>
              </View>
              <Pressable
                onPress={handleSession}
                style={tw`bg-red-200 w-[70%] self-center mt-10 rounded-lg`}
              >
                <Text
                  style={tw`text-red-700 uppercase font-semibold text-2xl p-4 self-center`}
                >
                  Cerrar sesión
                </Text>
              </Pressable>
              <View
                style={tw`flex flex-row justify-center items-center gap-6 mt-5`}
              >
                <Pressable
                  onPress={() => Linking.openURL("https://www.facebook.com/")}
                >
                  <Image
                    source={require("../../assets/facebook.png")}
                    style={tw`self-center`}
                  />
                </Pressable>
                <Pressable
                  onPress={() => Linking.openURL("https://www.instagram.com/")}
                >
                  <Image
                    source={require("../../assets/instagram.png")}
                    style={tw`self-center`}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </Pressable>
      <PortalTabs />
    </View>
  );
};
