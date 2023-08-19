import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  HStack,
  Heading,
  SimpleGrid,
  StackDivider,
  Link,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Input,
  useToast
} from "@chakra-ui/react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addProductToCart, getDetailProduct } from "../redux/actions";
import SmallWithLogoLeft from "../components/Footer";
import WithSubnavigation from "../components/NavBar";
import { FaShoppingCart } from "react-icons/fa";


const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();

  let detailProduct = useSelector((state) => state.details);
  useEffect(() => {
    dispatch(getDetailProduct(id));
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
          <Container maxW={"7xl"} bg={""}>
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 18, md: 6 }}
            >
              <Flex mt={"20%"}>
                <Image
                  rounded={"md"}
                  alt={"product image"}
                  src={detailProduct.image}
                  align={"center"}
                  maxH={"50vh"}
                />
              </Flex>
              <Stack spacing={{ base: 6, md: 8 }}>
                <Box as={"header"} bg={""}>
                  <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={"4vh"}
                    color={"black"}
                  >
                    {detailProduct.name}
                  </Heading>
                  <br />
                  <Text
                    color={useColorModeValue("black", "black")}
                    fontWeight={"bold"}
                    fontSize={"3vh"}
                  >
                    ${detailProduct.price}
                  </Text>
                </Box>
                {/* <Flex justifyContent="space-between" alignContent="center">
              <div>
                {productDetail?.id && (
                  <RatingDisplay productId={productDetail.id} />
                )}
              </div>
            </Flex> */}

                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={"column"}
                  divider={
                    <StackDivider
                      borderColor={useColorModeValue("gray.200", "gray.600")}
                    />
                  }
                >
                  <VStack spacing={{ base: 4, sm: 6 }}>
                    <Text fontWeight={"bold"} fontSize={"2vh"} color={"black"}>
                      {detailProduct.description}
                    </Text>
                  </VStack>
                  <Box>
                    <Flex>
                      <Box bg={""} w={"40%"} mt={"1%"}>
                        <Text
                          fontSize={"3vh"}
                          color={useColorModeValue("black", "black")}
                          fontWeight={"bold"}
                          textTransform={"uppercase"}
                          mb={"4"}
                        >
                          Información:
                        </Text>

                        <List spacing={2}>
                          <ListItem>
                            <Text
                              fontSize={"2vh"}
                              color={"black"}
                              as={"span"}
                              fontWeight={"500"}
                            >
                              Marca: {detailProduct.brand}
                            </Text>{" "}
                          </ListItem>
                          <ListItem>
                            <Text
                              fontSize={"2vh"}
                              color={"black"}
                              as={"span"}
                              fontWeight={"500"}
                            >
                              Categoria: {detailProduct.category}
                            </Text>{" "}
                          </ListItem>
                        </List>
                      </Box>
                    </Flex>
                  </Box>
                </Stack>
                <Box>
                  <Flex justify={"space-evenly"}>
                    <Link to={"/products"} href={"/products"}>
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
                      Agregar al Carrito <FaShoppingCart size={'3vh'} color="#ffa200" />
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
