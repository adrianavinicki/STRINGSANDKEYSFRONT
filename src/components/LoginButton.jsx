import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button color={"#ffa200"} onClick={() => loginWithRedirect()}>Iniciar Sesión</Button>;
};

export default LoginButton;