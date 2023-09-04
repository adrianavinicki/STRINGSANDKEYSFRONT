import {
  Flex,
  Container,
  Heading,
  Stack,
  Center,
  Button,
  useColorModeValue,
  Box,
  Alert,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import SmallWithLogoLeft from "../components/Footer";
import WithSubnavigation from "../components/NavBar";
import PurchaseCards from "../components/Compras";
import { useDispatch, useSelector } from "react-redux";
import { Search2Icon } from "@chakra-ui/icons";

export default function MisCompras() {
  const products = useSelector((state) => state.products);

  const purchaseHistoryRaw = useSelector(state=>state.actualUser.purchase_history);
  //const purchaseHistoryRaw = [];
  let purchaseHistory = [];

  purchaseHistoryRaw?.map((el) => {
    const pre = products.find((p) => p.id === el.productId);
    const post = { ...pre, date: el.date };
    purchaseHistory.push(post);
  });

  purchaseHistory.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));

  //console.log(purchaseHistory);

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
          <Flex direction={"column"} align={"center"}>
            <Heading color={useColorModeValue('black', 'white')}>Mis Compras</Heading>
            <Box
              h={"65vh"}
              w={"90%"}
              bg="rgba(0, 0, 0, 0.8)"
              rounded={"5px"}
              mt={"5vh"}
              overflowY="auto"
            >
              {purchaseHistory?.length ? (
                purchaseHistory?.map((product, index) => {
                  return (
                    <PurchaseCards
                      key={index}
                      id={product.id}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      date={product.date}
                      brand={product.brand}
                    ></PurchaseCards>
                  );
                })
              ) : (
                <Box bg={''} display="flex" gridColumn={3} gridRow={2} justifyContent={'center'} mt={'10%'}>
                  <Flex justify={'center'}>
                    <Alert
                      status="success"
                      variant="subtle"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                      height="200px"
                      borderRadius="10px"
                    >
                      <Search2Icon boxSize="40px" mr={0} />
                      <AlertTitle mt={4} mb={1} fontSize="lg">
                        Sin resultados!
                      </AlertTitle>
                      <AlertDescription maxWidth="sm">
                        Lo siento aun no has comprado ningun producto.
                      </AlertDescription>
                    </Alert>
                  </Flex>
                </Box>
              )}
            </Box>
          </Flex>
        </Box>
        <Box marginTop="auto">
          <SmallWithLogoLeft></SmallWithLogoLeft>
        </Box>
      </Flex>
    </Box>
  );
}
