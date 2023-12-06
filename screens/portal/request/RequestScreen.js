import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import authContext from "../../../context/Auth/AuthContext";
import { SOCKET_URL, BACKEND_URL } from "@env";
import io from "socket.io-client";
import tw from "twrnc";
import { ModalNoSaldo } from "../../../components/Modals";

export const RequestScreen = ({ navigation }) => {
  const { socket, setSocket, user } = useContext(authContext);
  const [info, setInfo] = useState([]);
  const [saldoDriver, setSaldoDriver] = useState(0);
  const [isOpenNoSaldo, setIsOpenNoSaldo] = useState(false);

  const getSaldoDriver = async (trip) => {
    const response = await fetch(
      `${BACKEND_URL}/api/driverCompany/getBalance`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyId: trip?.companyId,
          driverId: user?.id ?? user?.driver?.id,
        }),
      }
    );

    const { amountTotal } = await response.json();
    const responseJSON = await fetch(
      `${BACKEND_URL}/api/get-trips-by-driver-in-company/${
        user?.id ?? user?.driver?.id
      }/${trip?.companyId}
        `
    );

    const { handlingFee } = await responseJSON.json();

    return amountTotal - handlingFee;
  };

  async function getTrips(trip) {
    const response = await fetch(
      `${BACKEND_URL}/api/drivers/${user?.id ?? user?.driver?.id}`
    );
    const responseJSON = await response.json();

    const data = responseJSON?.driver_companies?.filter((company) => {
      return company?.companyId === trip?.companyId;
    });
    console.log("test", data[0]);

    if (data[0].length === 0) {
      return null;
    } else {
      if (data[0].status === 5 || data[0].status === 4) {
        return null;
      } else {
        console.log("isOk");
        return data[0];
      }
    }
  }

  useEffect(() => {
    if (socket) return;
    const socket = io(SOCKET_URL);
    setSocket(socket);
  }, []);

  console.log(saldoDriver);

  useEffect(() => {
    socket?.on("server:receive-trip", async (trip) => {
      const company = await getTrips(trip);
      if (company?.companyId === trip?.companyId) {
        setSaldoDriver(await getSaldoDriver(trip));
        setInfo((prev) => {
          if (
            !prev.some(
              (existingTrip) => existingTrip.startTime === trip.startTime
            )
          ) {
            const updatedInfo = [...prev, trip];
            if (info.length === 0) {
              setTimeout(() => {
                setInfo((prev) =>
                  prev.filter((t) => t.startTime !== trip.startTime)
                );
              }, 60 * 1000);
              return updatedInfo;
            }
          }
          return prev;
        });
      }
    });
  }, [socket]);

  if (info.length === 0)
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

  return (
    <ScrollView keyboardShouldPersistTaps="never">
      <ModalNoSaldo isOpen={isOpenNoSaldo} setIsOpen={setIsOpenNoSaldo} />
      {info.length > 0 && (
        <View style={tw`mt-5 px-6 pt-6 pb-24 flex flex-col gap-4`}>
          {info.map((trip, index) => (
            <Pressable
              style={tw`border rounded-md border-gray-200 px-3 py-2`}
              key={index}
              onPress={() => {
                if (saldoDriver > 0) {
                  setInfo(
                    info.filter(
                      (trip) => trip.startTime !== info[index].startTime
                    )
                  );
                  navigation.navigate("InfoRequestScreen", {
                    requestInfo: trip,
                  });
                } else {
                  setIsOpenNoSaldo(true);
                }
              }}
            >
              <Text style={tw`font-semibold text-base`}>{trip.startTime}</Text>
              <View style={tw`flex flex-row gap-2 items-center`}>
                <View
                  style={tw`flex flex-row w-5 h-5 rounded-full bg-[#FFB800] justify-center items-center`}
                >
                  <Text style={tw` font-bold text-white`}>A</Text>
                </View>
                <Text style={tw`font-bold text-lg`}>{trip.textOrigin}</Text>
              </View>
              <View style={tw`flex flex-row gap-2 items-center`}>
                <View
                  style={tw`flex flex-row w-5 h-5 rounded-full bg-[#D2D2D2] justify-center items-center`}
                >
                  <Text style={tw` font-bold text-[#292929]`}>B</Text>
                </View>
                <Text style={tw`font-normal text-lg`}>
                  {trip.textDestination}
                </Text>
              </View>
              <View style={tw`flex flex-row items-center gap-2`}>
                <Text style={tw`font-semibold text-xl`}>{trip.price} COP</Text>
                {trip.paymentMethod === "Nequi" && (
                  <Image
                    source={require("../../../assets/nequi.png")}
                    resizeMode="contain"
                    style={{
                      width: 18,
                      height: 18,
                    }}
                  />
                )}
                {trip.paymentMethod === "Daviplata" && (
                  <Image
                    source={require("../../../assets/davivienda.png")}
                    resizeMode="contain"
                    style={{
                      width: 18,
                      height: 18,
                    }}
                  />
                )}
                {trip.paymentMethod === "Bancolombia" && (
                  <Image
                    source={require("../../../assets/bancolombia.png")}
                    resizeMode="contain"
                    style={{
                      width: 18,
                      height: 18,
                    }}
                  />
                )}
                <Text style={tw`font-normal text-sm text-gray-500`}>
                  {trip.distance}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
};
