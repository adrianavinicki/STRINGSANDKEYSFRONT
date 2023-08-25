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
import { useToast } from "@chakra-ui/react";
import SmallWithLogoLeft from "../components/Footer";
import WithSubnavigation from "../components/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {
  PostUser,
  getUser,
  emptyActualUser,
  setMail,
  putUser,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleSendEmail } from "../components/WelcomeButtonNotification";

const Perfil = () => {
  const { user, isAuthenticated, isLoading } =
    useAuth0();
  const toast = useToast();

  const loading = isLoading;

  const [update, setUpdate] = useState(false);

  const dispatch = useDispatch();
  const actualUser = useSelector((state) => state.actualUser);
  const actualUserMail = useSelector((state) => state.userMail);

  if (actualUserMail !== actualUser?.email) {
    dispatch(emptyActualUser);
  }

  const userMail = user?.email;

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    mobile: "",
    delivery_address: "",
    role_id: "client",
    email: userMail,
  });

  if (!isLoading) {
    useEffect(() => {
      dispatch(setMail(userMail));
      dispatch(getUser(userMail));
    }, []);
  }

  const handleOnBlur = (e) => {
    handleChange(e);
    //setErrors(validateForm(form, image));
  };

  const handleSubmit = (e) => {
    toast({
      title: "Se ha registrado con exito.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    dispatch(PostUser(form));
    dispatch(handleSendEmail(user));
  };

  const [updateUser, setUpdateUser] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    delivery_address: "",
    email: user?.email,
  });
  console.log(updateUser, "holaa");

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUpdateUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmitUser = () => {
    try {
      if (updateUser.first_name === "") {
        updateUser.first_name = actualUser.first_name;
      }
      if (updateUser.last_name === "") {
        updateUser.last_name = actualUser.last_name;
      }
      if (updateUser.mobile === "") {
        updateUser.mobile = actualUser.mobile;
      }
      if (updateUser.delivery_address === "") {
        updateUser.delivery_address = actualUser.delivery_address;
      }

      dispatch(putUser(updateUser));

      toast({
        title: "Usuario Actualizado",
        description: "El Usuario a sido actualizado con exito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setUpdateUser({
        first_name: "",
        last_name: "",
        mobile: "",
        delivery_address: "",
        email: user?.email,
      });
      dispatch(getUser(userMail));
      setUpdate(false);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleUpdateTrue = () => {
    setUpdate(true);
  };

  const handleReturn = () => {
    setUpdate(false);
  }

  let isError = [];
  if (form.first_name === "") isError.first_name = "Nombre Requerido.";
  if (form.last_name === "") isError.last_name = "Apellido Requerido.";
  if (form.gender === "") isError.gender = "Genero Requerido.";
  if (form.mobile === "") isError.mobile = "Celular Requerido.";
  if (form.delivery_address === "")
    isError.delivery_address = "Direccion Requerida.";

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
          <Flex>
            <Stack spacing={"2vh"} mx={"auto"} maxW={"lg"} px={'2vh'} w={"30%"}>
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
                p={"5%"}
                h={"60vh"}
                display="flex"  // Utiliza el sistema de flexbox
                alignItems="center" // Centra verticalmente los elementos
                justifyContent="center" // Centra horizontalmente los elementos
              >
                {actualUser.id ? (
                  update ? (
                    <Stack spacing={"2vh"}>
                      <FormControl id="email">
                        <FormLabel color={"white"} fontSize={"2vh"}>
                          Mail:{" "}
                          <span style={{ color: "#ffa200", fontSize: "2.3vh" }}>
                            {user?.email}
                          </span>
                        </FormLabel>
                      </FormControl>
                      <FormControl id="gender">
                        <FormLabel color={"white"} fontSize={"2vh"}>
                          Genero:{" "}
                          <span style={{ color: "#ffa200", fontSize: "2.3vh" }}>
                            {actualUser?.gender}
                          </span>
                        </FormLabel>
                      </FormControl>
                      <Flex id="first_name" align="center">
                        <FormLabel color="white" fontSize="2vh" flex="1" mr="4">
                          Nombre:{" "}
                          <span style={{ color: "#ffa200", fontSize: "2.3vh" }}>
                            {actualUser?.first_name}
                          </span>
                        </FormLabel>
                        <Input
                          w="50%"
                          fontSize="2vh"
                          h="4vh"
                          placeholder="Nuevo Nombre"
                          _placeholder={{ color: "gray.500" }}
                          name="first_name"
                          onChange={handleUserChange}
                        />
                      </Flex>
                      <Flex id="last_name" align="center">
                        <FormLabel color="white" fontSize="2vh" flex="1" mr="4">
                          Apellido:{" "}
                          <span style={{ color: "#ffa200", fontSize: "2.3vh" }}>
                            {actualUser?.last_name}
                          </span>
                        </FormLabel>
                        <Input
                          w="50%"
                          fontSize="2vh"
                          h="4vh"
                          placeholder="Nuevo Apellido"
                          _placeholder={{ color: "gray.500" }}
                          name="last_name"
                          onChange={handleUserChange}
                        />
                      </Flex>
                      <Flex id="email" align="center">
                        <FormLabel color="white" fontSize="2vh" flex="1" mr="4">
                          Celular:{" "}
                          <span style={{ color: "#ffa200", fontSize: "2.3vh" }}>
                            {actualUser?.mobile}
                          </span>
                        </FormLabel>
                        <Input
                          w="50%"
                          fontSize="2vh"
                          h="4vh"
                          placeholder="Nuevo Celular"
                          _placeholder={{ color: "gray.500" }}
                          name="mobile"
                          onChange={handleUserChange}
                        />
                      </Flex>
                      <Flex id="delivery_address" align="center">
                        <FormLabel color="white" fontSize="2vh" flex="1" mr="4">
                          Dirección:{" "}
                          <span style={{ color: "#ffa200", fontSize: "2.3vh" }}>
                            {actualUser?.delivery_address}
                          </span>
                        </FormLabel>
                        <Input
                          w="50%"
                          fontSize="2vh"
                          h="4vh"
                          placeholder="Nueva Dirección"
                          _placeholder={{ color: "gray.500" }}
                          name="delivery_address"
                          onChange={handleUserChange}
                        />
                      </Flex>
                      <Stack spacing={"5vh"} pt={"3%"}>
                        <Center>
                        <Button
                              h={"4vh"}
                              bg={"#1b1b1b"}
                              color={"#ffa200"}
                              _hover={"none"}
                              onClick={handleReturn}
                              mr={'3vh'}
                            >
                              Volver
                            </Button>
                          <Link to={"/"}>
                            <Button
                              h={"4vh"}
                              bg={"#ffa200"}
                              color={"black"}
                              _hover={"none"}
                              onClick={handleSubmitUser}
                            >
                              Guardar
                            </Button>
                          </Link>
                        </Center>
                      </Stack>
                    </Stack>
                  ) : (
                    <Stack spacing={"2vh"}>
                      <Center>
                        {" "}
                        <Heading color={"white"} fontSize={"2.5vh"}>
                          MIS DATOS
                        </Heading>
                      </Center>
                      <FormLabel
                        rounded={"5px"}
                        color={"white"}
                        fontSize={"2vh"}
                      >
                        Mail:{" "}
                        <span style={{ color: "#ffa200", fontSize: "2.3vh" }}>
                          {user?.email}
                        </span>
                      </FormLabel>
                      <FormLabel color={"white"} fontSize={"2vh"}>
                        Nombre:{" "}
                        <span style={{ color: "#ffa200", fontSize: "2.3vh" }}>
                          {actualUser?.first_name}
                        </span>
                      </FormLabel>
                      <FormLabel color={"white"} fontSize={"2vh"}>
                        Apellido:{" "}
                        <span style={{ color: "#ffa200", fontSize: "2.3vh" }}>
                          {actualUser?.last_name}
                        </span>
                      </FormLabel>
                      <FormLabel color={"white"} fontSize={"2vh"}>
                        Genero:{" "}
                        <span style={{ color: "#ffa200", fontSize: "2.3vh" }}>
                          {actualUser?.gender}
                        </span>
                      </FormLabel>
                      <FormLabel color={"white"} fontSize={"2vh"}>
                        Celular:{" "}
                        <span style={{ color: "#ffa200", fontSize: "2.3vh" }}>
                          {actualUser?.mobile}
                        </span>
                      </FormLabel>
                      <FormLabel color={"white"} fontSize={"2vh"}>
                        Direccion:{" "}
                        <span style={{ color: "#ffa200", fontSize: "2.3vh" }}>
                          {actualUser?.delivery_address}
                        </span>
                      </FormLabel>
                      <Stack spacing={5} pt={2}>
                        <Button
                          h={"5vh"}
                          bg={"#ffa200"}
                          color={"black"}
                          _hover={"none"}
                          onClick={handleUpdateTrue}
                        >
                          Modificar Datos
                        </Button>
                      </Stack>
                    </Stack>
                  )
                ) : (
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={"0.5vh"}>
                      <FormControl id="email">
                        <FormLabel fontSize={"2vh"} color={"white"}>
                          Mail:{" "}
                          <span style={{ color: "#ffa200", fontSize: "2.3vh" }}>
                            {user?.email}
                          </span>
                        </FormLabel>
                      </FormControl>
                      <HStack>
                        <Box minH={"11vh"}>
                          <FormControl
                            id="first_name"
                            isInvalid={isError.first_name}
                          >
                            <FormLabel fontSize={"2vh"} color={"white"}>
                              Nombre
                            </FormLabel>
                            <Input
                              h={"4.5vh"}
                              bg={"white"}
                              color={"black"}
                              type="text"
                              onChange={handleChange}
                              onBlur={handleOnBlur}
                              name="first_name"
                              value={form.first_name}
                            />
                            <FormErrorMessage fontSize={"1.5vh"} color={"#ffa200"}>
                              {isError.first_name ? "Nombre Requerido." : ""}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                        <Box minH={"11vh"}>
                          <FormControl
                            id="last_name"
                            isInvalid={isError.last_name}
                          >
                            <FormLabel fontSize={"2vh"} color={"white"}>
                              Apellido
                            </FormLabel>
                            <Input
                              h={"4.5vh"}
                              bg={"white"}
                              color={"black"}
                              type="text"
                              onChange={handleChange}
                              onBlur={handleOnBlur}
                              name="last_name"
                              value={form.last_name}
                            />
                            {isError.last_name ? (
                              <FormErrorMessage fontSize={"1.5vh"} color={"#ffa200"}>
                                Apellido Requerido.
                              </FormErrorMessage>
                            ) : (
                              ""
                            )}
                          </FormControl>
                        </Box>
                      </HStack>
                      <HStack>
                        <Box minH={"11vh"}>
                          <FormControl id="gender" isInvalid={isError.gender}>
                            <FormLabel fontSize={"2vh"} color={"white"}>
                              Genero
                            </FormLabel>
                            <Select
                              h={"4.5vh"}
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
                              <FormErrorMessage fontSize={"1.5vh"} color={"#ffa200"}>
                                Genero Requerido.
                              </FormErrorMessage>
                            ) : (
                              ""
                            )}
                          </FormControl>
                        </Box>
                        <Box minH={"11vh"}>
                          <FormControl id="mobile" isInvalid={isError.mobile}>
                            <FormLabel fontSize={"2vh"} color={"white"}>
                              Celular
                            </FormLabel>
                            <Input
                              h={"4.5vh"}
                              bg={"white"}
                              color={"black"}
                              type="number"
                              onChange={handleChange}
                              onBlur={handleOnBlur}
                              name="mobile"
                              value={form.mobile}
                            />
                            {isError.mobile ? (
                              <FormErrorMessage fontSize={"1.5vh"} color={"#ffa200"}>
                                Celular Requerido.
                              </FormErrorMessage>
                            ) : (
                              ""
                            )}
                          </FormControl>
                        </Box>
                      </HStack>
                      <FormControl
                        minH={"11vh"}
                        id="delivery_address"
                        isInvalid={isError.delivery_address}
                      >
                        <FormLabel fontSize={"2vh"} color={"white"}>
                          Direccion
                        </FormLabel>
                        <Input
                          h={"4.5vh"}
                          bg={"white"}
                          color={"black"}
                          type="email"
                          onChange={handleChange}
                          onBlur={handleOnBlur}
                          name="delivery_address"
                          value={form.delivery_address}
                        />
                        {isError.delivery_address ? (
                          <FormErrorMessage fontSize={"1.5vh"} color={"#ffa200"}>
                            Direccion Requerida.
                          </FormErrorMessage>
                        ) : (
                          ""
                        )}
                      </FormControl>
                      <Stack spacing={'2vh'} pt={'2vh'}>
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
