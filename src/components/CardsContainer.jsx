import ProductSimple from "../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Flex, Heading, Image, SimpleGrid, useColorModeValue, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
//import {setPage} from "../redux/actions"

//alert//
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { setPage } from "../redux/actions";

//alert//

const CardsContainer = () => {

  const dispatch = useDispatch();

  const allproducts = useSelector((state) => state.products);
  const filteredProducts = useSelector((state) => state.filteredProducts)
  const filteredPage = useSelector((state) => state.currentPage)

  const [currentPage, setCurrentPage] = useState(0);
  const productPerPage = 8;
  const totalPages = filteredProducts ? Math.ceil(filteredProducts.length / productPerPage) : Math.ceil(allproducts.length / productPerPage);

  const displayedProducts = filteredProducts ? filteredProducts.slice(
    filteredPage * productPerPage,
    (filteredPage + 1) * productPerPage
  ) :
    allproducts.slice(
      filteredPage * productPerPage,
      (filteredPage + 1) * productPerPage
    );

  const handleNext = () => {
    if (filteredPage < totalPages - 1) {
      dispatch(setPage(filteredPage + 1));
    }
  };

  const handlePrevious = () => {
    if (filteredPage > 0) {
      dispatch(setPage(filteredPage - 1));
    }
  };

  return (
    <Box>
      <Box>
        <Flex
          justify="center"
          color={useColorModeValue('black', 'white')}
          alignItems="center"
        >
          <Button
            width={5}
            height={5}
            backgroundColor={"black"}
            onClick={handlePrevious}
            disabled={filteredPage === 0}
            _hover={{
              transform: 'translateY(-2px)', // Aumenta el tamaño al pasar el mouse
              cursor: 'pointer', // Cambia el cursor al puntero al pasar el mouse sobre el botón
            }}
          >
            ←
          </Button>
          <Text>
            Página {filteredPage + 1} de {totalPages}
          </Text>
          <Button
            width={5}
            height={5}
            backgroundColor={"black"}
            onClick={handleNext}
            disabled={filteredPage === totalPages - 1}
            _hover={{
              transform: 'translateY(-2px)', // Aumenta el tamaño al pasar el mouse
              cursor: 'pointer', // Cambia el cursor al puntero al pasar el mouse sobre el botón
            }}
          >
            →
          </Button>
        </Flex>
      </Box>

      <Box>
        <Flex>
          <SimpleGrid columns={4} bg={""} w={"100%"} h={"100%"} >
            {
              displayedProducts?.length ? (
                displayedProducts.map((product) => {
                  return (
                    <ProductSimple
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      name={product.name}
                      brand={product.brand}
                      price={product.price}
                      productoInfo={product}
                    />
                  );
                })
              ) : (
                <>
                  {/* Espacio en blanco para la primera columna */}
                  <Box gridColumn="1" />
                  {/* Alert centrado en las columnas 2 y 3 */}
                  <Box gridColumn="span 2" mt={'15vh'}>
                    <Alert
                      status="success"
                      variant="subtle"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                      borderRadius="10px"
                    >
                      <Search2Icon color={useColorModeValue("black", "white")} boxSize="5vh" mr={0} />
                      <AlertTitle color={useColorModeValue("black", "white")} mt={4} mb={1} fontSize="3.5vh">
                        Sin Resultados!
                      </AlertTitle>
                      <AlertDescription color={useColorModeValue("black", "white")} maxWidth="sm" fontSize="2vh">
                        No hay productos que coincidan con tu búsqueda.
                      </AlertDescription>
                    </Alert>
                  </Box>
                  {/* Espacio en blanco para la cuarta columna */}
                  <Box gridColumn="span 1" />
                </>
              )
            }
          </SimpleGrid>
        </Flex>
      </Box>
    </Box>
  );
};

export default CardsContainer;
