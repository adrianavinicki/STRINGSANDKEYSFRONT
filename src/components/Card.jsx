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
import RatingDisplay from './RatingDisplay';
import { Link } from "react-router-dom";

export default function ProductSimple(props) {

  const dispatch = useDispatch();

  //const agregarCarrito = (product) => {
//
  //  dispatch(addProductToCart(product));
  //}
  
  const truncatedName = props.name.length > 30 ? `${props.name.substring(0, 30)}...` : props.name;

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
      p={'1vh'}
      m={"3%"}
      _hover={{ transform: "translateY(-2px)", transition: "0.5s" }}
    >
      <Link key={props.id} to={`/detail/${props.id}`}>
        <Flex
          direction={"column"}
          align={"center"}
          justify="space-between"
          h="100%"
        >
          <Box>
            <Image h={"20vh"} rounded={"lg"} src={props.image} alt="#" />
          </Box>
          <Stack align={"center"} spacing={'1vh'}>
            <Text
              color={"gray.500"}
              fontSize={"1.3vh"}
              textTransform={"uppercase"}
            >
              {props.brand}
            </Text>
            <Heading
              h={"3.5vh"}
              fontSize={"2vh"}
              fontFamily={"body"}
              fontWeight={500}
            >
              {truncatedName}
            </Heading>
            <Flex align={'center'}>
              <Text fontWeight={800} fontSize={"3vh"}>
                ${props.price}
              </Text>
              <Text fontWeight={800} fontSize={"3vh"}>-</Text>
              <Box>
                <RatingDisplay productId={props.id} />
              </Box>
            </Flex>
          </Stack>
        </Flex>
      </Link>
    </Box>
  );
}
