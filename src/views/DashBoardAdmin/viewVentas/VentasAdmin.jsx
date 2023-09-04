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

    const purchases = useSelector((state) => state.currentPurchases);

    const products = purchases.filter( purchase => purchase.purchase_status === "success")

    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
      cliente: "",
      estado: "todos",
    })

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
                    ID Cliente
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Nombre Cliente
                  </Th>
                  {/*<Th fontSize={"1.5vh"} color={"black"}>
                    Email
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Direccion
              </Th>*/}
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Compra Total
                  </Th>

                  <Th fontSize={"1.5vh"} color={"black"}>
                    Fecha Compra
                  </Th>

                   <Th fontSize={"1.5vh"} color={"black"}>
                    Detalles Articulos
                  </Th> 
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Cantidad
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Precio Unitario
                  </Th> 
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Articulos ID
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
                          <span
                            style={{ color: "#ffa200", fontWeight: "bold" }}
                          >
                            {product.userId}
                          </span>
                        
                      </Td>
                      <Td>
                        
                          {product.user?.first_name + " " + product.user?.last_name}
                  
                      </Td>
                     {/* <Td>
                        {product.user?.email}
                      </Td>
                      <Td>
                        {product.user?.delivery_address}
                  </Td>*/}
                      <Td>
                        {parseFloat(product.totalprice).toLocaleString("es-AR", {
                                  style: 'currency',
                                  currency: "ARS",
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                  useGrouping: true,
                                })}
                      </Td>

                      <Td>
                        {product.payment?.purchase_date}
                      </Td>

                       <Td>
                        <ul>
                        {product.orderdetails.map((item, index) =>(
                          <li key={index}>
                            {item.product?.name}
                          </li>
                        ))}
                        </ul>
                        </Td> 
                        <Td>
                          <ul>
                        {product.orderdetails.map((item, index) =>(
                          <li key={index}>
                            {item.quantity}
                          </li>
                        ))}
                        </ul>
                        </Td>

                        <Td>
                          <ul>
                            {product.orderdetails.map((item, index) => (
                              <li key={index}>
                                {parseFloat(item.price).toLocaleString("es-AR", {
                                  style: 'currency',
                                  currency: "ARS",
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                  useGrouping: true,
                                })}
                               
                              </li>
                            ))}
                          </ul>
                        </Td>

                      <Td>
                        <ul>
                        {product.orderdetails.map((item, index) => (
                          <li key={index}>
                          <Link to={`product/${item.product?.id}`}><span style={{ color: "#ffa200", fontWeight: "bold" }}> 
                            id:{item.product?.id}
                            </span> </Link>
                            <br />
                           {/* cantidad: {item.quantity}, 
                             precio: {item.price}*/}
                          </li>
                        ))}
                        </ul>
                      </Td>
                      
                      <Td>
                       
                          {product.purchase_status === "success"? "Aprobado" :product.purchase_status === "in process" ? "en proceso" :  "Pausado"}
                       
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