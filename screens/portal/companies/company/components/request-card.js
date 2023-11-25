import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { BACKEND_URL } from "@env";
import React, { useContext, useState } from "react";
import authContext from "../../../../../context/Auth/AuthContext";

export const RequestCard = ({ request, handleRefresh }) => {
  const { user } = useContext(authContext);
  const [isOpen, setIsOpen] = useState(false);
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
        status: 4,
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
      <View
        style={tw`relative shadow-md bg-white rounded-lg m-3 h-[30] p-5 flex flex-col`}
      >
        <View style={tw`flex flex-row justify-between items-center`}>
          <Text style={tw`font-bold  text-3xl uppercase`}>
            {request?.company?.name}
          </Text>
          <View style={tw`flex flex-col justify-end`}>
            <Text style={tw`font-medium text-base text-right`}>
              Creada: {request.createdAt.split("T")[0]}
            </Text>
            <Text
              style={tw`text-${
                (request.status === 1 && "[#FFCB44]") ||
                (request.status === 2 && "green-400") ||
                (request.status === 1 && "red-400")
              } font-bold text-right uppercase text-xl`}
            >
              {(request.status === 1 && "En espera") ||
                (request.status === 2 && "Aceptada") ||
                (request.status === 3 && "Rechazada")}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={() => setIsOpen(true)}
          style={tw`text-center bottom-0 px-5 py-2 rounded-lg font-bold overflow-hidden mx-auto bg-[#FFCB44] mt-2`}
        >
          <Text style={tw`text-xl font-semibold`}>Cancelar</Text>
        </Pressable>
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
              ¡Está a punto de cancelar una solicitud de empleo a la empresa{" "}
              <Text style={tw`uppercase`}>{request?.company?.name}</Text>!
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
