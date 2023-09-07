import { Box, Flex, Heading, Image, useColorModeValue } from "@chakra-ui/react";
import WithSubnavigation from "../components/NavBar";
import SmallWithLogoLeft from "../components/Footer";
import CategoryCards from "../components/HomeCards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  emptyStates,
  getProducts,
  emptyOrdersId,
  getUser,
  setMail,
  emptyActualUser,
  getUserRol,
  getRatingsAverages,
  getInfoPurchase,
  getAllPurchases,
  getAllUsers,
} from "../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();


  useEffect(() => {
    if(isAuthenticated && !isLoading) {
     
      const usuario = user?.email
      dispatch(getUser(usuario));
      
    }
  }, [user, dispatch])

  useEffect (() => {
    dispatch(emptyStates());
    dispatch(emptyOrdersId());
    dispatch(getProducts()); //me traigo los productos
    dispatch(getRatingsAverages());
    dispatch(setMail(user?.email));
    dispatch(getUser(user?.email));
    dispatch(getInfoPurchase());
    dispatch(getAllPurchases());
    dispatch(getAllUsers());
    if (!isAuthenticated && !isLoading) {
      dispatch(emptyActualUser())
    }

    if(user && isAuthenticated) {
     
      dispatch(getUserRol(user?.email));
      
    }

  },[])

  


  return (
    <Box
      backgroundImage={useColorModeValue("url('/bg.jpg')", "url('/bgdark.jpg')")}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      w={"100%"}
      h={"100%"}
      overflow={"hidden"}
    >
      <Flex direction={"column"}>
        <WithSubnavigation></WithSubnavigation>
        <Box h={"280vh"} pt={"10vh"} bg={""}>
          <Flex direction={"column"} align={"center"}>
              <Image borderBottom={'2px solid #ffa200'} src="/slider2.jpg"></Image>
            <Box mt={'5vh'}>
              <Heading color={useColorModeValue("black", "white")} fontSize={'5vh'}>Nuestros Productos</Heading>
            </Box>
            <Box bg={""} mt={'5vh'}>
              <Flex direction={"column"} align={"center"}>
                <CategoryCards></CategoryCards>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <SmallWithLogoLeft></SmallWithLogoLeft>
      </Flex>
    </Box>
  );
};

export default Home;
