import {
  Pressable,
  Text,
  View,
  Image,
  Switch,
  Modal,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import tw from "twrnc";
import authContext from "../../../../../context/Auth/AuthContext";
import { BACKEND_URL } from "@env";

export const ActiveCard = ({ request, handleRefresh, navigation }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = React.useContext(authContext);

  const getTripsRequesStatus = request?.trips?.filter(
    (trip) => trip.status === 3 && trip.companyId === request?.companyId
  );

  async function handleCancelRequest(request) {
    const response = await fetch(`${BACKEND_URL}/api/request-driver-company`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: request?.id,
        companyId: request?.companyId,
        driverId: user?.id ?? user?.driver?.id,
        response: true,
        status: 5,
        comment: "El conductor canceló la solicitud",
      }),
    });
    const data = await response.json();
    console.log(data);
    setIsOpen(false);
    handleRefresh();
  }

  return (
    <>
      <Pressable
        style={tw`relative shadow-md bg-white rounded-lg m-3 h-[40] p-5 flex flex-col`}
        onPress={() =>
          navigation.navigate("InfoRequestDriverScreen", { request })
        }
      >
        <View>
          <Text style={tw`font-bold text-[#FFCB44] text-3xl uppercase`}>
            {request?.company?.name}
          </Text>
          <Text style={tw`font-medium text-base`}>
            Creada: {request.createdAt.split("T")[0]}
          </Text>
        </View>

        <View style={tw`flex flex-row justify-between items-center`}>
          <Text style={tw`font-bold text-base mt-10`}>
            Carreras realizadas:{" "}
            {getTripsRequesStatus?.length > 0
              ? getTripsRequesStatus?.length
              : 0}
          </Text>
          <View style={tw`flex flex-col absolute top-0 right-0`}>
            <Image
              source={{ uri: request?.company?.photo }}
              width={50}
              height={50}
              style={tw`rounded-full border-[0.5px] border-[#b4b4b4]`}
            />
            <Switch
              trackColor={{ false: "#767577", true: "#FFCB44" }}
              thumbColor={request?.company?.active ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onChange={() => {
                request?.status == 2 ? setIsOpen(true) : null;
              }}
              value={request?.status == 2 ? true : false}
              style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
            />
          </View>
        </View>
      </Pressable>
      <Modal animationType="slide" transparent={true} visible={isOpen}>
        <View
          style={tw`justify-center w-full h-full absolute bottom-0 bg-gray-600/30  backdrop-opacity-20]`}
        >
          <View
            style={tw`bg-white shadow rounded-[20px] py-10 mx-3 bottom-0 top-0 my-auto overflow-hidden`}
          >
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              style={tw`absolute right-5 top-2`}
            >
              <View>
                <Text style={tw`font-bold self-center text-3xl`}>x</Text>
              </View>
            </TouchableOpacity>

            <Text
              style={tw`font-bold self-center text-[5] text-center mb-15 mx-10`}
            >
              ¿Estás seguro que quieres retirarte de la empresa{" "}
              <Text style={tw`uppercase`}>{request?.company?.name}?</Text>
            </Text>

            <View
              style={tw`p-6 flex w-full justify-center flex-row gap-4 bottom-0 absolute `}
            >
              <Pressable
                onPress={() => setIsOpen(false)}
                style={tw`w-[120px] h-[40px] bg-[#292929] rounded-xl self-center flex flex-col justify-center`}
              >
                <Text style={tw`text-center font-bold text-white text-xl`}>
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                onPress={() => handleCancelRequest(request)}
                style={tw`w-[120px] h-[40px] bg-[#FFCB44] rounded-xl self-center flex flex-col justify-center`}
              >
                <Text style={tw`text-center font-bold text-xl`}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
