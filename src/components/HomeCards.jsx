import {
  Box,
  SimpleGrid,
  Text,
  Image,
  Flex,
  Heading,
  textDecoration,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { filterCategory } from "../redux/actions";
import { Link } from "react-router-dom";

export default function CategoryCards() {
  const dispatch = useDispatch();

  const handleCategoryFilter = (e) => {
    const selectedCategory = e.target.value;
    dispatch(filterCategory(selectedCategory));
  };

  return (
    <Box h={"90vh"} w={"90%"} bg={""}>
      <Flex direction={"column"}>
        <SimpleGrid columns={5} row={2} spacing={20}>
          <Box _hover={{transform: 'scale(1.01)',}} bg="black" rounded={"10px"} align={"center"} overflow={"hidden"}>
            <Text
              mt={"15px"}
              h={"45px"}
              color={"#ffa200"}
              fontSize={"2vh"}
              fontWeight={"700"}
            >
              Afinadores
            </Text>
            <Link
              to={"/products"}
              key={"Afinadores"}
              value={"Afinadores"}
              onClick={(e) => {
                handleCategoryFilter({ target: { value: "Afinadores" } });
              }}
            >
              <Image src="https://res.cloudinary.com/dlmr7znxt/image/upload/v1690928515/StringsAndKeys/1001_rx2ca0.jpg"></Image>
            </Link>
          </Box>
          <Box _hover={{transform: 'scale(1.01)',}} bg="black" rounded={"10px"} align={"center"} overflow={"hidden"}>
            <Text
              mt={"15px"}
              h={"45px"}
              color={"#ffa200"}
              fontSize={"2vh"}
              fontWeight={"700"}
            >
              Correas
            </Text>
            <Link
              to={"/products"}
              key={"Correas"}
              value={"Correas"}
              onClick={(e) => {
                handleCategoryFilter({ target: { value: "Correas" } });
              }}
            >
              <Image src="https://res.cloudinary.com/dlmr7znxt/image/upload/v1690928515/StringsAndKeys/1005_piq59k.jpg"></Image>
            </Link>
          </Box>
          <Box _hover={{transform: 'scale(1.01)',}} bg="black" rounded={"10px"} align={"center"} overflow={"hidden"}>
            <Text
              mt={"15px"}
              h={"45px"}
              color={"#ffa200"}
              fontSize={"2vh"}
              fontWeight={"700"}
            >
              Fundas
            </Text>
            <Link
              to={"/products"}
              key={"Fundas"}
              value={"Fundas"}
              onClick={(e) => {
                handleCategoryFilter({ target: { value: "Fundas" } });
              }}
            >
              <Image src="https://res.cloudinary.com/dlmr7znxt/image/upload/v1690928515/StringsAndKeys/1011_hynib2.jpg"></Image>
            </Link>
          </Box>
          <Box _hover={{transform: 'scale(1.01)',}} bg="black" rounded={"10px"} align={"center"} overflow={"hidden"}>
            <Text
              mt={"15px"}
              h={"45px"}
              color={"#ffa200"}
              fontSize={"2vh"}
              fontWeight={"700"}
            >
              Púas
            </Text>
            <Link
              to={"/products"}
              key={"Púas"}
              value={"Púas"}
              onClick={(e) => {
                handleCategoryFilter({ target: { value: "Púas" } });
              }}
            >
              <Image src="https://res.cloudinary.com/dlmr7znxt/image/upload/v1690928516/StringsAndKeys/1013_w6vdpp.jpg"></Image>
            </Link>
          </Box>
          <Box _hover={{transform: 'scale(1.01)',}} bg="black" rounded={"10px"} align={"center"} overflow={"hidden"}>
            <Text
              mt={"15px"}
              h={"45px"}
              color={"#ffa200"}
              fontSize={"2vh"}
              fontWeight={"700"}
            >
              Cables
            </Text>
            <Link
              to={"/products"}
              key={"Cables"}
              value={"Cables"}
              onClick={(e) => {
                handleCategoryFilter({ target: { value: "Cables" } });
              }}
            >
              <Image src="https://res.cloudinary.com/dlmr7znxt/image/upload/v1690928516/StringsAndKeys/1016_sbqdew.jpg"></Image>
            </Link>
          </Box>
          <Box _hover={{transform: 'scale(1.01)',}} bg="black" rounded={"10px"} align={"center"} overflow={"hidden"}>
            <Text
              mt={"15px"}
              h={"45px"}
              color={"#ffa200"}
              fontSize={"2vh"}
              fontWeight={"700"}
            >
              Teclados
            </Text>
            <Link
              to={"/products"}
              key={"Teclados"}
              value={"Teclados"}
              onClick={(e) => {
                handleCategoryFilter({ target: { value: "Teclados" } });
              }}
            >
              <Image src="https://res.cloudinary.com/dlmr7znxt/image/upload/v1690928517/StringsAndKeys/1021_kodwap.jpg"></Image>
            </Link>
          </Box>
          <Box _hover={{transform: 'scale(1.01)',}} bg="black" rounded={"10px"} align={"center"} overflow={"hidden"}>
            <Text
              color={"#ffa200"}
              fontSize={"2vh"}
              fontWeight={"700"}
              mt={"15px"}
              h={"45px"}
            >
              Instrumentos de Cuerda
            </Text>
            <Link
              to={"/products"}
              key={"Instrumentos de Cuerda"}
              value={"Instrumentos de Cuerda"}
              onClick={(e) => {
                handleCategoryFilter({
                  target: { value: "Instrumentos de Cuerda" },
                });
              }}
            >
              <Image src="https://res.cloudinary.com/dlmr7znxt/image/upload/v1690928517/StringsAndKeys/1026_wht8zz.jpg"></Image>
            </Link>
          </Box>
          <Box _hover={{transform: 'scale(1.01)',}} bg="black" rounded={"10px"} align={"center"} overflow={"hidden"}>
            <Text
              color={"#ffa200"}
              fontSize={"2vh"}
              fontWeight={"700"}
              mt={"15px"}
              h={"45px"}
            >
              Instrumentos de Viento
            </Text>
            <Link
              to={"/products"}
              key={"Instrumentos de Viento"}
              value={"Instrumentos de Viento"}
              onClick={(e) => {
                handleCategoryFilter({
                  target: { value: "Instrumentos de Viento" },
                });
              }}
            >
              <Image src="https://res.cloudinary.com/dlmr7znxt/image/upload/v1690928519/StringsAndKeys/1043_roo9gt.jpg"></Image>
            </Link>
          </Box>
          <Box _hover={{transform: 'scale(1.01)',}} bg="black" rounded={"10px"} align={"center"} overflow={"hidden"}>
            <Text
              mt={"15px"}
              h={"45px"}
              color={"#ffa200"}
              fontSize={"2vh"}
              fontWeight={"700"}
            >
              Amplificadores
            </Text>
            <Link
              to={"/products"}
              key={"Amplificadores"}
              value={"Amplificadores"}
              onClick={(e) => {
                handleCategoryFilter({ target: { value: "Amplificadores" } });
              }}
            >
              <Image src="https://res.cloudinary.com/dlmr7znxt/image/upload/v1690928520/StringsAndKeys/1049_qfmpgg.jpg"></Image>
            </Link>
          </Box>
          <Box _hover={{transform: 'scale(1.01)',}} bg="black" rounded={"10px"} align={"center"} overflow={"hidden"}>
            <Text
              mt={"15px"}
              h={"45px"}
              color={"#ffa200"}
              fontSize={"2vh"}
              fontWeight={"700"}
            >
              Baterías y Percusión
            </Text>
            <Link
              to={"/products"}
              key={"Baterías y Percusión"}
              value={"Baterías y Percusión"}
              onClick={(e) => {
                handleCategoryFilter({
                  target: { value: "Baterías y Percusión" },
                });
              }}
            >
              <Image src="https://res.cloudinary.com/dlmr7znxt/image/upload/v1690928520/StringsAndKeys/1052_dvhx0o.jpg"></Image>
            </Link>
          </Box>
        </SimpleGrid>
        <Box>
          <Flex direction={"column"} align={"center"}>
            <Box>
              <Flex direction={'column'} align={'center'} >
                <Link
                _hover={{transform: 'scale(1.03)',}}
                  to={"/products"}
                  key={"todos"}
                  value={"todos"}
                  onClick={(e) => {
                    handleCategoryFilter({ target: { value: "todos" } });
                  }}
                >
                  <Image src="/all.png"></Image>
                </Link>
                <Image boxSize={'50%'} objectFit="cover" src="/ads.png"></Image>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
