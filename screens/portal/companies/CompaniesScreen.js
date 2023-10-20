import tw from "twrnc";
import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FabSelectCompany } from "../components/fab-select-company";

const NothingToSHow = () => {
    return <View style={tw`self-center items-center gap-4 h-full w-full justify-center`}>
    <Image
        source={require('../../../assets/mailbox.png')}
        resizeMode="contain"
        style={{
            width: 75,
            height: 75,
        }}
    ></Image>
    <Text style={tw`font-bold text-6`}>Nada que mostrar</Text>
</View>
}


export const ActiveTab = () => {
    return <NothingToSHow/>
}

export const RequestTab = () => {
    return <NothingToSHow/>
}

export const CompaniesScreen = ({navigation}) => {
    const Tab = createBottomTabNavigator();

    return <View style={tw`h-full w-full justify-center`}>
        <View style={tw`h-full w-full justify-center `}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: tw`absolute top-[100px] bg-transparent`
                }}
            >
                <Tab.Screen name="Activas" component={ActiveTab} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={`w-fit items-center justify-content-center rounded h-full  p-2`}>
                            <Text style={tw`font-bold ${focused && 'text-[#FFCB44]'} `}>
                                Activas
                            </Text >
                        </View>
                    )
                }}
                ></Tab.Screen>
                <Tab.Screen name="Solicitudes" component={RequestTab} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={`w-fit items-center justify-content-center rounded h-full  p-2`}>
                            <Text style={tw`font-bold ${focused && 'text-[#FFCB44]'} `}>
                                Solicitudes
                            </Text >
                        </View>
                    )
                }}
                ></Tab.Screen>

            </Tab.Navigator>
        </View>

        <FabSelectCompany router={navigation} />
    </View>
}