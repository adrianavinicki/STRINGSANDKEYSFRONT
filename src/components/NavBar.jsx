"use client";
import { Box, Flex, Stack, Image, useColorModeValue, useColorMode, Button  } from "@chakra-ui/react";
import React, { useState } from 'react';
import SearchBar from "../components/SearchBar";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { Profile } from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";

export default function WithSubnavigation() {
  const { isAuthenticated } = useAuth0();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("black", "black")}
        color={useColorModeValue("white", "white")}
        minH={"60px"}
        h={"100px"}
        w={"100%"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.900", "gray.900")}
        align={"center"}
        position="fixed"
        zIndex={10}
      >
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          ml={10}
        >
          <Box boxSize={"70px"} mb={"1%"}>
            <Link to={"/"}>
              <Image src="/Logo White.png"></Image>
            </Link>
          </Box>
          <Box ml={"3%"} bg={""} w={"90%"}>
            <Flex align={"center"} mt={"2%"}>
              <Box>
                <Stack direction={"row"} spacing={4}>
                    <Box >
                      <Link to={'/'}>
                        <Box
                          p={2}
                          fontSize={"2vh"}
                          fontWeight={500}
                          color={"white"}
                          _hover={{color:"#ffa200"}}
                        >
                          Inicio
                        </Box>
                      </Link>
                    </Box>
                    <Box >
                      <Link to={'/us'}>
                        <Box
                          p={2}
                          fontSize={"2vh"}
                          fontWeight={500}
                          color={"white"}
                          _hover={{color:"#ffa200"}}
                        >
                          Nosotros
                        </Box>
                      </Link>
                    </Box>
                    <Box >
                      <Link to={"/admin/edit"}>
                        <Box
                          p={2}
                          fontSize={"2vh"}
                          fontWeight={500}
                          color={"white"}
                          _hover={{color:"#ffa200"}}
                        >
                          Admin
                        </Box>
                      </Link>
                    </Box>
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
          justify={"flex-end"}
          direction={"row"}
          spacing={10}
          mr={"2%"}
        >
          <Link to="/cart">
            <FaShoppingCart size={"5vh"} color="#ffa200" />
          </Link>
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
