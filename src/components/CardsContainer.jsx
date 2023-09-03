import ProductSimple from "../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Flex, Heading, Image, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import {Link} from "react-router-dom";
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
  const totalPages = filteredProducts? Math.ceil(filteredProducts.length / productPerPage) : Math.ceil(allproducts.length / productPerPage);

  const displayedProducts = filteredProducts? filteredProducts.slice(
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
        <Flex justify={'center'} color={useColorModeValue('black', "white")}>
          <div>
            <button onClick={handlePrevious} disabled={filteredPage === 0}>
              ←
            </button>
            <button>
              Pagina {filteredPage + 1} de {totalPages}
            </button>
            <button
              onClick={handleNext}
              disabled={filteredPage === totalPages - 1}
            >
              →
            </button>
          </div>
        </Flex>
      </Box>
      <Box>
        <Flex>
          <SimpleGrid columns={4} bg={""} w={"100%"} h={"100%"}>
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
                <Box
                  mt={'10vh'}
                  p={'10px'}           
                >
                  <Alert
                    status="success"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px"
                    borderRadius='10px'
                  >
                    <Search2Icon boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                      Sin Resultados!
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                      No hay productos que coincidan con tu busqueda.
                    </AlertDescription>
                  </Alert>
                </Box>
              )
            }
          </SimpleGrid>
        </Flex>
      </Box>
    </Box>
  );
};

export default CardsContainer;
