import tw from "twrnc";
import * as React from "react";
import { Button, View, Text, Image, ScrollView, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FabSelectCompany } from "../components/fab-select-company";
import authContext from "../../../context/Auth/AuthContext";
import { BACKEND_URL } from "@env";
import { RequestCard } from "./company/components/request-card";
import { ActiveCard } from "./company/components/active-card";

const NothingToSHow = () => {
  return (
    <View
      style={tw`self-center items-center gap-4 h-full w-full justify-center mt-20`}
    >
      <Image
        source={require("../../../assets/mailbox.png")}
        resizeMode="contain"
        style={{
          width: 75,
          height: 75,
        }}
      ></Image>
      <Text style={tw`font-bold text-6`}>Nada que mostrar</Text>
    </View>
  );
};

export const CompaniesScreen = ({ navigation }) => {
  const Tab = createBottomTabNavigator();
  const { user } = React.useContext(authContext);
  const [requests, setRequests] = React.useState([]);

  async function GetRequestCompany() {
    await fetch(
      `${BACKEND_URL}/api/request-driver-company/driver/${
        user?.id ?? user?.driver?.id
      }`
    )
      .then((response) => response.json())
      .then((json) => {
        setRequests(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleRefresh = () => {
    GetRequestCompany();
  };

  React.useEffect(() => {
    GetRequestCompany();
  }, []);

  const ActiveTab = ({ navigation }) => {
    return requests.length === 0 ? (
      <NothingToSHow />
    ) : (
      <ScrollView style={tw`mt-40`}>
        {requests
          .filter((requests) => requests.status == 2 || requests.status == 5)
          .map((requests) => (
            <ActiveCard
              key={requests.id}
              request={requests}
              handleRefresh={handleRefresh}
              navigation={navigation}
            />
          ))}
        {requests.filter((requests) => requests.status == 2).length === 0 && (
          <NothingToSHow />
        )}
      </ScrollView>
    );
  };

  const RequestTab = () => {
    console.log(requests);
    return (
      <ScrollView style={tw`mt-40`}>
        {requests.map((request) => {
          if (request?.status === 1) {
            return (
              <RequestCard
                key={request.id}
                request={request}
                handleRefresh={handleRefresh}
              />
            );
          }
        })}
        {requests.filter((requests) => requests.status == 1).length === 0 && (
          <NothingToSHow />
        )}
      </ScrollView>
    );
  };

  return (
    <View style={tw`h-full w-full justify-center border-none`}>
      <View style={tw`h-full w-full justify-center border-none`}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            headerBackTitleVisible: false,
            tabBarShowLabel: false,
            tabBarStyle: tw`absolute top-[100px] bg-white`,
          }}
        >
          <Tab.Screen
            name="Activas"
            component={ActiveTab}
            listeners={{
              focus: () => handleRefresh(),
            }}
            options={{
              headerShown: false,
              headerBackTitleVisible: false,
              tabBarIcon: ({ focused }) => (
                <Text
                  style={tw`font-bold ${focused && "text-[#FFCB44]"} text-2xl`}
                >
                  Activas
                </Text>
              ),
            }}
          ></Tab.Screen>
          <Tab.Screen
            name="Solicitudes"
            component={RequestTab}
            listeners={{
              focus: () => handleRefresh(),
            }}
            options={{
              headerShown: false,
              headerBackTitleVisible: false,
              tabBarIcon: ({ focused }) => (
                <Text
                  style={tw`font-bold ${focused && "text-[#FFCB44]"} text-2xl`}
                >
                  Solicitudes
                </Text>
              ),
            }}
          ></Tab.Screen>
        </Tab.Navigator>
      </View>

      <FabSelectCompany navigation={navigation} />
    </View>
  );
};
