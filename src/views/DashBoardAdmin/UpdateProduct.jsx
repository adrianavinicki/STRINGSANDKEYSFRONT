import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import ProductProfileEdit from "../../components/UpdateProduct"
import SmallWithLogoLeft from "../../components/Footer";
import WithSubnavigation from "../../components/NavBar";


const Update = () => {
    return(
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
        mt={"100px"}
        pt={"2vh"}
        overflow={"hidden"}
        >
        <ProductProfileEdit></ProductProfileEdit>
        </Box>
        <Box marginTop="auto">
          <SmallWithLogoLeft></SmallWithLogoLeft>
        </Box>
      </Flex>
    </Box>
    )
}



export default Update;