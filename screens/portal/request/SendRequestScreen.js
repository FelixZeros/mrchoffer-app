import React, { useContext, useEffect, useRef, useState } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { View, Text, Pressable, Image } from "react-native";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { API_KEY_GOOGLE_MAPS } from "@env";
import { ModalCancelTrip } from "../../../components/ModalTrip";
import authContext from "../../../context/Auth/AuthContext";
import tw from "twrnc";
import io from "socket.io-client";

export const ScreenSendRequest = ({ route, navigation }) => {
  const [socket, setSocket] = useState(null);
  const { requestInfo, timeWait } = route.params;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLocationUpdating, setIsLocationUpdating] = useState(true);

  useEffect(() => {
    const socket = io("http://192.168.0.103:50001");
    setSocket(socket);
    if (!isLocationUpdating) {
      return;
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
        tripinfo: requestInfo.idFront,
        duration: timeWait,
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
    socket.emit("client:finish-trip", {
      id: requestInfo?.idFront,
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

  const [formatedTime, setFormatedTime] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(timeWait * 60);
  const intervalRef = useRef(null);
  const [isArrived, setIsArrived] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (timeWait === 3) setFormatedTime("03:00");
    if (timeWait === 5) setFormatedTime("05:00");
    if (timeWait === 10) setFormatedTime("10:00");
    if (timeWait === 15) setFormatedTime("15:00");
  }, []);

  useEffect(() => {
    if (timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setIsArrived(true); // Cambia el estado a true cuando el tiempo se agota
      clearInterval(intervalRef.current);
      socket.emit("client:arrived-trip", {
        tripinfo: requestInfo.idFront,
      });
      setFormatedTime("00:00");
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [timeRemaining]);

  useEffect(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    setFormatedTime(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
  }, [timeRemaining]);

  const handleSendTime = (type) => {
    if (type === "cancel") setIsVisible(true);
    if (type === "isArrived") {
      socket.emit("client:arrived-trip", {
        tripinfo: requestInfo.idFront,
      });
      setIsArrived(true);
      clearInterval(intervalRef.current);
      setFormatedTime("00:00");
    }
  };

  return (
    <View style={tw`flex flex-col relative w-full bg-black`}>
      {isVisible && (
        <ModalCancelTrip
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          navigation={navigation}
          requestInfo={requestInfo}
          socket={socket}
        />
      )}
      <View>
        <Pressable
          style={({ pressed }) =>
            tw`${
              pressed ? "bg-[#3a3a3a]" : "bg-[#292929]"
            }  mt-4 w-full h-[50px] self-center flex flex-col justify-center`
          }
          onPress={() => {
            handleSendTime("cancel");
          }}
        >
          <Text style={tw`ml-4 font-bold text-lg text-white`}>Cancelar</Text>
        </Pressable>
      </View>
      {!isArrived && (
        <View
          style={tw`rounded-xl bg-[#3a3a3a] z-10 w-[130px] p-2 self-center absolute top-20 bg-opacity-70`}
        >
          <Text style={tw`text-4xl font-bold text-white text-center`}>
            {formatedTime}
          </Text>
        </View>
      )}
      <MapView
        style={tw`w-full h-[350px] md:h-[400px] lg:h-[500px]`}
        initialRegion={{
          latitude: requestInfo.latitudeOrigin,
          longitude: requestInfo.longitudeOrigin,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        minZoomLevel={13}
        zoomEnabled={true}
        zoomControlEnabled={true}
      >
        <Marker
          coordinate={{
            latitude: requestInfo.latitudeOrigin,
            longitude: requestInfo.longitudeOrigin,
          }}
          pinColor="orange"
          title={requestInfo.textOrigin}
        />
        <Marker
          coordinate={{
            latitude: requestInfo.latitudeDestination,
            longitude: requestInfo.longitudeDestination,
          }}
          pinColor="gray"
          title={requestInfo.textDestination}
        />
        {!isArrived && (
          <Marker
            coordinate={{
              latitude: location?.coords?.latitude,
              longitude: location?.coords?.longitude,
            }}
            pinColor="green"
          />
        )}
        {!isArrived && (
          <MapViewDirections
            origin={{
              latitude: location?.coords?.latitude,
              longitude: location?.coords?.longitude,
            }}
            destination={{
              latitude: requestInfo.latitudeOrigin,
              longitude: requestInfo.longitudeOrigin,
            }}
            apikey={API_KEY_GOOGLE_MAPS}
            strokeWidth={3}
            strokeColor="green"
          />
        )}
        <MapViewDirections
          origin={{
            latitude: requestInfo.latitudeOrigin,
            longitude: requestInfo.longitudeOrigin,
          }}
          destination={{
            latitude: requestInfo.latitudeDestination,
            longitude: requestInfo.longitudeDestination,
          }}
          apikey={API_KEY_GOOGLE_MAPS}
          strokeWidth={3}
          strokeColor="#FFB800"
        />
      </MapView>
      <View style={tw`bg-[#292929] p-4 min-h-28 h-auto`}>
        <View style={tw`flex flex-row gap-2 items-center`}>
          <View
            style={tw`flex flex-row w-4 h-4 rounded-full bg-[#FFB800] justify-center items-center`}
          >
            <Text style={tw` font-bold text-white`}>A</Text>
          </View>
          <Text style={tw`font-bold text-white text-lg`}>
            {requestInfo.textOrigin}
          </Text>
        </View>
        <View style={tw`flex flex-row gap-2 items-center`}>
          <View
            style={tw`flex flex-row w-4 h-4 rounded-full bg-[#D2D2D2] justify-center items-center`}
          >
            <Text style={tw` font-bold text-[#292929]`}>B</Text>
          </View>
          <Text style={tw`text-white text-base`}>
            {requestInfo.textDestination}
          </Text>
        </View>
        <View style={tw`flex flex-row justify-between`}>
          <View style={tw`flex flex-row gap-2 items-center`}>
            <Text style={tw`text-white text-base font-semibold`}>
              {requestInfo.paymentMethod} - {requestInfo.price} COP
            </Text>
            {requestInfo.paymentMethod === "Nequi" && (
              <Image
                source={require("../../../assets/nequi.png")}
                resizeMode="contain"
                style={{
                  width: 18,
                  height: 18,
                }}
              />
            )}
            {requestInfo.paymentMethod === "Daviplata" && (
              <Image
                source={require("../../../assets/davivienda.png")}
                resizeMode="contain"
                style={{
                  width: 18,
                  height: 18,
                }}
              />
            )}
            {requestInfo.paymentMethod === "Bancolombia" && (
              <Image
                source={require("../../../assets/bancolombia.png")}
                resizeMode="contain"
                style={{
                  width: 18,
                  height: 18,
                }}
              />
            )}
          </View>
          <Text style={tw`text-white text-base`}>{requestInfo.distance}</Text>
        </View>
        <Text style={tw`text-gray-400 text-base`}>{requestInfo.comment}</Text>
      </View>
      <View style={tw`flex flex-col px-10 gap-5 mt-10 bg-black h-full`}>
        <Pressable
          style={({ pressed }) =>
            tw`${
              pressed ? "bg-[#fad371]" : "bg-[#FFCB44]"
            } mt-4 w-full h-[50px] rounded-xl self-center flex flex-col justify-center`
          }
          onPress={() => {
            if (!isArrived) {
              handleSendTime("isArrived");
            } else {
              handleFinishTrip();
            }
          }}
        >
          <Text style={tw`text-center font-bold text-2xl`}>
            {!isArrived ? "He llegado" : "Finalizar servicio"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
