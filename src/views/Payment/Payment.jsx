import {
  Button,
  Flex,
  Heading,
  Image,
  HStack,
  Center,
  Avatar,
  SimpleGrid,
  Icon,
  VStack,
  useColorModeValue,
  Box,
  Text,
} from "@chakra-ui/react";

import { SiMercadopago } from "react-icons/si";
import WithSubnavigation from "../../components/NavBar";
import SmallWithLogoLeft from "../../components/Footer";
import { CheckIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useNavigate, Link } from "react-router-dom";
import { emptyCart, emptyOrdersId } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { BuyButtonNotification } from "../../components/BuyButtonNotification";

const apiUrl = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY; //ya esta actualizada
const VITE_LOCAL_HOST = import.meta.env.VITE_LOCAL_HOST;

initMercadoPago(apiUrl);

//global state

export default function Payment(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderIdsArray = useSelector((state) => state.ordersUsersID);
  const detailCarrito = useSelector((state) => state.cartItems);
  const users = useSelector((state) => state.users);
  const idUser = useSelector((state) => state.idUser);
  const idCliente = useSelector((state) => state.actualUser);

  const { user } = useAuth0();

  const totalPrice = detailCarrito.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  //sacar ordersIds y el userId
  //const [finalOrder, setFinalOrder] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  //const [activateButton, setActivateButton] = useState(false);

  // console.log(orderIdsArray[0].userId, "hola")

  const handleOrder = async () => {
    //esto se podria hacer con un useEffect
    const purchaseArray = orderIdsArray[0];
    //const userId = idUser; // ojo recordar arreglar con lo de user de martin ver si no hay que hardcodear
    const userId = idCliente.id;
    const purchaseID = await axios.post(`${VITE_LOCAL_HOST}/purchases/create`, {
      orderIds: purchaseArray,
      userId: userId,
    });

    const finalPurchaseOrder = purchaseID.data.purchase;
    //setFinalOrder(purchaseID.data.purchase);

    const response = await axios.post(`${VITE_LOCAL_HOST}/payments/generate`, {
      purchaseId: finalPurchaseOrder.id,
      cart: detailCarrito,
    });

    console.log(response.data.init_point, "2");
    setPreferenceId(response.data.init_point);
    window.location.href = response.data.init_point;
    dispatch(emptyCart());
    //dispatch(BuyButtonNotification(user, detailCarrito));
    //dispatch(emptyCart());
  };

  const handleClick = async () => {
    dispatch(emptyOrdersId());
  };

  // const handlePayment = async () => {
  //   //aqui se mandaria la data a mercado pago

  //   //IMPORTANTE, una vez dado el OK de la orden, antes de mandar se borra el array de ids y carrito para que no haya duplicados, zaqui se borra el carrito
  //   console.log(finalOrder);
  //   const response = await axios.post(
  //     `${VITE_LOCAL_HOST}/payments/generate`,
  //     { purchaseId: finalOrder.id, cart: detailCarrito }
  //   );

  //   console.log(response.data.init_point);
  //   setPreferenceId(response.data.init_point);
  //   window.location.href = response.data.init_point;
  //   dispatch(emptyCart())
  //   //navigate(response.data.init_point)
  // };

  return (
    <Box>
      <Flex direction={"column"}>
        <Box>
          <WithSubnavigation></WithSubnavigation>
        </Box>
        <Box
          backgroundImage={useColorModeValue(
            "url('/bg.jpg')",
            "url('/bgdark.jpg')"
          )}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          w={"100%"}
          h={"83vh"}
          mt={"10vh"}
          pt={"5vh"}
          overflow={"hidden"}
        >
          <Flex>
            <Box bg={""} w={"50%"} h={"70vh"} ml={"24%"} rounded="lg">
              <Flex>
                <Box
                  bg="rgba(0, 0, 0, 0.7)"
                  w={"70%"}
                  h={"70vh"}
                  p={"3vh"}
                  roundedLeft="lg"
                >
                  <Flex direction={"column"}>
                    <Text color={"white"}>Por favor revisa tu pedido:</Text>
                    <br />
                    <SimpleGrid columns={1} overflow={'hidden'} overflowY="auto" bg={""} h={'55vh'}>
                      {detailCarrito.map((product, index) => (
                        <HStack
                          key={index}
                          align={"center"}
                          bg={"gray.200"}
                          margin={"10px"}
                          rounded={"5px"}
                          
                        >
                          <Box color={"#ffa200"} px={2}>
                            <Icon as={CheckIcon} />
                          </Box>
                          {/* <VStack align={"start"}>
                            <Text color={'black'} fontSize={'2.5vh'} fontWeight={600}>Nombre: {product.name}</Text>
                            <Text color={'black'} fontSize={'2.5vh'} fontWeight={600}>
                              Precio: ${product.price}
                            </Text>
                            <Text color={"gray.600"} fontSize={'2.5vh'}>
                              Cantidad: {product.quantity}
                            </Text>
                          </VStack> */}
                          <VStack align={"start"}>
                            <Text fontWeight={600} fontSize={'2vh'} color={'black'}>{product.name}</Text>
                            <Text fontSize={'2vh'} color={"gray.600"}>
                              Cantidad: {product.quantity}
                            </Text>
                            <Text color={'black'} fontSize={'2vh'} fontWeight={600}>
                              Precio: ${product.price}
                            </Text>
                          </VStack>
                          <Box>
                            <Center>
                              <Avatar size="xl" src={product.image}></Avatar>
                            </Center>
                          </Box>
                        </HStack>
                      ))}
                    </SimpleGrid>
                  </Flex>
                </Box>

                <Box
                  bg={"black"}
                  h={"70vh"}
                  w={"30%"}
                  pt={"10%"}
                  roundedRight={"5px"}
                >
                  <Flex direction={"column"} align={"center"}>
                    <Image src="/Logo White.png" h={"13vh"} alt="Wonder Toys" />
                    <br />
                    <Heading color={"#ffa200"} fontSize={"3vh"}>
                      Total: ${totalPrice}
                    </Heading>
                    <br />
                    <Box>
                      <br />

                      <Button
                        onClick={handleOrder}
                        leftIcon={<SiMercadopago color="black" size="2.5em" />}
                        color="black"
                        w={"120px"}
                        bg="#ffa200"
                        _hover={"none"}
                        isDisabled={""}
                      >
                        Pago
                      </Button>

                      <br />
                      <br />

                      <Link to="/cart">
                        <Button
                          onClick={handleClick}
                          color={"white"}
                          _hover={"none"}
                          w={"120px"}
                          bg={"#1B1B1B"}
                        >
                          Volver
                        </Button>
                      </Link>

                      {/*<div id="wallet_container">
 {preferenceId ? <Wallet initialization={{ preferenceId: preferenceId }} />: null} 
</div>*/}
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box>
          <SmallWithLogoLeft></SmallWithLogoLeft>
        </Box>
      </Flex>
    </Box>
  );
}
