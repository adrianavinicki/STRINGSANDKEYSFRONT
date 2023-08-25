import React from "react";
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
import { useDispatch } from "react-redux";
import { emptyActualUser } from "../redux/actions"

export const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  const dispatch = useDispatch()


  return (
    isAuthenticated && (
      <Menu >
        <MenuButton as={Flex} alignItems="center" cursor="pointer">
          <HStack spacing={2}>
            <Text color={"white"}>{user.name}</Text>
            <Avatar src={user.picture} alt={user.name} />
          </HStack>
        </MenuButton>
        <MenuList bg={'#1B1B1B'} border={'none'} >
          <Link to={'/profile'}>
          <MenuItem bg={'#1B1B1B'} _hover={{color:"#ffa200"}}  >Mi Perfil</MenuItem>
          </Link>
          <MenuItem bg={'#1B1B1B'} _hover={{color:"#ffa200"}} >Mis Compras</MenuItem>
          <Link to={'/token'}>
          <MenuItem bg={'#1B1B1B'} _hover={{color:"#ffa200"}}  >MetaData</MenuItem>
          </Link>
          <MenuItem bg={'#1B1B1B'} _hover={{color:"#ffa200"}}
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Cerrar Sesión
          </MenuItem>
        </MenuList>
      </Menu>
    )
  );
};
