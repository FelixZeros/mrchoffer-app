import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "./context/Auth/AuthState";
import RegisterProvider from "./context/Register/RegisterState";
import LoginScreen from "./screens/login";
import FirstRegisterScreen from "./screens/register/FirstRegisterScreen";
import SecondRegisterScreen from "./screens/register/SecondRegisterScreen";
import ModalCamera from "./components/ModalCamera";
import { Header } from "./components/Header";
import ThirdRegisterScreen from "./screens/register/ThirdRegisterScreen";

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
