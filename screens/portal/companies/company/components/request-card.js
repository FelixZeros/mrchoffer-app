import axios from "axios";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { BACKEND_URL } from "@env";
import { useContext, useState } from "react";
import authContext from "../../../../../context/Auth/AuthContext";
export const RequestCard = ({ request }) => {
  const { user } = useContext(authContext);
  const [isOpen, setIsOpen] = useState(false);
  async function handleCancelRequest(request) {
    await axios.put(`${BACKEND_URL}/api/request-driver-company`, {
      id: request.id,
      companyId: request.companyId,
      driverId: user.driver.id,
      status: 3,
      comment: "El conductor canceló la solicitud",
    });
  }

  return (
    <>
      <View style={tw`relative shadow bg-white rounded m-2 h-[30]  `}>
        <View style={tw`flex flex-row`}>
          <View style={tw`h-20 w-1/2 justify-center text-center`}>
            <Text style={tw`text-center font-bold text-xl`}>
              {request.companyId}
            </Text>
          </View>
          <View style={tw`h-20 w-1/2`}>
            <View style={tw`mx-4 my-8`}>
              <Text style={tw`text-right`}>
                Creada: {request.createdAt.split("T")[0]}
              </Text>
              <Text
                style={tw`text-${
                  (request.status === 1 && "[#FFCB44]") ||
                  (request.status === 2 && "green-400") ||
                  (request.status === 1 && "red-400")
                } font-bold text-right`}
              >
                {(request.status === 1 && "En espera") ||
                  (request.status === 2 && "Aceptada") ||
                  (request.status === 3 && "Rechazada")}
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => setIsOpen(true)}
          style={tw`text-center bottom-0 px-5 py-2 rounded-lg font-bold overflow-hidden mx-auto bg-[#FFCB44]`}
        >
          <Text>Cancelar</Text>
        </Pressable>
      </View>

      <Modal animationType="slide" transparent={true} visible={isOpen}>
        <View
          style={tw`justify-center w-full h-full absolute bottom-0 bg-gray-600/30  backdrop-opacity-20]`}
        >
          <View
            style={tw`bg-white shadow rounded-[20px] py-40 mx-3 bottom-0 top-0 my-auto overflow-hidden`}
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
              ¡Está a punto de cancelar una solicitud de empleo a la empresa{" "}
              {request.id}!
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
                onPress={() => handleCancelRequest(request)}
                style={tw`w-[120px] h-[50px] bg-[#FFCB44] rounded-xl self-center flex flex-col justify-center`}
              >
                <Text style={tw`text-center font-bold`}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
