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
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import SmallWithLogoLeft from "../components/Footer";
import WithSubnavigation from "../components/NavBar";
import { useAuth0 } from "@auth0/auth0-react";

const Perfil = () => {
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    gender: "",
    phone: "",
    adress: "",
  });
  

  const handleOnBlur = (e) => {
    handleChange(e);
    //setErrors(validateForm(form, image));
  };

  const handleSubmit = () => {
    console.log(form, "acaaa")
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const { user } = useAuth0();

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
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={5} px={4}>
              <Stack align={"center"}>
                <Heading fontSize={"4vh"} textAlign={"center"} color={"black"}>
                  Datos del Usuario
                </Heading>
                <Text fontSize={"2vh"} color={"gray.600"}>
                  Completa tus Datos
                </Text>
              </Stack>
              <Box rounded={"lg"} bg={"black"} boxShadow={"lg"} p={8}>
                <Stack spacing={4}>
                  <FormControl id="email">
                    <FormLabel>Mail: {user?.email}</FormLabel>
                  </FormControl>
                  <HStack>
                    <Box>
                      <FormControl id="firstName" isRequired>
                        <FormLabel>Nombre</FormLabel>
                        <Input
                          bg={"white"}
                          color={"black"}
                          type="text"
                          onChange={handleChange}
                          onBlur={handleOnBlur}
                          name="name"
                          value={form.name}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="lastName" isRequired>
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
                      <FormControl id="firstName" isRequired>
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
                          <option value={"Masculino"}>Masculino</option>
                          <option value={"Femenino"}>Femenino</option>
                          <option value={"X"}>X</option>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="lastName" isRequired>
                        <FormLabel>Celular</FormLabel>
                        <Input
                          bg={"white"}
                          color={"black"}
                          type="number"
                          onChange={handleChange}
                          onBlur={handleOnBlur}
                          name="phone"
                          value={form.phone}
                        />
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl id="email" isRequired>
                    <FormLabel>Direccion</FormLabel>
                    <Input
                      bg={"white"}
                      color={"black"}
                      type="email"
                      onChange={handleChange}
                      onBlur={handleOnBlur}
                      name="adress"
                      value={form.adress}
                    />
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg={"#ffa200"}
                      color={"black"}
                      _hover={"none"}
                      onClick={handleSubmit}
                    >
                      Guardar
                    </Button>
                  </Stack>
                </Stack>
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
