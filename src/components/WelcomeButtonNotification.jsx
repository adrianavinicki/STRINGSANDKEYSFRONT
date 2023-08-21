import React from "react";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
//import { useState } from "react";

const VITE_LOCAL_HOST = import.meta.env.VITE_LOCAL_HOST;

export const handleSendEmail = async (user) => {

  try {
    const userMail = user.email
    const userName = user.nickname

    const response = await fetch(`${VITE_LOCAL_HOST}/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMail: userMail,
        titulo: `Felicidades por registrarte ${userName}`,
        contenido: `Te damos la bienvenida a Strings And Keys. ¡Tu registro fue exitoso!`,
      }),
    });

    if (response.ok) {
      console.log("Email Enviado", response);
      // Mostrar una notificación de éxito
    } else {
      console.error("Error al enviar el correo");
      // Mostrar una notificación de error
    }
  } catch (error) {
    console.error("Error:", error);
    // Mostrar una notificación de error
  }
};

  // toast({
  //   title: "Mail de Bienvenida Enviado",
  //   description: "Se ha registrado con exito.",
  //   status: "success",
  //   duration: 5000,
  //   isClosable: true,
  // });

  // return (
  //   <Box>
  //     <Flex>
  //       <Button
  //         onClick={handleMailNotificationSignIn}
  //         border={"1px solid black"}
  //         color={"black"}
  //       >
  //         Send Mail Bienvenida
  //       </Button>
  //     </Flex>
  //   </Box>
  // );

