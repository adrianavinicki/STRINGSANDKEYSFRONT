import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Button,
  Th,
  useToast,
  Icon,
  Heading,
  Select,
  Td,
  Center,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  TableContainer,
  Flex,
  Box,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { TbArrowsExchange } from "react-icons/tb"
import {
  getProductName,
  getProducts,
  orderProductsAdmin,
  filterCategory,
  putProduct,
  putStatusProduct,
  getProductNameAdmin,
} from "../../redux/actions";

const ProductsData = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const toast = useToast();


  
  //const [order, setOrder] = useState("");
  
  const handleChange = (e) => {
    const { value } = e.target;
    //setOrder(value);
    if (value === "Todos") {
      setName("");
    }
    dispatch(orderProductsAdmin(value));
  };
  
  function handlerInput(e) {
    //e.preventDefaut()
    const search = e.target.value;
    setName(search);
    dispatch(getProductNameAdmin(search));
  }

  // async function handleProductStatus(id){
  //   await dispatch(putStatusProduct(id))
  //   await dispatch(getProducts());
  //   await dispatch(filterCategory("todos"));
  // }

  async function handleProductStatus(id){
    await dispatch(putStatusProduct(id));
    await dispatch(getProducts())
    toast({
      title: "Listo!",
      description: "Has modificado el estado del producto",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  }

  // const [update, setUpdate] = useState("")

  // const handlePopoverChange = (e) => {
  //   //const priceInput = e.target.value;
  //   setUpdate(e.target.value);
  // }

  // const handleSubmit = (event) => {
  //   dispatch(putProduct(update))
  // }

  useEffect(() => {
    dispatch(getProducts());
    //dispatch(filterCategory("todos"));
    return () => {
      dispatch(getProducts());
    };
  }, []);

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
                  <option style={{ backgroundColor: "white" }}>Todos</option>
                  <option style={{ backgroundColor: "white" }}>
                    Menor Stock
                  </option>
                  <option style={{ backgroundColor: "white" }}>
                    Mayor Stock
                  </option>
                  <option style={{ backgroundColor: "white" }}>
                    Menor Precio
                  </option>
                  <option style={{ backgroundColor: "white" }}>
                    Mayor Precio
                  </option>
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
        <Box bg={"#1b1b1b"} h={"73vh"} p={"5vh"}>
          <TableContainer
            bg={"gray.200"}
            overflowY="auto"
            h="70vh"
            rounded={"5px"}
            overflowX="auto"
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
                          <Icon ml={"1vh"} boxSize={"2vh"} as={EditIcon} />
                        </Link>
                      </Td>
                      <Td>
                        <Link key={product.id} to={`product/${product.id}`}>
                          {product.name.substring(0, 30)}...
                        </Link>
                      </Td>
                      <Td>
                        <Link to={`product/${product.id}`}>
                          {product.brand}
                        </Link>
                      </Td>
                      <Td>
                        <Link to={`product/${product.id}`}>
                          {product.category}
                        </Link>
                      </Td>
                      <Td>
                      <Link to={`product/${product.id}`}>
                          {product.price}
                        </Link>
                        {/* <Popover>
                          <PopoverTrigger>
                            <Button fontSize={"2vh"} color={"black"}>
                              {product.price}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            w={"30vh"}
                            minW={"150px"}
                            bg={"#1b1b1b"}
                          >
                            <PopoverArrow bg={"#ffa200"} color={"#ffa200"} />
                            <PopoverCloseButton color={"white"} />
                            <PopoverHeader fontSize={"2vh"} color={"white"}>
                              Modificar Precio
                            </PopoverHeader>
                            <PopoverBody display={'flex'}>
                              <Box>
                                {" "}
                                <Input
                                  color={"white"}
                                  focusBorderColor="#ffa200"
                                  borderColor={"#ffa200"}
                                  w={"15vh"}
                                  h={"5vh"}
                                  onChange={handlePopoverChange}
                                  // value={update.name}
                                  // name="price"
                                  //value={update}
                                  // onChange={(e) => {
                                  //   handlePopoverChange(e);
                                  // }}
                                ></Input>
                              </Box>
                                <Button
                                  w={"8vh"}
                                  h={"5vh"}
                                  _hover={"none"}
                                  bg="#ffa200"
                                  color={"black"}
                                  ml={"2vh"}
                                  fontSize={"2vh"}
                                  onClick={handleSubmit}
                                >
                                  Guardar
                                </Button>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover> */}
                      </Td>
                      <Td>
                        <Link to={`product/${product.id}`}>
                          {product.quantity}
                        </Link>
                      </Td>
                      <Td
                        color={
                          product.product_status === true ? "green" : "red"
                        }
                        fontWeight={"bold"}
                      >
                          {product.product_status ? "Activo" : "Pausado"}
                          <Button  p={0} m={0} bg={"none"} onClick={(e) => handleProductStatus(product.id)}><TbArrowsExchange color="black" size={"2.5vh"} ></TbArrowsExchange></Button>
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
