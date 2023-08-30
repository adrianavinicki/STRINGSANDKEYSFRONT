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
import { TbArrowsExchange } from "react-icons/tb"
import SmallWithLogoLeft from "../../components/Footer";
import WithSubnavigation from "../../components/NavBar";
import { Link } from "react-router-dom";
import {
  getUsersByName,
  orderUsersAdmin,
  putRolUser,
  getAllUsers,
} from "../../redux/actions";

function UsersData() {
  const users = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const [order, setOrder] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setOrder(value);
    dispatch(orderUsersAdmin(value));
  };

  function handlerInput(e) {
    //e.preventDefaut()
    const search = e.target.value
    setName(search);
    dispatch(getUsersByName(name));
  };

  function handleUserRol(id){
    console.log("id", id)
    dispatch(putRolUser(id))
    //dispatch(getAllUsers())
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
        <Box>
          <WithSubnavigation></WithSubnavigation>
        </Box>
        <Box bg={"black"} h={"10vh"} mt={"100px"} pt={""}>
          <Center>
            {" "}
            <Heading color={"white"} fontSize={"4vh"}>
              Administración de usuarios
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
                  <option style={{ backgroundColor: "white" }}>Nombre</option>
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
                    Role Id
                  </Th>
                  <Th fontSize={"1.5vh"} color={"black"}>
                    Estado de usuario
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
                      <Td>{user.role_id} <button onClick={(e) => handleUserRol(user.id)}><TbArrowsExchange size={"3vh"} ></TbArrowsExchange></button></Td>
                      {/* <Td>{user.user_status}</Td> */}
                      <Td>{user.user_status ? "Activo" : "Inactivo"}</Td>
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

export default UsersData;
