import React from "react";
import { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { View, Text, Pressable, Image } from "react-native";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

import tw from "twrnc";

export default function ModalCamera({ route, navigation }) {
  const { type, side, id, getBack, getFront } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoBlob, setPhotoBlob] = useState(null);
  const [photoOk, setPhotoOk] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const uriToBlob = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      throw new Error("No se pudo convertir el URI en Blob");
    }
  };

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({
        quality: 0.5,
      });
      setPhoto(data.uri);
      setPhotoBlob(await uriToBlob(data.uri));
    }
  };

  const uploadFile = async (uri) => {
    if (type === "propertyCard") {
      if (side === "front") {
        const storageRef = ref(storage, `${id}/propertyCardFront`);
        await uploadBytes(storageRef, uri);
        getFront(
          "https://firebasestorage.googleapis.com/v0/b/test-db-7681a.appspot.com/o/" +
            `${id}%2FpropertyCardFront?alt=media`
        );
      }
      if (side === "back") {
        const storageRef = ref(storage, `${id}/propertyCardBack`);
        await uploadBytes(storageRef, uri);
        getBack(
          "https://firebasestorage.googleapis.com/v0/b/test-db-7681a.appspot.com/o/" +
            `${id}%2FpropertyCardBack?alt=media`
        );
      }
    }

    if (type === "driverLicense") {
      if (side === "front") {
        const storageRef = ref(storage, `${id}/driverLicenseFront`);
        await uploadBytes(storageRef, uri);
        getFront(
          "https://firebasestorage.googleapis.com/v0/b/test-db-7681a.appspot.com/o/" +
            `${id}%2FdriverLicenseFront?alt=media`
        );
      }
      if (side === "back") {
        const storageRef = ref(storage, `${id}/driverLicenseBack`);
        await uploadBytes(storageRef, uri);
        getBack(
          "https://firebasestorage.googleapis.com/v0/b/test-db-7681a.appspot.com/o/" +
            `${id}%2FdriverLicenseBack?alt=media`
        );
      }
    }

    if (type === "identification") {
      if (side === "front") {
        const storageRef = ref(storage, `${id}/identificationFront`);
        await uploadBytes(storageRef, uri);
        getFront(
          "https://firebasestorage.googleapis.com/v0/b/test-db-7681a.appspot.com/o/" +
            `${id}%2FidentificationFront?alt=media`
        );
      }
      if (side === "back") {
        const storageRef = ref(storage, `${id}/identificationBack`);
        await uploadBytes(storageRef, uri);
        getBack(
          "https://firebasestorage.googleapis.com/v0/b/test-db-7681a.appspot.com/o/" +
            `${id}%2FidentificationBack?alt=media`
        );
      }
    }
  };

  useEffect(() => {
    if (photoOk) {
      uploadFile(photoBlob);
      setPhotoBlob(null);
      setTimeout(() => {
        setPhotoOk(false);
        setPhoto(null);
        navigation.goBack();
      }, 2000);
    }
  }, [photoOk]);

  if (hasPermission === null) {
    return (
      <View>
        <Text style={tw`text-center`}>Cargando...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View>
        <Text style={tw`text-center`}>No se tiene acceso a la cámara</Text>
      </View>
    );
  }

  if (photo) {
    return (
      <View>
        <Image style={tw`w-full h-[500px]`} source={{ uri: photo }} />
        <View style={tw`p-8 flex flex-row w-full justify-between`}>
          <Pressable
            onPress={() => {
              setPhoto(null);
            }}
          >
            <Text style={tw`font-semibold text-xl`}>Reintentar</Text>
          </Pressable>
          <Pressable
            title="Guardar"
            onPress={() => {
              setPhotoOk(true);
            }}
          >
            <Text style={tw`font-semibold text-xl`}>Guardar</Text>
          </Pressable>
        </View>
      </View>
    );
  } else {
    return (
      <View style={tw`flex flex-col h-full `}>
        <Camera ref={(ref) => setCamera(ref)} style={tw`flex-1`} ratio="16:9">
          <View style={tw`w-full px-10 py-36 bg-black bg-opacity-40 `}>
            <View
              style={tw`h-full w-full border-2 border-white self-center rounded-xl bg-white bg-opacity-20 `}
            ></View>
          </View>
        </Camera>
        <Pressable
          style={tw`w-[120px] h-[40px] rounded-lg flex flex-col justify-center items-center absolute bottom-5 left-1/3`}
          onPress={() => takePicture()}
        >
          <View
            style={tw`mb-20 w-20 h-20 bg-white rounded-full flex items-center justify-center`}
          >
            <Image
              style={{ width: 21, height: 28 }}
              source={require("../assets/cameraRotate.png")}
            />
          </View>
        </Pressable>
      </View>
    );
  }
}
