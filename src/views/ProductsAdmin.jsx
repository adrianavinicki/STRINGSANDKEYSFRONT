import {
  Box,
  Flex,
  Stack,
  Container,
  Heading,
  Button,
  Input,
  Checkbox,
  SimpleGrid,
  HStack,
  Select,
  Icon,
  VStack,
  Center,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import SmallWithLogoLeft from "../components/Footer";
import WithSubnavigation from "../components/NavBar";
import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductName } from "../redux/actions";
//import EmailButton from "../components/WelcomeButtonNotification"

export default function EditProduct() {
  const allProducts = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handlerInput(e) {
    //e.preventDefaut()
    setName(e.target.value);
    dispatch(getProductName(name));
  }

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
          <Flex justify={"center"}>
            <Box>
              <Stack
                mb={"2vh"}
                spacing={4}
                as={Container}
                maxW={"3x3"}
                textAlign={"center"}
              >
                <Heading color={"black"} fontSize={"4vh"}>
                  Modificar o Crear Productos
                </Heading>
              </Stack>
              <Box
                w={"120vh"}
                h={"61vh"}
                bg="rgba(0, 0, 0, 0.8)"
                rounded={"5px"}
                p={"2vh"}
              >
                <Flex direction={"row"}>
                  <Box bg="" w={"70%"} h={'55vh'}>
                    <Flex direction={"column"}>
                      <Box>
                        <Flex>
                          <Input
                            bg={"white"}
                            color={"black"}
                            placeholder="Busca tu Instrumento"
                            _placeholder={{ opacity: 1, color: "gray.500" }}
                            onChange={(e) => {
                              handlerInput(e);
                            }}
                            value={name}
                            fontSize="2vh"
                          ></Input>
                        </Flex>
                      </Box>
                      <Center>
                        <Box pt={"3vh"}>
                          <Flex>
                            <SimpleGrid
                              columns={{ base: 1, md: 2, lg: 2 }}
                              spacing={"2vh"}
                              overflowY="auto"
                              maxHeight="48vh"
                              maxW={"100%"}
                            >
                              {allProducts.map((feature) => (
                                <HStack
                                  key={feature.id}
                                  align={"center"}
                                  w={"100%"}
                                  h={"15vh"}
                                  bg={"black"}
                                  rounded={"5px"}
                                  mr={"5%"}
                                >
                                  <Box color={"#ffa200"} px={"2vh"}>
                                    <Link key={feature.id} to={`${feature.id}`}>
                                      <Icon as={EditIcon} />
                                    </Link>
                                  </Box>
                                  <VStack align={"start"} maxW={"43%"}>
                                    <Text
                                      color={"white"}
                                      fontSize={"1.5vh"}
                                      fontWeight={600}
                                    >
                                      {feature.name.length > 50
                                        ? `${feature.name.substring(0, 30)}...`
                                        : feature.name}
                                    </Text>
                                    <Text fontSize={"1.5vh"} color={"#ffa200"}>
                                      Stock: {feature.quantity}
                                    </Text>
                                    <Text fontSize={"1.5vh"} color={"#ffa200"}>
                                      Estado:{" "}
                                      {feature.product_status
                                        ? "Activo"
                                        : "Pausado"}
                                    </Text>
                                  </VStack>
                                  <Box pr={"1%"}>
                                    <Center>
                                      <Avatar
                                        h={"10vh"}
                                        w={""}
                                        src={feature.image}
                                      ></Avatar>
                                    </Center>
                                  </Box>
                                </HStack>
                              ))}
                            </SimpleGrid>
                          </Flex>
                        </Box>
                      </Center>
                    </Flex>
                  </Box>
                  <Center w={"30%"}>
                    <Box h={"20vh"} w={"80%"} rounded={"5px"} p={"2vh"}>
                      <Flex justify={"center"} direction={"column"}>
                        <Select bg={"black"} color={"white"} h={'5vh'} w={'100%'}>
                          <option style={{ backgroundColor: "#1b1b1b" }}>
                            Ordenar
                          </option>
                          <option style={{ backgroundColor: "#1b1b1b" }}>
                            Menor Stock
                          </option>
                          <option style={{ backgroundColor: "#1b1b1b" }}>
                            Mayor Stock
                          </option>
                          <option style={{ backgroundColor: "#1b1b1b" }}>
                            Activos
                          </option>
                          <option style={{ backgroundColor: "#1b1b1b" }}>
                            Pausados
                          </option>
                        </Select>
                        <Link to={"/admin/edit/product/crear"}>
                          <Button
                            bg={"#ffa200"}
                            color={"black"}
                            fontSize="2vh"
                            mt={"2vh"}
                            h={'5vh'}
                          >
                            Crear Nuevo Producto
                          </Button>
                        </Link>
                      </Flex>
                    </Box>
                  </Center>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Box>
        <Box>
          <SmallWithLogoLeft></SmallWithLogoLeft>
        </Box>
      </Flex>
    </Box>
  );
}
