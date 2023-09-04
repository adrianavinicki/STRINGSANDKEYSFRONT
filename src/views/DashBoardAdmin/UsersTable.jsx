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
  Text,
} from "@chakra-ui/react";
import { TbArrowsExchange } from "react-icons/tb"
import SmallWithLogoLeft from "../../components/Footer";
import WithSubnavigation from "../../components/NavBar";
import { Link } from "react-router-dom";
import {
  getUsersByName,
  orderUsersAdmin,
  putRolUser,
  getAllUsers,
  putStateUser,
} from "../../redux/actions";

function UsersData() {
  const users = useSelector((state) => state.allUsers);
  //const users = usersDos.sort((a, b) => a.id - b.id);

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  //const [order, setOrder] = useState("");

  useEffect(()=>{
    return ()=> {
      dispatch(getAllUsers())
    }
  },[])

  const handleChange = (e) => {
    const value = e.target.value;
    //console.log("event", e.target.value)
    //setOrder(value);
    dispatch(orderUsersAdmin(value));
  };

  function handlerInput(e) {
    //e.preventDefaut()
    const search = e.target.value
    setName(search);
    dispatch(getUsersByName(search));
  };

  async function handleUserRol(id) {
    console.log("id", id);
    try {
      await dispatch(putRolUser(id)); // Espera a que putRolUser se complete
      await dispatch(getAllUsers());  // Espera a que getAllUsers se complete
    } catch (error) {
      console.error("Error:", error);
    };
  };

  async function handleUserStatus(id) {
    console.log("id", id);
    try {
      await dispatch(putStateUser(id)); // Espera a que putRolUser se complete
      await dispatch(getAllUsers());  // Espera a que getAllUsers se complete
    } catch (error) {
      console.error("Error:", error);
    };
  };

  /* function handleUserRol(status){
    if (!status || !status.users) {
        return;
    }
    dispatch(putRolUser(status.users.id))
}; */

  return (
    <Box>
      <Flex direction={"column"}>
      <Box bg={"#1b1b1b"} h={"10vh"}>
          <Center>
            {" "}
            <Heading color={"white"} fontSize={"4vh"}>
              Administración de usuarios
            </Heading>
          </Center>
          <Flex align={"center"} justify={"space-around"} mt={"1.5%"}>
            <Box>
              <Flex>
                <Input
                  bg={"white"}
                  color={"black"}
                  placeholder="Buscar usuario"
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
                  <option style={{ backgroundColor: "white" }}>ID</option>
                  <option style={{ backgroundColor: "white" }}>Admin</option>
                  <option style={{ backgroundColor: "white" }}>Cliente</option>
                  <option style={{ backgroundColor: "white" }}>Activos</option>
                  <option style={{ backgroundColor: "white" }}>Inactivos</option>
                </Select>
    
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
                    Id Usuario
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Nombre
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Apellido
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Email
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Celular
                  </Th>
                  {/* <Th fontSize={"1.5vh"} color={"black"}>
                    Descripcion
                  </Th> */}
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Rol
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Estado
                  </Th>
                </Tr>
              </Thead>
              {users !== undefined && users.length > 0 && (
                <Tbody>
                  {users.map((user) => (
                    <Tr h={"2"} key={user.id}>
                      <Td>
                          <span
                            style={{ color: "#ffa200", fontWeight: "bold" }}
                          >
                            {user.id}
                          </span>
                      </Td>
                      <Td>{user.first_name}</Td>
                      <Td>{user.last_name}</Td>
                      <Td>{user.email}</Td>
                      {/* <Td>{product.description.substring(0, 30)}...</Td> */}
                      <Td>{user.mobile}</Td>
                      {/* <Td><button onClick={handleUserRol(user.id)}>{user.role_id}</button></Td> */}
                      {/* <Td><button name={user.id} onClick={(e) => handleUserRol(e.target.name)}>{user.role_id}</button></Td> */}
                      <Td> <span style={{ fontWeight: "bold" }}>{user.role_id === "client" ? "Cliente" : "Admin"}</span> <Button  p={0} m={0} bg={"none"} onClick={(e) => handleUserRol(user.id)}><TbArrowsExchange color="black" size={"2.5vh"} ></TbArrowsExchange></Button></Td>
                      {/* <Td><select>
                        <option >Client</option>
                        <option>Admin</option>
                        </select></Td> */}
                      {/* <Td>{user.user_status}</Td> */}
                      <Td color={ user.user_status === true ? "green" : "red"} ><span style={{ fontWeight: "bold" }} >{user.user_status === true ? "Activo" : "Inactivo"}</span><Button  p={0} m={0} bg={"none"} onClick={(e) => handleUserStatus(user.id)}><TbArrowsExchange color="black" size={"2.5vh"} ></TbArrowsExchange></Button></Td>
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

export default UsersData;
