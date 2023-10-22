import { useContext, useState } from "react";
import authContext from "../../../context/Auth/AuthContext";

const useLogin = () => {
  const { login } = useContext(authContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  async function onSubmit(){
    const isValidLogin = await login(email, password)
  }

  return {
    setEmail,
    setPassword,

    onSubmit,
  };
};

export default useLogin;
