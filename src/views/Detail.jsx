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
  } from "@chakra-ui/react";
  import { useParams } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { useEffect } from "react";
  import { getDetailProduct } from "../redux/actions";

const Detail = () => {

  const {id} = useParams();
  const dispatch = useDispatch();

  let detailProduct = useSelector((state) => state.details);
  useEffect(()=> {
    dispatch(getDetailProduct(id))
  }, [dispatch, id]);

    /* const fakeDetail = {
      id: 1001,
      name: "Afinador Digital Cromático Pinza Korg Griptune",
      brand: "Korg",
      category: "Afinadores",
      description:
        "El clip que sujeta el afinador al clavijero de la guitarra utiliza un mecanismo de pinza que puede ser colocado fácilmente. Esto te permite afinar de manera natural sin molestarte al interpretar. Puesto que el clip puede abrirse en un rango de 14-22 mm (0.55”– 0,87”), se puede fijar a una amplia variedad de instrumentos, desde guitarras eléctricas hasta guitarras clásicas.",
      image:
        "https://res.cloudinary.com/dlmr7znxt/image/upload/v1690928515/StringsAndKeys/1001_rx2ca0.jpg",
      product_status: true,
      quantity: 2000,
      price: 11.159,
    }; */

    return (
      <Box
        backgroundImage="url('/BG3.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        width="100vw"
        height="100vh"
      >
        {/* <NavBar2></NavBar2> */}
        <Container maxW={"7xl"} bg={""}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 6 }}
          >
            <Flex mt={"20%"} ml={"20%"}>
              <Image
                rounded={"md"}
                alt={"product image"}
                src={detailProduct?.image}
                align={"center"}
                maxH={"350px"}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 8 }}>
              <Box as={"header"} bg={""}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                  color={"black"}
                >
                  {detailProduct?.name}
                </Heading>
                <Text
                  color={useColorModeValue("black", "gray.400")}
                  fontWeight={"bold"}
                  fontSize={"2xl"}
                >
                  ${detailProduct?.price}
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
                  <Text fontWeight={"bold"} fontSize={"lg"} color={"black"}>
                    {detailProduct?.description}
                  </Text>
                </VStack>
                <Box>
                  <Flex>
                    <Box bg={""} w={"40%"} mt={"9%"}>
                      <Text
                        fontSize={{ base: "30px", lg: "30px" }}
                        color={useColorModeValue("black", "yellow.300")}
                        fontWeight={"bold"}
                        textTransform={"uppercase"}
                        mb={"4"}
                      >
                        Data
                      </Text>

                      <List spacing={2}>
                        {/* <ListItem>
                        <Text
                          fontSize={"20px"}
                          color={"white"}
                          as={"span"}
                          fontWeight={"500"}
                        >
                          Edad Minima: {productDetail.minimun_age}
                        </Text>
                      </ListItem> */}
                        {/* <ListItem>
                        <Text
                          fontSize={"20px"}
                          color={"white"}
                          as={"span"}
                          fontWeight={"500"}
                        >
                          Quantity: {productDetail.quantity}
                        </Text>{" "}
                      </ListItem> */}
                        <ListItem>
                          <Text
                            fontSize={"20px"}
                            color={"black"}
                            as={"span"}
                            fontWeight={"500"}
                          >
                            Marca: {detailProduct?.brand}
                          </Text>{" "}
                        </ListItem>
                        <ListItem>
                          <Text
                            fontSize={"20px"}
                            color={"black"}
                            as={"span"}
                            fontWeight={"500"}
                          >
                            Categoria: {detailProduct?.category}
                          </Text>{" "}
                        </ListItem>
                      </List>
                    </Box>
                    {/* <Box bg={""} w={"70%"}>
                      <Text
                        color={"white"}
                        fontWeight={"bold"}
                        fontSize={"30px"}
                      >
                        Reviews
                      </Text>
                      <Box
                        mt={"15px"}
                        bg={"gray.800"}
                        h={"100%"}
                        overflowY="auto"
                        maxH={"250"}
                        maxW={"370px"}
                      >
                        {!productReviews?.length ? (
                          <HStack
                            align={"center"}
                            w={"330px"}
                            h={"100px"}
                            bg={"white"}
                            m={"10px"}
                            rounded={"5px"}
                          >
                            <Box>
                              <Flex>
                                <Text
                                  color={"gray.600"}
                                  align={"center"}
                                  ml={"10px"}
                                >
                                  Lo siento, este producto aun no tiene reviews.
                                </Text>
                              </Flex>
                            </Box>
                          </HStack>
                        ) : (
                          productReviews?.map((review) => (
                            <HStack
                              key={review.product.id}
                              align={"center"}
                              w={"330px"}
                              h={"100px"}
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
                    </Box> */}
                  </Flex>
                </Box>
              </Stack>

              <Button
                //   onClick={() => addProductCarrito(productDetail)}
                rounded={"none"}
                w={"full"}
                size={"lg"}
                py={"7"}
                bg={useColorModeValue("gray.900", "gray.50")}
                color={useColorModeValue("white", "gray.900")}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
              >
                Agregar al Carrito
              </Button>
              {/* <Link to={"/"} href={"/"}>
              <Button ml={"42%"}>Volver</Button>
            </Link> */}
              {/* <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}
            >
              <MdLocalShipping color="white" />
              <Text color={"white"}>2-3 business days delivery</Text>
            </Stack> */}
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    );
};

export default Detail;