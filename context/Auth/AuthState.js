import React, { useReducer } from "react";
import { BACKEND_URL } from "@env";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthState = (props) => {
  const initialState = {
    user: null,
    error: null,
    loading: false,
    socket: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = async (email, password) => {
    try {
      console.log(`${BACKEND_URL}/api/auth`);
      const response = await axios.post(`${BACKEND_URL}/api/auth`, {
        email,
        password,
      });
      if (!response) return false;
      const { driver } = response.data.user;
      dispatch({
        type: "LOGIN",
        payload: { driver },
      });
      if (driver) {
        await AsyncStorage.setItem("@user", JSON.stringify(driver));
        return { isLogged: true };
      } else {
        return { isLogged: false };
      }
    } catch (err) {
      console.log(err);
      return { isLogged: false };
    }
  };

  const setSocket = (socket) => {
    dispatch({
      type: "SET_SOCKET",
      payload: socket,
    });
  };

  const getUserLocal = async () => {
    try {
      const user = await AsyncStorage.getItem("@user");
      if (user) {
        dispatch({
          type: "SET_USER_LOCAL",
          payload: JSON.parse(user),
        });
      }

      return user;
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        error: state.error,
        loading: state.loading,
        socket: state.socket,
        login,
        logout,
        getUserLocal,
        setSocket,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
