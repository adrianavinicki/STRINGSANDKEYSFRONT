import React from "react";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
//import { useState } from "react";

const VITE_LOCAL_HOST = import.meta.env.VITE_LOCAL_HOST;



export default function BuyButtonNotification() {
  //const { user } = useAuth0()
  const  user  = {userMail: 'diaz.me1984@gmail.com', name: "Maty Diaz"}
  const toast = useToast();

  const handleMailNotificationBuy = () => {
    fetch(`${VITE_LOCAL_HOST}/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMail:  user.userMail ,
        titulo:  `Gracias por tu compra ${user.name}`,
        contenido:  "¡Te agradecemos por tu reciente compra en Strings And Keys!, Debajo podras ver los detalles de tu compra:",
      }),
    })
      .then((response) => console.log("Email Enviado", response))
      .catch((error) => console.error("Error:", error));

      toast({
        title: "Mail de Compra Enviado",
        description: "Se ha realizado su compra con exito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  };


  return (
    <Box>
      <Flex>
        <Button
          onClick={handleMailNotificationBuy}
          border={"1px solid black"}
          color={"black"}
        >
          Send Mail Compra
        </Button>
      </Flex>
    </Box>
  );
}
