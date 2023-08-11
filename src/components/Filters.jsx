import { Box, Flex, Text } from "@chakra-ui/react";
import { filterBrand } from "../redux/actions";

import { useDispatch, useSelector } from "react-redux";

const FilterAndOrder = () => {

  const dispatch = useDispatch();  
  const filteredProducts = useSelector((state) => state.products);
  //console.log(filteredProducts);

  const brandsRaw = filteredProducts.map(el=>el.brand);
  const brands= brandsRaw.filter((item, index)=>{
    return brandsRaw.indexOf(item) === index;
  })


  console.log(brands);

  const handleBrandFilter = (e) => {
    const selectedBrand = e.target.value;

    dispatch(filterBrand(selectedBrand));
    
  };

  return (
    <Box>
      <Flex direction={'column'}>
        {brands?.map((el, index)=><Text fontSize={'10px'} key={index}>{el}</Text>)}
      </Flex>
    </Box>
  );
};

export default FilterAndOrder;
