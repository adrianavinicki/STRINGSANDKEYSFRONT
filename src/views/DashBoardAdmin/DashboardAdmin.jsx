"use client";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FcBarChart,
  FcTwoSmartphones,
  FcDonate,
  FcPaid,
  FcManager,
} from "react-icons/fc";
import SmallWithLogoLeft from "../../components/Footer";
import WithSubnavigation from "../../components/NavBar";
import { Link } from "react-router-dom";

const Card = ({ heading, description, icon, href }) => {
  return (
    <Box
      h={'25vh'}
      w={"30vh"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={'2vh'}
      bg="rgba(0, 0, 0, 0.7)"
    >
      <Stack align={"center"} spacing={'1vh'}>
        <Flex
          w={'7vh'}
          h={'7vh'}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={'#1b1b1b'}
        >
          {icon}
        </Flex>
        <Box mt={'1vh'}>
          <Heading color={"#ffa200"} fontSize={'2.5vh'}>
            {heading}
          </Heading>
          <Text color={"white"} mt={'1vh'} fontSize={"2vh"}>
            {description}
          </Text>
        </Box>
        {/* <Button variant={"link"} color={"#ffa200"} size={"sm"}>
          Learn more
        </Button> */}
      </Stack>
    </Box>
  );
};

export default function gridListWith() {
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
          h={"83vh"}
          mt={"100px"}
          pt={"2vh"}
          overflow={"hidden"}
        >
          <Box p={'2vh'} >
            <Stack spacing={'2vh'} as={Container} maxW={"3xl"} textAlign={"center"}>
              <Heading
                color={"black"}
                fontSize={'4vh'}
                fontWeight={"bold"}
              >
                Panel de Administración
              </Heading>
              <Text color={"gray.700"} fontSize={'2.2vh'}>
              Panel de Administración de Strings And Keys: Gestiona Productos, Usuarios, Ventas, Estadísticas y Promociones
              </Text>
            </Stack>

            <Container maxW={"60%"} mt={'3vh'}>
              <Flex flexWrap="wrap" gridGap={'3vh'} justify="center" >
                <Link to={'/admin/edit/product'}>
                  <Card
                    heading={"Productos"}
                    icon={<Icon as={FcPaid} w={'5vh'} h={'5vh'} />}
                    description={
                      "Agrega, modifica y supervisa tu inventario de manera eficiente."
                    }
                    href={"#"}
                  />
                </Link>
                <Link to={'/admin/edit/users'}>
                  <Card
                    heading={"Usuarios"}
                    icon={<Icon as={FcManager} w={'5vh'} h={'5vh'} />}
                    description={
                      "Agrega, modifica y supervisa tus clientes de manera eficiente."
                    }
                    href={"#"}
                  />
                </Link>
                <Link>
                  <Card
                    heading={"Ventas"}
                    icon={<Icon as={FcDonate} w={'5vh'} h={'5vh'} />}
                    description={
                      "Controla y modifica tus ventas y ordenes de manera eficiente."
                    }
                    href={"#"}
                  />
                </Link>
                <Link>
                  <Card
                    heading={"Promociones"}
                    icon={<Icon as={FcTwoSmartphones} w={'5vh'} h={'5vh'} />}
                    description={
                      "Agrega, modifica y supervisa tus promociones de manera eficiente."
                    }
                    href={"#"}
                  />
                </Link>
                <Link>
                  <Card
                    heading={"Estadisticas"}
                    icon={<Icon as={FcBarChart} w={'5vh'} h={'5vh'} />}
                    description={
                      "Observa y Analiza las estadisticas de tu negocio de forma eficiente."
                    }
                    href={"#"}
                  />
                </Link>
              </Flex>
            </Container>
          </Box>
        </Box>
        <Box>
          <SmallWithLogoLeft></SmallWithLogoLeft>
        </Box>
      </Flex>
    </Box>
  );
}
