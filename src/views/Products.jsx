import { Box, Flex, useColorModeValue, Image } from "@chakra-ui/react";
import WithSubnavigation from "../components/NavBar";
import SmallWithLogoLeft from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { getProducts } from "../redux/actions";
import React from "react";
import CardsContainer from "../components/CardsContainer";
import FilterAndOrder from "../components/Filters";
import { setPage } from "../redux/actions";

const Products = () => {
  const dispatch = useDispatch();
  const usuarioActual = useSelector((state)=> state.actualUser)
  const navigate = useNavigate();

  useEffect(()=>{
    if(usuarioActual.user_status === false){
      navigate("/inactive")
    };
  },[])

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
          backgroundImage={useColorModeValue("url('/bg.jpg')", "url('/bgdark.jpg')")}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          w={"100%"}
          h={"83vh"}
          mt={"10vh"}
          pt={"2vh"}
          overflow={"hidden"}
        >
          <Flex justify={"space-around"} align={'center'} >
            <Box>
              <FilterAndOrder></FilterAndOrder>
            </Box>
            <Box
              color={"black"}
              bg={useColorModeValue('rgb(0,0,0,0.4)', 'rgb(0,0,0,0.7)')}
              w={"70%"}
              h={"78vh"}
              //minH={'470px'}
              rounded={"5px"}
              mt={'1vh'}
            >
              <CardsContainer></CardsContainer>
            </Box>
            <Box
              color={"black"}
              w={"10%"}
              h={"75vh"}
              rounded={"5px"}
              overflow={'hidden'}
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
