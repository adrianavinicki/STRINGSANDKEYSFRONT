"use client";
import {
  Box,
  Flex,
  Stack,
  Image,
  useColorModeValue,
  Badge,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { Profile } from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserRol } from "../redux/actions";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function WithSubnavigation() {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  const rolUsuario = useSelector((state) => state.actualUser);
  const { colorMode, toggleColorMode } = useColorMode();

  const cartItems = useSelector((state) => state.cartItems);

  const totalCantidad = cartItems?.reduce((acumulador, producto) => {
    return acumulador + producto.quantity;
  }, 0);

  return (
    <Box>
      <Flex
        bg={useColorModeValue("black", "black")}
        color={useColorModeValue("white", "white")}
        h={"12vh"}
        w={"100%"}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"#ffa200"}
        align={"center"}
        position="fixed"
        zIndex={10}
      >
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align={"center"}
          ml={10}
        >
          <Box boxSize={"5%"}>
            <Link to={"/"}>
              <Image src="/Logo White.png"></Image>
            </Link>
          </Box>
          <Box ml={"3%"} bg={""} w={"90%"}>
            <Flex align={"center"}>
              <Box>
                <Stack direction={"row"}>
                  <Box>
                    <Link to={"/"}>
                      <Box
                        p={2}
                        fontSize={"2vh"}
                        fontWeight={500}
                        color={"white"}
                        _hover={{ color: "#ffa200" }}
                      >
                        Inicio
                      </Box>
                    </Link>
                  </Box>
                  <Box>
                    <Link to={"/us"}>
                      <Box
                        p={2}
                        fontSize={"2vh"}
                        fontWeight={500}
                        color={"white"}
                        _hover={{ color: "#ffa200" }}
                      >
                        Nosotros
                      </Box>
                    </Link>
                  </Box>
                  {rolUsuario.role_id === "admin" && (
                    <Box>
                      <Link to={"/admin"}>
                        <Box
                          p={2}
                          fontSize={"2vh"}
                          fontWeight={500}
                          color={"white"}
                          _hover={{ color: "#ffa200" }}
                        >
                          Admin
                        </Box>
                      </Link>
                    </Box>
                  )}
                </Stack>
              </Box>
              <Box ml={"5vh"}>
                <SearchBar />
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"center"}
          align={"center"}
          direction={"row"}
          spacing={10}
          mr={"2%"}
          h="100%"
        >
          <Box>
            <Link to="/cart">
              <Badge
                ml={"5vh"}
                colorScheme="black"
                position="absolute"
                borderRadius="full"
              >
                {totalCantidad}
              </Badge>
              <FaShoppingCart size={"5vh"} color="#ffa200" />
            </Link>
          </Box>
          <Button p={0} m={0} onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          {isAuthenticated ? (
            <>
              <Profile></Profile>
            </>
          ) : (
            <LoginButton></LoginButton>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}
