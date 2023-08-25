import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Button,
  Th,
  Image,
  Heading,
  Select,
  Td,
  Center,
  Input,
  TableContainer,
  Flex,
  Box,
} from "@chakra-ui/react";
import SmallWithLogoLeft from "../../components/Footer";
import WithSubnavigation from "../../components/NavBar";
import { Link } from "react-router-dom";
import {
  getProductName,
  getProducts,
  orderProductsAdmin,
} from "../../redux/actions";

function ProductsData() {
  const products = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const [order, setOrder] = useState("");

  console.log("order", order);

  const handleChange = (e) => {
    const { value } = e.target;
    setOrder(value);
    dispatch(orderProductsAdmin(value));
  };

  function handlerInput(e) {
    //e.preventDefaut()
    setName(e.target.value);
    dispatch(getProductName(name));
  }

  return (
    <Box>
      <Flex direction={"column"}>
        <Box>
          <WithSubnavigation></WithSubnavigation>
        </Box>
        <Box bg={"black"} h={"10vh"} mt={"100px"} pt={""}>
          <Center>
            {" "}
            <Heading color={"white"} fontSize={"4vh"}>
              Modificar o Crear Producto
            </Heading>
          </Center>
          <Flex align={"center"} justify={"space-around"} mt={"1.5%"}>
            <Link to={"/admin/edit"}>
              <Button
                _hover={"none"}
                bg={"white"}
                color={"blue.900"}
                ml={"48%"}
                mt={"0.5%"}
                h={"4.5vh"}
              >
                Volver
              </Button>
            </Link>
            <Box>
              <Flex>
                <Input
                  bg={"white"}
                  color={"black"}
                  placeholder="Buscar Producto"
                  _placeholder={{ opacity: 1, color: "gray.500" }}
                  onChange={(e) => {
                    handlerInput(e);
                  }}
                  value={name}
                  fontSize="2vh"
                  h={"4.5vh"}
                ></Input>
                <Select
                  ml={"5vh"}
                  bg={"white"}
                  color={"black"}
                  h={"4.5vh"}
                  onChange={handleChange}
                >
                  <option style={{ backgroundColor: "white" }}>Ordenar</option>
                  <option style={{ backgroundColor: "white" }}>
                    Menor Stock
                  </option>
                  <option style={{ backgroundColor: "white" }}>
                    Mayor Stock
                  </option>
                  <option style={{ backgroundColor: "white" }}>Activos</option>
                  <option style={{ backgroundColor: "white" }}>Pausados</option>
                  <option style={{ backgroundColor: "white" }}>ID</option>
                </Select>
                <Link to={"/admin/edit/product/crear"}>
                  <Button
                    bg={"#ffa200"}
                    color={"black"}
                    fontSize="2vh"
                    h={"4.5vh"}
                    ml={"5vh"}
                  >
                    Crear Nuevo Producto
                  </Button>
                </Link>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box bg={"black"} h={"73vh"} overflow={"hidden"} p={"5vh"}>
          <TableContainer
            bg={"gray.200"}
            overflowY="auto"
            h="70vh"
            rounded={"5px"}
          >
            <Table color={"black"} overflowY="auto" fontSize={"1.5vh"}>
              <Thead>
                <Tr>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Id Producto
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Nombre
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Marca
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Categoria
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Precio
                  </Th>
                  {/* <Th fontSize={"1.5vh"} color={"black"}>
                    Descripcion
                  </Th> */}
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Stock
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Estado
                  </Th>
                </Tr>
              </Thead>
              {products !== undefined && products.length > 0 && (
                <Tbody>
                  {products.map((product) => (
                    <Tr h={"2"} key={product.id}>
                      <Td>
                        <Link key={product.id} to={`${product.id}`}>
                          <span
                            style={{ color: "#ffa200", fontWeight: "bold" }}
                          >
                            {product.id}
                          </span>
                        </Link>
                      </Td>
                      <Td>
                        <Link key={product.id} to={`${product.id}`}>
                          {product.name.substring(0, 30)}...
                        </Link>
                      </Td>
                      <Td><Link to={`${product.id}`}>{product.brand}</Link></Td>
                      <Td><Link to={`${product.id}`}>{product.category}</Link></Td>
                      <Td><Link to={`${product.id}`}>${product.price}</Link></Td>
                      {/* <Td>{product.description.substring(0, 30)}...</Td> */}
                      <Td><Link to={`${product.id}`}>{product.quantity}</Link></Td>
                      <Td><Link to={`${product.id}`}>{product.product_status ? "Activo" : "Pausado"}</Link></Td>
                    </Tr>
                  ))}
                </Tbody>
              )}
            </Table>
          </TableContainer>
        </Box>
        <Box marginTop="auto">
          <SmallWithLogoLeft></SmallWithLogoLeft>
        </Box>
      </Flex>
    </Box>
  );
}

export default ProductsData;
