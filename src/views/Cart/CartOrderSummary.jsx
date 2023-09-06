import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "./PriceTag";
import { useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getOrdersIDArray } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const VITE_LOCAL_HOST = import.meta.env.VITE_LOCAL_HOST;

const OrderSummaryItem = (props) => {
  const { label, value, children } = props;

  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={"white"}>
        {label}
      </Text>
      {value ? (
        <Text color={"white"} fontWeight="medium">
          {value}
        </Text>
      ) : (
        children
      )}
    </Flex>
  );
};

export const CartOrderSummary = () => {
  //const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idCliente = useSelector((state) => state.actualUser);
  const toast = useToast();

  const { user, isAuthenticated } = useAuth0();

  const productsToBuy = useSelector((state) => state.cartItems);

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      toast({
        title: "No has iniciado sesión",
        description:
          "Por favor, inicia sesión y completa tus datos para continuar",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (idCliente.length === 0) {
      toast({
        title: "Completa Tus Datos",
        description:
          "Por favor, completa los datos en tu perfil para continuar con la compra",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    } // aqui agregar un else if si el usuario esta registrado o no en la base de datos
    try {
      const orders = productsToBuy.map((item) => {
        return {
          quantity: item.quantity,
          productId: item.id,
          userId: idCliente.id,
          //userId: 1,
        };
      });
      try {
        const orderCreated = await axios.post(
          `${VITE_LOCAL_HOST}/orders/create`,
          orders
        );
        console.log(orderCreated);
        console.log(orderCreated.data.Orders);
        dispatch(getOrdersIDArray(orderCreated.data.Orders));
        navigate("/payment");
      } catch (orderError) {
        console.log("Error al crear la orden:", orderError);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = productsToBuy.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Stack spacing="1vh" borderWidth="1px" rounded="lg" padding="5%" width="full">
      <Heading color={"white"} fontSize="4vh">
        Suma de los productos
      </Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={formatPrice(totalPrice)} />
        <Flex justify="space-between">
          <Text color={"white"} fontSize="3vh" fontWeight="semibold">
            Total
          </Text>
          <Text color={"white"} fontSize="3vh" fontWeight="extrabold">
            {formatPrice(totalPrice)}
          </Text>
        </Flex>
      </Stack>
      <Link to="#">
        <Button
          type="submit"
          onClick={handleSubmit}
          color="#ffa200"
          bg={"black"}
          h={'5vh'}
          fontSize="2vh"
          rightIcon={<FaArrowRight />}
        >
          Comprar
        </Button>
      </Link>
    </Stack>
  );
};
