import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import * as Location from "expo-location";
import io from "socket.io-client";
import tw from "twrnc";

export const DriverTripScreen = ({ navigation, route }) => {
  const { driverInfo } = route.params;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pickedPassenger, setPickedPassenger] = useState(false);
  const [isLocationUpdating, setIsLocationUpdating] = useState(true);

  useEffect(() => {
    const socket = io("http://192.168.0.101:50001");
    if (!isLocationUpdating) {
      return; // No actualices la ubicación si isLocationUpdating es false
    }

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      await sendLocation(loc);
    };

    const sendLocation = async (info) => {
      socket.emit("client:send-location", {
        tripinfo: driverInfo,
        driverLocation: {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        },
      });
    };

    getLocation();

    const locationInterval = setInterval(getLocation, 5000);

    return () => {
      clearInterval(locationInterval);
    };
  }, [isLocationUpdating]);

  const handleFinishTrip = () => {
    const socket = io("http://192.168.0.101:50001");

    socket.emit("client:finish-trip", {
      id: driverInfo.id,
    });
    setIsLocationUpdating(false);

    navigation.navigate("Portal");
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={tw`p-6 flex flex-col h-full`}>
      <Text style={tw`text-2xl font-semibold`}>
        Se está enviando tu ubicación al Pasajero
      </Text>
      <Text style={tw`mt-4 text-base font-normal`}>
        Por favor permanece en esta pantalla hasta que hayas finalizado la
        carrera
      </Text>

      <Pressable
        style={
          pickedPassenger
            ? tw`mt-8 bg-[#eec766] rounded-md p-3`
            : tw`mt-8 bg-[#FFCB44] rounded-md p-3`
        }
        onPress={() => setPickedPassenger(true)}
        disabled={pickedPassenger}
      >
        <Text
          style={
            pickedPassenger
              ? tw`text-gray-700 font-semibold text-center`
              : tw`text-black font-semibold text-center`
          }
        >
          ¡He llegado a recoger al pasajero!
        </Text>
      </Pressable>

      <Pressable
        style={tw`mt-4 bg-black rounded-md p-3`}
        onPress={() => handleFinishTrip()}
        disabled={!pickedPassenger}
      >
        <Text style={tw`text-[#FFCB44] font-semibold text-center`}>
          Finalizar Carrera
        </Text>
      </Pressable>

      <View style={tw`absolute right-6 bottom-10 flex flex-col items-center`}>
        <Text style={tw`mt-4 text-sm font-normal`}>
          ¿Ocurrió un problema? No te preocupes puedes cancelar la solicitud,
          pero recuerda que esto afectará tu reputación
        </Text>

        <Pressable
          style={tw`mt-4 bg-black rounded-full p-3 w-1/2`}
          onPress={() => navigation.navigate("Portal")}
        >
          <Text style={tw`text-[#FFCB44] font-semibold text-center`}>
            Cancelar Solicitud
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
