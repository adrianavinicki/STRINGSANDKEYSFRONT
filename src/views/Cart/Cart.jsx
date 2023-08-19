import {
    Box,
    Flex,
    Heading,
    HStack,
    Text,
    Button,
    /*Link,*/
    Stack,
    useColorModeValue as mode,
  } from "@chakra-ui/react";
  import {Link} from "react-router-dom";
  import {
    removeProductFromCart,
    decreaseProductQuantity,
    increaseProductQuantity,
    emptyCart,
  } from "../../redux/actions";

  import { useSelector, useDispatch } from "react-redux";
  import { CartItem } from "./CartItem";
  import { CartOrderSummary } from "./CartOrderSummary";
  /*import { CartItem } from "./Cartitem";

//   import { cartData } from './_data'
import NavBar2 from "../../components/NavBar2"; */

  export default function Cart () {

    const dispatch = useDispatch();
    const productsToBuy = useSelector((state) => state.cartItems);

    const totalCantidad = productsToBuy.reduce((acumulador, producto) => {
        return acumulador + producto.quantity;
      }, 0);

      const handleRemoveProduct = (productId) => {
        dispatch(removeProductFromCart(productId));
      };
    
      const handleDecreaseQuantity = (productId) => {
        dispatch(decreaseProductQuantity(productId));
      };
    
      const handleIncreaseQuantity = (productId) => {
        dispatch(increaseProductQuantity(productId));
      };
    
      const handleEmptyCart = (event) => {
        dispatch(emptyCart());
      };

      return (
        <Box
        backgroundImage="url('/bg.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        width="100vw"
        height="100vh"
        >
        
            <Box
            margin={"70px"}
            padding={"30px"}
            rounded={"20px"}
            h={"60%"}
            >
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
                        <Flex justify={'space-between'}>
                            <Heading fontSize="2xl" fontWeight="extrabold">
                            {totalCantidad} Productos
                            </Heading>
                            <Button _hover={'none'} bg={'gray.800'} color={'white'} onClick={handleEmptyCart}>Vaciar Carrito</Button>
                        </Flex>
                    </Box>

                    <Box overflowY="auto" maxHeight="400px">
              {productsToBuy.length === 0 ? (
                <Text>el carrito esta vacio.</Text>
              ) : (
                <Stack spacing="6">
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

                    <Flex direction="column" align="center" flex="1" marginTop={"30px"}>
                        <CartOrderSummary />
                        <HStack mt="6" fontWeight="semibold">
                        <p>ó</p>
                        <Link to="/" color={mode("blue.500", "blue.200")}>
                            seguir comprando
                        </Link>
                        </HStack>
                    </Flex>

                </Stack>

            </Box>

        </Box>
      )
  }