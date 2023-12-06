import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CompaniesScreen } from "../companies/CompaniesScreen";
import { GananciesScreen } from "../ganancies/GananciesScreen";
import React from "react";
import { RequestScreen } from "../request/RequestScreen";
import { ProfileScreen } from "../profile/ProfileScreen";
import tw from "twrnc";
import { Image, Text, View } from "react-native";

const Tab = createBottomTabNavigator();

export const PortalTabs = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Solicitudes"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            height: 90,
          },
        }}
      >
        <Tab.Screen
          name="Solicitudes"
          component={RequestScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={tw`${
                  focused && "bg-[#FFCB44]"
                } w-fit items-center justify-content-center rounded h-full p-2 justify-center`}
              >
                <Image
                  source={require("../../../assets/location-icon.png")}
                  resizeMode="cover"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: "black",
                    zIndex: 100,
                  }}
                ></Image>
                <Text style={tw`mt-1 font-medium z-10`}>Solicitudes</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={tw`${
                  focused && "bg-[#FFCB44]"
                } w-fit items-center justify-content-center rounded h-full  py-2 px-6 justify-center`}
              >
                <Image
                  source={require("../../../assets/profile-icon.png")}
                  resizeMode="cover"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: "black",
                    zIndex: 100,
                  }}
                ></Image>
                <Text style={tw`mt-1 font-medium z-10`}>Perfil</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Empresas"
          component={CompaniesScreen}
          options={{
            headerShown: false,
            headerBackTitleVisible: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={tw`${
                  focused && "bg-[#FFCB44]"
                } w-fit items-center justify-content-center rounded h-full  p-2 justify-center`}
              >
                <Image
                  source={require("../../../assets/company-icon.png")}
                  resizeMode="cover"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: "black",
                    zIndex: 100,
                  }}
                ></Image>
                <Text style={tw`mt-1 font-medium z-10`}>Empresas</Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Ganancias"
          component={GananciesScreen}
          options={{
            headerShown: false,
            headerBackTitleVisible: false,
            tabBarIcon: ({ focused }) => (
              <View
                style={tw`${
                  focused && "bg-[#FFCB44]"
                } w-fit items-center justify-content-center rounded h-full  p-2 justify-center`}
              >
                <Image
                  source={require("../../../assets/dollar-icon.png")}
                  resizeMode="cover"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: "black",
                    zIndex: 100,
                  }}
                ></Image>
                <Text style={tw`mt-1 font-medium z-10`}>Ganancias</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
