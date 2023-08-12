import ProductSimple from "../components/Card";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Flex, Heading, Image, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CardsContainer = () => {
  const allproducts = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(0);
  const productPerPage = 10;
  const totalPages = Math.ceil(allproducts.length / productPerPage);

  const displayedProducts = allproducts.slice(
    currentPage * productPerPage,
    (currentPage + 1) * productPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Box>
      <Box>
        <Flex justify={'center'}>
          <div>
            <button onClick={handlePrevious} disabled={currentPage === 0}>
              ←
            </button>
            <button>
              Page {currentPage + 1} of {totalPages}
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
            >
              →
            </button>
          </div>
        </Flex>
      </Box>
      <Box>
        <Flex>
          <SimpleGrid columns={5} bg={""} w={"100%"} h={"100%"}>
            {displayedProducts.length > 0 &&
              displayedProducts.map((product) => {
                return (
                  <Link to={`/detail/${product.id}`}>
                  <ProductSimple
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    brand={product.brand}
                    price={product.price}
                  />
                  </Link>
                );
              })}
          </SimpleGrid>
        </Flex>
      </Box>
    </Box>
  );
};

export default CardsContainer;
