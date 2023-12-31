import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "./context/Auth/AuthState";
import RegisterProvider from "./context/Register/RegisterState";
import LoginScreen from "./screens/login";
import ScreenRequesTrip from "./screens/portal/request/RequestTripScreen";
import InfoRequestDriverScreen from "./screens/portal/request/InfoRequestDriverScreen";
import FirstRegisterScreen from "./screens/register/FirstRegisterScreen";
import SecondRegisterScreen from "./screens/register/SecondRegisterScreen";
import ModalCamera from "./components/ModalCamera";
import ThirdRegisterScreen from "./screens/register/ThirdRegisterScreen";
import { Header } from "./components/Header";
import { PortalScreen } from "./screens/portal/PortalScreen";
import { CompanyScreen } from "./screens/portal/companies/company/CompanyScreen";
import { ScreenSendRequest } from "./screens/portal/request/SendRequestScreen";
import { RequestScreen } from "./screens/portal/request/RequestScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <SafeAreaProvider>
        <AuthProvider>
          <RegisterProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Group>
                  <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                      headerShown: false,
                      headerBackTitleVisible: false,
                    }}
                  />
                  <Stack.Screen
                    name="RequestScreen"
                    component={RequestScreen}
                    options={{
                      headerShown: false,
                      headerBackTitleVisible: false,
                    }}
                  />
                  <Stack.Screen
                    name="Portal"
                    component={PortalScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="Company"
                    component={CompanyScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="firstSectionRegister"
                    component={FirstRegisterScreen}
                    options={{
                      headerTitle: (props) => <Header {...props} />,
                      headerBackTitleVisible: false,
                      headerStyle: {
                        backgroundColor: "#FFCB44",
                      },
                    }}
                  />
                  <Stack.Screen
                    name="startRequest"
                    component={ScreenSendRequest}
                    options={{
                      headerShown: false,
                      headerBackTitleVisible: false,
                    }}
                  />
                  <Stack.Screen
                    name="secondSectionRegister"
                    component={SecondRegisterScreen}
                    options={{
                      headerTitle: (props) => <Header {...props} />,
                      headerBackTitleVisible: false,
                      headerStyle: {
                        backgroundColor: "#FFCB44",
                      },
                    }}
                  />
                  <Stack.Screen
                    name="thirdSectionRegister"
                    component={ThirdRegisterScreen}
                    options={{
                      headerTitle: (props) => <Header {...props} />,
                      headerBackTitleVisible: false,
                      headerStyle: {
                        backgroundColor: "#FFCB44",
                      },
                    }}
                  />
                  <Stack.Screen
                    name="InfoRequestScreen"
                    component={ScreenRequesTrip}
                    options={{
                      headerShown: false,
                      headerBackTitleVisible: false,
                    }}
                  />
                  <Stack.Screen
                    name="InfoRequestDriverScreen"
                    component={InfoRequestDriverScreen}
                    options={{
                      headerShown: false,
                      headerBackTitleVisible: false,
                    }}
                  />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: "modal" }}>
                  <Stack.Screen
                    name="modalCamera"
                    component={ModalCamera}
                    options={{
                      headerTitle: "MrChoffer Cámara",
                      headerStyle: {
                        backgroundColor: "#FFCB44",
                      },
                    }}
                  />
                </Stack.Group>
              </Stack.Navigator>
            </NavigationContainer>
          </RegisterProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </>
  );
}

export default App;
