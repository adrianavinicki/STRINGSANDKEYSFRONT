import WithSubnavigation from "../components/NavBar";
import SmallWithLogoLeft from "../components/Footer";
import { Box, Flex, Text, useColorModeValue, Icon } from "@chakra-ui/react";
import { NotAllowedIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Inactive = () => {

    const usuarioActual = useSelector((state)=> state.actualUser)
  const navigate = useNavigate();

  useEffect(()=>{
    if(usuarioActual.user_status === true){
      navigate("/")
    };
  },[])

    return(
        <Box
        backgroundImage={useColorModeValue("url('/bg.jpg')", "url('/bgdark.jpg')")}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        w={"100%"}
          h={"100vh"}
        overflow={"hidden"}>
            <Flex direction={"column"}>
            <WithSubnavigation></WithSubnavigation>
            <Box
              color={"black"}
              bg={useColorModeValue('rgb(0,0,0,0.4)', 'rgb(0,0,0,0.7)')}
              w={"100%"}
              h={"92vh"}
              >
            <Flex direction={"column"} align={"center"}>
                <Icon><NotAllowedIcon w={"50vh"}></NotAllowedIcon></Icon>
            <Text pt={"27vh"} w={"100vh"} fontSize={"5vh"} fontWeight={"bold"}>Lo siento, esta cuenta ha sido bloqueada por motivos administrativos.
            <br />
            Para más información comunícate con nosotros en nuestro canales digitales:
            <br/> 
            <br/> 
            <Link to="https://instagram.com/stringsandkeyss?utm_source=qr&igshid=MzNlNGNkZWQ4Mg==" target="_blank">Instagram</Link> -
            <Link to="https://twitter.com/StringsAndKeyss" target="_blank">Twitter</Link> -
            <Link to="https://www.youtube.com/channel/UCBrqSo2as6a07D0sTKEBUdw" target="_blank">YouTube</Link> ...
            </Text>
            </Flex>
            </Box>
            <SmallWithLogoLeft></SmallWithLogoLeft>
            </Flex>
        </Box>
    )
};

export default Inactive;