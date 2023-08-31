"use client";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Image,
  Drawer,
  DrawerContent,
  useDisclosure,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiShoppingBag,
  FiStar,
  FiBox,
  FiMenu,
  FiAperture,
  FiDollarSign,
  FiBell,
  FiUsers,
  FiChevronDown,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import ProductsData from "./ProductsTable";
import StatsCharts from "./StatsChart";
import BasicStatistics from "./Resumen";
import AdminVentas from "./viewVentas/VentasAdmin";


const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [adminView, setAdminView] = useState("Resumen");

  const handleProduct = () => {
    setAdminView("Products");
    console.log(adminView, "adminView");
  };
  const handleUser = () => {
    setAdminView("User");
    console.log(adminView, "adminView");
  };
  const handleResume = () => {
    setAdminView("Resumen");
    console.log(adminView, "adminView");
  };
  const handleStats = () => {
    setAdminView("Stats");
    console.log(adminView, "adminView");
  };
  const handleSales = () => {
    setAdminView("Sales");
    console.log(adminView, "adminView");
  };
  const handlePromotions = () => {
    setAdminView("Promotions");
    console.log(adminView, "adminView");
  };

  useEffect(() => {
    console.log(adminView, "adminView, del Use Effect");
     
  }, [adminView]); // Este efecto se ejecutará cuando adminView cambie

  const SidebarContent = ({ onClose, ...rest }) => {
    return (
      <Box
        transition="2s ease"
        bg={"black"}
        borderRight="1px"
        borderRightColor={"#ffa200"}
        w={"250px"}
        pos="fixed"
        h="full"
        p={"2vh"}
        {...rest}
      >
        <Flex direction={"column"} align={"center"} mb={"3vh"}>
          <Image boxSize={"40%"} src="/Logo White.png"></Image>
        </Flex>
        <Link to={"/"}>
          <NavItem
            h={"5vh"}
            key={"Inicio"}
            icon={FiHome}
            _hover={{ bg: "#1b1b1b" }}
            color={'white'}
          >
            Inicio
          </NavItem>
        </Link>
        <NavItem
          h={"5vh"}
          key={"Resumen"}
          icon={FiAperture}
          onClick={handleResume}
          bg={adminView === "Resumen" ? "#ffa200" : ""}
          color={adminView === "Resumen" ? "black" : "white"}
          _hover={adminView === "Resumen" ? "" : { bg: "#1b1b1b" }}
        >
          Resumen
        </NavItem>
        <NavItem
          h={"5vh"}
          key={"Productos"}
          icon={FiBox}
          onClick={handleProduct}
          bg={adminView === "Products" ? "#ffa200" : ""}
          color={adminView === "Products" ? "black" : "white"}
          _hover={adminView === "Products" ? "" : { bg: "#1b1b1b" }}
        >
          Productos
        </NavItem>
        <NavItem
          h={"5vh"}
          key={"Usuarios"}
          icon={FiUsers}
          onClick={handleUser}
          bg={adminView === "User" ? "#ffa200" : ""}
          color={adminView === "User" ? "black" : "white"}
          _hover={adminView === "User" ? "" : { bg: "#1b1b1b" }}
        >
          Usuarios
        </NavItem>
        <NavItem
          h={"5vh"}
          key={"Ventas"}
          icon={FiDollarSign}
          onClick={handleSales}
          bg={adminView === "Sales" ? "#ffa200" : ""}
          color={adminView === "Sales" ? "black" : "white"}
          _hover={adminView === "Sales" ? "" : { bg: "#1b1b1b" }}
        >
          Ventas
        </NavItem>
        <NavItem
          h={"5vh"}
          key="Estadisticas"
          icon={FiTrendingUp}
          onClick={handleStats}
          bg={adminView === "Stats" ? "#ffa200" : ""}
          color={adminView === "Stats" ? "black" : "white"}
          _hover={adminView === "Stats" ? "" : { bg: "#1b1b1b" }}
        >
          Estadisticas
        </NavItem>
        <NavItem
          h={"5vh"}
          key={"Promociones"}
          icon={FiShoppingBag}
          onClick={handlePromotions}
          bg={adminView === "Promotions" ? "#ffa200" : ""}
          color={adminView === "Promotions" ? "black" : "white"}
          _hover={adminView === "Promotions" ? "" : { bg: "#1b1b1b" }}
        >
          Promociones
        </NavItem>
      </Box>
    );
  };

  const NavItem = ({ icon, children, ...rest }) => {
    return (
      <Box
        href="#"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "#ffa200",
            color: "black",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    );
  };

  const MobileNav = ({ onOpen, ...rest }) => {
    const { user } = useAuth0();

    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="10vh"
        alignItems="center"
        bg={"black"}
        borderBottomWidth="1px"
        borderBottomColor={"#ffa200"}
        justifyContent={"space-between"}
        {...rest}
      >
        <Heading color={"white"} fontSize={"3.5vh"}>
          Panel de Administrador
        </Heading>
        <HStack spacing={{ base: "0", md: "6" }}>
          <IconButton
            color={'white'}
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar size={"sm"} src={user?.image} />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text color={'white'} fontSize="sm">{user?.name}</Text>
                    <Text fontSize="xs" color="gray.400">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList bg={"#1B1B1B"} border={"1px solid #ffa200"}>
                <Link to={"/profile"}>
                  <MenuItem bg={"#1B1B1B"} color={'white'} _hover={{ color: "#ffa200" }}>
                    Mi Perfil
                  </MenuItem>
                </Link>
                <Link to={"/compras"}>
                  <MenuItem bg={"#1B1B1B"} color={'white'} _hover={{ color: "#ffa200" }}>
                    Mis Compras
                  </MenuItem>
                </Link>
                <MenuItem
                  color={'white'}
                  bg={"#1B1B1B"}
                  _hover={{ color: "#ffa200" }}
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Cerrar Sesión
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    );
  };

  return (
    <Box minH="100vh" bg={"#1b1b1b"}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>
        {/* Content */}
        {adminView === "Resumen" ? (
          <BasicStatistics></BasicStatistics>
        ) : adminView === "Promotions" ? (
          <>
            <Heading color={'white'} p={"5vh"}>Aca va componente para Promociones</Heading>
          </>
        ) : adminView === "User" ? (
          <>
            <Heading color={'white'} p={"5vh"}>Aca va componente para Usuarios</Heading>
          </>
        ) : adminView === "Sales" ? (
          <>
           {/* <Heading p={"5vh"}>Aca va componente para Ventas</Heading>*/}
           <AdminVentas/>
          </>
        ) : adminView === "Stats" ? (
          <>
            <StatsCharts/>
          </>
        ) : (
          <ProductsData />
        )}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
