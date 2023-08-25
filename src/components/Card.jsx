"use client";

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Flex,
  Grid,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../redux/actions";

export default function ProductSimple(props) {

  const dispatch = useDispatch();

  //const agregarCarrito = (product) => {
//
  //  dispatch(addProductToCart(product));
  //}
  
  const truncatedName = props.name.length > 50 ? `${props.name.substring(0, 30)}...` : props.name;

  return (
<Box
      role={"group"}
      pb={"50%"}
      maxW={"90%"}
      h={"auto"}
      maxH={"35vh"}
      w={"full"}
      bg={"white"}
      boxShadow={"2xl"}
      rounded={"lg"}
      p={1}
      m={'5%'}
    >
      <Flex direction={"column"} justify="space-between" h="100%">
        <Box>
          <Image
            h={"20vh"}
            rounded={"lg"}
            src={props.image}
            alt="#"
          />
        </Box>
        <Stack align={"center"} spacing={3}>
          <Text
            color={"gray.500"}
            fontSize={"1.3vh"}
            textTransform={"uppercase"}
          >
            {props.brand}
          </Text>
          <Heading h={"5vh"} fontSize={"2vh"} fontFamily={"body"} fontWeight={500}>
            {truncatedName}
          </Heading>
          <Text fontWeight={800} fontSize={"3vh"}>
            ${props.price}
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
}
