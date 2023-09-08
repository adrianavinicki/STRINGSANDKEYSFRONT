import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Flex,
  Box,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emptyActualUser } from "../redux/actions";

export const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  const usuario = useSelector((state) => state.actualUser);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(()=>{
    if(usuario.user_status === false){
      navigate("/inactive")
    };
  },[])

  function DeleteRolUser() {
    dispatch(emptyActualUser());
  }

  return (
    isAuthenticated && (
      <Box>
        <Menu>
          <MenuButton as={Flex} alignItems="center" cursor="pointer">
            <HStack spacing={2}>
              <Text fontSize={"2vh"} color={"white"}>
                {user.name}
              </Text>
              <Avatar h={"6vh"} w={"6vh"} src={user.picture} alt={user.name} />
            </HStack>
          </MenuButton>
          <MenuList bg={"#1B1B1B"} border={"none"}>
            <Link to={"/profile"}>
              <MenuItem bg={"#1B1B1B"} _hover={{ color: "#ffa200" }}>
                Mi Perfil
              </MenuItem>
            </Link>
            <Link to={"/compras"}>
              <MenuItem bg={"#1B1B1B"} _hover={{ color: "#ffa200" }}>
                Mis Compras
              </MenuItem>
            </Link>
            {/* <Link to={'/token'}>
          <MenuItem bg={'#1B1B1B'} _hover={{color:"#ffa200"}}  >MetaData</MenuItem>
          </Link> */}
            <MenuItem
              bg={"#1B1B1B"}
              _hover={{ color: "#ffa200" }}
              onClick={() => {
                DeleteRolUser();
                logout({ logoutParams: { returnTo: window.location.origin } });
              }}
            >
              Cerrar Sesión
            </MenuItem>
          </MenuList>
        </Menu>
        {usuario.length === 0 ? (
          <Link to={"/profile"}>
            <Text fontSize={"1.5vh"} color="#ffa200">
              Por favor, complete su perfil.
            </Text>
          </Link>
        ) : (
          ""
        )}
      </Box>
    )
  );
};
