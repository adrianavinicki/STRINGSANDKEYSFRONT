import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Tooltip,
  Badge,
  Collapse,
  List,
  ListItem,
  Icon,
  useToast,
  HStack,
  Center,
} from "@chakra-ui/react";
import { useParams } from "react-router";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addProductToCart,
  getDetailProduct,
  cleanDetail,
} from "../redux/actions";
import SmallWithLogoLeft from "../components/Footer";
import WithSubnavigation from "../components/NavBar";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { LiaStarSolid } from "react-icons/lia";

const VITE_LOCAL_HOST = import.meta.env.VITE_LOCAL_HOST;

const Detail = () => {
  const { id } = useParams();

  let detailProduct = useSelector((state) => state.details);
  const cartItems = useSelector((state) => state.cartItems);

  const dispatch = useDispatch();
  const toast = useToast();

  const getProductQuantityInCart = () => {
    const item = cartItems.find((item) => item.id === parseInt(id));
    return item ? item.quantity : 0;
  };

  useEffect(() => {
    dispatch(getDetailProduct(id));

    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  const getCarrito = (product) => {
    dispatch(addProductToCart(product));
    toast({
      title: "producto añadido al carrito",
      description: "El producto ha sido agregado exitosamente a tu carrito.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const [productReviews, setProductReviews] = useState([]);

  useEffect(() => {
    const getProductReviews = async (id) => {
      const response = await axios.get(
        `${VITE_LOCAL_HOST}/rating/product/${id}`
      );
      const reviews = response.data;
      setProductReviews(reviews);
    };

    getProductReviews(id);
  }, [id]);

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
          <Container maxW={"7xl"} bg={""} h={"70vh"}>
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={{ base: 8, md: 10 }}
              // py={{ base: 18, md: 6 }}
            >
              <Flex align={"center"} mt={""} ml={"20%"}>
                <Image
                  rounded={"md"}
                  alt={"product image"}
                  src={detailProduct.image}
                  // align={"center"}
                  maxH={"50vh"}
                />
              </Flex>
              <Stack spacing={'1vh'}>
                <Box as={"header"} bg={""}>
                  <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={"4vh"}
                    color={"black"}
                    mt={'1vh'}
                  >
                    {detailProduct.name}
                  </Heading>
                  <Text
                    color={useColorModeValue("black", "black")}
                    fontWeight={"bold"}
                    fontSize={"3vh"}
                  >
                    ${detailProduct.price}
                  </Text>
                </Box>

                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={"column"}
                  divider={<StackDivider borderColor={"black"} />}
                >
                  <VStack spacing={{ base: 4, sm: 6 }}>
                    <Text fontWeight={"bold"} fontSize={"2vh"} color={"black"}>
                      {detailProduct.description}
                    </Text>
                  </VStack>
                  <Box bg={""} width={"100%"}>
                    <Center>
                      <Flex direction={"column"}>
                        <Box bg={""} w={"100%"}>
                          <Flex direction={"row"} justify={'space-between'}>
                            <Text
                              fontSize={"2vh"}
                              color={"black"}
                              as={"span"}
                              fontWeight={"500"}
                            >
                              Marca: {detailProduct.brand}
                            </Text>{" "}
                            <Text
                              fontSize={"2vh"}
                              color={"black"}
                              as={"span"}
                              fontWeight={"500"}
                            >
                              Categoria: {detailProduct.category}
                            </Text>{" "}
                          </Flex>
                        </Box>
                        <Box bg={""} w={"100%"}>
                          {/* <Text
                            color={"black"}
                            fontWeight={"bold"}
                            fontSize={"30px"}
                          >
                            Reviews
                          </Text> */}
                          <Box
                            mt={"15px"}
                            bg={"#1b1b1b"}
                            h={"25vh"}
                            overflowY="auto"
                            maxH={""}
                            maxW={""}
                            rounded={"5px"}
                            w={'100%'}
                          >
                            {!productReviews?.length ? (
                              <Center mt={"8vh"}>
                                <HStack
                                  //align={"center"}

                                  w={""}
                                  h={"6vh"}
                                  bg={"white"}
                                  m={"10px"}
                                  rounded={"5px"}
                                >
                                  <Flex>
                                    <Text
                                      color={"gray.600"}
                                      align={"center"}
                                      m={"1vh"}
                                    >
                                      Lo siento, este producto aun no tiene
                                      reviews.
                                    </Text>
                                  </Flex>
                                </HStack>
                              </Center>
                            ) : (
                              productReviews?.map((review) => (
                                <HStack
                                  key={review.userId}
                                  w={""}
                                  h={""}
                                  bg={"white"}
                                  m={"10px"}
                                  rounded={"5px"}
                                  
                                >
                                  <VStack ml={"10px"} align={"start"}>
                                    <Text fontWeight={600}>
                                      {review.user.first_name}
                                    </Text>
                                    <Box>
                                      <Flex>
                                        <Text color={"gray.600"}>
                                          Ratings: {review.rate}
                                        </Text>
                                        <LiaStarSolid size="1.4em" />
                                      </Flex>
                                    </Box>
                                    <Text color={"gray.600"}>
                                      Reviews: {review.review}
                                    </Text>
                                  </VStack>
                                </HStack>
                              ))
                            )}
                          </Box>
                        </Box>
                      </Flex>
                    </Center>
                  </Box>
                </Stack>
                <Box>
                  <Flex justify={"space-evenly"}>
                    <Link to={"/products"}>
                      <Button
                        bg={"black"}
                        color={"#ffa200"}
                        _hover={{
                          transform: "translateY(2px)",
                          boxShadow: "lg",
                        }}
                      >
                        Volver
                      </Button>
                    </Link>
                    <Button
                      onClick={() => getCarrito(detailProduct)}
                      rounded={"5px"}
                      bg={useColorModeValue("black", "black")}
                      color={useColorModeValue("#ffa200", "#ffa200")}
                      _hover={{
                        transform: "translateY(2px)",
                        boxShadow: "lg",
                      }}
                    >
                      Agregar al Carrito
                      <Box>
                        <Icon
                          color={"white"}
                          as={FaShoppingCart}
                          h={8}
                          w={7}
                          mt={1}
                          alignSelf="center"
                        />
                        <Badge
                          colorScheme="black"
                          position="absolute"
                          borderRadius="full"
                        >
                          {getProductQuantityInCart()}
                        </Badge>
                      </Box>
                    </Button>
                  </Flex>
                </Box>
              </Stack>
            </SimpleGrid>
          </Container>
        </Box>
        <Box>
          <SmallWithLogoLeft></SmallWithLogoLeft>
        </Box>
      </Flex>
    </Box>
  );
};

export default Detail;
