import { useEffect, useState } from "react";
import { Modal, Pressable, SectionList, Text, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";


export const FabSelectCompany = ({router}) => {

    const DATA = [
        {
            title: 'Main dishes',
            data: ['Pizza', 'Burger', 'Risotto'],
        },
        {
            title: 'Sides',
            data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
        },
        {
            title: 'Drinks',
            data: ['Water', 'Coke', 'Beer'],
        },
        {
            title: 'Desserts',
            data: ['Cheese Cake', 'Ice Cream'],
        },
    ];

    const [isOpen, setIsOpen] = useState(false)

    const getCompanies = async () => {
        const response = await axios.post('')
    }

    useEffect(() => {
        /*getCompanies()*/
    }, [])

    return <>

        <TouchableOpacity style={tw`absolute bottom-[110px] self-center`} onPress={() => { setIsOpen(true) }}>
            <View style={tw`w-[60px] h-[60px] shadow bg-white rounded-full absolute bottom-0 justify-center z-50 self-center `}>
                <Text style={tw`self-center justify-center items-center text-[25px] font-bold `}> + </Text>
            </View>
        </TouchableOpacity>

        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpen}
            >
            <View style={tw`bg-white shadow rounded-[20px] py-40 mx-3 bottom-0 top-0 my-auto`}>
                <TouchableOpacity onPress={() => setIsOpen(false)} style={tw`absolute right-5 top-2`}>
                    <View >
                        <Text style={tw`font-bold self-center text-lg`}>
                            x
                        </Text>
                    </View>
                </TouchableOpacity>

                <Text style={tw`font-bold self-center top-2 absolute text-lg`}>Elija una empresa</Text>
                <SectionList
                    sections={DATA}
                    style={tw`max-h-[80]`}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                        <View style={tw`border-b border-gray-300 py-2 mx-4`}>
                            <Pressable onPress={() => {
                                setIsOpen(false)
                                router.navigate("Company")} }>
                                <Text style={tw`font-bold text-4`}>{item}</Text>
                            </Pressable>
                        </View>
                    )}
                />

            </View>


        </Modal>
    </>
}