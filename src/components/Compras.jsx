import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Box,
  Button,
  Image,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Rating from "./Rating";
import { useSelector } from "react-redux";
import axios from "axios";

const VITE_LOCAL_HOST = import.meta.env.VITE_LOCAL_HOST;

export default function PurchaseCards(props) {
  //console.log(props)
  let user = useSelector((state) => state.actualUser);

  const [isOpen, setIsOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");

  // Manejador para el clic en una estrella de calificación
  const handleRatingClick = (value) => {
    setRatingValue(value);
    //setIsOpen(false); // Cerrar el popover después de hacer clic en una estrella
  };

  // Manejador para el cambio de comentario
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const toast = useToast();
  const createRating = async (data) => {
    try {
      //await axios.post(`http://localhost:3010/rating/create`,data)//viteAlert
      await axios.post(`${VITE_LOCAL_HOST}/rating/create`, data);
      toast({
        title: "Listo!",
        description: "Has puntuado el producto",
        status: "success",
        duration: 9000,
        isClosable: true,
        // onClose: ()=> {window.location.reload()},
      });
    } catch (error) {
      toast({
        title: "error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsOpen(false);
      setRatingValue(0);
      setComment("");
    }
  };

  const clearStates = () => {
    setIsOpen(false);
    setRatingValue(0);
    setComment("");
    toast({
      title: "Error",
      position: "top",
      description: "Lo siento, pero ya has puntuado este producto",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const submitHandler = async (e) => {
    const data = {
      rate: ratingValue,
      review: comment,
      productId: props.id,
      userId: user.id,
    };
    const ratings = await axios.get(
      `${VITE_LOCAL_HOST}/rating/user/${user.id}`
    );
    const alreadyRated = ratings.data.filter((el) => el.productId === props.id);
    Boolean(alreadyRated.length) ? clearStates() : createRating(data);
  };
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      // overflow="hidden"
      variant="outline"
      h={"15vh"}
      bg="rgba(0, 0, 0, 0.8)"
      m={"1vh"}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={props.image}
        alt="Imagen de Producto"
      />

      <Stack bg={""} w={"85%"} ml={"2vh"}>
        <CardBody>
          <Flex direction="row" align="center" justify="space-between">
            <Box w={"70%"}>
              <Text color={"white"} fontSize="2vh">
                {props.date}
              </Text>
              <Heading color={"white"} fontSize="2.3vh">
                {props.name}
              </Heading>
              <Text color={"#ffa200"} fontSize={"2vh"} fontWeight={"bold"}>
                Marca:{" "}
                <span style={{ color: "white", fontSize: "2vh", fontWeight: 'normal' }}>
                  {props?.brand}
                </span>
              </Text>
              <Text color={"white"} fontSize="2vh">
                ${props.price}
              </Text>
            </Box>
            {/* <Box> */}
            <Popover
              bg={"green"}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <PopoverTrigger>
                {/* Contenido visible del PopoverTrigger */}
                <Button
                  onClick={() => setIsOpen(true)}
                  variant="solid"
                  color="#ffa200"
                  bg={"#1b1b1b"}
                >
                  Puntuar
                </Button>
              </PopoverTrigger>
              <PopoverContent bg={"#1b1b1b"}>
                <PopoverCloseButton />
                <PopoverHeader color={"white"}>
                  Puntua este producto
                </PopoverHeader>
                <PopoverBody>
                  <Flex justifyContent="center">
                    <Rating
                      ratingValue={ratingValue}
                      handleRatingClick={handleRatingClick}
                    />
                  </Flex>
                  <Input
                    placeholder="Tu comentario..."
                    value={comment}
                    onChange={handleCommentChange}
                    focusBorderColor="#ffa200"
                    mt={4}
                    color={"white"}
                  />
                  <Button
                    bg="#ffa200"
                    color={"black"}
                    mt={4}
                    onClick={submitHandler}
                  >
                    Guardar
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            {/* <Link to={`/detail/${props.id}`}>
                <Button ml="2vh" variant="solid" color="#ffa200" bg={"#1b1b1b"}>
                  Ver Producto
                </Button>
              </Link> */}
            {/* </Box> */}
          </Flex>
        </CardBody>
      </Stack>
    </Card>
  );
}
