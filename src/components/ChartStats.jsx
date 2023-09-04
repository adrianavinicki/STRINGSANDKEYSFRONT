import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Button,
  Th,
  Image,
  Heading,
  Select,
  Td,
  Center,
  Input,
  TableContainer,
  Flex,
  Box,
} from "@chakra-ui/react";
import { BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

const ChartStats = (props) => {
  const { data, clase } = props;

  return (
    <Box width="100%">
      <Flex justify="center">
        <ResponsiveContainer width={300} height="100%" aspect={1}>
          <BarChart data={data} barSize={5}>
            <Tooltip />
            <CartesianGrid stroke="#FFFFFF" strokeDasharray="4"/>
            <XAxis stroke="#FFFFFF" dataKey="month" />
            <YAxis stroke="#FFFFFF" dataKey={clase} />

            <Bar dataKey={clase} fill="#ffa200" />
          </BarChart>
        </ResponsiveContainer>
      </Flex>
    </Box>
  );
};

export default ChartStats;
