import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { ModalSelectCompany, ModalRecharge } from "../../../components/Modals";
import authContext from "../../../context/Auth/AuthContext";
import { BACKEND_URL } from "@env";
import tw from "twrnc";
import { useFocusEffect } from "@react-navigation/native";

export const GananciesScreen = () => {
  const { user } = useContext(authContext);
  const [refreshKey, setRefreshKey] = useState(0);
  const [trips, setTrips] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      setRefreshKey((prevKey) => prevKey + 1);
    }, [])
  );

  const getRequestCompanyActive = async () => {
    const response = await fetch(
      `${BACKEND_URL}/api/request-driver-company/driver/${
        user?.id ?? user?.driver?.id
      }`
    );
    const data = await response.json();
    const getRequestActive = data.filter((request) => request.status === 2);
    if (getRequestActive.length > 0) {
      setCompanys(getRequestActive);
      setCompany(getRequestActive[0]);
    }
  };

  useEffect(() => {
    getRequestCompanyActive();
  }, [refreshKey]);

  const [company, setCompany] = useState(null);
  const [companys, setCompanys] = useState();
  const [saldoDriver, setSaldoDriver] = useState(0);
  const [isOpenRequest, setIsOpenRequest] = useState(false);
  const [isOpenRecharge, setIsOpenRecharge] = useState(false);
  const [amountDriver, setAmountDriver] = useState(0);
  const [handling, setHandling] = useState(0);

  const getBalanceByDriverCompany = async () => {
    const response = await fetch(
      `${BACKEND_URL}/api/driverCompany/getBalance`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyId: company?.companyId,
          driverId: user?.id ?? user?.driver?.id,
        }),
      }
    );
    const { amountTotal } = await response.json();
    setSaldoDriver(amountTotal);
  };

  const getTripsByDriverInCompany = async () => {
    const response = await fetch(
      `${BACKEND_URL}/api/get-trips-by-driver-in-company/${
        user?.id ?? user?.driver?.id
      }/${company?.companyId}
        `
    );
    const { trips, amountTotal, handlingFee } = await response.json();
    setTrips(trips);
    setHandling(handlingFee);
    setAmountDriver(amountTotal - handlingFee);
  };

  useEffect(() => {
    getBalanceByDriverCompany();
    getTripsByDriverInCompany();
  }, [company]);

  return (
    <ScrollView style={tw`mt-26`}>
      <View style={tw`shadow-lg rounded-lg  p-4 bg-white flex flex-col mx-8`}>
        <ModalSelectCompany
          isOpen={isOpenRequest}
          setIsOpen={setIsOpenRequest}
          companies={companys}
          setCompany={setCompany}
        />
        <ModalRecharge
          isOpen={isOpenRecharge}
          setIsOpen={setIsOpenRecharge}
          phone={company?.phone}
        />
        <View style={tw`flex flex-row gap-2 items-center`}>
          <Image source={require("../../../assets/bill.png")} />
          <Text style={tw`text-base font-medium`}>Saldo</Text>
        </View>
        <View style={tw`flex flex-row justify-between mt-4 items-center`}>
          <Text style={tw`text-3xl font-bold`}>
            COP {isNaN(saldoDriver - handling) ? 0 : saldoDriver - handling}
          </Text>
          <Pressable
            style={tw`flex flex-row items-center gap-1`}
            onPress={() => setIsOpenRequest(true)}
          >
            <Image
              source={
                company?.company?.photo
                  ? { uri: company?.company?.photo }
                  : require("../../../assets/profile.png")
              }
              style={tw`w-7 h-7`}
            />
            <Image source={require("../../../assets/arrow-left.png")} />
          </Pressable>
        </View>
        <Text style={tw`text-sm text-[#CE3E3E]`}>
          Recuerda recargar tu cuenta
        </Text>
        <Pressable
          style={tw`w-[200px] h-[50px] bg-[#FFCB44] rounded-xl self-center flex flex-col justify-center mt-4`}
          onPress={() => setIsOpenRecharge(true)}
        >
          <Text style={tw`text-center font-bold text-2xl`}>Recargar</Text>
        </Pressable>
      </View>
      <View style={tw`flex flex-col pb-4 mt-10`}>
        <View style={tw`bg-[#292929] w-full py-2 flex flex-col gap-3 px-4`}>
          <View style={tw`flex flex-row items-center justify-center gap-4`}>
            <Text style={tw`text-lg font-bold text-white`}>Mis ingresos</Text>
            <Image source={require("../../../assets/cash.png")} />
          </View>
          <View style={tw`flex flex-row items-center justify-between gap-4`}>
            <Text style={tw`text-lg font-bold text-white`}>
              {new Date().toLocaleString("es-CO", {
                day: "numeric",
                month: "long",
              })}
            </Text>
            <Text style={tw`text-2xl font-bold text-white`}>
              COP {amountDriver ?? 0}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View style={tw`flex flex-col px-8 pb-30`}>
          {trips.map((trip, index) => (
            <View
              style={tw`border rounded-md border-gray-200 px-3 py-2 bg-white mt-4`}
              key={index}
            >
              <Text style={tw`font-semibold text-base`}>{trip.startTime}</Text>
              <View style={tw`flex flex-row gap-2 items-center`}>
                <View
                  style={tw`flex flex-row w-5 h-5 rounded-full bg-[#FFB800] justify-center items-center`}
                >
                  <Text style={tw` font-bold text-white`}>A</Text>
                </View>
                <Text style={tw`font-bold text-lg`}>{trip.textOrigin}</Text>
              </View>
              <View style={tw`flex flex-row gap-2 items-center`}>
                <View
                  style={tw`flex flex-row w-5 h-5 rounded-full bg-[#D2D2D2] justify-center items-center`}
                >
                  <Text style={tw` font-bold text-[#292929]`}>B</Text>
                </View>
                <Text style={tw`font-normal text-lg`}>
                  {trip.textDestination}
                </Text>
              </View>
              <View style={tw`flex flex-row items-center gap-2`}>
                <Text style={tw`font-semibold text-xl`}>{trip.price} COP</Text>
                {trip.paymentMethod === "Nequi" && (
                  <Image
                    source={require("../../../assets/nequi.png")}
                    resizeMode="contain"
                    style={{
                      width: 18,
                      height: 18,
                    }}
                  />
                )}
                {trip.paymentMethod === "Daviplata" && (
                  <Image
                    source={require("../../../assets/davivienda.png")}
                    resizeMode="contain"
                    style={{
                      width: 18,
                      height: 18,
                    }}
                  />
                )}
                {trip.paymentMethod === "Bancolombia" && (
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
              <Text style={tw`font-normal text-sm text-gray-500`}>
                Cuota de manejo: COP {trip.handlingFee}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
