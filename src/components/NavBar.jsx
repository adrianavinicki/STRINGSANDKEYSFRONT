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
  const { isOpen, onToggle } = useDisclosure();

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
      >
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          ml={10}
        >
          <Box boxSize={"70px"} mb={"1%"}>
            <Link href={"/"}>
              <Image src="Logo White.png"></Image>
            </Link>
          </Box>
          <Box ml={'3%'}>
            <Flex align={'center'} mt={'3%'}>
              <Box ><DesktopNav/></Box>
              <Box><SearchBar /></Box>
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
          <Link>
            <FaShoppingCart size={40} color="#ffa200" />
          </Link>
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"#"}
          >
            Registrate
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
            Inicia Sesion
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
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
                fontSize={"sm"}
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

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("gray.800", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
          color: { color: "#ffa200" },
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.200", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.700", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Admin",
    children: [
      {
        label: "Modificar o Crear Producto",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "Estadisticas",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Mi Cuenta",
    children: [
      {
        label: "Mis Datos",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Mis Favoritos",
        subLabel: "An exclusive list for contract work",
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
