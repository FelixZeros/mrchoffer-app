import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CompaniesScreen } from "../companies/CompaniesScreen";
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
          name="Empresas"
          component={CompaniesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={tw`${
                  /*</Tab.Navigator>focused && 'bg-[#FFCB44]' */ ""
                } w-fit items-center justify-content-center rounded h-full  p-2`}
              >
                <Image
                  source={require("../../../assets/company-icon.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#FFCB44" : "black",
                  }}
                ></Image>
                <Text style={tw`font-bol ${focused && "text-[#FFCB44]"}d`}>
                  Empresas
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Solicitudes"
          component={RequestScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={tw`${
                  /* focused && 'bg-[#FFCB44]' */ ""
                } w-fit items-center justify-content-center rounded h-full  p-2`}
              >
                <Image
                  source={require("../../../assets/location-icon.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#FFCB44" : "black",
                  }}
                ></Image>
                <Text style={tw`font-bol ${focused && "text-[#FFCB44]"}d`}>
                  Solicitudes
                </Text>
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
                  /* focused && 'bg-[#FFCB44]' */ ""
                } w-fit items-center justify-content-center rounded h-full  p-2`}
              >
                <Image
                  source={require("../../../assets/profile-icon.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#FFCB44" : "black",
                  }}
                ></Image>
                <Text style={tw`font-bold ${focused && "text-[#FFCB44]"}`}>
                  Perfil
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Ganancias"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={tw`${
                  /* focused && 'bg-[#FFCB44]' */ ""
                } w-fit items-center justify-content-center rounded h-full  p-2`}
              >
                <Image
                  source={require("../../../assets/dollar-icon.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#FFCB44" : "black",
                  }}
                ></Image>
                <Text style={tw`font-bold ${focused && "text-[#FFCB44]"}`}>
                  Ganancias
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
