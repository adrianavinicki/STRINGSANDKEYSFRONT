import React, { useState, useEffect } from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    Select,
    Center,
    extendTheme, // Importa extendTheme
    ChakraProvider, // Importa ChakraProvider
} from "@chakra-ui/react";
import { ventas } from "../DashBoardAdmin/Stats/ventas";
import ChartStats from "../../components/ChartStats";
import { useSelector, useDispatch } from "react-redux";
import { getInfoPurchase } from '../../redux/actions'

const StatsCharts = () => {
    const [selectedType, setSelectedType] = useState("T");
    const [selectedYear, setSelectedYear] = useState("2022");
    const [startMonth, setStartMonth] = useState("Enero");
    const [endMonth, setEndMonth] = useState("Diciembre");

    const mesesEnEspañol = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        // Llama a la acción "getAllPurchases" aquí
        dispatch(getInfoPurchase());
    }, [dispatch]);

    const ventaBDD = useSelector((state) => state.dataStats.data.purchasess);

    const alldata = [];

    ventaBDD.map(e => {
        if (e.orderdetails.length > 1) {
            e.orderdetails.map(f => {
                const dateCatPrice = {
                    order_date: f.order_date,
                    category: f.product.category,
                    price: f.product.price * f.quantity
                };
                alldata.push(dateCatPrice)
            })
        }
    })

    const valoresXmesConAnio = alldata.reduce((acumulador, objeto) => {
        const fecha = new Date(objeto.order_date);
        const mes = fecha.toLocaleString('default', { month: 'long' }).replace(/^\w/, (c) => c.toUpperCase());
        const year = fecha.getFullYear(); // Año
        const precio = objeto.price;

        const registroExistente = acumulador.find((item) => item.year === year && item.month === mes);

        if (registroExistente) {
            registroExistente.price += precio;
        } else {
            acumulador.push({ year, month: mes, price: precio });
        }

        return acumulador;
    }, []);

    const categoriasAgrupadas = alldata.reduce((resultado, objeto) => {
        const fecha = new Date(objeto.order_date);
        const mes = fecha.toLocaleString('default', { month: 'long' }).replace(/^\w/, (c) => c.toUpperCase());
        const year = fecha.getFullYear(); // Año
        const categoria = objeto.category;
        const precio = objeto.price;

        const clave = `${year}-${mes}`;

        if (!resultado[clave]) {
            resultado[clave] = {
                year,
                month: mes,
                price: 0, // Inicializar price en 0
                Afina: 0,
                Corre: 0,
                Fund: 0,
                Puas: 0,
                Cabl: 0,
                Tecl: 0,
                Cuer: 0,
                Vien: 0,
                Amp: 0,
                Perc: 0,
            };
        }

        // Asignar el precio a la categoría correspondiente
        switch (categoria) {
            case 'Afinadores':
                resultado[clave].Afina += precio;
                break;
            case 'Correas':
                resultado[clave].Corre += precio;
                break;
            case 'Fundas':
                resultado[clave].Fund += precio;
                break;
            case 'Puas':
                resultado[clave].Puas += precio;
                break;
            case 'Cables':
                resultado[clave].Cabl += precio;
                break;
            case 'Teclados':
                resultado[clave].Tecl += precio;
                break;
            case 'Cuerdas':
                resultado[clave].Cuer += precio;
                break;
            case 'Vientos':
                resultado[clave].Vien += precio;
                break;
            case 'Amplificadores':
                resultado[clave].Amp += precio;
                break;
            case 'Percusion':
                resultado[clave].Perc += precio;
                break;
            default:
                break;
        }

        // Sumar el precio total para esta clave (año y mes)
        resultado[clave].price += precio;

        return resultado;
    }, {});

    // Convertir el objeto en un array de objetos
    const categoriasAgrupadasArray = Object.values(categoriasAgrupadas);

    categoriasAgrupadasArray.reverse();

    const combinedData = [...ventas, ...categoriasAgrupadasArray];

    const filteredData = combinedData.filter((item) => {
        return (
            item.year.toString() === selectedYear &&
            monthToNumber(item.month) >= monthToNumber(startMonth) &&
            monthToNumber(item.month) <= monthToNumber(endMonth)
        );
    }).map((item) => {
        const newItem = { ...item };
        newItem.valT = item[`val${selectedType}`];
        return newItem;
    });

    // Función para convertir el nombre del mes a un número
    function monthToNumber(monthName) {
        const months = {
            Enero: 1,
            Febrero: 2,
            Marzo: 3,
            Abril: 4,
            Mayo: 5,
            Junio: 6,
            Julio: 7,
            Agosto: 8,
            Septiembre: 9,
            Octubre: 10,
            Noviembre: 11,
            Diciembre: 12,
        };

        return months[monthName] || 0;
    }

    return (
        <Flex direction="column" align="center" justify={'center'}>
            <Heading as="h2" color="white" size="sm" alignContent="center" mt={4} >
                Filtros
            </Heading>
            <Box
                borderBottom="1px"
                borderBottomColor={"#ffa200"}
                h="20"
                w="100%"
                p={"1"}
            >
                <Flex direction="row" align={'center'} justify={'center'} m={'1vh'}>
                    <Text color={'white'}>Año:</Text>
                    <Select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        color="black"
                        borderColor="#ffa200"
                        w={'15vh'}
                        ml={'1vh'}
                        mr={'5vh'}
                        bg={'white'}
                    >
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        {/* Agrega más años aquí si es necesario */}
                    </Select>
                    <Text color={'white'}>Desde:</Text>
                    <Select
                        value={startMonth}
                        onChange={(e) => setStartMonth(e.target.value)}
                        color="black"
                        borderColor="#ffa200"
                        bg={'white'}
                        w={'25vh'}
                        ml={'1vh'}
                        mr={'5vh'}
                    >
                        <option value="Enero">Enero</option>
                        <option value="Febrero">Febrero</option>
                        <option value="Marzo">Marzo</option>
                        <option value="Abril">Abril</option>
                        <option value="Mayo">Mayo</option>
                        <option value="Junio">Junio</option>
                        <option value="Julio">Julio</option>
                        <option value="Agosto">Agosto</option>
                        <option value="Septiembre">Septiembre</option>
                        <option value="Octubre">Octubre</option>
                        <option value="Noviembre">Noviembre</option>
                        <option value="Diciembre">Diciembre</option>
                    </Select>
                    <Text color={'white'}>Hasta:</Text>
                    <Select
                        value={endMonth}
                        onChange={(e) => setEndMonth(e.target.value)}
                        color="black"
                        borderColor="#ffa200"
                        w={'25vh'}
                        ml={'1vh'}
                        bg={'white'}
                    >
                        <option value="Enero">Enero</option>
                        <option value="Febrero">Febrero</option>
                        <option value="Marzo">Marzo</option>
                        <option value="Abril">Abril</option>
                        <option value="Mayo">Mayo</option>
                        <option value="Junio">Junio</option>
                        <option value="Julio">Julio</option>
                        <option value="Agosto">Agosto</option>
                        <option value="Septiembre">Septiembre</option>
                        <option value="Octubre">Octubre</option>
                        <option value="Noviembre">Noviembre</option>
                        <option value="Diciembre">Diciembre</option>
                        
                    </Select>
                </Flex>
            </Box>

            <Box>
                <Flex direction="column">
                    <Flex direction="row" justify="space-around" mt="1%">
                        {/* Generales */}
                        <Box width="100%" textAlign="center">
                            <Heading as="h2" color="white" size="sm" ml={14} mb={4} mt={4}>
                                Ventas Generales
                            </Heading>
                            <ChartStats data={filteredData} clase="price" />
                        </Box>
                    </Flex>
                    <Flex direction="row" justify="space-around" mt="1%">
                        {/* Afinadores */}
                        <Box width="100%" margin={4} textAlign="center">
                            <Heading as="h2" color="white" size="sm" ml={14} mb={4} mt={4}>
                                Afinadores
                            </Heading>
                            <ChartStats data={filteredData} clase="Afina" />
                        </Box>
                        {/* Correas */}
                        <Box width="100%" margin={4} textAlign="center">
                            <Heading as="h2" color="white" size="sm" ml={14} mb={4} mt={4}>
                                Correas
                            </Heading>
                            <ChartStats data={filteredData} clase="Corre" />
                        </Box>
                        {/* Fundas */}
                        <Box width="100%" margin={4} textAlign="center">
                            <Heading as="h2" color="white" size="sm" ml={14} mb={4} mt={4}>
                                Fundas
                            </Heading>
                            <ChartStats data={filteredData} clase="Fund" />
                        </Box>
                        {/*  */}
                    </Flex>
                    <Flex direction="row" justify="space-around" mt="1%">
                        {/* Púas */}
                        <Box width="100%" margin={4} textAlign="center">
                            <Heading as="h2" color="white" size="sm" ml={14} mb={4} mt={4}>
                                Púas
                            </Heading>
                            <ChartStats data={filteredData} clase="Puas" />
                        </Box>
                        {/* Cables */}
                        <Box width="100%" margin={4} textAlign="center">
                            <Heading as="h2" color="white" size="sm" ml={14} mb={4} mt={4}>
                                Cables
                            </Heading>
                            <ChartStats data={filteredData} clase="Cabl" />
                        </Box>
                        {/* Teclados */}
                        <Box width="100%" margin={4} textAlign="center">
                            <Heading as="h2" color="white" size="sm" ml={14} mb={4} mt={4}>
                                Teclados
                            </Heading>
                            <ChartStats data={filteredData} clase="Tecl" />
                        </Box>
                        {/*  */}
                    </Flex>
                    <Flex direction="row" justify="space-around" mt="1%">
                        {/* Instrumentos de Cuerda */}
                        <Box width="100%" margin={4} textAlign="center">
                            <Heading as="h2" color="white" size="sm" ml={14} mb={4} mt={4}>
                                Instrumentos de Cuerda
                            </Heading>
                            <ChartStats data={filteredData} clase="Cuer" />
                        </Box>
                        {/* Instrumentos de Viento */}
                        <Box width="100%" margin={4} textAlign="center">
                            <Heading as="h2" color="white" size="sm" ml={14} mb={4} mt={4}>
                                Instrumentos de Viento
                            </Heading>
                            <ChartStats data={filteredData} clase="Vien" />
                        </Box>
                        {/* Amplificadores */}
                        <Box width="100%" margin={4} textAlign="center">
                            <Heading as="h2" color="white" size="sm" ml={14} mb={4} mt={4}>
                                Amplificadores
                            </Heading>
                            <ChartStats data={filteredData} clase="Amp" />
                        </Box>
                        {/*  */}
                    </Flex>
                    <Flex direction="row" justify="space-around" mt="1%">
                        {/* Baterías y Percusión */}
                        <Box width="100%" margin={4} textAlign="center">
                            <Heading as="h2" color="white" size="sm" ml={14} mb={4} mt={4}>
                                Baterías y Percusión
                            </Heading>
                            <ChartStats data={filteredData} clase="Perc" />
                        </Box>
                        {/*  */}
                    </Flex>
                </Flex>
            </Box >
        </Flex>
    );
};

export default StatsCharts;
