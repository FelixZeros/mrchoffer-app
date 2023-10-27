import { useEffect, useState } from "react";
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
import axios from "axios";

export const FabSelectCompany = ({ router }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [companies, setCompanies] = useState([]);

  const getCompanies = async () => {
    try {
      setLoading(true);
      console.log(`${BACKEND_URL}`)
      const response = await axios.get(`${BACKEND_URL}/api/get-companys`);
      if (!response) return;
      setCompanies(response.data);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
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
        <View style={tw`justify-center w-full h-full absolute bottom-0 bg-gray-600/30  backdrop-opacity-20]`}>
          <View
            style={tw`bg-white shadow rounded-[20px] py-40 mx-3 bottom-0 top-0 my-auto overflow-hidden`}
          >
            <TouchableOpacity
              onPress={() => setIsOpen(false)}
              style={tw`absolute right-5 top-2`}
            >
              <View>
                <Text style={tw`font-bold self-center text-lg`}>x</Text>
              </View>
            </TouchableOpacity>

            <Text style={tw`font-bold self-center top-2 absolute text-lg`}>
              Elija una empresa
            </Text>
            {loading ? (
              <Text> Cargando... </Text>
            ) : companies.length > 1 ? (
              <ScrollView style={tw`absolute w-full max-h-full  mt-15`}>
                {companies.map((company) => (
                  <Pressable
                    key={company}
                    onPress={() => {
                      setIsOpen(false);
                      router.navigate("Company", { company });
                    }}
                    style={tw`border-b mx-5 py-3 `}
                  >
                    <Text style={tw`font-bold`}>{company.name}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            ) : (
              <Text>No hay compañías disponibles por el momento!</Text>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};
