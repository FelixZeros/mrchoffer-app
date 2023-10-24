import tw from "twrnc";
import * as React from "react";
import { Button, View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FabSelectCompany } from "../components/fab-select-company";
import axios from "axios";
import authContext from "../../../context/Auth/AuthContext";
import { BACKEND_URL } from "@env";
const NothingToSHow = () => {
  return (
    <View
      style={tw`self-center items-center gap-4 h-full w-full justify-center`}
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
    await axios
      .get(`${BACKEND_URL}/api/request-driver-company/driver/1`)
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    GetRequestCompany();
  }, []);

  const ActiveTab = () => {
    return <NothingToSHow />;
  };

  const RequestTab = () => {
    return requests.length == 0 ? <NothingToSHow /> : requests.map( requests => <Text>{JSON.stringify(requests)} </Text>);
  };

  return (
    <View style={tw`h-full w-full justify-center`}>
      <View style={tw`h-full w-full justify-center `}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: tw`absolute top-[100px] bg-transparent`,
          }}
        >
          <Tab.Screen
            name="Activas"
            component={ActiveTab}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={`w-fit items-center justify-content-center rounded h-full  p-2`}
                >
                  <Text style={tw`font-bold ${focused && "text-[#FFCB44]"} `}>
                    Activas
                  </Text>
                </View>
              ),
            }}
          ></Tab.Screen>
          <Tab.Screen
            name="Solicitudes"
            component={RequestTab}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={`w-fit items-center justify-content-center rounded h-full  p-2`}
                >
                  <Text style={tw`font-bold ${focused && "text-[#FFCB44]"} `}>
                    Solicitudes
                  </Text>
                </View>
              ),
            }}
          ></Tab.Screen>
        </Tab.Navigator>
      </View>

      <FabSelectCompany router={navigation} />
    </View>
  );
};
