import { useEffect, useMemo, useState } from "react";
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
import  generate  from "./excelGenerator";
import { saveAs } from "file-saver";

export default function AdminVentas() {
  const purchases = useSelector((state) => state.currentPurchases);

  const products = purchases.filter(
    (purchase) => purchase.purchase_status === "success"
  );

  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [filters, setFilters] = useState({
      cliente: "",
      estado: "",
      price: "",
      ID: "",
    })

    // Estado para el temporizador de debouncing
  const [debounceTimer, setDebounceTimer] = useState(null);
    
  
    const [order, setOrder] = useState("");
  
  const filtrarVentas = useMemo(() => {
    return products.filter((venta) => {
      const clienteMatch = !filters.cliente || venta.user.first_name.toLowerCase().includes(filters.cliente.toLowerCase()) || venta.user.last_name.toLowerCase().includes(filters.cliente.toLowerCase());

      const priceFilter = !filters.price || venta.totalprice >= filters.price;

      const filterID = !filters.ID || venta.user.id === filters.ID;

      return clienteMatch && priceFilter && filterID;

    })
  }, [products, filters])
    
  const [excelData, setExcelData] = useState(null);
    

  const handlePrice = (e) => {
    const { value } = e.target;

    const numericValue = parseFloat(value);

    setPrice(value);
    setFilters(preValue => ({...preValue, price: numericValue}));
  };

  function handlerInput(e) {
    //e.preventDefaut()
    const {value} = e.target;
    const valorID = parseFloat(value)
    if(!isNaN(valorID || value === "")){
      setFilters(preValue => ({...preValue, ID: value === '' ? '' : valorID}));
      setName(value)
    } else {
      setFilters(preValue => ({...preValue, cliente: value}));
      setName(value)
    }
    
    //setName(value);
  }

  const handleDownloadExcel = () => {

    const excelBlob = generate(filtrarVentas);
   // const wb = new Blob([excelBlob], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    // Utiliza saveAs para realizar la descarga
    saveAs(excelBlob, 'data.xlsx');
  }

  useEffect(() => {
    dispatch(getAllPurchases());
    console.log(filtrarVentas);
  }, []);



  return (
    <Box>
      {console.log(filtrarVentas)}
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
            <Box>
              <Flex >
                <Input
                  bg={"white"}
                  color={"black"}
                  placeholder="Buscar Usuario"
                  _placeholder={{ opacity: 1, color: "gray.500" }}
                  onChange={(e) => {
                    handlerInput(e);
                  }}
                  value={name}
                  fontSize="2vh"
                  h={"4.5vh"}
                ></Input>

                  <Input
                  bg={"white"}
                  color={"black"}
                  placeholder="Precio Minimo"
                  _placeholder={{ opacity: 1, color: "gray.500" }}
                  type="number"
                  onChange={(e) => {
                    handlePrice(e);
                  }}
                  value={filters.price}
                  fontSize="2vh"
                  h={"4.5vh"}
                  ml={"3"}
                ></Input>
                <Button onClick={handleDownloadExcel}
                ml="2"  
                bg="rgb(204, 130, 0)"
                px={"12"} 
                _hover={{ bg: "teal.500" }}
                >descargar</Button>
                
                
              </Flex>
                </Box>
          </Flex>
        </Box>
        <Box bg={"#1b1b1b"} h={"73vh"} p={"5vh"}>
          <TableContainer
            bg={"gray.200"}
            overflowY="auto"
            overflowX="auto"
            h="70vh"
            rounded={"5px"}
          >
            <Table
              color={"black"}
              overflowY="auto"
              overflowX="auto"
              fontSize={"1.5vh"}
            >
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
              {filtrarVentas !== undefined && filtrarVentas.length > 0 && (
                <Tbody>
                  {filtrarVentas.map((product) => (
                    <Tr h={"2"} key={product.id}>
                      <Td>
                        <span style={{ color: "#ffa200", fontWeight: "bold" }}>
                          {product.userId}
                        </span>
                      </Td>
                      <Td>
                        {product.user?.first_name +
                          " " +
                          product.user?.last_name}
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

                      <Td>{product.payment?.purchase_date}</Td>

                      <Td>
                        <ul>
                          {product.orderdetails.map((item, index) => (
                            <li key={index}>
                              {item.product?.name.length > 20
                                ? item.product?.name.slice(0, 20) + "..."
                                : item.product?.name}
                            </li>
                          ))}
                        </ul>
                      </Td>
                      <Td>
                        <ul>
                          {product.orderdetails.map((item, index) => (
                            <li key={index}>{item.quantity}</li>
                          ))}
                        </ul>
                      </Td>

                      <Td>
                        <ul>
                          {product.orderdetails.map((item, index) => (
                            <li key={index}>
                              {parseFloat(item.price).toLocaleString("es-AR", {
                                style: "currency",
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
                              <Link to={`product/${item.product?.id}`}>
                                <span
                                  style={{
                                    color: "#ffa200",
                                    fontWeight: "bold",
                                  }}
                                >
                                  id:{item.product?.id}
                                </span>{" "}
                              </Link>
                              <br />
                              {/* cantidad: {item.quantity}, 
                             precio: {item.price}*/}
                            </li>
                          ))}
                        </ul>
                      </Td>

                      <Td>
                        {product.purchase_status === "success"
                          ? "Aprobado"
                          : product.purchase_status === "in process"
                          ? "en proceso"
                          : "Pausado"}
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
}
