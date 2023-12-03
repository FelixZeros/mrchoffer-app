import React from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import {
  TextInputC,
  CameraInput,
  SelectInputC,
  SelectInputD,
} from "./Components/Inputs";
import { dataGender, location } from "../../utils/listCity";
import useRegisterForm from "./Hooks/useRegisterForm";
import tw from "twrnc";

export default function FirstRegisterScreen({ navigation }) {
  const {
    identification,
    setIdentification,
    setName,
    setCity,
    handleDepartment,
    department,
    setGender,
    setPhotoDriverLicenseBack,
    setPhotoDriverLicenseFront,
    setPhotoIdentificationBack,
    setPhotoIdentificationFront,
    photoDriverLicenseBack,
    photoDriverLicenseFront,
    photoIdentificationBack,
    photoIdentificationFront,
    error,
    eventSection,
  } = useRegisterForm(navigation);

  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="never">
        <View style={tw`p-6 flex flex-col gap-4`}>
          <Text style={tw`text-lg font-bold text-center`}>
            Registro de Conductor
          </Text>
          <Text style={tw`font-bold text-base`}>Información personal</Text>
          {error.identification && (
            <Text style={tw`text-red-500`}>Campo obligatorio</Text>
          )}
          <TextInputC
            value={identification}
            label="IDENTIFICACIÓN"
            setState={setIdentification}
            keyboardType="numeric"
          />
          {error.name && (
            <Text style={tw`text-red-500`}>Campo obligatorio</Text>
          )}
          <TextInputC label="NOMBRE COMPLETO" setState={setName} />
          {error.deparment && (
            <Text style={tw`text-red-500`}>Campo obligatorio</Text>
          )}
          <SelectInputD
            label="DEPARTAMENTO"
            setState={handleDepartment}
            data={location}
          />
          {error.city && (
            <Text style={tw`text-red-500`}>Campo obligatorio</Text>
          )}
          <SelectInputC
            label="CIUDAD"
            setState={setCity}
            data={
              location?.filter((item) => item?.label === department)[0]
                .municipalities
            }
          />
          {error.gender && (
            <Text style={tw`text-red-500`}>Campo obligatorio</Text>
          )}
          <SelectInputC label="GÉNERO" setState={setGender} data={dataGender} />
          {error.photoIdentificationFront && (
            <Text style={tw`text-red-500`}>No ha subido parte frontal</Text>
          )}
          {error.photoIdentificationBack && (
            <Text style={tw`text-red-500`}>No ha subido parte trasera</Text>
          )}
          <CameraInput
            identification={identification}
            label="Documento de identidad"
            type="identification"
            setBack={setPhotoIdentificationBack}
            setFront={setPhotoIdentificationFront}
            front={photoIdentificationFront}
            back={photoIdentificationBack}
            id={identification}
            navigation={navigation}
          />
          {error.photoDriverLicenseFront && (
            <Text style={tw`text-red-500`}>No ha subido parte frontal</Text>
          )}
          {error.photoDriverLicenseBack && (
            <Text style={tw`text-red-500`}>No ha subido parte trasera</Text>
          )}
          <CameraInput
            identification={identification}
            label="Licencia de conducción"
            setBack={setPhotoDriverLicenseBack}
            setFront={setPhotoDriverLicenseFront}
            front={photoDriverLicenseFront}
            back={photoDriverLicenseBack}
            type="driverLicense"
            id={identification}
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
            style={tw`w-[170px] h-[50px] bg-[#FFCB44] rounded-xl self-center flex flex-col justify-center`}
            onPress={() => eventSection(1)}
          >
            <Text style={tw`text-center font-bold text-lg`}>Siguiente</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
