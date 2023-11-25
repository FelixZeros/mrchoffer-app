import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import authContext from "../../../context/Auth/AuthContext";
import { BACKEND_URL } from "@env";

export default function FirstRegisterScreen({ navigation, route }) {
  const { request } = route.params;
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = React.useContext(authContext);

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
    navigation.navigate("Portal");
  }

  return (
    <ScrollView keyboardShouldPersistTaps="never">
      <View style={tw`flex flex-col justify-center h-full px-10 mt-10`}>
        <View style={tw`flex flex-col gap-2 items-center`}>
          <Image
            source={{
              uri: request.company.photo,
            }}
            width={100}
            height={100}
            style={tw`rounded-full border-[0.5px] border-[#b4b4b4]`}
          />
          <Text style={tw`text-2xl font-bold uppercase`}>
            {request.company.name}
          </Text>
        </View>
        <View style={tw`flex flex-col gap-1 mt-8`}>
          <Text style={tw`text-xl font-bold`}>
            {request.company.typeDocument}:
          </Text>
          <Text style={tw`text-lg font-medium `}>
            {request.company.document}
          </Text>
          <Text style={tw`text-xl font-bold mt-4`}>Dirección:</Text>
          <Text style={tw`text-lg font-medium`}>{request.company.address}</Text>
          <Text style={tw`text-xl font-bold mt-4`}>Activo desde:</Text>
          <Text style={tw`text-lg font-medium`}>
            Creada: {request.company.createdAt.split("T")[0]}
          </Text>
          <TextInput
            editable
            multiline
            numberOfLines={10}
            maxLength={1000}
            value={request?.comment ?? "No hay comentarios..."}
            placeholder="Cuéntanos..."
            style={tw`w-full border-[0.5px] h-[190px] rounded-xl p-4 mt-2`}
          />
        </View>
        <View style={tw`p-6 flex w-full justify-center flex-row gap-12 mt-16`}>
          <Pressable
            onPress={() => navigation.navigate("Portal")}
            style={tw`w-[120px] h-[50px] bg-[#292929] rounded-xl self-center flex flex-col justify-center`}
          >
            <Text style={tw`text-center font-bold text-white text-xl`}>
              Volver
            </Text>
          </Pressable>

          <Pressable
            disabled={request?.status == 5 ? true : false}
            onPress={() => setIsOpen(true)}
            style={tw`w-[120px] h-[50px] bg-[#FFCB44] rounded-xl self-center flex flex-col justify-center`}
          >
            <Text style={tw`text-center font-bold text-xl`}>Retirarme</Text>
          </Pressable>
        </View>
      </View>
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
    </ScrollView>
  );
}
