"use client";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Link,
  Collapse,
  Icon,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import SearchBar from "../components/SearchBar";
import { FaShoppingCart } from "react-icons/fa";

export default function WithSubnavigation() {

  return (
    <Box>
      <Flex
        bg={useColorModeValue("black", "black")}
        color={useColorModeValue("white", "white")}
        minH={"60px"}
        h={"100px"}
        w={"100%"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.900", "gray.900")}
        align={"center"}
        position="fixed"
        zIndex={10}
      >
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          ml={10}
        >
          <Box boxSize={"70px"} mb={"1%"}>
            <Link href={"/"}>
              <Image src="/Logo White.png"></Image>
            </Link>
          </Box>
          <Box ml={'3%'} bg={''} w={'90%'}>
            <Flex align={'center'} mt={'2%'}>
              <Box ><DesktopNav/></Box>
              <Box ml={'5vh'}><SearchBar /></Box>
            </Flex>
          </Box>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={10}
          mr={"2%"}
        >
          <Link href="/cart">
            <FaShoppingCart size={'5vh'} color="#ffa200" />
          </Link>
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"#"}
          >
            Registrarse
          </Button>
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"black"}
            bg={"#ffa200"}
            href={"#"}
            _hover={{
              bg: "",
            }}
          >
            Iniciar Sesion
          </Button>
        </Stack>
      </Flex>

    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.200", "gray.200");
  const linkHoverColor = useColorModeValue("#ffa200", "#ffa200");
  const popoverContentBgColor = useColorModeValue("black", "black");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"2vh"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("gray.900", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "#ffa200" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"#ffa200"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};


const NAV_ITEMS = [
  {
    label: "Admin",
    children: [
      {
        label: "Modificar o Crear Producto",
        subLabel: "Editar, Eliminar o Crear Producto",
        href: "/admin/edit",
      },
      {
        label: "Estadisticas",
        subLabel: "Ventas, Usarios y Estadisticas",
        href: "#",
      },
    ],
  },
  {
    label: "Perfil",
    children: [
      {
        label: "Mis Datos",
        subLabel: "Informacion del Usuario",
        href: "#",
      },
      {
        label: "Mis Favoritos",
        subLabel: "Instrumentos Favoritos del Usuario",
        href: "#",
      },
    ],
  },
  {
    label: "Nosotros",
    href: "#",
  },
  {
    label: "Inicio",
    href: "/",
  },
];
