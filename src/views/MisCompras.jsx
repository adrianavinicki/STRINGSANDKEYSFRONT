import {
  Flex,
  Container,
  Heading,
  Stack,
  Center,
  Button,
  Image,
  Box,
} from "@chakra-ui/react";
import SmallWithLogoLeft from "../components/Footer";
import WithSubnavigation from "../components/NavBar";
import PurchaseCards from "../components/Compras";
import { useDispatch, useSelector } from "react-redux";

export default function MisCompras() {
  const products = useSelector((state) => state.products);
  const firstFiveProducts = products.slice(0, 5);


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
          <Flex direction={"column"} align={"center"}>
            <Heading color={"black"}>Mis Compras</Heading>
            <Box
              h={"65vh"}
              w={"90%"}
              bg="rgba(0, 0, 0, 0.8)"
              rounded={"5px"}
              mt={"5vh"}
              overflowY="auto"
            >
              {firstFiveProducts.map((product) => {
                return (
                  <PurchaseCards
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                  ></PurchaseCards>
                );
              })}
            </Box>
          </Flex>
        </Box>
        <Box marginTop="auto">
          <SmallWithLogoLeft></SmallWithLogoLeft>
        </Box>
      </Flex>
    </Box>
  );
}
