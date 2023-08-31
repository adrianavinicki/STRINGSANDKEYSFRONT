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
import React, { useState } from "react";

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

const COLORS = ['#ffa200', '#ffc200', '#ffe200', '#ffa200', '#ffc200', '#ffe200', '#ffa200', '#ffc200', '#ffe200',];
const StatsCharts = () => {
    const [showAdditionalCharts, setShowAdditionalCharts] = useState(false);
    const [originalChartOpacity, setOriginalChartOpacity] = useState(1);

    const toggleAdditionalCharts = () => {
        setShowAdditionalCharts(!showAdditionalCharts);
    };

    const handleOriginalChartClick = () => {
        toggleAdditionalCharts();
        setOriginalChartOpacity(showAdditionalCharts ? 1 : 0);
    };

    return (
        <Box>
            <Flex direction="column">
                <Flex direction="row" justify="space-around" mt="2%">
                    <Box
                        width="100%"
                        style={{ opacity: originalChartOpacity }}
                        onClick={handleOriginalChartClick}
                        _hover={{ opacity: showAdditionalCharts ? 1 : 0 }}
                        transition="opacity 1s ease-in-out"
                    >
                        <Flex justify="center">
                            <ResponsiveContainer width={200} height="100%" aspect={1}>
                                <BarChart data={data} barSize={15}>
                                    <Tooltip />
                                    <CartesianGrid strokeDasharray="4 1 2" />
                                    <XAxis dataKey="valX" />
                                    <YAxis dataKey="valY" />
                                    <Legend />
                                    <Bar dataKey="valY" fill="#6b48ff" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Flex>
                    </Box>
                </Flex>
                {showAdditionalCharts && (
                    <Box>
                        <Flex direction="column">
                            <Flex direction="row" justify="space-around" mt="2%">
                                {/*  */}
                                <Box width="100%">
                                    <Flex justify="center">
                                        <ResponsiveContainer width={200} height="100%" aspect={1}>
                                            <BarChart data={data} barSize={15}>
                                                <Tooltip />
                                                <CartesianGrid strokeDasharray="4 1 2" />
                                                <XAxis dataKey="valX" />
                                                <YAxis dataKey="valY" />
                                                <Legend />
                                                <Bar dataKey="valY" fill="#6b48ff" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Flex>
                                </Box>
                                {/*  */}
                                <Box width="100%">
                                    <Flex justify="center">
                                        <ResponsiveContainer width={200} height="100%" aspect={1}>
                                            <BarChart data={data} barSize={15}>
                                                <Tooltip />
                                                <CartesianGrid strokeDasharray="4 1 2" />
                                                <XAxis dataKey="valX" />
                                                <YAxis dataKey="valY" />
                                                <Legend />
                                                <Bar dataKey="valY" fill="#6b48ff" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Flex>
                                </Box>
                                {/*  */}
                                <Box width="100%">
                                    <Flex justify="center">
                                        <ResponsiveContainer width={200} height="100%" aspect={1}>
                                            <BarChart data={data} barSize={15}>
                                                <Tooltip />
                                                <CartesianGrid strokeDasharray="4 1 2" />
                                                <XAxis dataKey="valX" />
                                                <YAxis dataKey="valY" />
                                                <Legend />
                                                <Bar dataKey="valY" fill="#6b48ff" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Flex>
                                </Box>
                                {/*  */}
                                <Box width="100%">
                                    <Flex justify="center">
                                        <ResponsiveContainer width={200} height="100%" aspect={1}>
                                            <BarChart data={data} barSize={15}>
                                                <Tooltip />
                                                <CartesianGrid strokeDasharray="4 1 2" />
                                                <XAxis dataKey="valX" />
                                                <YAxis dataKey="valY" />
                                                <Legend />
                                                <Bar dataKey="valY" fill="#6b48ff" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Flex>
                                </Box>
                                {/*  */}
                                <Box width="100%">
                                    <Flex justify="center">
                                        <ResponsiveContainer width={200} height="100%" aspect={1}>
                                            <BarChart data={data} barSize={15}>
                                                <Tooltip />
                                                <CartesianGrid strokeDasharray="4 1 2" />
                                                <XAxis dataKey="valX" />
                                                <YAxis dataKey="valY" />
                                                <Legend />
                                                <Bar dataKey="valY" fill="#6b48ff" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Flex>
                                </Box>
                                {/*  */}
                            </Flex>
                            <Flex direction="row" justify="space-around" mt="1.5%">
                                {/*  */}
                                <Box width="100%">
                                    <Flex justify="center">
                                        <ResponsiveContainer width={200} height="100%" aspect={1}>
                                            <BarChart data={data} barSize={15}>
                                                <Tooltip />
                                                <CartesianGrid strokeDasharray="4 1 2" />
                                                <XAxis dataKey="valX" />
                                                <YAxis dataKey="valY" />
                                                <Legend />
                                                <Bar dataKey="valY" fill="#6b48ff" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Flex>
                                </Box>
                                {/*  */}
                                <Box width="100%">
                                    <Flex justify="center">
                                        <ResponsiveContainer width={200} height="100%" aspect={1}>
                                            <BarChart data={data} barSize={15}>
                                                <Tooltip />
                                                <CartesianGrid strokeDasharray="4 1 2" />
                                                <XAxis dataKey="valX" />
                                                <YAxis dataKey="valY" />
                                                <Legend />
                                                <Bar dataKey="valY" fill="#6b48ff" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Flex>
                                </Box>
                                {/*  */}
                                <Box width="100%">
                                    <Flex justify="center">
                                        <ResponsiveContainer width={200} height="100%" aspect={1}>
                                            <BarChart data={data} barSize={15}>
                                                <Tooltip />
                                                <CartesianGrid strokeDasharray="4 1 2" />
                                                <XAxis dataKey="valX" />
                                                <YAxis dataKey="valY" />
                                                <Legend />
                                                <Bar dataKey="valY" fill="#6b48ff" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Flex>
                                </Box>
                                {/*  */}
                                <Box width="100%">
                                    <Flex justify="center">
                                        <ResponsiveContainer width={200} height="100%" aspect={1}>
                                            <BarChart data={data} barSize={15}>
                                                <Tooltip />
                                                <CartesianGrid strokeDasharray="4 1 2" />
                                                <XAxis dataKey="valX" />
                                                <YAxis dataKey="valY" />
                                                <Legend />
                                                <Bar dataKey="valY" fill="#6b48ff" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Flex>
                                </Box>
                                {/*  */}
                                <Box width="100%">
                                    <Flex justify="center">
                                        <ResponsiveContainer width={200} height="100%" aspect={1}>
                                            <BarChart data={data} barSize={15}>
                                                <Tooltip />
                                                <CartesianGrid strokeDasharray="4 1 2" />
                                                <XAxis dataKey="valX" />
                                                <YAxis dataKey="valY" />
                                                <Legend />
                                                <Bar dataKey="valY" fill="#6b48ff" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Flex>
                                </Box>
                                {/*  */}
                            </Flex>
                        </Flex>
                    </Box>
                )}
            </Flex>
        </Box>
    );
};

export default StatsCharts;

