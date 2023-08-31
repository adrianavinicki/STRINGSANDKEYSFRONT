import { Box, Flex, Heading, Image } from "@chakra-ui/react";
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
  getRatingsAverages,
  getAllUsers,
} from "../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();


  useEffect (() => {
    dispatch(emptyStates());
    dispatch(emptyOrdersId());
    dispatch(getProducts()); //me traigo los productos
    dispatch(getRatingsAverages());
    dispatch(setMail(user?.email));
    dispatch(getUser(user?.email));
    dispatch(getAllUsers());
    if (!isAuthenticated) {
      dispatch(emptyActualUser())
    }
  },[])



  return (
    <Box
      backgroundImage="url('/bg.jpg')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      w={"100%"}
      h={"100%"}
      overflow={"hidden"}
    >
      <Flex direction={"column"}>
        <WithSubnavigation></WithSubnavigation>
        <Box h={"250vh"} pt={"100px"} bg={""}>
          <Flex direction={"column"} align={"center"}>
            <Box
              h={"60vh"}
              w={"100%"}
              align={"center"}
              borderBottom={"3px solid black"}
              overflow={"hidden"}
            >
              <Image src="/slider2.jpg"></Image>
            </Box>
            <br />
            <Box>
              <Heading color={"black"}>Nuestros Productos</Heading>
            </Box>
            <br />
            <br />
            <Box bg={""}>
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
