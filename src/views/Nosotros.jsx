"use client";

import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image,
  Box,
  transition,
} from "@chakra-ui/react";
import SmallWithLogoLeft from "../components/Footer";
import WithSubnavigation from "../components/NavBar";
import { Link } from "react-router-dom";

export default function Nosotros() {
  return (
    <Box>
      <Flex direction={"column"}>
        <Box>
          <WithSubnavigation></WithSubnavigation>
        </Box>
        <Box
          backgroundImage="url('/bg.jpg')"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          w={"100%"}
          h={"83vh"}
          mt={"100px"}
          pt={"2vh"}
          overflow={"hidden"}
        >
          <Container maxW={"5xl"}>
            <Stack
              textAlign={"center"}
              align={"center"}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 10, md: 18 }}
            >
              <Image boxSize={"10vh"} src="/LOGO png.png"></Image>
              <Box>
                <Flex>
                  <Box w={"-15%"} h={"45vh"} pr={20}>
                    <Flex direction={"column"}>
                      <Heading
                        fontWeight={500}
                        fontSize={"3.7vh"}
                        lineHeight={"100%"}
                        color={"black"}
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
                      color={"black"}
                    >
                      Bienvenidos a{" "}
                      <Text as={"span"} color={"#ffa200"}>
                        Strings&Keys
                      </Text>
                    </Heading>
                    <br />
                    <Text color={"gray.700"} maxW={"3xl"} fontSize={"2.2vh"}>
                      En Strings&Keys, encontrarás una cuidadosa selección de
                      productos de los mejores fabricantes. Nuestro equipo de
                      expertos está aquí para asesorarte en tu viaje musical.
                    </Text>
                    <Text color={"gray.700"} maxW={"3xl"} fontSize={"2.2vh"}>
                      Creemos que la música es un lenguaje universal que conecta
                      corazones y almas. Nuestro compromiso es proporcionarte
                      las herramientas necesarias para expresarte a través de la
                      música y llevar tus habilidades al siguiente nivel.
                    </Text>
                    <Text color={"gray.700"} maxW={"3xl"} fontSize={"2.2vh"}>
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
