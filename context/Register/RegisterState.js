import React, { useReducer } from "react";
import RegisterContext from "./RegisterContext";
import RegisterReducer from "./RegisterReducer";
import { BACKEND_URL } from "@env";

const RegisterState = (props) => {
  const initialState = {
    driver: null,
  };

  const [state, dispatch] = useReducer(RegisterReducer, initialState);

  const sendInfo = async (driver) => {
    console.log(driver);
    await fetch(`${BACKEND_URL}/api/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(driver),
    });

    dispatch({
      type: "SEND_INFO",
      payload: { driver },
    });
  };

  const nextSection = async (section, info) => {
    if (section === 1) {
      state.driver = {
        ...state.driver,
        identification: info.identification,
        name: info.name,
        city: info.city,
        gender: info.gender,
        type: "driver",
        photoIdentificationFront: info.photoIdentificationFront,
        photoIdentificationBack: info.photoIdentificationBack,
        photoDriverLicenseFront: info.photoDriverLicenseFront,
        photoDriverLicenseBack: info.photoDriverLicenseBack,
      };
    }
    if (section === 2) {
      state.driver = {
        ...state.driver,
        numberPropertyCard: info.numberPropertyCard,
        typeVehicle: info.typeVehicle,
        brand: info.brand,
        model: info.model,
        color: info.color,
        cc: info.cc,
        line: info.line,
        photoPropertyCardFront: info.photoPropertyCardFront,
        photoPropertyCardBack: info.photoPropertyCardBack,
      };
    }

    if (section === 3) {
      state.driver = {
        ...state.driver,
        phone: info.phone,
        email: info.email,
        password: info.password,
      };
      return await sendInfo(state.driver);
    }
  };

  return (
    <RegisterContext.Provider
      value={{
        driver: state.driver,
        sendInfo,
        nextSection,
      }}
    >
      {props.children}
    </RegisterContext.Provider>
  );
};

export default RegisterState;
