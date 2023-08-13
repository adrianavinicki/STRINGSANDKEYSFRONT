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
  } from "@chakra-ui/react";
  import { useParams } from "react-router";
  import { useDispatch, useSelector } from "react-redux";
  import { useEffect } from "react";
  import { getDetailProduct } from "../redux/actions";
  import SmallWithLogoLeft from "../components/Footer";
  import WithSubnavigation from "../components/NavBar";


const Detail = () => {

  const {id} = useParams();
  const dispatch = useDispatch();

  let detailProduct = useSelector((state) => state.details);
  useEffect(()=> {
    dispatch(getDetailProduct(id))
  }, [dispatch, id]);


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
                  fontSize={{ base: "2xl", sm: "4xl", lg: "4xl" }}
                  color={"black"}
                >
                  {detailProduct.name}
                </Heading>
                <Text
                  color={useColorModeValue("black", "black")}
                  fontWeight={"bold"}
                  fontSize={"2xl"}
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
                  <Text fontWeight={"bold"} fontSize={"lg"} color={"black"}>
                    {detailProduct.description}
                  </Text>
                </VStack>
                <Box>
                  <Flex>
                    <Box bg={""} w={"40%"} mt={"1%"}>
                      <Text
                        fontSize={{ base: "30px", lg: "30px" }}
                        color={useColorModeValue("black", "black")}
                        fontWeight={"bold"}
                        textTransform={"uppercase"}
                        mb={"4"}
                      >
                        Data
                      </Text>

                      <List spacing={2}>
                        <ListItem>
                          <Text
                            fontSize={"20px"}
                            color={"black"}
                            as={"span"}
                            fontWeight={"500"}
                          >
                            Marca: {detailProduct.brand}
                          </Text>{" "}
                        </ListItem>
                        <ListItem>
                          <Text
                            fontSize={"20px"}
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

              <Button
                //   onClick={() => addProductCarrito(productDetail)}
                rounded={"none"}
                w={"full"}
                size={"lg"}
                py={"7"}
                bg={useColorModeValue("black", "black")}
                color={useColorModeValue("#ffa200", "#ffa200")}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
              >
                Agregar al Carrito
              </Button>
              <Link to={"/products"} href={"/products"}>
              <Button ml={"42%"} bg={'black'} color={'#ffa200'}>Volver</Button>
            </Link>
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