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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function PurchaseCards(props) {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      h={"15vh"}
      bg="rgba(0, 0, 0, 0.8)"
      m={'1vh'}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={props.image}
        alt="Imagen de Producto"
      />

    <Stack bg={''} w={'85%'} ml={'2vh'}>
      <CardBody>
        <Flex direction="row" align="center" justify="space-between">
          <Box>
            <Heading fontSize="2.3vh">{props.name}</Heading>
            <Text fontSize="2vh">${props.price}</Text>
          </Box>
          <Box >
            <Button variant="solid" color="#ffa200" bg={'#1b1b1b'}>
              Puntuar
            </Button>
            <Link to={`/detail/${props.id}`}>
            <Button ml="2vh" variant="solid" color="#ffa200" bg={'#1b1b1b'}>
              Ver Producto
            </Button>
            </Link>
          </Box>
        </Flex>
      </CardBody>
    </Stack>
    </Card>
  );
}
