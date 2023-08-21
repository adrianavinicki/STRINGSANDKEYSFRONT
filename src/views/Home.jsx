import { Box, Flex, Heading, Image, } from "@chakra-ui/react";
import WithSubnavigation from "../components/NavBar";
import SmallWithLogoLeft from "../components/Footer"
import CategoryCards from "../components/HomeCards"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyStates, getProducts, emptyOrdersId} from "../redux/actions";


const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(emptyStates());
    dispatch(emptyOrdersId())
  })

  useEffect(() => {
    dispatch(getProducts()); //me traigo los productos
  }, [dispatch]);

  return (
    <Box
    backgroundImage="url('/bg.jpg')"
    backgroundPosition="center"
    backgroundRepeat="no-repeat"
    backgroundSize="cover"
    w={'100%'}
    h={'100%'}
    overflow={'hidden'}
    >
      <Flex direction={"column"}>
        <WithSubnavigation></WithSubnavigation>
        <Box h={'250vh'} pt={'100px'} bg={''}>
          <Flex direction={'column'} align={'center'}>
            <Box h={'60vh'} w={'100%'} align={'center'} borderBottom={'3px solid black'} overflow={'hidden'}>
              <Image  src="/slider2.jpg"></Image>
            </Box>
            <br />
            <Box>
              <Heading color={'black'}>Nuestros Productos</Heading>
            </Box>
            <br />
            <br />
            <Box bg={''}>
              <Flex direction={'column'} align={'center'}>
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
