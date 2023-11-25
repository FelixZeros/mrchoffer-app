import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BACKEND_URL } from "@env";
import tw from "twrnc";

export const FabSelectCompany = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [companies, setCompanies] = useState([]);

  const getCompanies = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/get-companys`);
      const data = await response.json();
      if (data.length > 0) {
        setCompanies(data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  useEffect(() => {
    getCompanies();
  }, [isOpen]);

  return (
    <>
      <TouchableOpacity
        style={tw`absolute bottom-[110px] self-center`}
        onPress={() => {
          setIsOpen(true);
        }}
      >
        <View
          style={tw`w-[60px] h-[60px] shadow bg-white rounded-full absolute bottom-0 justify-center z-50 self-center `}
        >
          <Text
            style={tw`self-center justify-center items-center text-[25px] font-bold `}
          >
            {" "}
            +{" "}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={isOpen}>
        <Pressable
          style={tw`justify-center w-full h-full absolute bottom-0 bg-gray-600/30  backdrop-opacity-20]`}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={tw`bg-white shadow rounded-[20px] py-40 mx-3 bottom-0 top-0 my-auto overflow-hidden`}
          >
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              style={tw`absolute right-5 top-2`}
            >
              <View>
                <Text style={tw`font-bold self-center text-3xl`}>x</Text>
              </View>
            </TouchableOpacity>

            <Text
              style={tw`font-bold self-center top-2 absolute text-2xl py-5`}
            >
              Elija una empresa
            </Text>
            {loading ? (
              <Text style={tw`text-center font-bold text-2xl`}>
                {" "}
                Cargando...{" "}
              </Text>
            ) : companies.length > 0 ? (
              <ScrollView style={tw`absolute w-full max-h-full  mt-15`}>
                {companies.map((company) => (
                  <Pressable
                    key={company.id}
                    onPress={() => {
                      setIsOpen(false);
                      navigation.navigate("Company", { company });
                    }}
                    style={tw`border-b-[0.5px] mx-5 py-3 `}
                  >
                    <Text style={tw`px-4 font-bold text-2xl uppercase`}>
                      {company.name}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            ) : (
              <Text style={tw`text-center font-bold text-2xl`}>
                No hay compañías disponibles por el momento!
              </Text>
            )}
          </View>
        </Pressable>
      </Modal>
    </>
  );
};
