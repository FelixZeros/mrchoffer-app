import tw from "twrnc";
import * as React from "react";
import { Button, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RequestScreen } from "./request/RequestScreen";
import { ProfileScreen } from "./profile/ProfileScreen";
import Icon from "react-native-ionicons";
import { CompaniesScreen } from "./companies/CompaniesScreen";
import { PortalTabs } from "./components/portal-tabs";

export const PortalScreen = ({ navigation }) => {
  const Tab = createBottomTabNavigator();

  return (
    <View style={tw`h-full`}>
      <PortalTabs />
    </View>
  );
};
