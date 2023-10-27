import {
  Button,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PortalTabs } from "../../components/portal-tabs";
import { BACKEND_URL } from "@env";
import tw from "twrnc";
import { useContext, useState } from "react";
import axios from "axios";
import authContext from "../../../../context/Auth/AuthContext";

export const CompanyScreen = ({ route, navigation }) => {
  const { company } = route.params;
  const { user } = useContext(authContext)

  console.log( user )
  const [isOpen, setIsOpen] = useState(false);

  const handleSendRequest = async () => {
    const response = await axios
      .post(`${BACKEND_URL}/api/request-driver-company`, {
        companyId: company.id,
        driverId: "1",
        status: 1,
      })
      .then((res) => {
        if (!res) return;
        setIsOpen(false);

        
        navigation.navigate("Portal")
      })
      .catch((err) => console.log(err));
    console.log(response);
  };

  return (
    <View style={tw`h-full pt-15`}>
      <Text style={tw`font-bold text-center text-[15]`}>{company.name}</Text>
      <View
        style={tw`p-6 flex w-full justify-center flex-row gap-4 bottom-10 absolute`}
      >
        <Pressable
          onPress={() => navigation.navigate("Portal")}
          style={tw`w-[120px] h-[50px] bg-gray-300 rounded-xl self-center flex flex-col justify-center`}
        >
          <Text style={tw`text-center font-bold`}>Cancelar</Text>
        </Pressable>

        <Pressable
          onPress={() => setIsOpen(true)}
          style={tw`w-[120px] h-[50px] bg-[#FFCB44] rounded-xl self-center flex flex-col justify-center`}
        >
          <Text style={tw`text-center font-bold`}>Enviar solicitud</Text>
        </Pressable>
      </View>

      <Modal animationType="slide" transparent={true} visible={isOpen}>
        <View
          style={tw`bg-white shadow rounded-[20px] py-10 mx-3  justify-center my-auto`}
        >
          <TouchableOpacity
            onPress={() => setIsOpen(false)}
            style={tw`absolute right-5 top-2`}
          >
            <View>
              <Text style={tw`font-bold self-center text-lg`}>x</Text>
            </View>
          </TouchableOpacity>

          <Text
            style={tw`font-bold self-center text-[5] text-center mb-20 mx-10`}
          >
            ¡Está a punto de enviar una solicitud de empleo a la empresa{" "}
            {company?.name}!
          </Text>

          <View
            style={tw`p-6 flex w-full justify-center flex-row gap-4 bottom-0 absolute `}
          >
            <Pressable
              onPress={() => setIsOpen(false)}
              style={tw`w-[120px] h-[50px] bg-gray-300 rounded-xl self-center flex flex-col justify-center`}
            >
              <Text style={tw`text-center font-bold`}>Cancelar</Text>
            </Pressable>

            <Pressable
              onPress={handleSendRequest}
              style={tw`w-[120px] h-[50px] bg-[#FFCB44] rounded-xl self-center flex flex-col justify-center`}
            >
              <Text style={tw`text-center font-bold`}>Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
