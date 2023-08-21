"use client";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
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
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import { Profile } from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";


export default function WithSubnavigation() {
  const { isAuthenticated } = useAuth0();

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
            <Link to={"/"}>
              <Image src="/Logo White.png"></Image>
            </Link>
          </Box>
          <Box ml={"3%"} bg={""} w={"90%"}>
            <Flex align={"center"} mt={"2%"}>
              <Box>
                <DesktopNav />
              </Box>
              <Box ml={"5vh"}>
                <SearchBar />
              </Box>
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
          <Link to="/cart">
            <FaShoppingCart size={"5vh"} color="#ffa200" />
          </Link>
          {isAuthenticated ? (
            <>
              <Profile></Profile>
            </>
          ) : (
            <LoginButton></LoginButton>
          )}
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
              <Link to={navItem.to}>
              <Box
                as="a"
                p={2}
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
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Admin",
    to: "/admin/edit",
  },
  {
    label: "Nosotros",
    to: "/us",
  },
  {
    label: "Inicio",
    to: "/",
  },
];
