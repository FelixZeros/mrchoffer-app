import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import tw from "twrnc";

export const RequestScreen = ({ navigation }) => {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const socket = io("http://192.168.0.101:50001");
    socket.on("server:request-trip", (trips) => {
      setInfo(trips);
    });
  }, []);

  const handleAccept = useCallback((id) => {
    const socket = io("http://192.168.0.101:50001");
    socket.emit("client:accept-trip", {
      id,
      driverId: 1,
      status: 2,
      driverName: "Felix Ochoa",
      time: "10 minutos",
      distance: "5 km",
    });
    navigation.navigate("DriverTrip", {
      driverInfo: {
        id,
        driverId: 1,
        status: 2,
        driverName: "Felix Ochoa",
        time: "10 minutos",
        distance: "5 km",
      },
    });
  }, []);

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
      {info && info.length > 0 && (
        <View style={tw`mt-5 px-6 pt-6 pb-24 flex flex-col gap-4`}>
          {info.map((trip, index) => (
            <View style={tw`border rounded-md border-gray-200 p-3`} key={index}>
              <View style={tw`flex flex-row justify-between`}>
                <Text style={tw`font-semibold text-md`}>
                  Solicitud de carrera #{trip.id}
                </Text>
                <Text style={tw`font-semibold text-base text-gray-400`}>
                  {trip.startTime}
                </Text>
              </View>
              <Text style={tw`font-semibold text-lg`}>{trip.destination}</Text>
              <Text style={tw`font-normal text-md text-gray-500`}>
                {trip.comment}
              </Text>
              <View style={tw`mt-4 flex flex-row justify-between`}>
                <Text style={tw`font-semibold text-md`}>
                  {trip.genderPassenger}
                </Text>
                <View style={tw`flex flex-row`}>
                  <Text style={tw`font-normal text-md text-gray-500`}>
                    {trip.paymentMethod}: $
                  </Text>
                  <Text style={tw`font-normal text-md text-gray-500`}>
                    {trip.price}
                  </Text>
                  <Text style={tw`font-normal text-md text-gray-500 ml-4`}>
                    {trip.distance}
                  </Text>
                </View>
              </View>
              <View style={tw`mt-4 flex flex-row justify-between`}>
                <Pressable
                  style={tw`w-[120px] h-[40px] bg-[#FFCB44] rounded-xl flex flex-col justify-center`}
                  onPress={() => handleAccept(trip.id)}
                >
                  <Text style={tw`text-center font-bold text-lg`}>Aceptar</Text>
                </Pressable>
                <Pressable
                  style={tw`w-[120px] h-[40px] bg-black rounded-xl flex flex-col justify-center`}
                  onPress={() => handleAccept(trip.id)}
                >
                  <Text
                    style={tw`text-center font-bold text-lg text-[#FFCB44]`}
                  >
                    Rechazar
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};
