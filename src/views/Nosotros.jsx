"use client";

import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image,
  useColorModeValue,
  Box,
  transition,
} from "@chakra-ui/react";
import SmallWithLogoLeft from "../components/Footer";
import WithSubnavigation from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Nosotros() {

  const usuarioActual = useSelector((state)=> state.actualUser)
  const navigate = useNavigate();

  useEffect(()=>{
    if(usuarioActual.user_status === false){
      navigate("/inactive")
    };
  },[])

  return (
    <Box>
      <Flex direction={"column"}>
        <Box>
          <WithSubnavigation></WithSubnavigation>
        </Box>
        <Box
          backgroundImage={useColorModeValue(
            "url('/bg.jpg')",
            "url('/bgdark.jpg')"
          )}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          w={"100%"}
          h={"83vh"}
          mt={"10vh"}
          pt={"2vh"}
          overflow={"hidden"}
        >
          <Container maxW={"80vw"} pt={"3vh"}>
            <Stack textAlign={"center"} align={"center"}>
              <Image
                boxSize={"10vh"}
                src={useColorModeValue("LOGO png.png", "Logo White 2.png")}
              ></Image>
              <Box>
                <Flex>
                  <Box w={"-15%"} h={"45vh"} pr={"5vh"}>
                    <Flex direction={"column"}>
                      <Heading
                        fontWeight={500}
                        fontSize={"3.7vh"}
                        lineHeight={"100%"}
                        color={useColorModeValue("black", "white")}
                      >
                        COLABORADORES
                      </Heading>
                      <br />
                      <Link to={"http://www.linkedin.com/in/adrianavinicki99"}>
                        Adriana Vinicki
                      </Link>
                      <Link to={"https://github.com/Frujiloja"}>
                        Martin Fuks
                      </Link>
                      <Link to={"https://github.com/VVIDALSI"}>
                        Victor Vidal
                      </Link>
                      <Link to={"https://github.com/Palma97"}>
                        Nicolas Palma
                      </Link>
                      <Link to={"https://github.com/juliomunoz98"}>
                        Julio Muñoz
                      </Link>
                      <Link
                        to={
                          "https://www.linkedin.com/in/david-medina-435a50199"
                        }
                      >
                        David Medina
                      </Link>
                      <Link to={"https://github.com/MatyDiaz"}>
                        Matias Diaz
                      </Link>
                      <Link to={"https://github.com/francotriadani"}>
                        Franco Triadani
                      </Link>
                    </Flex>
                  </Box>
                  <Box pr={20}>
                    <Heading
                      fontWeight={600}
                      fontSize={"5.7vh"}
                      lineHeight={"110%"}
                      color={useColorModeValue("black", "white")}
                    >
                      Bienvenidos a{" "}
                      <Text as={"span"} color={"#ffa200"}>
                        Strings&Keys
                      </Text>
                    </Heading>
                    <br />
                    <Text
                      color={useColorModeValue("gray.800", "white")}
                      maxW={"3xl"}
                      fontSize={"2.2vh"}
                      textAlign={"justify"}
                    >
                      En Strings&Keys, encontrarás una cuidadosa selección de
                      productos de los mejores fabricantes. Nuestro equipo de
                      expertos está aquí para asesorarte en tu viaje musical.
                    </Text>
                    <Text
                      color={useColorModeValue("gray.800", "white")}
                      maxW={"3xl"}
                      fontSize={"2.2vh"}
                      textAlign={"justify"}
                    >
                      Creemos que la música es un lenguaje universal que conecta
                      corazones y almas. Nuestro compromiso es proporcionarte
                      las herramientas necesarias para expresarte a través de la
                      música y llevar tus habilidades al siguiente nivel.
                    </Text>
                    <Text
                      color={useColorModeValue("gray.800", "white")}
                      maxW={"3xl"}
                      fontSize={"2.2vh"}
                      textAlign={"justify"}
                    >
                      Navega por nuestra plataforma de compra intuitiva y
                      disfruta de una experiencia sin complicaciones. Únete a
                      nuestra comunidad de amantes de la música y descubre un
                      mundo de posibilidades melódicas con Strings&Keys.
                    </Text>
                  </Box>
                  <Box
                    _hover={{
                      transform: "translateY(-2px)",
                      transition: "0.3s",
                    }}
                  >
                    <Link to={"https://guitarflash.com/"}>
                      <Image
                        boxSize={"40vh"}
                        borderRadius={100}
                        src="https://media.giphy.com/media/9mh4ch3AAKfOo/giphy.gif"
                      ></Image>
                    </Link>
                  </Box>
                </Flex>
              </Box>
              <Stack spacing={6} direction={"row"}>
                <Link to={"/"}>
                  <Button
                    rounded={"full"}
                    px={6}
                    colorScheme={"orange"}
                    color={"black"}
                    bg={"#ffa200"}
                    _hover={{ bg: "orange.300" }}
                  >
                    Volver
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </Container>
        </Box>

        <Box marginTop="auto">
          <SmallWithLogoLeft></SmallWithLogoLeft>
        </Box>
      </Flex>
    </Box>
  );
}
