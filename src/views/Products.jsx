import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import WithSubnavigation from "../components/NavBar";
import SmallWithLogoLeft from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../redux/actions";
import React from "react";
import CardsContainer from "../components/CardsContainer";
import FilterAndOrder from "../components/Filters";
import { setPage } from "../redux/actions";

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts()); //me traigo los productos
    return () => {
      dispatch(setPage(0))
    }
  }, [dispatch]);

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
          <Flex justify={"space-around"}>
            <Box>
              <FilterAndOrder></FilterAndOrder>
            </Box>
            <Box
              color={"black"}
              bg={"gray.200"}
              w={"70%"}
              h={"78vh"}
              rounded={"5px"}
            >
              <CardsContainer></CardsContainer>
            </Box>
            <Box
              color={"black"}
              bg={"gray.200"}
              w={"10%"}
              h={"75vh"}
              rounded={"5px"}
              overflow={"hidden"}
            >
              <Image src="/banner3.jpg"></Image>
            </Box>
          </Flex>
        </Box>
        <Box>
          <SmallWithLogoLeft></SmallWithLogoLeft>
        </Box>
      </Flex>
    </Box>
  );
};

export default Products;
