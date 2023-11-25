import React, { useContext, useEffect, useState } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { View, Text, Pressable, Image } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { API_KEY_GOOGLE_MAPS } from "@env";
import tw from "twrnc";
import authContext from "../../../context/Auth/AuthContext";

export default function ScreenRequesTrip({ route, navigation }) {
  const { user, socket } = useContext(authContext);
  const { requestInfo } = route.params;

  // const requestInfo = {
  //   id: 1,
  //   origin: {
  //     text: "Transversal 27 # 19 A 60 Fundadores",
  //     latitude: 10.45431755959867,
  //     longitude: -73.26030616931199,
  //   },
  //   destination: {
  //     text: "Mz 21 Casa 8 Villamiriam",
  //     latitude: 10.449565,
  //     longitude: -73.27002,
  //   },
  //   paymentMethod: "Nequi",
  //   distance: "3 kM",
  //   price: 3000,
  // };

  const handleSendTime = (type) => {
    let timeWait = 0;
    if (type === "threeMinutes") timeWait = 3;
    if (type === "fiveMinutes") timeWait = 5;
    if (type === "tenMinutes") timeWait = 10;
    if (type === "fifteenMinutes") timeWait = 15;

    if (type !== "cancel") {
      socket.emit("client:accept-trip", {
        trip: requestInfo,
        driver: {
          driverId: user?.id ?? user?.driver?.id,
          status: 2,
          driverName: user.name ?? user.driver.name,
          time: timeWait,
        },
      });
      navigation.navigate("startRequest", { requestInfo, timeWait });
    }

    if (type === "cancel") navigation.navigate("Portal");
  };

  return (
    <View style={tw`flex flex-col bg-black`}>
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
            style={tw`flex flex-row w-4 h-4 rounded-full bg-[#FFB800] justify-center items-center `}
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
      <View style={tw`flex flex-col px-10 gap-5 mt-2 bg-black h-full`}>
        <Text style={tw`text-center font-bold text-xl text-white`}>
          ¿A qué hora llegas?
        </Text>
        <Pressable
          style={({ pressed }) =>
            tw`${
              pressed ? "bg-[#fad371]" : "bg-[#FFCB44]"
            } w-full h-[50px] rounded-xl self-center flex flex-col justify-center`
          }
          onPress={() => {
            handleSendTime("threeMinutes");
          }}
        >
          <Text style={tw`text-center font-bold text-2xl`}>3 Minutos</Text>
        </Pressable>
        <View style={tw`flex flex-row justify-between px-8`}>
          <Pressable
            style={({ pressed }) =>
              tw`${
                pressed ? "bg-[#4b473c]" : "bg-[#292929]"
              } w-[80px] h-[50px] rounded-xl self-center flex flex-col justify-center border border-gray-600`
            }
            onPress={() => {
              handleSendTime("fiveMinutes");
            }}
          >
            <Text style={tw`text-center font-bold text-xl text-white `}>
              5 Min
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) =>
              tw`${
                pressed ? "bg-[#4b473c]" : "bg-[#292929]"
              } w-[80px] h-[50px] rounded-xl self-center flex flex-col justify-center border border-gray-600`
            }
            onPress={() => {
              handleSendTime("tenMinutes");
            }}
          >
            <Text style={tw`text-center font-bold text-xl text-white`}>
              10 Min
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) =>
              tw`${
                pressed ? "bg-[#4b473c]" : "bg-[#292929]"
              } w-[80px] h-[50px] rounded-xl self-center flex flex-col justify-center border border-gray-600`
            }
            onPress={() => {
              handleSendTime("fifteenMinutes");
            }}
          >
            <Text style={tw`text-center font-bold text-xl text-white`}>
              15 Min
            </Text>
          </Pressable>
        </View>
        <Pressable
          style={({ pressed }) =>
            tw`${
              pressed ? "bg-[#4b473c]" : "bg-[#292929]"
            } w-full h-[50px] rounded-xl self-center flex flex-col justify-center border border-gray-600`
          }
          onPress={() => {
            handleSendTime("cancel");
          }}
        >
          <Text style={tw`text-center font-bold text-2xl text-white`}>
            Cancelar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
