import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  Button,
  /*Link,*/
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import {
  removeProductFromCart,
  decreaseProductQuantity,
  increaseProductQuantity,
  filterCategory,
  filterBrand,
  emptyCart,
  setPage,
} from "../../redux/actions";
import SmallWithLogoLeft from "../../components/Footer";
import WithSubnavigation from "../../components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { CartItem } from "./CartItem";
import { CartOrderSummary } from "./CartOrderSummary";
import { useEffect } from "react";
/*import { CartItem } from "./Cartitem";

//   import { cartData } from './_data'
import NavBar2 from "../../components/NavBar2"; */

export default function Cart() {
  const dispatch = useDispatch();
  const productsToBuy = useSelector((state) => state.cartItems);

  const totalCantidad = productsToBuy.reduce((acumulador, producto) => {
    return acumulador + producto.quantity;
  }, 0);

  const usuarioActual = useSelector((state)=> state.actualUser)
  const navigate = useNavigate();

  useEffect(()=>{
    if(usuarioActual.user_status === false){
      navigate("/inactive")
    };
  },[])

  const handleAllProducts = (e) => {
    dispatch(filterCategory("todos"));
    dispatch(filterBrand("todos"));
    dispatch(setPage(0));
  };

  const handleEmptyCart = (event) => {
    dispatch(emptyCart());
  };

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
      <Box margin={"3%"} padding={"3%"} rounded={"20px"} h={"60vh"} bg="rgba(0, 0, 0, 0.7)" overflow={'hidden'}>
        <Stack
          direction={{
            base: "column",
            lg: "row",
          }}
          align={{
            lg: "flex-start",
          }}
          spacing={{
            base: "8",
            md: "16",
          }}
        >
          <Stack
            spacing={{
              base: "8",
              md: "10",
            }}
            flex="2"
          >
            <Box>
              <Flex justify={"space-between"}>
                <Heading color={'white'} fontSize="2xl" fontWeight="extrabold">
                  {totalCantidad} Productos
                </Heading>
                <Button
                  _hover={"none"}
                  bg={"#1B1B1B"}
                  color={"white"}
                  onClick={handleEmptyCart}
                >
                  Vaciar Carrito
                </Button>
              </Flex>
            </Box>

            <Box overflowY="auto" maxHeight="40vh">
              {productsToBuy?.length === 0 ? (
                <Text color={'white'}>El carrito esta vacio.</Text>
              ) : (
                <Stack spacing="4">
                  {productsToBuy.map(
                    (
                      item //cartData.map
                    ) => (
                      <CartItem key={item.id} {...item} />
                    )
                  )}
                </Stack>
              )}
            </Box>
          </Stack>

          <Flex direction="column" align="center" flex="1" marginTop={"1%"}>
            <CartOrderSummary />
            <HStack mt="1vh" fontWeight="semibold">
              <Text color={'white'}>ó</Text>
              <Link onClick={handleAllProducts} to="/products">
                <Text color={'white'}>seguir comprando</Text>
              </Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
    </Box>
        <Box>
          <SmallWithLogoLeft></SmallWithLogoLeft>
        </Box>
      </Flex>
    </Box>
  );
};