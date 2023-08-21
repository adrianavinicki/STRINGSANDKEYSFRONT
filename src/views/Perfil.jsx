"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  FormErrorMessage,
  InputRightElement,
  Stack,
  Center,
  Button,
  Select,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from '@chakra-ui/react'
import SmallWithLogoLeft from "../components/Footer";
import WithSubnavigation from "../components/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { PostUser, getUser, emptyActualUser, setMail } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {handleSendEmail} from "../components/WelcomeButtonNotification"

const Perfil = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const toast = useToast();

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
  console.log(user)

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
    dispatch(handleSendEmail(user))
    toast({
      title: "Mail de Bienvenida Enviado",
      description: "Se ha registrado con exito.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevValue) => ({ ...prevValue, [name]: value }));
  };


  let isError = []
  if(form.first_name === '') isError.first_name = "Nombre Requerido."
  if(form.last_name === '') isError.last_name = "Apellido Requerido."
  if(form.gender === '') isError.gender = "Genero Requerido."
  if(form.mobile === '') isError.mobile = "Celular Requerido."
  if(form.delivery_address === '') isError.delivery_address = "Direccion Requerida."



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
                        <Box minH={'11vh'}>
                          <FormControl
                            id="first_name"
                            isInvalid={isError.first_name}
                          >
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
                            <FormErrorMessage color={"#ffa200"}>
                              {isError.first_name ? "Nombre Requerido." : ""}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                        <Box minH={'11vh'}>
                          <FormControl
                            id="last_name"
                            isInvalid={isError.last_name}
                          >
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
                            {isError.last_name ? (
                              <FormErrorMessage color={"#ffa200"}>
                                Apellido Requerido.
                              </FormErrorMessage>
                            ) : (
                              ""
                            )}
                          </FormControl>
                        </Box>
                      </HStack>
                      <HStack>
                        <Box minH={'11vh'}>
                          <FormControl id="gender" isInvalid={isError.gender}>
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
                            {isError.gender ? (
                              <FormErrorMessage color={"#ffa200"}>
                                Genero Requerido.
                              </FormErrorMessage>
                            ) : (
                              ""
                            )}
                          </FormControl>
                        </Box>
                        <Box minH={'11vh'}>
                          <FormControl id="mobile" isInvalid={isError.mobile}>
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
                            {isError.mobile ? (
                              <FormErrorMessage color={"#ffa200"}>
                                Celular Requerido.
                              </FormErrorMessage>
                            ) : (
                              ""
                            )}
                          </FormControl>
                        </Box>
                      </HStack>
                      <FormControl minH={'11vh'}
                        id="delivery_address"
                        isInvalid={isError.delivery_address}
                      >
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
                        {isError.delivery_address ? (
                          <FormErrorMessage color={"#ffa200"}>
                            Direccion Requerida.
                          </FormErrorMessage>
                        ) : (
                          ""
                        )}
                      </FormControl>
                      <Stack spacing={10} pt={2}>
                        <Link to={"/"}>
                          <Center>
                          <Button
                            h={"5vh"}
                            bg={"#ffa200"}
                            color={"black"}
                            _hover={"none"}
                            onClick={handleSubmit}
                            isDisabled={isError.delivery_address}
                          >
                            Guardar
                          </Button>
                          </Center>
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
