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
import { BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie, Cell } from "recharts";

const data = [
    { valX: "June", valY: "10" },
    { valX: "July", valY: "20" },
    { valX: "August", valY: "30" },
]

const data01 = [
    { name: "Grupo A", value: 1200 },
    { name: "Grupo B", value: 3500 },
    { name: "Grupo C", value: 2540 },
    { name: "Grupo D", value: 1200 },
    { name: "Grupo E", value: 5000 },
    { name: "Grupo F", value: 1200 },
    { name: "Grupo G", value: 4000 },
    { name: "Grupo H", value: 1200 },
    { name: "Grupo I", value: 1000 },
]

const data02 = [
    { name: "Grupo A", value: 1200 },
    { name: "Grupo B", value: 3500 },
    { name: "Grupo C", value: 2540 },
    { name: "Grupo D", value: 1200 },
    { name: "Grupo E", value: 5000 },
    { name: "Grupo F", value: 1200 },
    { name: "Grupo G", value: 4000 },
    { name: "Grupo H", value: 1200 },
    { name: "Grupo I", value: 1000 },
]

const COLORS = ['#ce93d8', '#5c6bc0', '#b39ddb'];
const StatsCharts = () => {

    return (
        <Box>
            <Flex direction={"column"}>
                <Center>
                    <Heading color={"white"} fontSize={"4vh"}>
                        Insertar graficas
                    </Heading>
                </Center>
                <Flex align={"center"} justify={"space-around"} mt={"1.5%"}>
                    <ResponsiveContainer width="40%" aspect={2}>
                        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, buttom: 5 }}>
                            <Tooltip />
                            <CartesianGrid strokeDasharray="4 1 2" />
                            <XAxis dataKey="valX" />
                            <YAxis dataKey="valY" />
                            <Legend />
                            <Bar dataKey="valY" fill="#6b48ff" />
                        </BarChart>
                    </ResponsiveContainer>
                </Flex>
                <Flex align={"center"} justify={"space-around"} mt={"1.5%"}>
                    <ResponsiveContainer width="40%" aspect={2} >
                        <PieChart>
                            <Pie dataKey="value" data={data02} innerRadius={60} outerRadius={85} fill="#82ca9d">
                                {data02.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS.length} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Flex>
                <Flex align={"center"} justify={"space-around"} mt={"2%"}>
                    <ResponsiveContainer width="50%" aspect={2}>
                        <PieChart width={730} height={250}>
                            <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                            <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                        </PieChart>
                    </ResponsiveContainer>
                </Flex>
                <Flex align={"center"} justify={"space-around"} mt={"1.5%"}>
                    <ResponsiveContainer width="40%" aspect={2}>
                        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, buttom: 5 }}>
                            <CartesianGrid strokeDasharray="4 1 2" />
                            <Tooltip />
                            <XAxis dataKey="valX" />
                            <YAxis dataKey="valY" />
                            <Legend />
                            <Bar dataKey="valY" fill="#6b48ff" />
                        </BarChart>
                    </ResponsiveContainer>
                </Flex>
            </Flex>
        </Box>

    );
};

export default StatsCharts;