import React from "react";
import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { getAllUsers, getAllOrders, getAllDetailOrders } from '../redux/actions';

function StatsCard(props /*StatsCardProps*/) {
  const { title, stat, icon } = props;

  return (
    <Stat
      px={'3vh'}
      py={"2vh"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={"white"}
      rounded={"lg"}
      h={"15vh"}
      w={'100%'}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={'2vh'}>
          <StatLabel fontWeight={"medium"} isTruncated color={"white"}>
            {title}
          </StatLabel>
          <StatNumber fontSize={"4vh"} fontWeight={"medium"} color={"white"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={"#ffa200"}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics() {
  return (
    <Box  h={"25vh"} borderBottom="1px solid #ffa200" >
      <Box
        maxW="7xl"
        mx={"auto"}
        mt={"5%"}
        bg={""}
        px={{ base: 2, sm: 12, md: 17 }}
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={'3vh'}>
          <StatsCard
            title={"Usuarios"}
            stat={5}
            icon={<BsPerson size={"8vh"} />}
          />
          <StatsCard
            title={"Ventas"}
            stat={12}
            icon={<BsCartCheck size={"8vh"} />}
          />
          <StatsCard
            title={"Ingresos Totales"}
            stat="$ 412000"
            icon={<BsCashCoin size={"8vh"} />}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
}
