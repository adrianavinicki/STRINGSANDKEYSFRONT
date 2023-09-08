"use client"
import {
  Box,
  chakra,
  Container,
  Stack,
  Image,
  Text,
  useColorModeValue,
  VisuallyHidden
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"


const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("whiteAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      target="blank"
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("whiteAlpha.200", "whiteAlpha.200")
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function SmallWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue("black", "black")}
      color={useColorModeValue("gray.200", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={2}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Image src="/Logo White 2.png" h={'50px'} />
        <Text>© 2023 Strings And Keys. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Twitter"} href={"https://twitter.com/StringsAndKeyss"} >
            <FaTwitter />
          </SocialButton>
          <SocialButton label={"YouTube"} href={"https://www.youtube.com/channel/UCBrqSo2as6a07D0sTKEBUdw"}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={"Instagram"} href={"https://instagram.com/stringsandkeyss?utm_source=qr&igshid=MzNlNGNkZWQ4Mg=="}>
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}
