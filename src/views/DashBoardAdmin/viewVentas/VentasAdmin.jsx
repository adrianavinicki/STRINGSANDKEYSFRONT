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

import { Link } from "react-router-dom";
import { getAllPurchases } from "../../../redux/actions";

export default function AdminVentas () {

    const products = useSelector((state) => state.currentPurchases);

    const dispatch = useDispatch();

    const [name, setName] = useState("");
  
    const [order, setOrder] = useState("");
  
    const handleChange = (e) => {
      const { value } = e.target;
      setOrder(value);
      
    };
  
    function handlerInput(e) {
      //e.preventDefaut()
      setName(e.target.value);
      
    }

    useEffect(() => {
      dispatch(getAllPurchases());
      console.log(products)
    }, [])
  
    return (
        <Box>
      <Flex direction={"column"}>
        <Box bg={"#1b1b1b"} h={"10vh"}>
          <Center>
            {" "}
            <Heading color={"white"} fontSize={"4vh"}>
              Registro De Ventas
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
            {/*<Box>
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
                
              </Flex>
                </Box>*/}
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
                    Id Compra
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Nombre Cliente
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Email
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Direccion
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Compra Total
                  </Th>
                  {/* <Th fontSize={"1.5vh"} color={"black"}>
                    Descripcion
                  </Th> */}
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Articulos
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Estado
                  </Th>
                </Tr>
              </Thead>
              {console.log(products)}
              {products !== undefined && products.length > 0 && (
                <Tbody>
                  {products.map((product) => (
                    <Tr h={"2"} key={product.id}>
                      <Td>
                          <span
                            style={{ color: "#ffa200", fontWeight: "bold" }}
                          >
                            {product.id}
                          </span>
                        
                      </Td>
                      <Td>
                        
                          {product.user?.first_name + " " + product.user?.last_name}
                  
                      </Td>
                      <Td>
                        {product.user?.email}
                      </Td>
                      <Td>
                        {product.user?.delivery_address}
                      </Td>
                      <Td>
                        ${product.totalprice}
                      </Td>
                      {/* <Td>{product.description.substring(0, 30)}...</Td> */}
                      <Td>
                        <ul>
                        {product.user?.purchase_history.map((item, index) => (
                          <li key={index}>
                          <Link to={`product/${item.productId}`}><span style={{ color: "#ffa200", fontWeight: "bold" }}> 
                            id:{item.productId}
                            </span> </Link>
                            <br />
                            cantidad: {item.quantity}, 
                             precio: {item.price}
                          </li>
                        ))}
                        </ul>
                      </Td>
                      <Td>
                       
                          {product.purchase_status === "in process" ? "en proceso" : "Pausado"}
                       
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
    )
}