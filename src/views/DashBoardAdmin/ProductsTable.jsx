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
  Icon,
  Heading,
  Select,
  Td,
  Center,
  Input,
  TableContainer,
  Flex,
  Box,
} from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import {
  getProductName,
  getProducts,
  orderProductsAdmin,
} from "../../redux/actions";

const ProductsData = () => {
  const products = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const [order, setOrder] = useState("");

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

  useEffect(()=>{
    dispatch(getProducts());
  },[]);

  return (
    <Box>
      <Flex direction={"column"}>
        <Box bg={"#1b1b1b"} h={"10vh"}>
          <Center>
            {" "}
            <Heading color={"white"} fontSize={"4vh"}>
              Modificar o Crear Producto
            </Heading>
          </Center>
          <Flex align={"center"} justify={"space-around"} mt={"1.5%"}>
            {/* <Link to={"/admin/edit"}>
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
            </Link> */}
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
                  <option style={{ backgroundColor: "white" }}>Menor Stock</option>
                  <option style={{ backgroundColor: "white" }}>Mayor Stock</option>
                  <option style={{ backgroundColor: "white" }}>Menor Precio</option>
                  <option style={{ backgroundColor: "white" }}>Mayor Precio</option>
                  <option style={{ backgroundColor: "white" }}>Activos</option>
                  <option style={{ backgroundColor: "white" }}>Pausados</option>
                  <option style={{ backgroundColor: "white" }}>ID</option>
                </Select>
                <Link to={"/admin/product/crear"}>
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
        <Box bg={"#1b1b1b"} h={"73vh"} overflow={"hidden"} p={"5vh"}>
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
                        <Link key={product.id} to={`product/${product.id}`}>
                          <span
                            style={{ color: "#ffa200", fontWeight: "bold" }}
                          >
                            {product.id}
                          </span>
                          <Icon ml={'1vh'} boxSize={'2vh'} as={EditIcon} />
                        </Link>
                      </Td>
                      <Td>
                        <Link key={product.id} to={`product/${product.id}`}>
                          {product.name.substring(0, 30)}...
                        </Link>
                      </Td>
                      <Td>
                        <Link to={`product/${product.id}`}>{product.brand}</Link>
                      </Td>
                      <Td>
                        <Link to={`product/${product.id}`}>{product.category}</Link>
                      </Td>
                      <Td>
                        <Link to={`product/${product.id}`}>${product.price}</Link>
                      </Td>
                      {/* <Td>{product.description.substring(0, 30)}...</Td> */}
                      <Td>
                        <Link to={`product/${product.id}`}>{product.quantity}</Link>
                      </Td>
                      <Td>
                        <Link to={`product/${product.id}`}>
                          {product.product_status ? "Activo" : "Pausado"}
                        </Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              )}
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductsData;
