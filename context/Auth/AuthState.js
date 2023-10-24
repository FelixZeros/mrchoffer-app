import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import { BACKEND_URL } from "@env";
import axios from "axios";

const AuthState = (props) => {
  const initialState = {
    user: null,
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth`, {
        email,
        password,
      });
      if (!response) return false;
      const { user } = response.data;
      
      dispatch({
        type: "LOGIN",
        payload: { user },
      });

      return true;
    } catch (err) {
      console.log(err);
      return false;
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
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
