import WithSubnavigation from "../components/NavBar";
import SmallWithLogoLeft from "../components/Footer";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { NotAllowedIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"

const Inactive = () => {
  const usuarioActual = useSelector((state) => state.actualUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (usuarioActual.user_status === true) {
      navigate("/");
    }
  }, []);

  return (
    <Box>
      <Flex direction={"column"}>
        <Box>
          <WithSubnavigation></WithSubnavigation>
        </Box>
        <Box
          backgroundImage={useColorModeValue(
            "url('/bg.jpg')",
            "url('/bgdark.jpg')"
          )}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          w={"100%"}
          h={"83vh"}
          mt={"10vh"}
          pt={"2vh"}
          overflow={"hidden"}
        >
          <Flex direction={"column"} align={"center"} h={'70vh'} bg={''} justify={'center'}>
            <NotAllowedIcon color={"#ffa200"} boxSize={'25vh'}></NotAllowedIcon>
            <Text textAlign={'center'} fontSize={"3vh"} fontWeight={"bold"}>
              Lo siento, esta cuenta ha sido bloqueada por motivos
              administrativos.
              <br />
              Para más información comunícate con nosotros en nuestro canales
              digitales:
              <br />
            </Text>
            <Flex mt={'5vh'} justify={'space-between'} bg={''} w={'50vh'}>
              <Link
                to="https://instagram.com/stringsandkeyss?utm_source=qr&igshid=MzNlNGNkZWQ4Mg=="
                target="_blank"
              >
                <FaInstagram size={'10vh'} ></FaInstagram>
              </Link>{" "}
              <Link to="https://twitter.com/StringsAndKeyss" target="_blank">
                <FaTwitter size={'10vh'}></FaTwitter>
              </Link>{" "}
              <Link
                to="https://www.youtube.com/channel/UCBrqSo2as6a07D0sTKEBUdw"
                target="_blank"
              >
                <FaYoutube size={'10vh'}></FaYoutube>
              </Link>{" "}
            </Flex>
          </Flex>
        </Box>
        <Box marginTop="auto">
          <SmallWithLogoLeft></SmallWithLogoLeft>
        </Box>
      </Flex>
    </Box>
  );
};

export default Inactive;
