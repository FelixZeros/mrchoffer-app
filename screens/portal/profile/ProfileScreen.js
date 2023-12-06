import React, { useState, useEffect, useContext } from "react";
import { BACKEND_URL } from "@env";
import { ModalImage } from "../../../components/Modals";
import { View, Text, Image, Pressable } from "react-native";
import authContext from "../../../context/Auth/AuthContext";
import tw from "twrnc";

export const ProfileScreen = () => {
  const { user } = useContext(authContext);
  const [selected, setSelected] = useState(0);
  const [isOpened, setIsOpened] = useState(false);

  //   const [driver, setDriver] = useState(null);
  //   async function getDriver() {
  //     const response = await fetch(
  //       `${BACKEND_URL}/api/drivers/${user?.id ?? user?.driver?.id}`
  //     );
  //     const responseJSON = await response.json();
  //     setDriver(responseJSON);
  //   }

  //   useEffect(() => {
  //     getDriver();
  //   }, []);
  console.log(user);

  return (
    <View style={tw`h-full items-center justify-center flex flex-col pb-10`}>
      <ModalImage
        isOpen={isOpened}
        setIsOpen={setIsOpened}
        image={
          selected === 1
            ? user?.photoDriverLicenseFront ||
              user?.driver?.photoDriverLicenseFront
            : user?.photoDriverLicenseBack ||
              user?.driver?.photoDriverLicenseBack
        }
      />
      <Image
        style={tw`rounded-full h-24 w-24`}
        source={
          user?.photo || user?.driver?.photo
            ? {
                uri: user?.photo,
              }
            : require("../../../assets/profile.png")
        }
      />
      <Text style={tw`text-2xl font-bold mt-3`}>
        {user?.name || user?.driver?.name}
      </Text>

      <View style={tw`my-10`}>
        <Image
          source={{
            uri:
              user?.photoDriverLicenseFront ||
              user?.driver?.photoDriverLicenseFront,
          }}
          style={tw`w-[350px] h-[250px] rounded-2xl`}
        />
      </View>

      <View style={tw`flex flex-row justify-between w-full px-10`}>
        <Pressable
          style={tw`border border-[#FFB800] rounded-lg px-1 py-3 w-[138px] flex flex-col items-center gap-2`}
          onPress={() => {
            setSelected(1);
            setIsOpened(true);
          }}
        >
          <Image
            source={require("../../../assets/image.png")}
            style={tw`w-7 h-6`}
          />
          <Text style={tw`font-medium text-center text-xs`}>
            Ver Tarjeta De Propiedad Parte Frontal
          </Text>
        </Pressable>
        <Pressable
          style={tw`border border-[#FFB800] rounded-lg px-1 py-3 w-[138px] flex flex-col items-center gap-2`}
          onPress={() => {
            setSelected(2);
            setIsOpened(true);
          }}
        >
          <Image
            source={require("../../../assets/image.png")}
            style={tw`w-7 h-6`}
          />
          <Text style={tw`font-medium text-center text-xs`}>
            Ver Tarjeta De Propiedad Parte Trasera
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
