import { useState } from "react";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return {
    setEmail,
    setPassword,
  };
};

export default useLogin;
