import React from "react";
import {
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import { BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

const CustomTooltip = ({ active, label, payload }) => {
  if (active) {
    return (
      <Box p={2} borderWidth="1px" borderColor="#ffa200" borderRadius="md" backgroundColor="black">
        <Text color={'white'} className="label">{`Mes: ${label}`}</Text>
        <Text color={'white'}  className="sales">{`Valor: ${payload[0].value.toLocaleString()}`}</Text>
      </Box>
    );
  }
  return null;
};

const CustomYAxisTick = ({ x, y, payload }) => {
  // Formatea el valor usando .toLocaleString()
  const formattedValue = payload.value.toLocaleString();

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" >{formattedValue}</text>
    </g>
  );
};

const ChartStats = (props) => {
  const { data, clase } = props;

  return (
    <Box width="100%">
      <Flex justify="center">
        <ResponsiveContainer width={300} height="100%" aspect={1}>
          <BarChart data={data} barSize={5} margin={{ left: 15 }}>
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid stroke="#FFFFFF" strokeDasharray="4" />
            <XAxis stroke="#FFFFFF" dataKey="month" />
            <YAxis
              tickFormatter={(value) => value.toLocaleString()}
              domain={[0, 'auto']} stroke="#FFFFFF"
            />
            
            <Bar dataKey={clase} fill="#ffa200" />
          </BarChart>
        </ResponsiveContainer>
      </Flex>
    </Box>
  );
};

export default ChartStats;
