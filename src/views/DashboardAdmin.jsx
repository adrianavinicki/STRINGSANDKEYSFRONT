import {
  Box,
  Flex,
  Stack,
  Container,
  Heading,
  Button,
  Input,
  SimpleGrid,
  HStack,
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
import { getProductName } from '../redux/actions';
//import EmailButton from "../components/WelcomeButtonNotification"


export default function EditProduct() {
  const allProducts = useSelector((state) => state.products);

  const dispatch = useDispatch()
  const [name, setName] = useState("")

  function handlerInput(e){
      //e.preventDefaut()
      setName(e.target.value)
      dispatch(getProductName(name))
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
          h={"82vh"}
          mt={"100px"}
          pt={"2vh"}
          overflow={"hidden"}
        >
          <Flex justify={"center"}>
            <Box>
              <Stack
                spacing={4}
                as={Container}
                maxW={"3x3"}
                textAlign={"center"}
              >
                <Heading color={"black"} fontSize={"4vh"}>
                  Dashboard Admin
                </Heading>
                <Text color={"black"} fontSize={"xl"}>
                  Panel para modificar o crear productos
                </Text>
              </Stack>
              <Box
                bg={"gray.200"}
                h={"5vh"}
                w={"100%"}
                rounded={"5px"}
                p={"2%"}
              >
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
                    w={"80%"}
                  ></Input>
                  <Link to={"/admin/crear-producto"}>
                    <Button bg={"#ffa200"} color={"black"} >
                      Crear Nuevo Producto
                    </Button>
                  </Link>
                </Flex>
              </Box>
              <Box>
                <Flex>
                  <Container
                    maxW={"100%"}
                    h={"61vh"}
                    bg={"gray.200"}
                    paddingTop={"3%"}
                  >
                    <SimpleGrid
                      columns={{ base: 1, md: 2, lg: 2 }}
                      spacing={10}
                      overflowY="auto"
                      maxHeight="530px"
                      maxW={"100%"}
                    >
                      {allProducts.map((feature) => (
                        <HStack
                          key={feature.id}
                          align={"center"}
                          w={"330px"}
                          h={"140px"}
                          bg={"black"}
                          rounded={"5px"}
                          mr={"5%"}
                        >
                          <Box color={"#ffa200"} px={6}>
                            <Link
                              key={feature.id}
                              to={`/edit/${feature.id}`}
                              href={`/edit/${feature.id}`}
                            >
                              <Icon as={EditIcon} />
                            </Link>
                          </Box>
                          <VStack align={"start"}>
                            <Text color={'white'} fontSize={"1.5vh"} fontWeight={600}>
                              {feature.name.length > 50
                                ? `${feature.name.substring(0, 30)}...`
                                : feature.name}
                            </Text>
                            <Text fontSize={"1.5vh"} color={"#ffa200"}>
                              Stock: {feature.quantity}
                            </Text>
                            <Text fontSize={"1.5vh"} color={"#ffa200"}>
                              Estado:{" "}
                              {feature.product_status ? "Activo" : "Pausado"}
                            </Text>
                          </VStack>
                          <Box pr={"2%"}>
                            <Center>
                              <Avatar size="xl" src={feature.image}></Avatar>
                            </Center>
                          </Box>
                        </HStack>
                      ))}
                    </SimpleGrid>
                  </Container>
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
