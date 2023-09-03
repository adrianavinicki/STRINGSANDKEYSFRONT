import {
  Box,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Text,
  Heading,
  FormLabel,
  Input,
  Button,
  transition,
} from "@chakra-ui/react";
import {
  filterBrand,
  orderByPrice,
  filterCategory,
  filterPrice,
  getProducts,
  setPage,
} from "../redux/actions";
import { Link } from "react-router-dom";
import { MdGraphicEq } from "react-icons/md";
import { useState, useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { emptyStates } from "../redux/actions";



const FilterAndOrder = () => {

  const dispatch = useDispatch();
  

  //useEffect(() => {
  //
  //}, [])

  const filteredProducts = useSelector((state) => state.filteredProducts);
  
  const brandsRaw = filteredProducts.map((el) => el.brand);
  const brands = brandsRaw.filter((item, index) => {
    return brandsRaw.indexOf(item) === index;
  });

  brands.sort();

  const categoryRaw = filteredProducts.map((el) => el.category);
  const category = categoryRaw.filter((item, index) => {
    return categoryRaw.indexOf(item) === index;
  });

  category.sort();

  console.log(brands);

  const handleBrandFilter = (e) => {
    const selectedBrand = e.target.innerText;
    console.log(selectedBrand);
    dispatch(filterBrand(selectedBrand));
    dispatch(setPage(0));
  };

  const handleCategoryFilter = (e) => {
    const selectedCategory = e.target.innerText;
    dispatch(filterCategory(selectedCategory));
    dispatch(setPage(0));
  };

  const handleAllProducts = (e) => {
    dispatch(filterCategory("todos"));
    dispatch(filterBrand("todos"));
    dispatch(setPage(0));
  }

  const handlePriceFilter = () => {
    const val = sliderValue;
    const cat = firstCategory;
    const bra = firstBrand;

    if (isSingleCategory && isSingleBrand) {
      dispatch(filterPrice({ val, cat, bra }));
    } else if (isSingleCategory && !isSingleBrand) {
      dispatch(filterPrice({ val, cat }));
    } else if (!isSingleCategory && isSingleBrand) {
      dispatch(filterPrice({ val, bra }));
    } else {
      dispatch(filterPrice({ val }));
    }

    dispatch(setPage(0));
  };

  const handlePrice = (val) => {
    setSliderValue(val)

  }

  const [sliderValue, setSliderValue] = useState(150000);

  const resetInput = () => {
    dispatch(emptyStates())
    dispatch(filterCategory("todos"));
  };

  const firstCategory =
    filteredProducts.length > 0 ? filteredProducts[0].category : null;

  const isSingleCategory = filteredProducts.every(
    (product) => product.category === firstCategory
  );

  const firstBrand =
    filteredProducts.length > 0 ? filteredProducts[0].brand : null;

  const isSingleBrand = filteredProducts.every(
    (product) => product.brand === firstBrand
  );

  return (
    <Box bg={"gray.200"} w={"25vh"} color={"black"} rounded={"5px"} p={"5%"}>
      <Flex direction={"column"}>
        {filteredProducts.length === 0 ? <Text>No se encontraron productos.</Text> :
          <Text fontSize={"1.5vh"}>
            {isSingleCategory && isSingleBrand ? 
            <span>
              <Link onClick={() => handleAllProducts()} style={{color:"#ffa200"}} cursor="pointer" >Todos los Productos</Link> {">"} 
              <Link style={{color:"#ffa200"}} cursor="pointer" onClick={handleCategoryFilter} >{firstCategory}</Link> {">"} 
              <Link style={{color:"#ffa200"}} cursor="pointer" >{firstBrand}</Link>
            </span> :
              isSingleCategory ? <span>
              <Link onClick={() => handleAllProducts()} style={{color:"#ffa200"}} cursor="pointer" >Todos los Productos</Link> {">"} 
              <Link style={{color:"#ffa200"}} cursor="pointer" >{firstCategory}</Link> {">"} 
            </span> :
                <span>
                <Link onClick={() => handleAllProducts()} style={{color:"#ffa200"}} cursor="pointer" >Todos los Productos</Link> {">"} 
              </span>}
          </Text>}
        <Box>
          <Flex direction={"column"}>
            {isSingleCategory ? (
              <Box h={"35vh"}>
                <Text fontWeight={"bold"} fontSize={"3vh"}>
                  Marcas:
                </Text>
                {brands?.map((el, index) => (
                  <Text
                    key={index}
                    onClick={handleBrandFilter}
                    cursor="pointer"
                    fontSize={"1.8vh"}
                    _hover={{ transform: "translateY(-2px)", transition: "0.3s" }}
                  >
                    {el}
                  </Text>
                ))}
              </Box>
            ) : (
              <Box h={"38vh"}>
                <Text fontWeight={"bold"} fontSize={"3vh"}>
                  Categorias:
                </Text>
                {category?.map((el, index) => (
                  <Text
                    key={index}
                    onClick={handleCategoryFilter}
                    cursor="pointer"
                    fontSize={"2vh"}
                    _hover={{ transform: "translateY(-2px)", transition: "0.3s" }}
                  >
                    {el}
                  </Text>
                ))}
              </Box>
            )}
          </Flex>
        </Box>
        <br />
        <Box>
          <Flex>
            <Heading w={'70%'} fontSize={"3.5vh"}>$ {sliderValue}</Heading>
            <Button
              w={'24%'}
              h={'6vh'}
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
              bg={"black"}
              color={"black"}
              name="name"
              onClick={handlePriceFilter}
            >
              {<SearchIcon color="#ffa200" />}
            </Button>
          </Flex>
        </Box>
        <Box bg={""} h={"4vh"} w={"90%"} mt={"7%"}>
          <Flex>
            <Slider
              aria-label="slider-ex-4"
              onChange={(val) => handlePrice(val)}
              min={0}
              max={350000}
            >
              <SliderTrack bg="black">
                <SliderFilledTrack bg="#ffa200" />
              </SliderTrack>
              <SliderThumb boxSize={5}>
                <Box color="#ffa200" as={MdGraphicEq} />
              </SliderThumb>
            </Slider>
          </Flex>
        </Box>
        <Box>
          <Flex direction={"column"} justify={"center"} mb={"20%"}>
            {/* <select onChange={(e) => dispatch(orderByPrice(e.target.value))}>
              {["Ascendente", "Descendente"].map((e, i) => (
                <option value={e} key={i}>
                  {e}
                </option>
              ))}
            </select> */}
            <Button
              h={"5vh"}
              bg={"#ffa200"}
              color={"black"}
              onClick={() => dispatch(orderByPrice("Ascendente"))}
            >
              Menor precio
            </Button>
            <br></br>
            <Button
              h={"5vh"}
              bg={"#ffa200"}
              color={"black"}
              onClick={() => dispatch(orderByPrice("Descendente"))}
            >
              Mayor precio
            </Button>
            <br />
            <Button
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
              bg={"black"}
              h={"5vh"}
              color={"#ffa200"}
              name="reset"
              onClick={() => {
                resetInput();
              }}

            ><Link to="/products" >Limpiar Filtros</Link>
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default FilterAndOrder;
