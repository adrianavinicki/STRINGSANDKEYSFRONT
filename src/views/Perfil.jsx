"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Select,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import SmallWithLogoLeft from "../components/Footer";
import WithSubnavigation from "../components/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { PostUser, getUser, emptyActualUser, setMail } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Perfil = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const dispatch = useDispatch();
  const actualUser = useSelector((state) => state.actualUser);
  const actualUserMail = useSelector((state) => state.userMail);

  if (actualUserMail !== actualUser?.email) {
    dispatch(emptyActualUser);
  }

  const userMail = user?.email;
  console.log(userMail, "1");
  console.log(actualUserMail, "2");
  console.log(actualUser, "3", actualUser);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    mobile: "",
    delivery_address: "",
    role_id: "client",
    email: userMail,
  });

  useEffect(() => {
    dispatch(setMail(userMail));
    dispatch(getUser(userMail));
  }, []);

  const handleOnBlur = (e) => {
    handleChange(e);
    //setErrors(validateForm(form, image));
  };

  const handleSubmit = (e) => {
    console.log(form, "acaaa");
    dispatch(PostUser(form));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevValue) => ({ ...prevValue, [name]: value }));
  };

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
          h={"82vh"}
          mt={"100px"}
          pt={"2vh"}
          overflow={"hidden"}
        >
          <Flex>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={2} px={2} w={"30%"}>
              <Stack align={"center"}>
                <Heading fontSize={"4vh"} textAlign={"center"} color={"black"}>
                  Datos del Usuario
                </Heading>
                <Text fontSize={"2vh"} color={"gray.600"}>
                  {actualUser.id ? "Modifica tus Datos" : "Completa tus Datos"}
                </Text>
              </Stack>
              <Box
                rounded={"lg"}
                bg={"black"}
                boxShadow={"lg"}
                p={6}
                h={"60vh"}
              >
                {actualUser.id ? (
                  <Stack spacing={3}>
                    <FormControl id="email">
                      <FormLabel fontSize={"1.8vh"}>
                        Mail: {user?.email}
                      </FormLabel>
                    </FormControl>
                    <FormControl id="gender">
                      <FormLabel fontSize={"1.8vh"}>
                        Genero: {actualUser?.gender}
                      </FormLabel>
                    </FormControl>
                    <FormControl id="first_name">
                      <FormLabel fontSize={"1.8vh"}>
                        Nombre: {actualUser?.first_name}
                      </FormLabel>
                      <Input
                        h={"4vh"}
                        placeholder="Nuevo Nombre"
                        _placeholder={{ color: "gray.500" }}
                      ></Input>
                    </FormControl>
                    <FormControl id="last_name">
                      <FormLabel fontSize={"1.8vh"}>
                        Apellido: {actualUser?.last_name}
                      </FormLabel>
                      <Input
                        h={"4vh"}
                        placeholder="Nuevo Apellido"
                        _placeholder={{ color: "gray.500" }}
                      ></Input>
                    </FormControl>
                    <FormControl id="email">
                      <FormLabel fontSize={"1.8vh"}>
                        Celular: {actualUser?.mobile}
                      </FormLabel>
                      <Input
                        h={"4vh"}
                        placeholder="Nuevo Celular"
                        _placeholder={{ color: "gray.500" }}
                      ></Input>
                    </FormControl>
                    <FormControl id="delivery_address">
                      <FormLabel fontSize={"1.8vh"}>
                        Direccion: {actualUser?.delivery_address}
                      </FormLabel>
                      <Input
                        h={"4vh"}
                        placeholder="Nueva Direccion"
                        _placeholder={{ color: "gray.500" }}
                      ></Input>
                    </FormControl>
                    <Stack spacing={5} pt={2}>
                      <Button
                        h={"5vh"}
                        bg={"#ffa200"}
                        color={"black"}
                        _hover={"none"}
                      >
                        Modificar
                      </Button>
                    </Stack>
                  </Stack>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                      <FormControl id="email">
                        <FormLabel>Mail: {user?.email}</FormLabel>
                      </FormControl>
                      <HStack>
                        <Box>
                          <FormControl id="first_name" isRequired>
                            <FormLabel>Nombre</FormLabel>
                            <Input
                              bg={"white"}
                              color={"black"}
                              type="text"
                              onChange={handleChange}
                              onBlur={handleOnBlur}
                              name="first_name"
                              value={form.first_name}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl id="last_name" isRequired>
                            <FormLabel>Apellido</FormLabel>
                            <Input
                              bg={"white"}
                              color={"black"}
                              type="text"
                              onChange={handleChange}
                              onBlur={handleOnBlur}
                              name="last_name"
                              value={form.last_name}
                            />
                          </FormControl>
                        </Box>
                      </HStack>
                      <HStack>
                        <Box>
                          <FormControl id="gender" isRequired>
                            <FormLabel>Genero</FormLabel>
                            <Select
                              _hover={"none"}
                              bg={"white"}
                              color={"black"}
                              w={"200px"}
                              onChange={handleChange}
                              onBlur={handleOnBlur}
                              name="gender"
                              value={form.gender}
                              placeholder="seleccione un genero"
                            >
                              <option value={"M"}>Masculino</option>
                              <option value={"F"}>Femenino</option>
                              <option value={"X"}>X</option>
                            </Select>
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl id="mobile" isRequired>
                            <FormLabel>Celular</FormLabel>
                            <Input
                              bg={"white"}
                              color={"black"}
                              type="number"
                              onChange={handleChange}
                              onBlur={handleOnBlur}
                              name="mobile"
                              value={form.mobile}
                            />
                          </FormControl>
                        </Box>
                      </HStack>
                      <FormControl id="delivery_address" isRequired>
                        <FormLabel>Direccion</FormLabel>
                        <Input
                          bg={"white"}
                          color={"black"}
                          type="email"
                          onChange={handleChange}
                          onBlur={handleOnBlur}
                          name="delivery_address"
                          value={form.delivery_address}
                        />
                      </FormControl>
                      <Stack spacing={10} pt={2}>
                        <Link to={"/"}>
                          <Button
                            h={"5vh"}
                            bg={"#ffa200"}
                            color={"black"}
                            _hover={"none"}
                            onClick={handleSubmit}
                          >
                            Guardar
                          </Button>
                        </Link>
                      </Stack>
                    </Stack>
                  </form>
                )}
              </Box>
            </Stack>
          </Flex>
        </Box>
        <Box>
          <SmallWithLogoLeft></SmallWithLogoLeft>
        </Box>
      </Flex>
    </Box>
  );
};

export default Perfil;
