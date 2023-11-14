import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import authContext from "../../../context/Auth/AuthContext";
import io from "socket.io-client";
import tw from "twrnc";

export const RequestScreen = ({ navigation }) => {
  const { socket, setSocket } = useContext(authContext);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    if (socket) return;
    const socket = io("http://192.168.0.103:50001");
    setSocket(socket);
  }, []);

  useEffect(() => {
    socket?.on("server:receive-trip", (trip) => {
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
      {info.length > 0 && (
        <View style={tw`mt-5 px-6 pt-6 pb-24 flex flex-col gap-4`}>
          {info.map((trip, index) => (
            <Pressable
              style={tw`border rounded-md border-gray-200 px-3 py-2`}
              key={index}
              onPress={() => {
                setInfo(
                  info.filter(
                    (trip) => trip.startTime !== info[index].startTime
                  )
                );
                navigation.navigate("InfoRequestScreen", {
                  requestInfo: trip,
                });
              }}
            >
              <Text style={tw`font-semibold text-base`}>{trip.startTime}</Text>
              <View style={tw`flex flex-row gap-2 items-center`}>
                <View
                  style={tw`flex flex-row w-4 h-4 rounded-full bg-[#FFB800] justify-center items-center`}
                >
                  <Text style={tw` font-bold text-white`}>A</Text>
                </View>
                <Text style={tw`font-bold text-lg`}>{trip.textOrigin}</Text>
              </View>
              <View style={tw`flex flex-row gap-2 items-center`}>
                <View
                  style={tw`flex flex-row w-4 h-4 rounded-full bg-[#D2D2D2] justify-center items-center`}
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
