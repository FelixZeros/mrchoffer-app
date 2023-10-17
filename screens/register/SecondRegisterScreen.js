import React from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import { TextInputC, SelectInput, CameraInput } from "./Components/Inputs";
import { dataTypeVehicle } from "../../utils/listCity";
import useRegisterForm from "./Hooks/useRegisterForm";
import tw from "twrnc";

export default function SecondRegisterScreen({ route, navigation }) {
  const {
    setNumberPropertyCard,
    setTypeVehicle,
    setBrand,
    setModel,
    setColor,
    setCc,
    setLine,
    setPhotoPropertyCardFront,
    setPhotoPropertyCardBack,
    error,
    eventSection,
  } = useRegisterForm(navigation);

  const { identification } = route.params;

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="never">
        <View style={tw`p-6 flex flex-col gap-4`}>
          <Text style={tw`text-lg font-bold text-center`}>
            Registro de Conductor
          </Text>
          <Text style={tw`font-bold text-base`}>Información del vehículo</Text>

          {error.numberPropertyCard && (
            <Text style={tw`text-red-500`}>Campo obligatorio</Text>
          )}
          <TextInputC
            label="N° TARJETA DE PROPIEDAD"
            setState={setNumberPropertyCard}
            keyboardType="numeric"
          />

          {error.typeVehicle && (
            <Text style={tw`text-red-500`}>Campo obligatorio</Text>
          )}
          <SelectInput
            label="TIPO DE VEHÍCULO"
            setState={setTypeVehicle}
            data={dataTypeVehicle}
          />

          {error.brand && (
            <Text style={tw`text-red-500`}>Campo obligatorio</Text>
          )}
          <TextInputC label="MARCA" setState={setBrand} />

          {error.line && (
            <Text style={tw`text-red-500`}>Campo obligatorio</Text>
          )}
          <TextInputC label="LÍNEA" setState={setLine} />

          {error.model && (
            <Text style={tw`text-red-500`}>Campo obligatorio</Text>
          )}
          <TextInputC label="MODELO" setState={setModel} />

          {error.color && (
            <Text style={tw`text-red-500`}>Campo obligatorio</Text>
          )}
          <TextInputC label="COLOR" setState={setColor} />

          {error.cc && <Text style={tw`text-red-500`}>Campo obligatorio</Text>}
          <TextInputC label="CILINDRAJE" setState={setCc} />

          {error.photoPropertyCardBack && (
            <Text style={tw`text-red-500`}>No ha subido parte trasera</Text>
          )}
          {error.photoPropertyCardFront && (
            <Text style={tw`text-red-500`}>No ha subido parte frontal</Text>
          )}
          <CameraInput
            label="Tarjeta de propiedad"
            type="propertyCard"
            id={identification}
            setBack={setPhotoPropertyCardBack}
            setFront={setPhotoPropertyCardFront}
            navigation={navigation}
          />

          <View>
            <Text style={tw`text-lg font-bold text-[#D00000] leading-5`}>
              *{" "}
              <Text style={tw`text-base font-normal text-black`}>
                No uses el flash del teléfono.
              </Text>
            </Text>

            <Text style={tw`text-lg font-bold text-[#D00000] leading-5`}>
              *{" "}
              <Text style={tw`text-base font-normal text-black`}>
                Asegúrate de que el nombre y el número de documentos sean
                visible
              </Text>
            </Text>
          </View>
          <Pressable
            style={({ pressed }) =>
              tw`${
                pressed ? "bg-[#fad371]" : "bg-[#FFCB44]"
              } w-[170px] h-[50px] rounded-xl self-center flex flex-col justify-center`
            }
            onPress={() => {
              eventSection(2);
            }}
          >
            <Text style={tw`text-center font-bold text-lg`}>Siguiente</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
