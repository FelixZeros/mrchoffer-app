import { Pressable, Text, View } from "react-native";
import tw from "twrnc";

export const ActiveCard = ({ request }) => {
  return (
    <View style={tw`relative shadow bg-white rounded m-2 h-[30]  `}>
      <View style={tw`m-5 flex flex-1 justify-between`}>
        <View>
          <Text style={tw`font-bold text-[#FFCB44] text-xl`}>{request.id}</Text>
          <Text>Creada: {request.createdAt.split("T")[0]}</Text>
        </View>

        <View>
          <Text>Carreras realizadas: 0 </Text>
        </View>
      </View>
    </View>
  );
};
